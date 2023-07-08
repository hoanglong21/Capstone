package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Answer;
import com.capstone.project.model.Question;
import com.capstone.project.repository.AnswerRepository;
import com.capstone.project.repository.QuestionRepository;
import com.capstone.project.repository.TestRepository;
import com.capstone.project.repository.UserRepository;
import static org.mockito.ArgumentMatchers.any;
import com.capstone.project.service.impl.AnswerServiceImpl;
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AnswerServiceTest {

    @Mock
    private AnswerRepository answerRepository;

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private TestRepository testRepository;

    @InjectMocks
    private AnswerServiceImpl answerServiceImpl;

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Order(1)
    @Test
    void testGetAllAnswers() {
        Answer answer = Answer.builder()
                .content("Kinght")
                .build();
        List<Answer> answers = List.of(answer);
        when(answerRepository.findAll()).thenReturn(answers);
        assertThat(answerServiceImpl.getAllAnswers().size()).isGreaterThan(0);
    }


    @Order(2)
    @ParameterizedTest(name = "index => questionId={0}, content={1},istrue{2}")
    @CsvSource({
            "1, Knight, true ",
            "2, Cat , false "
    })
    void testCreateAnswer(int questionId, String content, Boolean istrue) {
        Answer answer = Answer.builder()
                .question(Question.builder().id(questionId).build())
                .content(content)
                .is_true(istrue)
                .build();
        when(answerRepository.save(any())).thenReturn(answer);

        Answer createdanswer = answerServiceImpl.createAnswer(answer);
        assertThat(answer).isEqualTo(createdanswer);
    }

    @Order(3)
    @ParameterizedTest(name = "index => questionId={0}, content={1},istrue{2}")
    @CsvSource({
            "1, Knight, true ",
            "2, Cat , false "
    })
    void testUpdateAnswer(int questionId, String content, Boolean istrue) {
        try {
            Answer answer_new = Answer.builder()
                    .question(Question.builder().id(questionId).build())
                    .content("Banana")
                    .is_true(false)
                    .build();

            Answer answer = Answer.builder()
                    .question(Question.builder().id(questionId).build())
                    .content(content)
                    .is_true(istrue)
                    .build();
            when(answerRepository.findById(any())).thenReturn(Optional.ofNullable(answer_new));
            when(answerRepository.save(any())).thenReturn(answer);

            Answer created_answer = answerServiceImpl.updateAnswer(1, answer);
            assertThat(created_answer).isEqualTo(answer);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Order(4)
    @Test
    void deleteAnswer() {
        Answer answer = Answer.builder()
                .id(1)
                .question(Question.builder().id(1).build())
                .content("Mango")
                .is_true(false)
                .build();

        when(answerRepository.findById(any())).thenReturn(Optional.ofNullable(answer));
        doNothing().when(answerRepository).delete(answer);
        try {
            answerServiceImpl.deleteAnswer(1);
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        verify(answerRepository, times(1)).delete(answer);
    }
}
