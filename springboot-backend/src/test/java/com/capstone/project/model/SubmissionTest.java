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
public class SubmissionTest {
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    @ParameterizedTest(name = "index => userId={0}, assignmentId={1}, created_date{2}, description{3},modified_date{4}")
    @CsvSource({
            "1,1,2023-4-5,Submit assignment,2023-5-4 ",
            "2,2,2023-4-5, Submit test, 2023-5-4 "
    })
    public void testSubmission(int userId,int assignmetnId,String created_date,String description,String modified_date) {
        try {
            Submission submission = Submission.builder()
                    .user(User.builder().id(userId).build())
                    .assignment(Assignment.builder().id(assignmetnId).build())
                    .created_date(dateFormat.parse(created_date))
                    .description(description)
                    .modified_date(dateFormat.parse(modified_date)).build();
            assertThat(submission).isNotNull();
            assertThat(submission.getUser().getId()).isEqualTo(userId);
            assertThat(submission.getAssignment().getId()).isEqualTo(assignmetnId);
            assertThat(submission.getCreated_date()).isEqualTo(created_date);
            assertThat(submission.getDescription()).isEqualTo(description);
            assertThat(submission.getModified_date()).isEqualTo(modified_date);
        }catch (ParseException e){
            throw new RuntimeException(e);
        }
    }
}
