package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Feedback;
import com.capstone.project.model.FeedbackType;
import com.capstone.project.model.User;
import com.capstone.project.repository.FeedbackRepository;
import com.capstone.project.repository.FeedbackTypeRepository;
import com.capstone.project.repository.UserRepository;
import com.capstone.project.service.FeedbackService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;
    private FeedbackTypeRepository feedbackTypeRepository;
    private final JavaMailSender mailSender;

    @Autowired
    public FeedbackServiceImpl(FeedbackRepository feedbackRepository, UserRepository userRepository, FeedbackTypeRepository feedbackTypeRepository, JavaMailSender mailSender) {
        this.feedbackRepository = feedbackRepository;
        this.userRepository = userRepository;
        this.feedbackTypeRepository = feedbackTypeRepository;
        this.mailSender = mailSender;
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @Override
    public Feedback createFeedback(Feedback feedback) {
        sendFeedbackEmail(feedback);
        return feedbackRepository.save(feedback);
    }

    @Override
    public Feedback getFeedbackById(int id) throws ResourceNotFroundException {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Feedback not exist with id: " + id));
        return feedback;
    }

    @Override
    public Feedback updateFeedback(int id, Feedback feedbackDetails) throws ResourceNotFroundException {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Feedback not exist with id: " + id));
        feedback.setTitle(feedbackDetails.getTitle());
        feedback.setContent(feedbackDetails.getContent());

        Feedback updateFeedback = feedbackRepository.save(feedback);
        return updateFeedback;
    }

    @Override
    public Boolean deleteFeedback(int id) throws ResourceNotFroundException {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Feedback not exist with id: " + id));
        feedbackRepository.delete(feedback);
        return true;
    }

    private void sendFeedbackEmail(Feedback feedback) {
        try {
            User user = userRepository.findUserById(feedback.getUser().getId());
            if (user == null) {
                throw new ResourceNotFroundException("User not found with id: " + feedback.getUser().getId());
            }
            FeedbackType feedbackType = feedbackTypeRepository.findById(feedback.getFeedbackType().getId())
                    .orElseThrow(() -> new ResourceNotFroundException("Feedback Type not found with id: " + feedback.getFeedbackType().getId()));

            String toAddress = user.getEmail();
            String fromAddress = "nihongolevelup.box@gmail.com";
            String senderName = "NihongoLevelUp";

            String subject = "Thank You for Your Feedback!";
            String content = "";
            if(feedback.getDestination().contains("/")) {
                content = "Dear [[name]],<br><br>"
                        + "Thank you for taking the time to provide us with your feedback. We really appreciate it!<br><br>"
                        + "We will carefully review your comments and suggestions regarding " + feedbackType.getName() + " to see how we can improve our services.<br><br>"
                        + "Here are the details of your feedback:<br><br>"
                        + "Title: " + feedback.getTitle() + "<br>"
                        + "Type: " + feedbackType.getName() + "<br>"
                        + "Content: " + feedback.getContent() + "<br>"
                        + "To: " + feedback.getDestination() + "<br><br>"
                        + "If you have any additional feedback or questions, please do not hesitate to contact us at nihongolevelup.box@gmail.com.<br><br>"
                        + "Best regards,<br>"
                        + "NihongoLevelUp Team";
            } else {
                content = "Dear [[name]],<br><br>"
                        + "Thank you for taking the time to provide us with your feedback. We really appreciate it!<br><br>"
                        + "We will carefully review your comments and suggestions to see how we can improve our services.<br><br>"
                        + "If you have any additional feedback or questions, please do not hesitate to contact us at nihongolevelup.box@gmail.com.<br><br>"
                        + "Best regards,<br>"
                        + "NihongoLevelUp Team";
            }

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(fromAddress, senderName);
            helper.setTo(toAddress);
            helper.setSubject(subject);

            content = content.replace("[[name]]", user.getFirst_name() + " " + user.getLast_name());

            helper.setText(content, true);

            mailSender.send(message);
        } catch (Exception e) {

        }
    }
}
