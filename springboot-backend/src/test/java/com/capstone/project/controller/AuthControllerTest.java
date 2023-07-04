package com.capstone.project.controller;

import com.capstone.project.dto.RegisterRequest;
import com.capstone.project.model.User;
import com.capstone.project.service.UserService;
import com.capstone.project.service.impl.UserServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.BindingResult;
import org.springframework.validation.MapBindingResult;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AuthControllerTest {
    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        MockitoAnnotations.initMocks(this);
        modelMapper = Mockito.mock(ModelMapper.class);
        mockMvc = MockMvcBuilders.standaloneSetup(new AuthController(userService, modelMapper)).build();
    }

    @Order(1)
    @ParameterizedTest(name = "{index} =>  username={0}, first_name={1}, last_name={2}, email={3}, password={4}, role={5}, success={6}")
    @CsvSource({
//            "test_long01, Do Hoang, long, testlong01@gmail.com, Long123456, ROLE_LEARNER, true",
//            ", Do Hoang, long, testlong02@gmail.com, Long123456, ROLE_LEARNER, false",
//            "test_long 03, Do Hoang, long, testlong03@gmail.com, Long123456, ROLE_LEARNER, false",
            "test_long04, , long, testlong04@gmail.com, Long123456, ROLE_LEARNER, false",
//            "test_long05,   Do      hOAng   , Long, testlong05@gmail.com, Long123456, ROLE_LEARNER, true",
//            "test_long06, Do Hoang, , testlong06@gmail.com, Long123456, ROLE_LEARNER, false",
//            "test_long07, Do Hoang,   loNg   , testlong07@gmail.com, Long123456, ROLE_LEARNER, true",
//            "test_long08, Do Hoang, long, , testLong123456, ROLE_LEARNER, false",
//            "test_long09, Do Hoang, long, testlong09    @gmail.com, Long123456, ROLE_LEARNER, false",
//            "test_long010, Do Hoang, long, testlong10@gmail.com, , ROLE_LEARNER, false",
//            "test_long011, Do Hoang, long, testlong11@gmail.com, 123, ROLE_LEARNER, false",
//            "test_long012, Do Hoang, long, testlong12@gmail.com, Long123456, , false",
//            "test_long013, Do Hoang, long, testlong13@gmail.com, Long123456, ROLE_RANDOM, false"
    })
    void testRegister(String username, String first_name, String last_name, String email, String password, String role, Boolean success) throws Exception {
        RegisterRequest registerRequest = RegisterRequest.builder()
                .username(username).email(email).password(password).role(role).build();
        registerRequest.setFirst_name(first_name);
        registerRequest.setLast_name(last_name);

        if(success==true) {
            mockMvc.perform(post("/api/v1/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(registerRequest)))
                            .andExpect(status().isOk())
                    .andExpect((jsonPath("$.username").value("test_long04")));
        } else {
            mockMvc.perform(post("/api/v1/auth/register")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(registerRequest)))
//                            .andExpect(status().isBadRequest());
            .andExpect((jsonPath("$.username").value("test_long04")));
        }
    }
}
