package com.capstone.project.repository;

import com.capstone.project.model.Class;
import com.capstone.project.model.ClassLearner;
import com.capstone.project.model.User;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ClassLearnerRepositoryTest {
    @Autowired
    private ClassLearnerRepository classLearnerRepository;


    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private UserRepository userRepository;

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @Order(1)
    @Test
    public void testFindByUserIdAndClassroomId()  {
        User user = User.builder().username("test_stub").email("teststub@gmail.com").build();
        userRepository.save(user);

        Class classroom = Class.builder()
                .user(user)
                .build();
        classRepository.save(classroom);

        ClassLearner classLearner = ClassLearner.builder()
                .user(User.builder().id(user.getId()).build())
                .classroom(Class.builder().id(classroom.getId()).build())
                .build();
        classLearnerRepository.save(classLearner);

        ClassLearner classLearners = classLearnerRepository.findByUserIdAndClassroomId(user.getId(),classroom.getId());
        assertThat(classLearners).isNotNull();
    }

    @Order(2)
    @Test
    public void testGetClassLeanerByUserId() {
        User user = User.builder().username("test_stub").email("teststub@gmail.com").build();
        userRepository.save(user);

        Class classroom = Class.builder()
                .user(user)
                .build();
        classRepository.save(classroom);

            ClassLearner classLearner = ClassLearner.builder()
                    .user(User.builder().id(user.getId()).build())
                    .classroom(Class.builder().id(classroom.getId()).build())
                    .build();

            classLearnerRepository.save(classLearner);

            List<ClassLearner> classLearners = classLearnerRepository.getClassLeanerByUserId(user.getId());
            assertThat(classLearners).isNotNull();


    }
}
