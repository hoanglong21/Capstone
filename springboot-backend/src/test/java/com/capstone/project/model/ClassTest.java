package com.capstone.project.model;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.Assertions.assertThat;
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ClassTest {

    @ParameterizedTest(name = "index => userId={0}, class_name={1}, description{2}")
    @CsvSource({
            "1, Luyen thi JLPT N5, On thi N3 ",
            "2, Luyen thi JLPT N4, On thi N3 "
    })

    public void testClass(int userId, String class_name, String description) {
        Class classroom = Class.builder()
                .user(User.builder().id(userId).build())
                .class_name(class_name)
                .description(description)
                .build();

        assertThat(classroom).isNotNull();
        assertThat(classroom.getUser().getId()).isEqualTo(userId);
        assertThat(classroom.getClass_name()).isEqualTo(class_name);
        assertThat(classroom.getDescription()).isEqualTo(description);

    }
}
