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

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JavaMailSender mailSender;

    @Override
    public User createUser(User user) {
        if (user.getEmail()==null||user.getEmail().equals("")) {
            // TODO need test
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
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
    public User getUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public User updateUser(String username, User userDetails) {
        User user = null;
        try {
            user = userRepository.findUserByUsername(username);
            if (user == null) {
                throw new ResourceNotFroundException("Studyset not exist with username:" + username);
            }
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        user.setEmail(userDetails.getEmail());
        user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
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
    public Boolean banUser(String username) {
        User user = null;
        try {
            user = userRepository.findUserByUsername(username);
            if (user == null) {
                throw new ResourceNotFroundException("Studyset not exist with username:" + username);
            }
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
            return false;
        }
        user.setStatus("banned");
        user.setBanned_date(new Date());
        userRepository.save(user);
        return true;
    }

    @Override
    public Boolean deleteUser(String username) {
        User user = null;
        try {
            user = userRepository.findUserByUsername(username);
            if (user == null) {
                throw new ResourceNotFroundException("Studyset not exist with username:" + username);
            }
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
            return false;
        }
        user.setStatus("deleted");
        user.setDeleted_date(new Date());
        userRepository.save(user);
        return true;
    }

    @Override
    public Boolean recoverUser(String username) {
        User user;
        try {
            user = userRepository.findUserByUsername(username);
            if (user == null) {
                throw new ResourceNotFroundException("Studyset not exist with username:" + username);
            }
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
            return false;
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
    public Boolean verifyAccount(String token) {
        User user = userRepository.findUserByToken(token);
        if (user != null) {
            // mark account as verified and log user in
            user.setStatus("active");
            userRepository.save(user);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Boolean sendVerificationEmail(String username) {
        try {
            User user = userRepository.findUserByUsername(username);
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
    public Boolean resetPassword(String username, String pin, String password) {
        User user = userRepository.findUserByUsername(username);
        if (user != null && user.getPin().equals(pin)) {
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Boolean sendResetPasswordEmail(String username) {
        try {
            User user = userRepository.findUserByUsername(username);
            // for current version only
            String siteURL = "http://localhost:3000/";

            // end of current version
            String toAddress = user.getEmail();
            String fromAddress = "nihongolevelup.box@gmail.com";
            String senderName = "NihongoLevelUp";

            String subject = "Reset Your Password with NihongoLevelUp";
            String content = "Dear [[name]],<br><br>"
                    + "We have received a request to reset your password for your NihongoLevelUp account. To proceed with resetting your password, please click the button below:"
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

            String resetURL = siteURL + "reset?username=" + username +  "&pin=" + user.getPin();
            content = content.replace("[[URL]]", resetURL);

            helper.setText(content, true);

            mailSender.send(message);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
