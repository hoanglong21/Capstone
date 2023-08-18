package com.capstone.project.service;

import com.capstone.project.dto.TestandClassLearnerDTO;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.model.Class;
import com.capstone.project.repository.*;
import com.capstone.project.service.impl.PostServiceImpl;
import com.capstone.project.service.impl.TestServiceImpl;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.text.SimpleDateFormat;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TestServiceTest {

    @Mock
    private EntityManager em;

    @Mock
    private TestRepository testRepository;

    @Mock
    private ClassLearnerRepository classLearnerRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TestLearnerRepository testlearnerRepository;
    @Mock
    private TestResultRepository testresultRepository;
    @Mock
    private ClassRepository classRepository;
    @Mock
    private QuestionRepository questionRepository;
    @Mock
    private AnswerRepository answerRepository;

    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    private TestServiceImpl testServiceImpl;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @Order(1)
    @Test
    void testGetAllTest() {
        com.capstone.project.model.Test testclass = com.capstone.project.model.Test.builder()
                .description("Test week 1")
                .title("PT1").build();

        List<com.capstone.project.model.Test> tests = List.of(testclass);
        when(testRepository.findAll()).thenReturn(tests);
        assertThat(testServiceImpl.getAllTest().size()).isGreaterThan(0);

    }

    @Order(2)
    @Test
    void testGetTestById() {
        com.capstone.project.model.Test testclass = com.capstone.project.model.Test.builder()
                .description("Test week 1")
                .title("PT1").build();
        when(testRepository.findById(any())).thenReturn(Optional.ofNullable(testclass));
        try {
            com.capstone.project.model.Test getTest = testServiceImpl.getTestById(1);
            assertThat(getTest).isEqualTo(testclass);
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
    }

    @Order(3)
    @ParameterizedTest(name = "{index} => username={0}")
    @CsvSource({
            "johnsmith",
            "janedoe"
    })
    void testGetTestByUser(String username) {
        User user = User.builder()
                .username(username)
                .email("johnsmith@example.com")
                .build();
        List<com.capstone.project.model.Test> testList = new ArrayList<>();
        com.capstone.project.model.Test test1 = com.capstone.project.model.Test.builder()
                .description("Test week 1")
                .title("PT1").build();
        com.capstone.project.model.Test test2 = com.capstone.project.model.Test.builder()
                .description("Test week 2")
                .title("PT2").build();
        testList.add(test1);
        testList.add(test2);
        when(userRepository.findUserByUsername(username)).thenReturn(user);
        when(testRepository.getTestByAuthorId(user.getId())).thenReturn(testList);
        try {
            List<com.capstone.project.model.Test> result = testServiceImpl.getTestByUser(username);
            assertThat(result).containsExactlyInAnyOrderElementsOf(testList);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Order(4)
    @ParameterizedTest(name = "index => userId={0},classid{1}, created_date{2}, description{3},duration{4},modified_date{5},title{6}")
    @CsvSource({
            "1,1,2023-4-5,Test knowledge,12,2023-5-4, Test daily ",
            "2,1,2023-4-5, Test all learner,14, 2023-5-4, Midterm "
    })
    public void testCreateTest(int userId,int classid, String created_date, String description, int duration, String modified_date,
                               String title) {
        try {
            com.capstone.project.model.Test test = com.capstone.project.model.Test.builder()
                    .classroom(Class.builder().id(classid).build())
                    .user(User.builder().id(userId).build())
                    .created_date(dateFormat.parse(created_date))
                    .description(description)
                    .duration(duration)
                    .modified_date(dateFormat.parse(modified_date))
                    .title(title).build();
            when(testRepository.save(any())).thenReturn(test);
            com.capstone.project.model.Test createdtest = testServiceImpl.createTest(test);
            assertThat(test).isEqualTo(createdtest);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @Order(5)
    @ParameterizedTest(name = "index => userId={0}, created_date{1}, description{2},duration{3},modified_date{4},title{5}")
    @CsvSource({
            "1,2023-4-5,Test knowledge,12,2023-5-4, Test daily ",
            "2,2023-4-5, Test all learner,14, 2023-5-4, Midterm "
    })
    public void testUpdateTest(int userId, String created_date, String description, int duration, String modified_date,
                               String title) {
        try {

            com.capstone.project.model.Test test_new = com.capstone.project.model.Test.builder()
                    .user(User.builder().id(userId).build())
                    .created_date(dateFormat.parse(created_date))
                    .description(description)
                    .duration(duration)
                    .modified_date(dateFormat.parse(modified_date))
                    .title(title).build();
            com.capstone.project.model.Test test = com.capstone.project.model.Test.builder()
                    .user(User.builder().id(userId).build())
                    .created_date(dateFormat.parse(created_date))
                    .description(description)
                    .duration(duration)
                    .modified_date(dateFormat.parse(modified_date))
                    .title(title).build();
            when(testRepository.findById(any())).thenReturn(Optional.ofNullable(test_new));
            when(testRepository.save(any())).thenReturn(test);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Order(6)
    @Test
    void testDeleteTest() {
        com.capstone.project.model.Test test = com.capstone.project.model.Test.builder()
                .id(1)
                .user(User.builder().id(1).build())
                .description("test 1 for all")
                .duration(12)
                .title("PT1")
                .build();
        Question question = Question.builder()
                .id(1)
                .test(com.capstone.project.model.Test.builder().id(1).build())
                .questionType(QuestionType.builder().id(1).build())
                .num_choice(4)
                .question("Who kill Jack Robin")
                .build();
        Answer answer = Answer.builder().question(Question.builder().id(1).build()).content("Mango").is_true(false).build();

        TestLearner testLearner = TestLearner.builder().id(1).test(test).user(User.builder().build()).build();

        TestResult testResult = TestResult.builder().id(1).question(question).build();

        Comment comment = Comment.builder().commentType(CommentType.builder().id(1).build()).content("Focus").build();

        doNothing().when(testRepository).delete(test);
        doNothing().when(questionRepository).delete(question);
        doNothing().when(testlearnerRepository).delete(testLearner);
        doNothing().when(testresultRepository).delete(testResult);
        doNothing().when(answerRepository).delete(answer);
        doNothing().when(commentRepository).delete(comment);

        when(testRepository.findById(1)).thenReturn(Optional.of(test));
        when(testlearnerRepository.getTestLearnerByTestId(1)).thenReturn(List.of(testLearner));
        when(testresultRepository.getTestResultBytestLearnerId(1)).thenReturn(List.of(testResult));
        when(questionRepository.getQuestionByTestId(test.getId())).thenReturn(List.of(question));
        when(testresultRepository.getTestResultByQuestionId(1)).thenReturn(List.of(testResult));
        when(answerRepository.getAnswerByQuestionId(question.getId())).thenReturn(List.of(answer));
        when(commentRepository.getCommentByTestId(test.getId())).thenReturn(List.of(comment));
        when(commentRepository.getCommentByRootId(comment.getId())).thenReturn(List.of(comment));
        try {
            testServiceImpl.deleteTest(1);
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        verify(testRepository, times(1)).delete(test);
        verify(questionRepository, times(1)).delete(question);
        verify(answerRepository, times(1)).delete(answer);
        verify(commentRepository, times(2)).delete(comment);
    }

    @Order(7)
    @ParameterizedTest(name = "index => search={0},author{1},direction{2}, duration{3},classId={4},duedatefrom{5},duedateto{6} fromStart{7}, " +
                                      "toStart{8},fromCreated{9},toCreated{10} ,isDraft{11}, sortBy{12}, page{13}, size{14}")
    @CsvSource({
            "Homework,quantruong,DESC,45,1,2023-8-9,2023-8-15,2023-8-9,2023-8-15,2023-8-1,2023-8-5,true,created_date,1,5",
            "Homwork,ngocnguyen,DESC,15,2,2023-8-9,2023-8-15,2023-8-9,2023-8-15,2023-8-1,2023-8-5,false,created_date,0,5",
            "Homework,quantruong,DESC,45,1,2023-8-9,2023-8-15,2023-8-9,2023-8-15,2023-8-1,2023-8-5,true,created_date,1,-5",
            "Homwork,ngocnguyen,DESC,15,2,2023-8-9,2023-8-15,2023-8-9,2023-8-15,2023-8-1,2023-8-5,false,created_date,1,0",
    })
    public void testGetFilterTest(String search, String author, String direction, int duration, int classid,
                                  String duedatefrom, String duedateto,String fromStarted, String toStarted, String fromCreated, String toCreated, Boolean isDraft,
                                  String sortBy, int page, int size) throws ResourceNotFroundException {

        MockitoAnnotations.openMocks(this);
        com.capstone.project.model.Test test = com.capstone.project.model.Test.builder()
                .id(1)
                .user(User.builder().id(1).build())
                .description("test 1 for all")
                .duration(12)
                .title("PT1")
                .build();

        Query mockedQuery = mock(Query.class);
        when(em.createNativeQuery(anyString(), eq("TestCustomListMapping"))).thenReturn(mockedQuery);
        when(mockedQuery.setParameter(anyString(), any())).thenReturn(mockedQuery);
        when(mockedQuery.getResultList()).thenReturn(List.of(test));

        try {
            List<com.capstone.project.model.Test> list = (List<com.capstone.project.model.Test>) testServiceImpl.getFilterTest(search, author, direction, duration,
                    classid,duedatefrom,duedateto, fromStarted, toStarted, fromCreated, toCreated,
                    isDraft, sortBy, page, size).get("list");
            assertThat(list.size()).isGreaterThan(0);
        } catch (Exception e) {
            assertThat("Please provide valid page and size").isEqualTo(e.getMessage());
        }
    }

    @Order(8)
    @Test
    public void testGetAllTestByClassId() {
        int classId = 1;
        List<com.capstone.project.model.Test> expectedTests = new ArrayList<>();

        when(testRepository.getTestByClassroomId(classId)).thenReturn(expectedTests);

        List<com.capstone.project.model.Test> result = testServiceImpl.getAllTestByClassId(classId);

        assertEquals(expectedTests, result);
        verify(testRepository, times(1)).getTestByClassroomId(classId);
    }


    @Order(9)
    @Test
    public void testGetNumAttemptTest() throws ResourceNotFroundException {
        int testId = 1;
        int classId = 2;
        Object[] expectedResult = new Object[]{10L, 5L};

        String query = "SELECT COALESCE(COUNT(DISTINCT CASE WHEN cl.status = 'enrolled' AND tl.num_attempt = 1 THEN cl.user_id END),0) AS attempted,\n" +
                "                 COALESCE(COUNT(DISTINCT CASE WHEN cl.status = 'enrolled' AND (tl.num_attempt IS NULL OR tl.num_attempt = 0) THEN cl.user_id END),0) AS notattempted\n" +
                "           FROM class_learner cl \n" +
                "           LEFT JOIN test t on t.class_id = cl.class_id " +
                " LEFT JOIN test_learner tl ON cl.user_id = tl.user_id and tl.test_id = t.id where t.id = :testId " +
                " AND cl.class_id = :classId";


        Query mockedQuery = mock(Query.class);
        when(em.createNativeQuery(anyString())).thenReturn(mockedQuery);
        when(mockedQuery.setParameter("testId", testId)).thenReturn(mockedQuery);
        when(mockedQuery.setParameter("classId", classId)).thenReturn(mockedQuery);
        when(mockedQuery.getSingleResult()).thenReturn(expectedResult);

        Map<String, Object> result = testServiceImpl.getNumAttemptTest(testId, classId);

        assertEquals(expectedResult[0], result.get("attempted"));
        assertEquals(expectedResult[1], result.get("notattempted"));
        verify(em, times(1)).createNativeQuery(query);
        verify(mockedQuery, times(1)).setParameter("testId", testId);
        verify(mockedQuery, times(1)).setParameter("classId", classId);

    }

    @Order(10)
    @Test
    public void testGetNumAttempt() {
        int testId = 1;
        int userId = 2;
        int expectedNumAttempt = 3;

        String query = " SELECT MAX(tl.num_attempt) as num_attempt  from test_learner tl WHERE 1=1 " +
                " AND test_id = :testId " +
                " AND user_id = :userId";

        Query mockedQuery = mock(Query.class);
        when(em.createNativeQuery(query)).thenReturn(mockedQuery);
        when(mockedQuery.setParameter(eq("testId"), any())).thenReturn(mockedQuery);
        when(mockedQuery.setParameter(eq("userId"), any())).thenReturn(mockedQuery);
        when(mockedQuery.getResultList()).thenReturn(Collections.singletonList(expectedNumAttempt));

        Map<String, Object> result = testServiceImpl.getNumAttempt(testId, userId);

        assertEquals(expectedNumAttempt, result.get("num_attempt"));
        verify(em, times(1)).createNativeQuery(query);
        verify(mockedQuery, times(1)).setParameter("testId", testId);
        verify(mockedQuery, times(1)).setParameter("userId", userId);
    }

    @Order(11)
    @ParameterizedTest(name = "index => username={0},mark{1},classid{2},authorid{3},testid={4}, direction{5}, " +
            "sortBy{6}, page{7}, size{8}")
    @CsvSource({
            "quantruong,45,1,9,5,DESC,mark,1,5",
            "ngocnguyen,15,2,8,5,DESC,mark,1,5",

    })
    public void testGetFilterTestLearner(String username,Double mark, int classId, int authorId,int testId, String direction,String sortby,int page, int size) {

        int classLearnerId = 1;
        Date createdDate = new Date();
        String status = "enrolled";
        Double markTest = 8.5;
        Integer numAttempt = 1;
        Date start = new Date();
        Date end = new Date();


        User user = new User();
        Class classroom = new Class();
        when(userRepository.findUserByUsername(username)).thenReturn(user);
        when(classRepository.findClassById(classId)).thenReturn(classroom);
        when(userRepository.findUserById(authorId)).thenReturn(user);


        Query mockedQuery = mock(Query.class);
        when(em.createNativeQuery(anyString())).thenReturn(mockedQuery);
        when(mockedQuery.setParameter(anyString(), any())).thenReturn(mockedQuery);
        when(mockedQuery.setMaxResults(anyInt())).thenReturn(mockedQuery);

        Object[] row = new Object[9];
        row[0] = classLearnerId;
        row[1] = createdDate;
        row[2] = status;
        row[3] = classId;
        row[4] = authorId;
        row[5] = markTest;
        row[6] = numAttempt;
        row[7] = start;
        row[8] = end;

        List<Object[]> results = Collections.singletonList(row);
        when(mockedQuery.getResultList()).thenReturn(results);


        List<TestandClassLearnerDTO> result = testServiceImpl.getFilterTestLearner(username, mark, classId, authorId, testId, direction, sortby, page, size);

        assertEquals(1, result.size());
        TestandClassLearnerDTO dto = result.get(0);
        assertEquals(classroom, dto.getClassLearner().getClassroom());
        assertEquals(user, dto.getClassLearner().getUser());

        verify(userRepository, times(1)).findUserByUsername(username);
        verify(classRepository, times(1)).findClassById(classId);
        verify(em, times(1)).createNativeQuery(anyString());
        verify(mockedQuery, times(1)).setParameter("testId", testId);
        verify(mockedQuery, times(1)).setMaxResults(size);
        // Đảm bảo getResultList được gọi một lần
        verify(mockedQuery, times(2)).getResultList();
    }

    @Order(12)
    @Test
    public void testStartTest() {
        int testId = 1;
        int userId = 2;

        TestLearner testLearner = new TestLearner();
        when(testlearnerRepository.save(any(TestLearner.class))).thenReturn(testLearner);

        Question question = new Question();
        when(questionRepository.getQuestionByTestId(anyInt())).thenReturn(Collections.singletonList(question));

        Answer answer = new Answer();
        when(answerRepository.getAnswerByQuestionId(anyInt())).thenReturn(Collections.singletonList(answer));

        Map<String, Object> result = testServiceImpl.startTest(testId, userId);

        assertNotNull(result);
        assertNotNull(result.get("questionList"));
        verify(questionRepository, times(1)).getQuestionByTestId(testId);
        verify(answerRepository, times(1)).getAnswerByQuestionId(question.getId());
    }


    @Order(13)
    @Test
    public void testEndTest() throws Exception {

        TestLearner testLearner = new TestLearner();
        testLearner.setId(1);
        testLearner.setUser(User.builder().build());
        testLearner.setTest(com.capstone.project.model.Test.builder().build());

        TestResult testResult = new TestResult();
        testResult.setTestLearner(testLearner);
        testResult.setQuestion(new Question());
        testResult.set_true(true);

        List<TestResult> testResultList = Collections.singletonList(testResult);

        when(testlearnerRepository.findById(anyInt())).thenReturn(Optional.of(testLearner));
        when(testlearnerRepository.findByTestIdAndUserId(anyInt(), anyInt())).thenReturn(Collections.singletonList(testLearner));
        when(questionRepository.findById(anyInt())).thenReturn(Optional.of(new Question()));


        Map<String, Object> result = testServiceImpl.endTest(testResultList);

        assertNotNull(result);
        assertEquals(testResultList.get(0).getQuestion().getPoint(), result.get("result"));
        assertEquals(testResultList.get(0).getQuestion().getPoint(), result.get("total"));
        verify(testlearnerRepository, times(1)).findById(testResultList.get(0).getTestLearner().getId());
        verify(testlearnerRepository, times(1)).findByTestIdAndUserId(testLearner.getUser().getId(), testLearner.getTest().getId());
        verify(questionRepository, times(1)).findById(testResultList.get(0).getQuestion().getId());
        verify(testlearnerRepository, times(1)).save(testLearner);
        verify(testresultRepository, times(1)).saveAll(testResultList);
    }

}
