package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.repository.*;
import com.capstone.project.service.AssignmentService;
import com.capstone.project.service.ClassService;
import com.capstone.project.service.UserService;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AssignmentServiceImpl implements AssignmentService {

    @PersistenceContext
    private EntityManager em;

    private final JavaMailSender mailSender;

    private final AssignmentRepository assignmentRepository;
    private final SubmissionRepository submissionRepository;
    private final UserSettingRepository userSettingRepository;
    private final CommentRepository commentRepository;
    private final AttachmentRepository attachmentRepository;
    private final ClassLearnerRepository classLearnerRepository;

    private final UserService userService;
    private final ClassService classService;

    @Autowired
    public AssignmentServiceImpl(JavaMailSender mailSender, AssignmentRepository assignmentRepository, SubmissionRepository submissionRepository, UserSettingRepository userSettingRepository, CommentRepository commentRepository, AttachmentRepository attachmentRepository, ClassLearnerRepository classLearnerRepository, UserService userService, ClassService classService) {
        this.mailSender = mailSender;
        this.assignmentRepository = assignmentRepository;
        this.submissionRepository = submissionRepository;
        this.userSettingRepository = userSettingRepository;
        this.commentRepository = commentRepository;
        this.attachmentRepository = attachmentRepository;
        this.classLearnerRepository = classLearnerRepository;
        this.userService = userService;
        this.classService = classService;
    }

    public static Date localDateTimeToDate(LocalDateTime localDateTime) {
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }


    @Override
    public List<Assignment> getAllAssignment() {
        return assignmentRepository.findAll();
    }

    @Override
    public List<Assignment> getAllAssignmentByClassId(int id) {
        return assignmentRepository.getAssignmentByClassroomId(id);
    }

    @Override
    public Assignment createAssignment(Assignment assignment) throws ResourceNotFroundException {
        LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
//        Date date = localDateTimeToDate(localDateTime);
//        assignment.setCreated_date(date);
//        if (assignment.getStart_date() != null && assignment.getCreated_date() != null &&
//                assignment.getStart_date().before(assignment.getCreated_date())) {
//            throw new ResourceNotFroundException("Start date must be >= created date");
//        }
        Assignment savedAssignment = assignmentRepository.save(assignment);

        List<ClassLearner> classLearners = classLearnerRepository.getClassLeanerByClassroomId(savedAssignment.getClassroom().getId());
        for (ClassLearner classLearner : classLearners) {
            List<UserSetting> userSettings = userSettingRepository.getByUserId(classLearner.getUser().getId());
            for (UserSetting userSetting : userSettings) {
                if (classLearner.getStatus().equals("enrolled") && userSetting.getSetting().getId() == 7 && !assignment.is_draft()) {
                    sendAssignmentCreatedEmail(classLearner, savedAssignment);
                }
            }
        }
        return savedAssignment;
    }


    public void sendAssignmentCreatedEmail(ClassLearner classLearner, Assignment assignment) {
        String subject = null;
        String content = null;
        try {
            String toAddress = classLearner.getUser().getEmail();
            String fromAddress = "nihongolevelup.box@gmail.com";
            String senderName = "NihongoLevelUp";

                subject = "[NihongoLevelUp]: New Assignment assigned ";
                content = "Hi [[name]],<br><br>"
                            + "New assignment << " + assignment.getTitle() + " >> has been assigned in your class << " + classLearner.getClassroom().getClass_name() + " >>. Don't forget to do !<br><br>"
                        + "<a href=\"[[URL]]\" style=\"display:inline-block;background-color:#3399FF;color:#FFF;padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:bold;\" target=\"_blank\">Do Assignment</a><br><br>"
                        + "Thank you for choosing NihongoLevelUp! If you have any questions or concerns, please do not hesitate to contact us.<br><br>"
                        + "Best regards,<br>"
                        + "NihongoLevelUp Team";

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(fromAddress, senderName);
            helper.setTo(toAddress);
            helper.setSubject(subject);

            content = content.replace("[[name]]", classLearner.getUser().getUsername());

            String URL = "https://www.nihongolevelup.com";
            content = content.replace("[[URL]]", URL);

            helper.setText(content, true);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Assignment getAssignmentById(int id) throws ResourceNotFroundException {
        Assignment assignment = assignmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Assignment not exist with id:" + id));
        return assignment;
    }

    @Override
    public Assignment updateAssignment(int id, Assignment assignment) throws ResourceNotFroundException {
        Assignment existingAssignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Assignment does not exist with id: " + id));

        LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        Date date = localDateTimeToDate(localDateTime);
        existingAssignment.setInstruction(assignment.getInstruction());
        existingAssignment.setDue_date(assignment.getDue_date());
        existingAssignment.setModified_date(date);
        existingAssignment.setStart_date(assignment.getStart_date());
        existingAssignment.setTitle(assignment.getTitle());
        existingAssignment.set_draft(assignment.is_draft());


        return assignmentRepository.save(existingAssignment);
    }

    @Override
    public Boolean deleteAssignment(int id) throws ResourceNotFroundException {
        Assignment assignmentclass = assignmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Assignment not exist with id:" + id));
        for (Submission submission : submissionRepository.getSubmissionByAssignmentId(assignmentclass.getId())) {
            for (Attachment attachment : attachmentRepository.getAttachmentBySubmissionId(submission.getId())) {
                attachmentRepository.delete(attachment);
            }
            for(Comment commentroot : commentRepository.getCommentBySubmissionId(submission.getId())){
                for(Comment comment : commentRepository.getCommentByRootId(commentroot.getId())){
                    commentRepository.delete(comment);
                }
                commentRepository.delete(commentroot);
            }
            submissionRepository.delete(submission);
        }
        for (Attachment attachment : attachmentRepository.getAttachmentByAssignmentId(assignmentclass.getId())) {
            attachmentRepository.delete(attachment);
        }
        for(Comment commentroot : commentRepository.getCommentByAssignmentId(assignmentclass.getId())){
            for(Comment comment : commentRepository.getCommentByRootId(commentroot.getId())){
                commentRepository.delete(comment);
            }
            commentRepository.delete(commentroot);

        }
        assignmentRepository.delete(assignmentclass);
        return true;
    }

    @Override
    public Map<String, Object> getFilterAssignment(String search, String author, String fromStart, String toStart,String fromCreated, String toCreated,
                                                   Boolean isDraft,String direction,String sortBy,int classid ,int page, int size) throws Exception {
        if(page<=0 || size<=0) {
            throw new Exception("Please provide valid page and size");
        }
        int offset = (page - 1) * size;

        String query ="SELECT a.*, COUNT(CASE WHEN s.is_done = true THEN 1 ELSE NULL END) as numbersubmit,u.id as userid, u.username as author FROM assignment a \n" +
                "LEFT JOIN user u on u.id = a.author_id \n" +
                "LEFT JOIN submission s on s.assignment_id = a.id\n" +
                "GROUP BY a.id,u.username HAVING 1=1";

        Map<String, Object> parameters = new HashMap<>();

        if (author != null && !author.isEmpty()) {
            query += " AND u.username = :authorname";
            parameters.put("authorname", author);
        }

        if (search != null && !search.isEmpty()) {
            query += " AND (a.title LIKE :search OR a.instruction LIKE :search)";
            parameters.put("search", "%" + search + "%");
        }

        if (classid != 0) {
            query += " AND a.class_id = :classId";
            parameters.put("classId", classid);
        }

        if (isDraft != null) {
            query += " AND a.is_draft = :isDraft";
            parameters.put("isDraft", isDraft);
        }

        if(fromStart != null){
            query += " AND a.start_date >= :from ";
            parameters.put("from", fromStart);
        }

        if(toStart != null){
            query += " AND a.start_date <= :to";
            parameters.put("to", toStart);
        }


        if (fromCreated != null && !fromCreated.equals("")) {
            query += " AND DATE(a.created_date) >= :fromCreated";
            parameters.put("fromCreated", fromCreated);
        }
        if (toCreated != null && !toCreated.equals("")) {
            query += " AND DATE(a.created_date) <= :toCreated";
            parameters.put("toCreated", toCreated);
        }

        query += " ORDER BY " + sortBy + " " + direction;

        Query q = em.createNativeQuery(query, Assignment.class);
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            q.setParameter(entry.getKey(), entry.getValue());
        }

        int totalItems = q.getResultList().size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        q.setFirstResult(offset);
        q.setMaxResults(size);

        List<Assignment> resultList = q.getResultList();

        Map<String, Object> response = new HashMap<>();
        response.put("list", resultList);
        response.put("currentPage", page);
        response.put("totalPages", totalPages);
        response.put("totalItems", totalItems);

        return response;
    }

    @Override
    public Map<String, Object> getNumSubmitAssignment(int assignmentid, int classid) throws ResourceNotFroundException {
        String query ="SELECT  COALESCE(COUNT(DISTINCT CASE WHEN cl.status = 'enrolled' AND s.is_done = true THEN cl.user_id END), 0) AS submitted,\n" +
                "    COALESCE(COUNT(DISTINCT CASE WHEN cl.status = 'enrolled' AND (s.is_done = false OR s.is_done IS NULL) THEN cl.user_id END), 0) AS notsubmitted\n" +
                "FROM class_learner cl\n" +
                "LEFT JOIN assignment a ON cl.class_id = a.class_id ";

        Map<String, Object> parameters = new HashMap<>();

        if (assignmentid != 0) {
            assignmentRepository.findById(assignmentid);
            query += " LEFT JOIN  submission s ON a.id = s.assignment_id AND s.author_id = cl.user_id where a.id = :assignmentId ";
            parameters.put("assignmentId", assignmentid);
        }

        if (classid != 0) {
            query += " AND cl.class_id = :classId";
            parameters.put("classId", classid);
        }

        Query q = em.createNativeQuery(query);
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            q.setParameter(entry.getKey(), entry.getValue());
        }

        Object[] result = (Object[]) q.getSingleResult();

        Long submittedCount = ((Number) result[0]).longValue();
        Long notSubmittedCount = ((Number) result[1]).longValue();

        Map<String, Object> response = new HashMap<>();
        response.put("submitted", submittedCount);
        response.put("notsubmitted", notSubmittedCount);

        return response;
    }


}

