package com.capstone.project.model;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.Assertions.assertThat;
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class AttachmentTest {
    @ParameterizedTest(name = "index => assignmentId={0}, typeId={1},submissionId{2},file{3}")
    @CsvSource({
            "1,2,1,On thi N3 ",
            "1,2,2,On thi N2 "
    })
    public void testAttachment(int assignmentId, int typeId, int submissionId,String file){
         Attachment attachment = Attachment.builder()
                 .assignment(Assignment.builder().id(assignmentId).build())
                 .attachmentType(AttachmentType.builder().id(typeId).build())
                 .submission(Submission.builder().id(submissionId).build())
                 .file(file)
                 .build();
         assertThat(attachment).isNotNull();
         assertThat(attachment.getAssignment().getId()).isEqualTo(assignmentId);
         assertThat(attachment.getAttachmentType().getId()).isEqualTo(typeId);
         assertThat(attachment.getSubmission().getId()).isEqualTo(submissionId);
         assertThat(attachment.getFile()).isEqualTo(file);
    }
}
