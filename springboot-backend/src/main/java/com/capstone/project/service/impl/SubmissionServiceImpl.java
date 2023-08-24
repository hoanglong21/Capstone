package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.repository.*;
import com.capstone.project.service.SubmissionService;
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
import java.util.*;

@Service
public class SubmissionServiceImpl implements SubmissionService {

    @PersistenceContext
    private EntityManager em;

    private final JavaMailSender mailSender;
    private final SubmissionRepository submissionRepository;
    private final ClassLearnerRepository classLearnerRepository;
    private final UserSettingRepository userSettingRepository;

    private final AttachmentRepository attachmentRepository;
    private final CommentRepository commentRepository;

    public static Date localDateTimeToDate(LocalDateTime localDateTime) {
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }


    @Autowired
    public SubmissionServiceImpl(JavaMailSender mailSender, SubmissionRepository submissionRepository, ClassLearnerRepository classLearnerRepository, UserSettingRepository userSettingRepository, AttachmentRepository attachmentRepository, CommentRepository commentRepository) {
        this.mailSender = mailSender;
        this.submissionRepository = submissionRepository;
        this.classLearnerRepository = classLearnerRepository;
        this.userSettingRepository = userSettingRepository;
        this.attachmentRepository = attachmentRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public List<Submission> getAllSubmissionByAssignmentId(int id) {
        return submissionRepository.getSubmissionByAssignmentId(id);
    }




    @Override
    public List<Submission> getAllSubmission() {
        return submissionRepository.findAll();
    }


    @Override
    public Submission createSubmission(Submission submission) {
        LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        Date date = localDateTimeToDate(localDateTime);
        submission.setCreated_date(date);

        Submission savedSubmission = submissionRepository.save(submission);

            return savedSubmission;
    }

    @Override
    public Submission getSubmissionById(int id) throws ResourceNotFroundException {
        Submission submission = submissionRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Submission not exist with id:" + id));
        return submission;
    }

    @Override
    public Submission getByAuthorIdandAssignmentId(int authorid, int assignmentid) {
        Submission submission = submissionRepository.getByUserIdAndAssignmentId(authorid,assignmentid);
        return submission;
    }

    @Override
    public Submission updateSubmission(int id, Submission submission) throws ResourceNotFroundException {
        Submission existingSubmission = submissionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Submission does not exist with id: " + id));
        LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        Date date = localDateTimeToDate(localDateTime);

        Double existingMark = existingSubmission.getMark();
        Double newMark = submission.getMark();

        if ((existingMark == null && newMark != null) || (existingMark != null && Double.compare(existingMark, newMark) != 0)) {
            List<ClassLearner> classLearners = classLearnerRepository.getClassLeanerByClassroomId(existingSubmission.getAssignment().getClassroom().getId());
            for (ClassLearner classLearner : classLearners) {
                List<UserSetting> userSettings = userSettingRepository.getByUserId(classLearner.getUser().getId());
                for (UserSetting userSetting : userSettings) {
                    if (classLearner.getStatus().equals("enrolled") && userSetting.getSetting().getId() == 9 && userSetting.getValue().equalsIgnoreCase("true") && existingSubmission.is_done()) {
                        sendSubmissionGradedEmail(classLearner, existingSubmission);
                    }
                }
            }
        }
        existingSubmission.setDescription(submission.getDescription());
        existingSubmission.setModified_date(date);
        existingSubmission.setMark(submission.getMark());
        existingSubmission.set_done(submission.is_done());

        return submissionRepository.save(existingSubmission);
    }

    public void sendSubmissionGradedEmail(ClassLearner classLearner, Submission submission) {
        String subject = null;
        String content = null;
        try {
            String toAddress = classLearner.getUser().getEmail();
            String fromAddress = "nihongolevelup.box@gmail.com";
            String senderName = "NihongoLevelUp";

            subject = "[NihongoLevelUp]: Submission graded ";
            content = "Hi [[name]],<br><br>"
                    + "Your submission in assignment << " + submission.getAssignment().getTitle() + " >>  in class << " + classLearner.getClassroom().getClass_name() + " >> has been upgraded ! Let's check it out !<br><br>"
//                    + "<a href=\"[[URL]]\" style=\"display:inline-block;background-color:#3399FF;color:#FFF;padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:bold;\" target=\"_blank\">Do Assignment</a><br><br>"
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
    public Boolean deleteSubmission(int id) throws ResourceNotFroundException {
        Submission submission  = submissionRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Submission not exist with id:" + id));
            for (Attachment attachment : attachmentRepository.getAttachmentBySubmissionId(submission.getId())) {
                attachmentRepository.delete(attachment);
            }
        for(Comment commentsub : commentRepository.getCommentBySubmissionId(submission.getId())){
            deleteCommentAndChildren(commentsub);
        }
         submissionRepository.delete(submission);
        return true;
    }

    private void deleteCommentAndChildren(Comment comment) {
        List<Comment> nestedComments = commentRepository.getCommentByRootId(comment.getId());

        for (Comment nestedComment : nestedComments) {
            deleteCommentAndChildren(nestedComment);
        }

        commentRepository.delete(comment);
    }

    @Override
    public Map<String, Object> getFilterSubmission(String search, int authorId,int assignmentId,Boolean isDone, double mark, String from, String to, String direction, int page, int size) throws ResourceNotFroundException {
        int offset = (page - 1) * size;

        String query ="SELECT * FROM submission WHERE 1=1";

        Map<String, Object> parameters = new HashMap<>();


        if (search != null && !search.isEmpty()) {
            query += " AND description LIKE :search ";
            parameters.put("search", "%" + search + "%");
        }

        if (authorId != 0) {
            query += " AND author_id = :authorId";
            parameters.put("authorId", authorId);
        }

        if (assignmentId != 0) {
            query += " AND assignment_id = :assignmentId";
            parameters.put("assignmentId", assignmentId);
        }

        if (isDone != null) {
            query += " AND is_done = :isDone";
            parameters.put("isDone", isDone);
        }

        if (mark != 0) {
            query += " AND mark = :mark";
            parameters.put("mark", mark);
        }

        if (from != null) {
            query += " AND created_date >= :from";
            parameters.put("from", from);
        }
        if (to != null) {
            query += " AND created_date <= :to";
            parameters.put("to", to);
        }

        String direct = "desc";
        if(direction != null && !direction.isEmpty()){
            if (direction.equalsIgnoreCase("asc")) {
                direct = "asc";
            }
        }
        query += " ORDER BY created_date " + " " + direct;

        Query q = em.createNativeQuery(query, Submission.class);
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            q.setParameter(entry.getKey(), entry.getValue());
        }

        int markLessThan5Count = 0;
        int markBetween5And8Count = 0;
        int markGreaterThan8Count = 0;

        int totalItems = q.getResultList().size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        q.setFirstResult(offset);
        q.setMaxResults(size);


        List<Submission> resultList = q.getResultList();

        for (Submission submission : resultList) {
            double submissionMark = submission.getMark();
            if (submissionMark < 5) {
                markLessThan5Count++;
            } else if (submissionMark >= 5 && submissionMark <= 8) {
                markBetween5And8Count++;
            } else if (submissionMark > 8) {
                markGreaterThan8Count++;
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("markLessThan5Count", markLessThan5Count);
        response.put("markBetween5And8Count", markBetween5And8Count);
        response.put("markGreaterThan8Count", markGreaterThan8Count);
        response.put("list", resultList);
        response.put("currentPage", page);
        response.put("totalPages", totalPages);
        response.put("totalItems", totalItems);

        return response;
    }


}
