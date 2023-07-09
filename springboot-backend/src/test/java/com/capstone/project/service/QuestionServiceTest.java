package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Answer;
import com.capstone.project.model.Post;
import com.capstone.project.model.Question;
import com.capstone.project.model.QuestionType;
import com.capstone.project.repository.AnswerRepository;
import com.capstone.project.repository.CommentRepository;
import com.capstone.project.repository.QuestionRepository;
import com.capstone.project.service.impl.PostServiceImpl;
import com.capstone.project.service.impl.QuestionServiceImpl;
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class QuestionServiceTest {

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private AnswerRepository answerRepository;

    @InjectMocks
    private QuestionServiceImpl questionServiceImpl;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Order(1)
    @Test
    void testGetAllQuestion() {
        Question question = Question.builder().question("Who kill Jack Robin").build();

        List<Question> questions = List.of(question);
        when(questionRepository.findAll()).thenReturn(questions);
        assertThat(questionServiceImpl.getAllQuestions().size()).isGreaterThan(0);

    }

    @Order(2)
    @Test
    void testGetAllQuestionByTestId() {

        List<Question> questions = new ArrayList<>();
        Question question1 = Question.builder().question("Who kill Jack Robin").build();
        Question question2 = Question.builder().question("Who is the first president").build();
        questions.add(question1);
        questions.add(question2);

        when(questionRepository.getQuestionByTestId(any(Integer.class))).thenReturn(questions);
        List<Question> retrievedQuestions = questionServiceImpl.getAllByTestId(1);
        assertThat(retrievedQuestions).isEqualTo(questions);
    }

    @Order(3)
    @Test
    void testGetQuestionById() {
        Question question = Question.builder()
                .question("Who kill Jack Robin").build();
        when(questionRepository.findById(any())).thenReturn(Optional.ofNullable(question));
        try {
            Question getQuestion = questionServiceImpl.getQuestionById(1);
            assertThat(getQuestion).isEqualTo(question);
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }

    }


    @Order(4)
    @ParameterizedTest(name = "index => testId={0}, typeId={1}, num_choice{2}, content{3}")
    @CsvSource({
            "1,1,2, Who kill Jack Robin ",
            "2,2,3, Who is the first president "
    })
    public void testCreateQuestion(int testId,int typeId, int num_choice,String content){

        Question question = Question.builder()
                .test(com.capstone.project.model.Test.builder().id(testId).build())
                .questionType(QuestionType.builder().id(typeId).build())
                .num_choice(num_choice)
                .question(content)
                .build();
        when(questionRepository.save(any())).thenReturn(question);
        Question createdquestion = questionServiceImpl.createQuestion(question);
        assertThat(question).isEqualTo(createdquestion);
    }

    @Order(5)
    @ParameterizedTest(name = "index => testId={0}, typeId={1}, num_choice{2}, content{3}")
    @CsvSource({
            "1,1,2, Who kill Jack Robin ",
            "2,2,3, Who is the first president "
    })
    public void testUpdateQuestion(int testId,int typeId, int num_choice,String content){

        Question question_new = Question.builder()
                .num_choice(3)
                .question("What time is it")
                .build();

        Question question = Question.builder()
                .test(com.capstone.project.model.Test.builder().id(testId).build())
                .questionType(QuestionType.builder().id(typeId).build())
                .num_choice(num_choice)
                .question(content)
                .build();
        when(questionRepository.findById(any())).thenReturn(Optional.ofNullable(question_new));
        when(questionRepository.save(any())).thenReturn(question);

    }

    @Order(6)
    @Test
    void testDeleteQuestion() {

        Question question = Question.builder()
                .id(1)
                .test(com.capstone.project.model.Test.builder().id(1).build())
                .questionType(QuestionType.builder().id(1).build())
                .num_choice(4)
                .question("Who kill Jack Robin")
                .build();

        Answer answer = Answer.builder()
                .id(1)
                .question(Question.builder().id(1).build())
                .content("Mango")
                .is_true(false)
                .build();

        doNothing().when(questionRepository).delete(question);
        doNothing().when(answerRepository).delete(answer);

        when(questionRepository.findById(1)).thenReturn(Optional.of(question));
        when(answerRepository.getAnswerByQuestionId(1)).thenReturn(List.of(answer));

        try {
            questionServiceImpl.deleteQuestion(1);
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }

        verify(questionRepository, times(1)).delete(question);
        verify(answerRepository, times(1)).delete(answer);

    }
}
