package com.capstone.project.controller;

import com.capstone.project.model.User;
import com.capstone.project.service.UserService;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
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

    @Test
    @Order(1)
    void testGetUser() throws Exception {
        // make stub
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        User user = User.builder()
                .username("long9999")
                .first_name("Hoang")
                .last_name("Long")
                .gender("Male")
//                .DOB(new Date())
                .dob(dateFormat.parse("2001-11-21"))
                .email("long9999@gmail.com")
                .phone("0352269303")
                .password("123456")
                .role("ROLE_LEARNER")
                .address("HN")
                .bio("Swag")
                .status("active")
                .avatar("avatar.jpg")
                .build();

        when(userService.getUserByUsername("long9999")).thenReturn(user);

        // test
        mockMvc.perform(get("/api/v1/users/{username}", "long9999"))
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

    @Test
    @Order(2)
    void testUpdateUser() throws Exception {
        // make stub
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        User user = User.builder()
                .username("long")
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
                .username("long")
                .first_name("Hoangnew")
                .last_name("Longnew")
                .gender("Female")
                .dob(dateFormat.parse("2001-11-21"))
                .email("longnew@gmail.com")
                .phone("0352269304")
                .password("1234567")
                .role("ROLE_TUTOR")
                .address("HN1")
                .bio("Swagnew")
                .status("deleted")
                .avatar("avatarnew.jpg")
                .build();


//        when(userService.getUserByUsername("long")).thenReturn(user);
        when(userService.updateUser("long", userDetails)).thenReturn(userDetails);

        // test
        mockMvc.perform(put("/api/v1/users/{username}", "long")
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

    @Test
    @Order(3)
    void testFindAllNameExcept() throws Exception {
        // make stub
        String user1 = "long1";
        String user2 = "long2";

        List<String> userList = new ArrayList<>();
        userList.add(user1);
        userList.add(user2);
        when(userService.findAllNameExcept("long")).thenReturn(userList);

        // test
        mockMvc.perform(get("/api/v1/otherusers/{username}", "long"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", Matchers.hasSize(2)))
                .andExpect(jsonPath("$[0]").value("long1"))
                .andExpect(jsonPath("$[1]").value("long2"));

    }

    @Test
    @Order(4)
    void testBanUser() throws Exception {
        String username = "long";
        when(userService.banUser(username)).thenReturn(true);
    }

    @Test
    @Order(5)
    @DisplayName("Ban User - Success")
    void testBanUserSuccess() throws Exception {
        String username = "long";
        when(userService.banUser(username)).thenReturn(true);
        mockMvc.perform(get("/api/v1/users/{username}/ban", username))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @Order(5)
    @DisplayName("Ban User - Failure")
    void testBanUserFailure() throws Exception {
        String username = "long";
        when(userService.banUser(username)).thenReturn(false);
        mockMvc.perform(get("/api/v1/users/{username}/ban", username))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @Order(6)
    @DisplayName("Delete User - Success")
    void testDeleteUserSuccess() throws Exception {
        String username = "long";
        when(userService.deleteUser(username)).thenReturn(true);
        mockMvc.perform(get("/api/v1/users/{username}/delete", username))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @Order(7)
    @DisplayName("Delete User - Failure")
    void testDeleteUserFailure() throws Exception {
        String username = "long";
        when(userService.deleteUser(username)).thenReturn(false);
        mockMvc.perform(get("/api/v1/users/{username}/delete", username))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(false));
    }

    @Test
    @Order(8)
    @DisplayName("Recover User - Success")
    void testRecoverUserSuccess() throws Exception {
        String username = "long";
        when(userService.recoverUser(username)).thenReturn(true);
        mockMvc.perform(get("/api/v1/users/{username}/recover", username))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @Order(9)
    @DisplayName("Recover User - Failure")
    void testRecoverUserFailure() throws Exception {
        String username = "long";
        when(userService.recoverUser(username)).thenReturn(false);
        mockMvc.perform(get("/api/v1/users/{username}/recover", username))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(false));
    }

}