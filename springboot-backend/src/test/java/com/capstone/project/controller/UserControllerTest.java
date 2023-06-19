package com.capstone.project.controller;

import com.capstone.project.model.User;
import com.capstone.project.service.UserService;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserControllerTest {

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @Mock
    private UserService userService;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(new UserController(userService)).build();
    }

    @Order(1)
    @ParameterizedTest(name = "{index} => username={0}, first_name={1}, last_name={2}, gender={3}, dob={4}, email={5}," +
            " phone={6}, password={7}, role={8}, address={9}, bio={10}, status={11}, avatar={12}")
    @CsvSource({
            "long, Hoang, Long, Male, 2001-11-21, long@gmail.com, 0352269303, 123456, ROLE_LEARNER, HN, Swag, active, avatar.jpg",
            "tuyet, Nguyen, Tuyet, Female, 2001-09-27, tuyet@gmail.com, 0352269304, 123456, ROLE_ADMIN, HG, Hello, pending, avatar2.png"
    })
    void testGetUser(String username, String first_name, String last_name, String gender, String date, String email,
                     String phone, String password, String role, String address, String bio, String status, String avatar)
            throws Exception {
        // make stub
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        User user = User.builder()
                .username(username)
                .first_name(first_name)
                .last_name(last_name)
                .gender(gender)
                .dob(dateFormat.parse(date))
                .email(email)
                .phone(phone)
                .password(password)
                .role(role)
                .address(address)
                .bio(bio)
                .status(status)
                .avatar(avatar)
                .build();

        when(userService.getUserByUsername(username)).thenReturn(user);

        // test
        mockMvc.perform(get("/api/v1/users/{username}", username))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.username").value(user.getUsername()))
                .andExpect(jsonPath("$.first_name").value(user.getFirst_name()))
                .andExpect(jsonPath("$.last_name").value(user.getLast_name()))
                .andExpect(jsonPath("$.gender").value(user.getGender()))
                .andExpect(jsonPath("$.dob").value(user.getDob()))
                .andExpect(jsonPath("$.email").value(user.getEmail()))
                .andExpect(jsonPath("$.role").value(user.getRole()))
                .andExpect(jsonPath("$.phone").value(user.getPhone()))
                .andExpect(jsonPath("$.password").value(user.getPassword()))
                .andExpect(jsonPath("$.address").value(user.getAddress()))
                .andExpect(jsonPath("$.bio").value(user.getBio()))
                .andExpect(jsonPath("$.status").value(user.getStatus()))
                .andExpect(jsonPath("$.avatar").value(user.getAvatar()));
    }

    @Order(2)
    @ParameterizedTest(name = "{index} => username={0}, first_name={1}, last_name={2}, gender={3}, dob={4}, email={5}," +
            " phone={6}, password={7}, role={8}, address={9}, bio={10}, status={11}, avatar={12}")
    @CsvSource({
            "test_long, Hoang, Long, Male, 2001-11-21, test_long@gmail.com, 0352269303, 123456, ROLE_LEARNER, HN, Swag, active, avatar.jpg",
            "test_long, Hoang, Long, Male, 2001-11-21, test_long@gmail.com, 0352269303, 123456, ROLE_TUTOR, HB, Hello, pending, avatar2.jpg",
    })
    void testUpdateUser(String username, String first_name, String last_name, String gender, String date, String email,
                        String phone, String password, String role, String address, String bio, String status, String avatar)
            throws Exception {
        // make stub
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        User user = User.builder()
                .username(username)
                .first_name("Hoang")
                .last_name("Long")
                .gender("Male")
                .dob(dateFormat.parse("2001-11-11"))
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
                .username(username)
                .first_name(first_name)
                .last_name(last_name)
                .gender(gender)
                .dob(dateFormat.parse(date))
                .email(email)
                .phone(phone)
                .password(password)
                .role(role)
                .address(address)
                .bio(bio)
                .status(status)
                .avatar(avatar)
                .build();


        when(userService.getUserByUsername(username)).thenReturn(user);
        when(userService.updateUser(username, userDetails)).thenReturn(userDetails);

        // test
        mockMvc.perform(put("/api/v1/users/{username}", username)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDetails)))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(jsonPath("$.username").value(userDetails.getUsername()))
                    .andExpect(jsonPath("$.first_name").value(userDetails.getFirst_name()))
                    .andExpect(jsonPath("$.last_name").value(userDetails.getLast_name()))
                    .andExpect(jsonPath("$.gender").value(userDetails.getGender()))
                    .andExpect(jsonPath("$.dob").value(userDetails.getDob()))
                    .andExpect(jsonPath("$.email").value(userDetails.getEmail()))
                    .andExpect(jsonPath("$.role").value(userDetails.getRole()))
                    .andExpect(jsonPath("$.phone").value(userDetails.getPhone()))
                    .andExpect(jsonPath("$.password").value(userDetails.getPassword()))
                    .andExpect(jsonPath("$.address").value(userDetails.getAddress()))
                    .andExpect(jsonPath("$.bio").value(userDetails.getBio()))
                    .andExpect(jsonPath("$.status").value(userDetails.getStatus()))
                    .andExpect(jsonPath("$.avatar").value(userDetails.getAvatar()));
    }


    @Order(3)
    @ParameterizedTest(name = "{index} => excludedName = {0}, expectedNumber = {1}")
    @CsvSource({
            "Long1, 1",
            "Short, 2",
            "Long2, 1",
            "VeryLongName, 2",
    })
    void testFindAllNameExcept(String excludedName, int expectedNumber) throws Exception {
        // make stub
        List<String> names = new ArrayList<>();
        names.add("Long1");
        names.add("Long2");

        names.remove(excludedName);

        when(userService.findAllNameExcept(excludedName)).thenReturn(names);

        // test
        mockMvc.perform(get("/api/v1/otherusers/{username}", excludedName))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", Matchers.hasSize(expectedNumber)));

    }

    @Order(4)
    @ParameterizedTest(name = "{index} => username={0}, isBanSuccess={1}")
    @CsvSource({
            "test_long, true",
            "test_long, false",
    })
    void testBanUser(String username,boolean isBanSuccess) throws Exception {
        when(userService.banUser(username)).thenReturn(isBanSuccess);
        mockMvc.perform(get("/api/v1/users/{username}/ban", username))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(isBanSuccess));
    }

    @Order(5)
    @ParameterizedTest(name = "{index} => username={0}, email={1}, status={2}, isDeleteSuccess={3}")
    @CsvSource({
            "test_long, true",
            "test_long, false",
    })
    void testDeleteUser(String username,boolean isDeleteSuccess) throws Exception {

        when(userService.deleteUser(username)).thenReturn(isDeleteSuccess);
        mockMvc.perform(get("/api/v1/users/{username}/delete", username))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(isDeleteSuccess));
    }

    @Order(8)
    @ParameterizedTest(name = "{index} => username={0}, email={1}, status={2}, isBannedDateMoreThan7Days={3}")
    @CsvSource({
            "test_long, test_long@gmail.com, active, false",
            "test_long, test_long@gmail.com, delete, true",
            "test_long, test_long@gmail.com, delete, false"
    })
    void testRecoverUser(String username, boolean isBannedDateMoreThan7Days) throws Exception {

        when(userService.recoverUser(username)).thenReturn(isBannedDateMoreThan7Days);
        mockMvc.perform(get("/api/v1/users/{username}/recover", username))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(isBannedDateMoreThan7Days));
    }


}