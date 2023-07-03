package com.capstone.project.service.impl;

import com.capstone.project.exception.DuplicateValueException;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.User;
import com.capstone.project.repository.UserRepository;
import com.capstone.project.service.UserService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;

    @Autowired
    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository, JavaMailSender mailSender) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.mailSender = mailSender;
    }

    @Override
    public User createUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new DuplicateValueException("Username already registered");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new DuplicateValueException("Email already registered");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String uniqueToken;
        while(true) {
            uniqueToken = UUID.randomUUID().toString();
            if(!userRepository.existsByToken(uniqueToken)) {
                break;
            }
        }
        user.setToken(uniqueToken);
        user.setStatus("pending");

        return userRepository.save(user);
    }

    @Override
    public List<String> findAllNameExcept(String username) {
        return userRepository.findAllNameExcept(username);
    }

    @Override
    public User getUserByUsername(String username) throws ResourceNotFroundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new ResourceNotFroundException("User not exist with username: " + username);
        }
        return user;
    }

    @Override
    public User updateUser(String username, User userDetails) throws ResourceNotFroundException, DuplicateValueException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new ResourceNotFroundException("User not exist with username: " + username);
        }

        user.setBio(userDetails.getBio());
        user.setDob(userDetails.getDob());
        user.setAvatar(userDetails.getAvatar());
        user.setAddress(userDetails.getAddress());
        user.setFirst_name(userDetails.getFirst_name());
        user.setLast_name(userDetails.getLast_name());
        user.setGender(userDetails.getGender());
        user.setPhone(userDetails.getPhone());
        user.setGender(userDetails.getGender());
        user.setStatus(userDetails.getStatus());
        user.setRole(userDetails.getRole());

        User updateUser = userRepository.save(user);
        return updateUser;
    }

    @Override
    public Boolean banUser(String username) throws ResourceNotFroundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new ResourceNotFroundException("User not exist with username: " + username);
        }
        user.setStatus("banned");
        user.setBanned_date(new Date());
        userRepository.save(user);
        return true;
    }

    @Override
    public Boolean deleteUser(String username) throws ResourceNotFroundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new ResourceNotFroundException("User not exist with username: " + username);
        }
        user.setStatus("deleted");
        user.setDeleted_date(new Date());
        userRepository.save(user);
        return true;
    }

    @Override
    public Boolean recoverUser(String username) throws ResourceNotFroundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new ResourceNotFroundException("User not exist with username: " + username);
        }
        Date today = new Date();
        Date banned_date = user.getBanned_date();
        if(banned_date != null) {
            long diffInMillis = today.getTime() - banned_date.getTime();
            long diffInDays = diffInMillis / (24 * 60 * 60 * 1000);
            if(diffInDays<=7) {
                user.setStatus("banned");
                userRepository.save(user);
                return false;
            } else {
                user.setStatus("active");
                userRepository.save(user);
                return true;
            }
        } else {
            user.setStatus("active");
            userRepository.save(user);
            return true;
        }
    }

    @Override
    public Boolean verifyAccount(String token) throws ResourceNotFroundException {
        User user = userRepository.findUserByToken(token);
        if (user == null) {
            throw new ResourceNotFroundException("User not exist with token: " + token);
        }
        user.setStatus("active");
        userRepository.save(user);
        return true;
    }

    @Override
    public Boolean sendVerificationEmail(String username) throws ResourceNotFroundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new ResourceNotFroundException("User not exist with token: " + username);
        }
        try {
            // for current version only
            String siteURL = "http://localhost:8080/api/v1/";

            // end of current version
            String toAddress = user.getEmail();
            String fromAddress = "nihongolevelup.box@gmail.com";
            String senderName = "NihongoLevelUp";
//            String subject = "Please verify your registration";
//            String content = "Dear [[name]],<br>"
//                    + "We hope this message finds you well.<br>"
//                    + "We would like to kindly request that you please follow the link provided below to verify your registration: "
//                    + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
//                    + "Thank you for taking the time to complete this important step. If you have any questions or concerns, please do not hesitate to contact us.:<br>"
//                    + "Thank you,<br>"
//                    + "The NihongoLevelUp Team";

            String subject = "Confirm Your Registration with NihongoLevelUp";
            String content = "Dear [[name]],<br><br>"
                    + "Thank you for registering for a NihongoLevelUp account. To complete your registration, please click the button below to verify your email address: "
                    + "<a href=\"[[URL]]\" style=\"display:inline-block;background-color:#3399FF;color:#FFF;padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:bold;\" target=\"_blank\">Verify Email</a><br><br>"
                    + "Thank you for choosing NihongoLevelUp! If you have any questions or concerns, please do not hesitate to contact us.<br><br>"
                    + "Best regards,<br>"
                    + "NihongoLevelUp Team";

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(fromAddress, senderName);
            helper.setTo(toAddress);
            helper.setSubject(subject);

            content = content.replace("[[name]]", user.getFirst_name() + " " + user.getLast_name());

            String verifyURL = siteURL + "verify?token=" + user.getToken();
            content = content.replace("[[URL]]", verifyURL);

            helper.setText(content, true);

            mailSender.send(message);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    @Override
    public Boolean resetPassword(String username, String pin, String password) throws ResourceNotFroundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new ResourceNotFroundException("User not exist with username: " + username);
        }
        if (user.getPin().equals(pin)) {
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Boolean sendResetPasswordEmail(String username) throws ResourceNotFroundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            user = userRepository.findUserByEmail(username);
            if(user == null) {
                throw new ResourceNotFroundException("User not exist with username or email: " + username);
            }
        }
        try {
            // for current version only
            String siteURL = "http://localhost:3000/";

            // end of current version
            String toAddress = user.getEmail();
            String fromAddress = "nihongolevelup.box@gmail.com";
            String senderName = "NihongoLevelUp";

            String subject = "Reset Your Password with NihongoLevelUp";
            String content = "Dear [[name]],<br><br>"
                    + "<p>We have received a request to reset your password for your NihongoLevelUp account. To proceed with resetting your password, please click the button below:</p>"
                    + "<a href=\"[[URL]]\" style=\"display:inline-block;background-color:#3399FF;color:#FFF;padding:10px 20px;text-decoration:none;border-radius:5px;font-weight:bold;\" target=\"_blank\">Reset Password</a><br><br>"
                    + "If you did not initiate this request, please ignore this email. Otherwise, please use the link above to update your password.<br><br>"
                    + "Thank you,<br>"
                    + "NihongoLevelUp Team";

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(fromAddress, senderName);
            helper.setTo(toAddress);
            helper.setSubject(subject);


            content = content.replace("[[name]]", user.getFirst_name() + " " + user.getLast_name());

            // pin update
            String pin = UUID.randomUUID().toString();
            user.setPin(pin);
            userRepository.save(user);
            // end of pin update

            String resetURL = siteURL + "reset-password?username=" + username +  "&pin=" + user.getPin();
            content = content.replace("[[URL]]", resetURL);

            helper.setText(content, true);

            mailSender.send(message);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean checkMatchPassword(String username, String checkPassword) throws ResourceNotFroundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new ResourceNotFroundException("User not exist with username:" + username);
        }
        if(passwordEncoder.matches(checkPassword, user.getPassword())) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Boolean changePassword(String username, String password) throws ResourceNotFroundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new ResourceNotFroundException("User not exist with token: " + username);
        }
        try {
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }

    }
}
