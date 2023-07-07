package com.capstone.project.model;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import static org.assertj.core.api.Assertions.assertThat;
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class TestTest {

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @ParameterizedTest(name = "index => userId={0}, created_date{1}, description{2},duration{3},modified_date{4},title{5}")
    @CsvSource({
            "1,2023-4-5,Test knowledge,12,2023-5-4, Test daily ",
            "2,2023-4-5, Test all learner,14, 2023-5-4, Midterm "
    })
    public void testTest(int userId,String created_date,String description,int duration,String modified_date,String title) {
        try {
            Test test = Test.builder()
                    .user(User.builder().id(userId).build())
                    .created_date(dateFormat.parse(created_date))
                    .description(description)
                    .duration(duration)
                    .modified_date(dateFormat.parse(modified_date))
                    .title(title).build();

            assertThat(test).isNotNull();
            assertThat(test.getUser().getId()).isEqualTo(userId);
            assertThat(test.getCreated_date()).isEqualTo(created_date);
            assertThat(test.getDescription()).isEqualTo(description);
            assertThat(test.getDuration()).isEqualTo(duration);
            assertThat(test.getModified_date()).isEqualTo(modified_date);
            assertThat(test.getTitle()).isEqualTo(title);
        }catch (ParseException e){
            throw new RuntimeException(e);
        }
    }
}
