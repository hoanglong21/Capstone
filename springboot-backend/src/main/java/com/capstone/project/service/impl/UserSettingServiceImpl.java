package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.model.Class;
import com.capstone.project.repository.*;
import com.capstone.project.service.ClassService;
import com.capstone.project.service.UserSettingService;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

import com.capstone.project.util.UserSettingValidation;

@Service
public class UserSettingServiceImpl implements UserSettingService {

    private final JavaMailSender mailSender;

    private final UserSettingRepository userSettingRepository;
    private final TestRepository testRepository;

    private final ClassLearnerRepository classLearnerRepository;

    private final ClassService classService;
    private final AssignmentRepository assignmentRepository;

    private UserRepository userRepository;

    @Autowired
    public UserSettingServiceImpl(JavaMailSender mailSender, UserSettingRepository userSettingRepository, TestRepository testRepository, ClassLearnerRepository classLearnerRepository, ClassService classService, AssignmentRepository assignmentRepository) {
        this.mailSender = mailSender;
        this.userSettingRepository = userSettingRepository;
        this.testRepository = testRepository;
        this.classLearnerRepository = classLearnerRepository;
        this.classService = classService;
        this.assignmentRepository = assignmentRepository;
    }

    @Override
    public List<UserSetting> getAllUserSetting() {
        return userSettingRepository.findAll();
    }


    @Override
    public UserSetting getUserSettingById(int id) throws ResourceNotFroundException {
        UserSetting usersetting = userSettingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("UserSetting not exist with id:" + id));
        return usersetting;
    }

    @Override
    public List<UserSetting> getUserSettingBySettingId(int id) {
        return userSettingRepository.getBySettingId(id);
    }

    @Override
    public List<UserSetting> getUserSettingByUserId(int id) {
        return userSettingRepository.getByUserId(id);
    }

    @Override
    public UserSetting createUserSetting(UserSetting usersetting) {
        return userSettingRepository.save(usersetting);
    }

    @Override
    public UserSetting updateUserSetting(UserSetting usersetting, int id) throws ResourceNotFroundException {
        UserSetting usersettings = userSettingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("UserSetting not exist with id:" + id));
        usersettings.setValue(usersetting.getValue());
        return userSettingRepository.save(usersettings);
    }

    @Override
    public Boolean deleteUserSetting(int id) throws ResourceNotFroundException {
        UserSetting usersettings = userSettingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("UserSetting not exist with id:" + id));
        userSettingRepository.delete(usersettings);
        return true;
    }

    @Override
    public Map<String, String> CustomGetUserSettingByUserId(int id) throws ResourceNotFroundException {
        List<UserSetting> customUserSettings = userSettingRepository.getByUserId(id);
        Map<String, String> customMap = new HashMap<>();
        for (UserSetting userSetting : customUserSettings) {
            String settingTitle = userSetting.getSetting().getTitle();
            String settingValue = userSetting.getValue();
            customMap.put(settingTitle, settingValue);
        }

        Map<String, String> userSettingMap = new HashMap<>();
        userSettingMap.put("study reminder", "false"); // == "false"
        userSettingMap.put("language", "en");
        userSettingMap.put("assignment due date reminder", "false"); // == "false"
        userSettingMap.put("test due date reminder", "false"); // == "false"
        userSettingMap.put("set added", "TRUE");
        userSettingMap.put("post added", "TRUE");
        userSettingMap.put("assignment assigned", "TRUE");
        userSettingMap.put("test assigned", "TRUE");
        userSettingMap.put("submission graded", "TRUE");

        userSettingMap.putAll(customMap);
        return userSettingMap;
    }

    @Override
    public UserSetting saveUserSettingCustom(int userId, int settingId, String newValue) {
        UserSetting userSetting = userSettingRepository.getUserSettingCustom(userId, settingId);
        if ((newValue == null || newValue.equals("")) && userSetting != null) {
            userSettingRepository.delete(userSetting);
            return null;
        }
        switch (settingId) {
            case 1:
                if (!UserSettingValidation.isValidTimeFormat(newValue) && !newValue.toLowerCase().equals("false")) {
                    throw new IllegalArgumentException("Invalid input for time format. Expected format: HH:mm");
                }
                break;
            case 2:
                if (!UserSettingValidation.isValidLanguage(newValue)) {
                    throw new IllegalArgumentException("Invalid input for language. Must have a short name for the language.");
                }
                break;
            case 3:
            case 4:
                if (!UserSettingValidation.isValidInteger(newValue) && !newValue.toLowerCase().equals("false")) {
                    throw new IllegalArgumentException("Invalid input for integer format. Expected an integer value.");
                }
                break;
            default:
                if (!UserSettingValidation.isValidBoolean(newValue)) {
                    throw new IllegalArgumentException("Invalid input for boolean value. Expected 'TRUE' or 'FALSE'.");
                }
        }

        if (userSetting == null) {
            userSetting = UserSetting.builder()
                    .value(newValue)
                    .user(User.builder().id(userId).build())
                    .setting(Setting.builder().id(settingId).build())
                    .build();
        } else {
            userSetting.setValue(newValue);
        }
        try {
            return userSettingRepository.save(userSetting);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("Invalid input, check id again");
        }
    }

    public void sendMail(UserSetting userSetting) {
        String subject = null;
        String content = null;
        try {
            String toAddress = userSetting.getUser().getEmail();
            String fromAddress = "nihongolevelup.box@gmail.com";
            String senderName = "NihongoLevelUp";

            if (userSetting.getSetting().getId() == 1) {
                subject = "[NihongoLevelUp]: Time to study";
                content = "Hi [[name]],<br><br>"
                        + "It's time to study, don't lose your momentum. Join with us and study new things <br><br>"
                        + "<a href=\"[[URL]]\" style=\"display:inline-block;background-color:#3399FF;color:#FFF;padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:bold;\" target=\"_blank\">Start</a><br><br>"
                        + "Thank you for choosing NihongoLevelUp! If you have any questions or concerns, please do not hesitate to contact us.<br><br>"
                        + "Best regards,<br>"
                        + "NihongoLevelUp Team";
            }

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(fromAddress, senderName);
            helper.setTo(toAddress);
            helper.setSubject(subject);

            content = content.replace("[[name]]", userSetting.getUser().getUsername());

            Dotenv dotenv = Dotenv.load();
            String URL = dotenv.get("FRONTEND_HOST_URL");
            content = content.replace("[[URL]]", URL);

            helper.setText(content, true);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public void sendTestDueDateMail(UserSetting userSetting, Test test, Class classroom) {
        String subject = null;
        String content = null;
        try {
            String toAddress = userSetting.getUser().getEmail();
            String fromAddress = "nihongolevelup.box@gmail.com";
            String senderName = "NihongoLevelUp";

            if (userSetting.getSetting().getId() == 4) {
                subject = "[NihongoLevelUp]: Test due date";
                content = "Hi [[name]],<br><br>"
                        + "Your test << " + test.getTitle() + " >> in class " + classroom.getClass_name() + " will be due in soon. Complete it before the time is due!<br><br>"
                        + "<a href=\"[[URL]]\" style=\"display:inline-block;background-color:#3399FF;color:#FFF;padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:bold;\" target=\"_blank\">Complete Test</a><br><br>"
                        + "Thank you for choosing NihongoLevelUp! If you have any questions or concerns, please do not hesitate to contact us.<br><br>"
                        + "Best regards,<br>"
                        + "NihongoLevelUp Team";
            }

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(fromAddress, senderName);
            helper.setTo(toAddress);
            helper.setSubject(subject);

            content = content.replace("[[name]]", userSetting.getUser().getUsername());

//            String URL = "https://nihongolevelup.com";
            Dotenv dotenv = Dotenv.load();
            String URL = dotenv.get("FRONTEND_HOST_URL");
            content = content.replace("[[URL]]", URL);

            helper.setText(content, true);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void sendTestStartDateMail(UserSetting userSetting, Test test, Class classroom) {
        String subject = null;
        String content = null;
        try {
            String toAddress = userSetting.getUser().getEmail();
            String fromAddress = "nihongolevelup.box@gmail.com";
            String senderName = "NihongoLevelUp";

            if (userSetting.getSetting().getId() == 8) {
                subject = "[NihongoLevelUp]: Test assigned";
                content = "Hi [[name]],<br><br>"
                        + "A new test << " + test.getTitle() + " >> in class " + classroom.getClass_name() + " is assigned. Do the test now!<br><br>"
                        + "<a href=\"[[URL]]\" style=\"display:inline-block;background-color:#3399FF;color:#FFF;padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:bold;\" target=\"_blank\">Do Test</a><br><br>"
                        + "Thank you for choosing NihongoLevelUp! If you have any questions or concerns, please do not hesitate to contact us.<br><br>"
                        + "Best regards,<br>"
                        + "NihongoLevelUp Team";
            }

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(fromAddress, senderName);
            helper.setTo(toAddress);
            helper.setSubject(subject);

            content = content.replace("[[name]]", userSetting.getUser().getUsername());

//            String URL = "https://nihongolevelup.com";
            Dotenv dotenv = Dotenv.load();
            String URL = dotenv.get("FRONTEND_HOST_URL");
            content = content.replace("[[URL]]", URL);

            helper.setText(content, true);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void sendAssignmentDueDateMail(UserSetting userSetting, Assignment assignment, Class classroom) {
        String subject = null;
        String content = null;
        try {
            String toAddress = userSetting.getUser().getEmail();
            String fromAddress = "nihongolevelup.box@gmail.com";
            String senderName = "NihongoLevelUp";

            if (userSetting.getSetting().getId() == 3) {
                subject = "[NihongoLevelUp]: Assignment due date";
                content = "Hi [[name]],<br><br>"
                        + "Your assignment << " + assignment.getTitle() + " >> in class " + classroom.getClass_name() + " will be due in soon. Complete it before the time is due!<br><br>"
                        + "<a href=\"[[URL]]\" style=\"display:inline-block;background-color:#3399FF;color:#FFF;padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:bold;\" target=\"_blank\">Complete Assignment</a><br><br>"
                        + "Thank you for choosing NihongoLevelUp! If you have any questions or concerns, please do not hesitate to contact us.<br><br>"
                        + "Best regards,<br>"
                        + "NihongoLevelUp Team";
            }

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(fromAddress, senderName);
            helper.setTo(toAddress);
            helper.setSubject(subject);

            content = content.replace("[[name]]", userSetting.getUser().getUsername());

//            String URL = "https://nihongolevelup.com";
            Dotenv dotenv = Dotenv.load();
            String URL = dotenv.get("FRONTEND_HOST_URL");
            content = content.replace("[[URL]]", URL);

            helper.setText(content, true);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void sendAssignmentStartDateMail(UserSetting userSetting, Assignment assignment, Class classroom) {
        String subject = null;
        String content = null;
        try {
            String toAddress = userSetting.getUser().getEmail();
            String fromAddress = "nihongolevelup.box@gmail.com";
            String senderName = "NihongoLevelUp";

            if (userSetting.getSetting().getId() == 7) {
                subject = "[NihongoLevelUp]: Assignment assigned";
                content = "Hi [[name]],<br><br>"
                        + "Your assignment << " + assignment.getTitle() + " >> in class " + classroom.getClass_name() + " assigned now. Complete it !<br><br>"
                        + "<a href=\"[[URL]]\" style=\"display:inline-block;background-color:#3399FF;color:#FFF;padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:bold;\" target=\"_blank\">Complete Assignment</a><br><br>"
                        + "Thank you for choosing NihongoLevelUp! If you have any questions or concerns, please do not hesitate to contact us.<br><br>"
                        + "Best regards,<br>"
                        + "NihongoLevelUp Team";
            }

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(fromAddress, senderName);
            helper.setTo(toAddress);
            helper.setSubject(subject);

            content = content.replace("[[name]]", userSetting.getUser().getUsername());

//            String URL = "https://nihongolevelup.com";
            Dotenv dotenv = Dotenv.load();
            String URL = dotenv.get("FRONTEND_HOST_URL");
            content = content.replace("[[URL]]", URL);

            helper.setText(content, true);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Scheduled(fixedRate = 10000)
    public void sendStudyReminderMails() {
        List<UserSetting> userSettings = userSettingRepository.findAll();
        for (UserSetting userSetting : userSettings) {
            if (userSetting.getSetting().getId() == 1) {
                String studyTimeString = userSetting.getValue();
                if(studyTimeString.equalsIgnoreCase("false")) {
                    continue;
                }
                try{
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
                    LocalTime studyTime = LocalTime.parse(studyTimeString, formatter).truncatedTo(ChronoUnit.MINUTES);

                    LocalTime currentTime = LocalTime.now().truncatedTo(ChronoUnit.MINUTES);
                    if(studyTime.equals(currentTime)) {
                        sendMail(userSetting);
                    }
                } catch (Exception e) {

                }
            }
        }
    }

    private boolean isTimeReached(LocalTime targetTime, LocalDateTime currentTime) {
        LocalTime currentLocalTime = currentTime.toLocalTime();
        return currentLocalTime.isAfter(targetTime);
    }

    private Set<LocalDateTime> sentAssignmentReminders = new HashSet<>();

    @Scheduled(fixedRate = 10000)
    public void sendAssignmentDueDateMails() throws ResourceNotFroundException {
        List<UserSetting> userSettings = userSettingRepository.findAll();

        for (UserSetting userSetting : userSettings) {
            List<ClassLearner> classLearners = classLearnerRepository.getClassLeanerByUserId(userSetting.getUser().getId());

            for (ClassLearner classLearner : classLearners) {
                if (userSetting.getSetting().getId() == 3) {
                    Class classroom = classService.getClassroomById(classLearner.getClassroom().getId());
                    List<Assignment> assignments = assignmentRepository.getAssignmentByClassroomId(classroom.getId());

                    List<Assignment> validAssignments = assignments.stream()
                            .filter(assignment -> assignment.getDue_date() != null)
                            .collect(Collectors.toList());

                    for (Assignment assignment : validAssignments) {
                        String dueDate = String.valueOf(assignment.getDue_date());
                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.S");
                        LocalDateTime dueDateTime = LocalDateTime.parse(dueDate, formatter);

                        String getValue = userSetting.getValue();
                        if(getValue.equalsIgnoreCase("false")) {
                            continue;
                        }
                        try {
                            long hoursBeforeDueDate = Long.parseLong(getValue);
                            LocalDateTime reminderTime = dueDateTime.minusHours(hoursBeforeDueDate).truncatedTo(ChronoUnit.MINUTES);;

                            LocalDateTime currentTime = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);
                            boolean sentReminder = sentAssignmentReminders.contains(reminderTime);
                            if(reminderTime.equals(currentTime)  && !sentReminder && classLearner.getStatus().equals("enrolled") && !assignment.is_draft()) {
                                sendAssignmentDueDateMail(userSetting, assignment, classroom);
                                sentAssignmentReminders.add(reminderTime);
                            }
                        } catch (Exception e) {

                        }
                    }
                }
            }
        }
    }

    private Set<LocalDateTime> sentAssignStartDates = new HashSet<>();

    @Scheduled(fixedRate = 10000)
    public void sendAssignmentStartDateMails() throws ResourceNotFroundException {
        List<UserSetting> userSettings = userSettingRepository.findAll();

        for (UserSetting userSetting : userSettings) {
            int userSettingId = userSetting.getId();
            List<ClassLearner> classLearners = classLearnerRepository.getClassLeanerByUserId(userSetting.getUser().getId());

            for (ClassLearner classLearner : classLearners) {
                Class classroom = classService.getClassroomById(classLearner.getClassroom().getId());
                List<Assignment> assignments = assignmentRepository.getAssignmentByClassroomId(classroom.getId());

                List<Assignment> validAssignments = assignments.stream()
                        .filter(assignment -> assignment.getStart_date() != null)
                        .collect(Collectors.toList());

                for (Assignment assignment : validAssignments) {
                    String startdate = String.valueOf(assignment.getStart_date());
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.S");
                    LocalDateTime startdateTime = LocalDateTime.parse(startdate, formatter).truncatedTo(ChronoUnit.MINUTES);

                    LocalDateTime currentTime = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);
                    if (userSetting.getSetting().getId() == 7 && userSetting.getValue().equalsIgnoreCase("true") && !sentAssignStartDates.contains(startdateTime) && currentTime.isEqual(startdateTime) && classLearner.getStatus().equals("enrolled") && !assignment.is_draft()) {
                        sendAssignmentStartDateMail(userSetting, assignment, classroom);
                        sentAssignStartDates.add(startdateTime);

                    }
                }
            }
        }
    }

    private Set<LocalDateTime> sentTestDueDates = new HashSet<>();

    @Scheduled(fixedRate = 10000)
    public void sendTestDueDateMails() throws ResourceNotFroundException {
        List<UserSetting> userSettings = userSettingRepository.findAll();

        for (UserSetting userSetting : userSettings) {
            int userSettingId = userSetting.getId();
            List<ClassLearner> classLearners = classLearnerRepository.getClassLeanerByUserId(userSetting.getUser().getId());
            for (ClassLearner classLearner : classLearners) {
                if (userSetting.getSetting().getId() == 4) {
                    Class classroom = classService.getClassroomById(classLearner.getClassroom().getId());
                    List<Test> tests = testRepository.getTestByClassroomId(classroom.getId());

                    List<Test> validTests = tests.stream()
                            .filter(test -> test.getDue_date() != null)
                            .collect(Collectors.toList());

                    for (Test test : validTests) {
                        String duedate = String.valueOf(test.getDue_date());
                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.S");
                        LocalDateTime duedateTime = LocalDateTime.parse(duedate, formatter);
                        String getValue = userSetting.getValue();
                        if (getValue.equalsIgnoreCase("false")) {
                            continue;
                        }
                        try {
                            long hoursBeforeDueDate = Long.parseLong(userSetting.getValue());

                            LocalDateTime reminderTime = duedateTime.minusHours(hoursBeforeDueDate).truncatedTo(ChronoUnit.MINUTES);

                            LocalDateTime currentTime = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);
                            if (!sentTestDueDates.contains(duedateTime) && currentTime.isEqual(reminderTime) && classLearner.getStatus().equals("enrolled") && !test.is_draft()) {
                                sendTestDueDateMail(userSetting, test, classroom);
                                sentTestDueDates.add(duedateTime);
                            }
                        } catch (NumberFormatException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
    }

    private Set<LocalDateTime> sentTestStartDates = new HashSet<>();
    @Scheduled(fixedRate = 10000)
    public void sendTestStartDateMails() throws ResourceNotFroundException {
        List<UserSetting> userSettings = userSettingRepository.findAll();

        for (UserSetting userSetting : userSettings) {
            int userSettingId = userSetting.getId();
            List<ClassLearner> classLearners = classLearnerRepository.getClassLeanerByUserId(userSetting.getUser().getId());
            for (ClassLearner classLearner : classLearners) {
                Class classroom = classService.getClassroomById(classLearner.getClassroom().getId());
                List<Test> tests = testRepository.getTestByClassroomId(classroom.getId());

                List<Test> validTests = tests.stream()
                        .filter(test -> test.getStart_date() != null)
                        .collect(Collectors.toList());

                for (Test test : validTests) {
                    String startdate = String.valueOf(test.getStart_date());
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.S");
                    LocalDateTime startdateTime = LocalDateTime.parse(startdate, formatter).truncatedTo(ChronoUnit.MINUTES);

                    LocalDateTime currentTime = LocalDateTime.now().truncatedTo(ChronoUnit.MINUTES);
                    if (userSetting.getSetting().getId() == 8 & userSetting.getValue().equalsIgnoreCase("true") && !sentTestStartDates.contains(startdateTime) && currentTime.isEqual(startdateTime) && classLearner.getStatus().equals("enrolled") && !test.is_draft()) {
                        sendTestStartDateMail(userSetting, test, classroom);
                        sentTestStartDates.add(startdateTime);

                    }
                }
            }
        }
    }

}
