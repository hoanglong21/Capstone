package com.capstone.project.model;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserTest {

    @Test
    public void testUser() {
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

        assertThat(user).isNotNull();
        assertThat(user.getUsername()).isEqualTo("long");
        assertThat(user.getFirst_name()).isEqualTo("Hoang");
        assertThat(user.getLast_name()).isEqualTo("Long");
        assertThat(user.getGender()).isEqualTo("Male");
        assertThat(user.getDob()).isInstanceOf(Date.class);
        assertThat(user.getEmail()).isEqualTo("long@gmail.com");
        assertThat(user.getPhone()).isEqualTo("0352269303");
        assertThat(user.getPassword()).isEqualTo("123456");
        assertThat(user.getRole()).isEqualTo("ROLE_LEARNER");
        assertThat(user.getAddress()).isEqualTo("HN");
        assertThat(user.getBio()).isEqualTo("Swag");
        assertThat(user.getStatus()).isEqualTo("active");
        assertThat(user.getAvatar()).isEqualTo("avatar.jpg");
    }

}
