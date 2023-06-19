package com.capstone.project.repository;

import com.capstone.project.model.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserRepositoryTest2 {
    @Autowired
    private UserRepository userRepository;

    // JUnit test for saveUser
    @Test
    @Order(1)
    @Rollback(value = false)
    public void testSaveUser() {
        User user = User.builder()
                .first_name("hoang")
                .last_name("long")
                .email("long9999@gmail.com")
                .username("long9999")
                .role("ROLE_LEARNER")
                .phone("0352269303")
                .build();

        userRepository.save(user);

        Assertions.assertThat(user.getId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void testFindUserByUsername() {
        User user = userRepository.findUserByUsername("long9999");
        Assertions.assertThat(user.getUsername()).isEqualTo("long9999");
    }

    @Test
    @Order(3)
    public void testFindUserByEmail() {
        User user = userRepository.findUserByEmail("long@gmail.com");
        Assertions.assertThat(user.getEmail()).isEqualTo("long@gmail.com");
    }

    @Test
    @Order(4)
    public void testFindUserById() {
        User user = userRepository.findUserById(1);
        Assertions.assertThat(user.getId()).isEqualTo(1);
    }

    @Test
    @Order(5)
    public void testFindAllNameExcept() {
        List<String> names = userRepository.findAllNameExcept("long9999");
        Assertions.assertThat(names).doesNotContain("long9999");
    }

    @Test
    @Order(6)
    public void testExistsByUsername() {
        boolean exists = userRepository.existsByUsername("long9999");
        Assertions.assertThat(exists).isTrue();
    }

    @Test
    @Order(7)
    public void testExistsByPhone() {
        boolean exists = userRepository.existsByPhone("0352269303");
        Assertions.assertThat(exists).isTrue();
    }

    @Test
    @Order(8)
    public void testExistsByEmail() {
        boolean exists = userRepository.existsByEmail("long@gmail.com");
        Assertions.assertThat(exists).isTrue();
    }

    @Test
    @Order(9)
    @Rollback(value = false)
    public void testUpdateUser() {
        User user = userRepository.findUserByUsername("long9999");
        user.setFirst_name("do hoang");
        User updateUser = userRepository.save(user);
        Assertions.assertThat(updateUser.getFirst_name()).isEqualTo("do hoang");

    }

    @Test
    @Order(10)
    @Rollback(value = false)
    public void testDeleteUser() {
//        User user = userRepository.findUserByUsername("long9999");
//        userRepository.delete(user);
//        User user1 = null;
//        Optional<User> optionalUser = userRepository.findByUsername("long9999");
//        if(optionalUser.isPresent()) {
//            user1 = optionalUser.get();
//        }
//        Assertions.assertThat(user1).isNull();

        User user = userRepository.findUserByUsername("long9999");
        userRepository.delete(user);
        User user1 = userRepository.findUserByUsername("long9999");
        Assertions.assertThat(user1).isNull();
    }

}
