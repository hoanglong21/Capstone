package com.capstone.project.model;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class QuestionTest {
    @ParameterizedTest(name = "index => testId={0}, typeId={1}, num_choice{2}, content{3}")
    @CsvSource({
            "1,1,2, Who kill Jack Robin ",
            "2,2,3, Who is the first president "
    })
    public void testQuestion(int testId,int typeId, int num_choice,String content){
      Question question = Question.builder()
              .test(Test.builder().id(testId).build())
              .questionType(QuestionType.builder().id(typeId).build())
              .num_choice(num_choice)
              .question(content)
              .build();
      assertThat(question.getTest().getId()).isEqualTo(testId);
      assertThat(question.getQuestionType().getId()).isEqualTo(typeId);
      assertThat(question.getNum_choice()).isEqualTo(num_choice);
      assertThat(question.getQuestion()).isEqualTo(content);
    }
}
