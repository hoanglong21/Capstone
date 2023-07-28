package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Setting;
import com.capstone.project.model.User;
import com.capstone.project.model.UserSetting;
import com.capstone.project.repository.UserRepository;
import com.capstone.project.repository.UserSettingRepository;
import com.capstone.project.service.UserSettingService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

import com.capstone.project.util.UserSettingValidation;

@Service
public class UserSettingServiceImpl implements UserSettingService {

    private final JavaMailSender mailSender;

    private final UserSettingRepository userSettingRepository;

    @Autowired
    private UserRepository userRepository;

    public UserSettingServiceImpl(JavaMailSender mailSender, UserSettingRepository userSettingRepository) {
        this.mailSender = mailSender;
        this.userSettingRepository = userSettingRepository;
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
//        User user = userRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFroundException("User not exist with id: " + id));

        List<UserSetting> customUserSettings = userSettingRepository.getByUserId(id);
        Map<String, String> customMap = new HashMap<>();
        for (UserSetting userSetting : customUserSettings) {
            String settingTitle = userSetting.getSetting().getTitle();
            String settingValue = userSetting.getValue();
            customMap.put(settingTitle, settingValue);
        }

        Map<String, String> userSettingMap = new HashMap<>();
        userSettingMap.put("study reminder", "07:00");
        userSettingMap.put("language", "vn");
        userSettingMap.put("assignment due date reminder", "24");
        userSettingMap.put("test due date reminder", "24");
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
        if(newValue==null || newValue.equals("")) {
            userSettingRepository.delete(userSetting);
            return null;
        }
        switch (settingId) {
            case 1:
                if (!UserSettingValidation.isValidTimeFormat(newValue)) {
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
                if (!UserSettingValidation.isValidInteger(newValue)) {
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

    public void sendStudyReminderMail(UserSetting userSetting) {
        try {
            String toAddress = userSetting.getUser().getEmail();
            String fromAddress = "nihongolevelup.box@gmail.com";
            String senderName = "NihongoLevelUp";

            String subject = "[NihongoLevelUp]: Time to study";
            String content = "Dear [[name]],<br><br>"
                    + "It's time to study, don't lose your momentum. Join with us and study new things  "
                    + "<a href=\"[[URL]]\" style=\"display:inline-block;background-color:#3399FF;color:#FFF;padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:bold;\" target=\"_blank\">Start Studying</a><br><br>"
                    + "Thank you for choosing NihongoLevelUp! If you have any questions or concerns, please do not hesitate to contact us.<br><br>"
                    + "Best regards,<br>"
                    + "NihongoLevelUp Team";

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(fromAddress, senderName);
            helper.setTo(toAddress);
            helper.setSubject(subject);

            content = content.replace("[[name]]", userSetting.getUser().getUsername());

            String URL = "https://www.nihongolevelup.com";
            content = content.replace("[[URL]]", URL);

            helper.setText(content, true);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private Map<Integer, Boolean> userSettingMailSent = new HashMap<>();
    @Scheduled(fixedRate = 60000)
    public void sendStudyReminderMails() {
        List<UserSetting> userSettings = userSettingRepository.findAll();

        for (UserSetting userSetting : userSettings) {
            int userSettingId = userSetting.getId();
            String studytime = userSetting.getValue();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime dateTime = LocalDateTime.parse(studytime, formatter);
            if (userSetting.getSetting().getId() == 1 && !userSettingMailSent.getOrDefault(userSettingId, false)) {
                if (isDateTimeReached(dateTime)) {
                    sendStudyReminderMail(userSetting);
                    userSettingMailSent.put(userSettingId, true);
                }
            }
        }
    }


    private boolean isDateTimeReached(LocalDateTime dateTime) {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        return now.isEqual(dateTime) || now.isAfter(dateTime);
    }
}
