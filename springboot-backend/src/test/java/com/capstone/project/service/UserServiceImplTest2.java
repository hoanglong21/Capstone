package com.capstone.project.service;

import com.capstone.project.exception.DuplicateValueException;
import com.capstone.project.model.User;
import com.capstone.project.repository.UserRepository;
import com.capstone.project.service.impl.UserServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserServiceImplTest2 {

    // For stub
    @Mock
    private UserRepository userRepository;


    @Mock
    private PasswordEncoder passwordEncoder;

    // For actual test
    @InjectMocks
    private UserServiceImpl userServiceImpl;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    @Order(1)
    void testCreateUser() {
        User user = User.builder()
                .first_name("hoang")
                .last_name("long")
                .email("long9999@gmail.com")
                .username("long9999")
                .role("ROLE_LEARNER")
                .phone("0352269303")
                .password("123456")
                .build();

        when(userRepository.existsByUsername(any())).thenReturn(false);
        when(userRepository.existsByEmail(any())).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(user);

        // actual test
        User createdUser = userServiceImpl.createUser(user);

        assertEquals(user.getUsername(), createdUser.getUsername());
        assertEquals(passwordEncoder.encode(user.getPassword()), createdUser.getPassword());
        assertEquals(user.getEmail(), createdUser.getEmail());
        assertEquals(user.getFirst_name(), createdUser.getFirst_name());
        assertEquals(user.getLast_name(), createdUser.getLast_name());
        assertEquals(user.getRole(), createdUser.getRole());
        assertEquals(user.getPhone(), createdUser.getPhone());
    }

    @Test
    @Order(2)
    void testCreateUserWithDuplicateUsername() {
        User user = User.builder()
                .first_name("hoang")
                .last_name("long")
                .email("long9999@gmail.com")
                .username("long9999")
                .role("ROLE_LEARNER")
                .phone("0352269303")
                .password("123456")
                .build();

        when(userRepository.existsByUsername("long9999")).thenReturn(true);
        try {
            userServiceImpl.createUser(user);
        } catch (DuplicateValueException e) {
            // assert here
            assertEquals("Username already registered", e.getMessage());
        }
    }

    @Test
    @Order(3)
    void testCreateUserWithDuplicateEmail() {
        User user = User.builder()
                .first_name("hoang")
                .last_name("long")
                .email("long9999@gmail.com")
                .username("long9999")
                .role("ROLE_LEARNER")
                .phone("0352269303")
                .password("123456")
                .build();

        when(userRepository.existsByUsername(any())).thenReturn(false);
        when(userRepository.existsByEmail(any())).thenReturn(true);

        try {
            userServiceImpl.createUser(user);
        } catch (DuplicateValueException e) {
            // assert here
            assertEquals("Email already registered", e.getMessage());
        }
    }

    @Test
    @Order(4)
    void testFindAllNameExcept() {
        List<String> names = new ArrayList<>();
        names.add("Long1");
        names.add("Long2");

        when(userRepository.findAllNameExcept("Long9999")).thenReturn(names);

        List<String> result = userServiceImpl.findAllNameExcept("Long9999");
        assertEquals(names, result);
    }

    @Test
    @Order(5)
    void testGetUserByUsername() {
        User user = User.builder()
                .username("long")
                .first_name("Hoang")
                .last_name("Long")
                .gender("Male")
                .dob(new Date())
                .email("long@gmail.com")
                .phone("0352269303")
                .password("123456")
                .role("ROLE_LEARNER")
                .address("HN")
                .bio("Swag")
                .status("active")
                .avatar("avatar.jpg")
                .build();

        when(userRepository.findUserByUsername("long")).thenReturn(user);

        User result = userServiceImpl.getUserByUsername("long");

        assertThat(user.getUsername()).isEqualTo(result.getUsername());
        assertThat(user.getFirst_name()).isEqualTo(result.getFirst_name());
        assertThat(user.getLast_name()).isEqualTo(result.getLast_name());
        assertThat(user.getGender()).isEqualTo(result.getGender());
        assertThat(user.getDob()).isEqualTo(result.getDob());
        assertThat(user.getEmail()).isEqualTo(result.getEmail());
        assertThat(user.getPhone()).isEqualTo(result.getPhone());
        assertThat(user.getPassword()).isEqualTo(result.getPassword());
        assertThat(user.getRole()).isEqualTo(result.getRole());
        assertThat(user.getAddress()).isEqualTo(result.getAddress());
        assertThat(user.getBio()).isEqualTo(result.getBio());
        assertThat(user.getStatus()).isEqualTo(result.getStatus());
        assertThat(user.getAvatar()).isEqualTo(result.getAvatar());
    }

    @Test
    @Order(6)
    void testUpdateUser() {
        User user = User.builder()
                .username("long")
                .first_name("Hoang")
                .last_name("Long")
                .gender("Male")
                .dob(new Date())
                .email("long@gmail.com")
                .phone("0352269303")
                .password("123456")
                .role("ROLE_LEARNER")
                .address("HN")
                .bio("Swag")
                .status("active")
                .avatar("avatar.jpg")
                .build();


        User userDetails = User.builder()
                .username("long")
                .first_name("Hoangnew")
                .last_name("Longnew")
                .gender("Female")
                .dob(new Date())
                .email("longnew@gmail.com")
                .phone("0352269304")
                .password("1234567")
                .role("ROLE_TUTOR")
                .address("HN1")
                .bio("Swagnew")
                .status("deleted")
                .avatar("avatarnew.jpg")
                .build();


        when(userRepository.findUserByUsername("long")).thenReturn(user);
        when(userRepository.save(any(User.class))).thenReturn(userDetails);

        User updatedUser = userServiceImpl.updateUser("long", userDetails);

        assertThat(updatedUser.getUsername()).isEqualTo(userDetails.getUsername());
        assertThat(updatedUser.getFirst_name()).isEqualTo(userDetails.getFirst_name());
        assertThat(updatedUser.getLast_name()).isEqualTo(userDetails.getLast_name());
        assertThat(updatedUser.getGender()).isEqualTo(userDetails.getGender());
        assertThat(updatedUser.getDob()).isEqualTo(userDetails.getDob());
        assertThat(updatedUser.getEmail()).isEqualTo(userDetails.getEmail());
        assertThat(updatedUser.getPhone()).isEqualTo(userDetails.getPhone());
        assertThat(updatedUser.getPassword()).isEqualTo(userDetails.getPassword());
        assertThat(updatedUser.getRole()).isEqualTo(userDetails.getRole());
        assertThat(updatedUser.getAddress()).isEqualTo(userDetails.getAddress());
        assertThat(updatedUser.getBio()).isEqualTo(userDetails.getBio());
        assertThat(updatedUser.getStatus()).isEqualTo(userDetails.getStatus());
        assertThat(updatedUser.getAvatar()).isEqualTo(userDetails.getAvatar());
    }

    @Test
    @Order(7)
    void testBanUser() {
        User user = User.builder()
                .username("long")
                .status("active")
                .banned_date(null)
                .build();

        when(userRepository.findUserByUsername("long")).thenReturn(user);

        Assertions.assertThat(userServiceImpl.banUser("long")).isTrue();
        Assertions.assertThat(user.getStatus()).isEqualTo("banned");
        Assertions.assertThat(user.getBanned_date()).isNotNull();
    }

    @Test
    @Order(8)
    void testDeleteUser() {
        User user = User.builder()
                .username("long")
                .status("active")
                .deleted_date(null)
                .build();

        when(userRepository.findUserByUsername("long")).thenReturn(user);

        Assertions.assertThat(userServiceImpl.deleteUser("long")).isTrue();
        Assertions.assertThat(user.getStatus()).isEqualTo("deleted");
        Assertions.assertThat(user.getDeleted_date()).isNotNull();
    }

    @Test
    @Order(9)
    void testRecoverUser() {
        User user = User.builder()
                .username("long")
                .status("banned")
                .banned_date(new Date(System.currentTimeMillis() - 6*24*60*60*1000)) // Set banned date to 6 days ago
                .build();


        when(userRepository.findUserByUsername("long")).thenReturn(user);

        Assertions.assertThat(userServiceImpl.recoverUser("long")).isFalse();

        user.setBanned_date(new Date(System.currentTimeMillis() - 8*24*60*60*1000)); // Set banned date to 8 days ago

        Assertions.assertThat(userServiceImpl.recoverUser("long")).isTrue();
        Assertions.assertThat(user.getStatus()).isEqualTo("active");

    }
}