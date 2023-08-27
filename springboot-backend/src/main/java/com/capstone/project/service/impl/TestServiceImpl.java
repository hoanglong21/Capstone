package com.capstone.project.service.impl;

import com.capstone.project.dto.QuestionWrapper;
import com.capstone.project.dto.TestandClassLearnerDTO;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.model.Class;
import com.capstone.project.repository.*;
import com.capstone.project.service.TestService;
import com.capstone.project.service.UserService;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
public class TestServiceImpl  implements TestService {


    @PersistenceContext
    private EntityManager em;

    private final JavaMailSender mailSender;

    private final ClassLearnerRepository classLearnerRepository;
    private final NotificationRepository notificationRepository;
    private final ClassRepository classRepository;

    private final UserSettingRepository userSettingRepository;
    private final TestRepository testRepository;
    private final TestLearnerRepository testLearnerRepository;
    private final TestResultRepository testResultRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final CommentRepository commentRepository;
    private final UserService userService;

    private final UserRepository userRepository;



    @Autowired
    public TestServiceImpl(JavaMailSender mailSender, EntityManager em, ClassLearnerRepository classLearnerRepository, NotificationRepository notificationRepository, ClassRepository classRepository, UserSettingRepository userSettingRepository, TestRepository testRepository, TestLearnerRepository testLearnerRepository, TestResultRepository testResultRepository, QuestionRepository questionRepository, AnswerRepository answerRepository, CommentRepository commentRepository, UserService userService, UserRepository userRepository) {
        this.mailSender = mailSender;
        this.em = em;
        this.classLearnerRepository = classLearnerRepository;
        this.notificationRepository = notificationRepository;
        this.classRepository = classRepository;
        this.userSettingRepository = userSettingRepository;
        this.testRepository = testRepository;
        this.testLearnerRepository = testLearnerRepository;
        this.testResultRepository = testResultRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public static Date localDateTimeToDate(LocalDateTime localDateTime) {
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }


    @Override
    public List<Test> getAllTest() {
        return testRepository.findAll();
    }

    @Override
    public Test createTest(Test test) {
        LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        Date date = localDateTimeToDate(localDateTime);
        test.setCreated_date(date);

        Test savedTest = testRepository.save(test);

//        List<ClassLearner> classLearners = classLearnerRepository.getClassLeanerByClassroomId(savedTest.getClassroom().getId());
//        for (ClassLearner classLearner : classLearners) {
//            List<UserSetting> userSettings = userSettingRepository.getByUserId(classLearner.getUser().getId());
//            for (UserSetting userSetting : userSettings) {
//                if (classLearner.getStatus().equals("enrolled") && userSetting.getSetting().getId() == 8 && userSetting.getValue().equalsIgnoreCase("true") && !test.is_draft()) {
//                    sendTestCreatedEmail(classLearner, savedTest);
//                }
//            }
//        }
        Class classroom = classRepository.findClassById(savedTest.getClassroom().getId());
        notificationTestCreated(classroom);
        return savedTest;
    }

    public void notificationTestCreated(Class classroom) {

        LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        Date date = localDateTimeToDate(localDateTime);

        List<ClassLearner> classLearnerList = classLearnerRepository.getClassLeanerByClassroomId(classroom.getId());

        Set<User> enrolledUsersToNotify = new HashSet<>();

        for (ClassLearner classLearner : classLearnerList) {
            if (classLearner.getStatus().equals("enrolled")) {
                List<Test> testList = testRepository.getTestByClassroomId(classLearner.getClassroom().getId());
                for (Test test : testList) {
                    if (!test.is_draft()) {
                        enrolledUsersToNotify.add(classLearner.getUser());
                        break;
                    }
                }
            }
        }

        for (User user : enrolledUsersToNotify) {
            Notification notification = new Notification();
            notification.setTitle("New Test");

            String urlWithClassId = "/class/[[classid]]/tests";
            urlWithClassId = urlWithClassId.replace("[[classid]]", String.valueOf(classroom.getId()));

            notification.setUrl(urlWithClassId);
            notification.setContent("A new test is added to class '" + classroom.getClass_name() + "'");
            notification.setDatetime(date);
            notification.set_read(false);
            notification.setUser(user);

            notificationRepository.save(notification);
        }
    }

    public void sendTestCreatedEmail(ClassLearner classLearner, Test test) {
        String subject = null;
        String content = null;
        try {
            String toAddress = classLearner.getUser().getEmail();
            String fromAddress = "nihongolevelup.box@gmail.com";
            String senderName = "NihongoLevelUp";

            subject = "[NihongoLevelUp]: New Test assigned ";
            content = "Hi [[name]],<br><br>"
                    + "A new test << " + test.getTitle() + " >> was assigned in your class << " + classLearner.getClassroom().getClass_name() + " >>.<br><br>"
                    + "Thank you for choosing NihongoLevelUp! If you have any questions or concerns, please do not hesitate to contact us.<br><br>"
                    + "Best regards,<br>"
                    + "NihongoLevelUp Team";

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(fromAddress, senderName);
            helper.setTo(toAddress);
            helper.setSubject(subject);

            content = content.replace("[[name]]", classLearner.getUser().getUsername());

            String URL = "https://www.nihongolevelup.com";
            content = content.replace("[[URL]]", URL);

            helper.setText(content, true);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Test getTestById(int id) throws ResourceNotFroundException {
        Test test =  testRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Test is not exist with id: " + id));
        return test;
    }

    @Override
    public List<Test> getAllTestByClassId(int id) {
        return testRepository.getTestByClassroomId(id);
    }


    @Override
    public List<Test> getTestByUser(String username) throws ResourceNotFroundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new ResourceNotFroundException("Test not exist with author: " + username);
        }
        List<Test> test = testRepository.getTestByAuthorId(user.getId());
        return test;

    }

    @Override
    public Test updateTest(int id, Test test) throws ResourceNotFroundException {
        Test testclass = testRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Test is not exist with id: " + id));
//        if (test.getStart_date() != null && testclass.getCreated_date() != null &&
//                test.getStart_date().before(testclass.getCreated_date())) {
//            throw new ResourceNotFroundException("Start date must be >= created date");
//        }
//
//        if (test.getDuration() < 5) {
//            throw new ResourceNotFroundException("Duration must be >= 5 minutes");
//        }
        LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        Date date = localDateTimeToDate(localDateTime);
        testclass.setTitle(test.getTitle());
        testclass.setDescription(test.getDescription());
        testclass.setDuration(test.getDuration());
        testclass.setModified_date(date);
        testclass.set_draft(test.is_draft());
        testclass.setStart_date(test.getStart_date());
        testclass.setDue_date(test.getDue_date());
        testclass.setNum_attemps(test.getNum_attemps());
        return testRepository.save(testclass);
    }

    @Override
    public Boolean deleteTest(int id) throws ResourceNotFroundException {
        Test testclass = testRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Test is not exist with id: " + id));
        for(TestLearner testLearner : testLearnerRepository.getTestLearnerByTestId(testclass.getId())){
            for(TestResult testResult : testResultRepository.getTestResultBytestLearnerId(testLearner.getId())){
                testResultRepository.delete(testResult);
            }
            testLearnerRepository.delete(testLearner);
        }

        for (Question question : questionRepository.getQuestionByTestId(testclass.getId())) {
            for (Answer answer : answerRepository.getAnswerByQuestionId(question.getId())) {
                  answerRepository.delete(answer);
            }
            for(TestResult testResult : testResultRepository.getTestResultByQuestionId(question.getId())){
                testResultRepository.delete(testResult);
            }
              questionRepository.delete(question);
        }
        for(Comment commenttest : commentRepository.getCommentByTestId(testclass.getId())){
            deleteCommentAndChildren(commenttest);
        }
        testRepository.delete(testclass);
        return true;
    }

    private void deleteCommentAndChildren(Comment comment) {
        List<Comment> nestedComments = commentRepository.getCommentByRootId(comment.getId());

        for (Comment nestedComment : nestedComments) {
            deleteCommentAndChildren(nestedComment);
        }

        commentRepository.delete(comment);
    }

    @Override
    public Map<String, Object> getFilterTest(String search, String author, String direction, int duration, int classid,
                                             String duedatefrom, String duedateto,String fromStarted, String toStarted, String fromCreated, String toCreated, Boolean isDraft, String sortBy, int page, int size) throws Exception {

        if(page<=0 || size<=0) {
            throw new Exception("Please provide valid page and size");
        }
        int offset = (page - 1) * size;

        String query ="select t.*,u.username as authorname, c.class_name as classname,\n" +
                "\t   (select count(*) from capstone.question where test_id = t.id) as totalquestion,\n" +
                "\t   (select count(*) from capstone.comment where test_id = t.id) as totalcomment \n" +
                "       from test t inner join user u on u.id = author_id\n" +
                "                   inner join class c on c.id = t.class_id WHERE 1=1 ";

        Map<String, Object> parameters = new HashMap<>();

        if (author != null && !author.isEmpty()) {
            query += " AND u.username LIKE :authorname";
            parameters.put("authorname", author);
        }

        if (classid != 0) {
            query += " AND t.class_id = :classId";
            parameters.put("classId", classid);
        }

        if (search != null && !search.isEmpty()) {
            query += " AND (t.title LIKE :search OR t.description LIKE :search)";
            parameters.put("search", "%" + search + "%");
        }

        if (duration != 0) {
            query += " AND t.duration = :duration";
            parameters.put("duration", duration);
        }

        if (isDraft != null) {
            query += " AND t.is_draft = :isDraft";
            parameters.put("isDraft", isDraft);
        }

        if (duedatefrom != null && !duedatefrom.equals("")) {
            query += " AND DATE(due_date) >= :duedatefrom";
            parameters.put("duedatefrom", duedatefrom);
        }
        if (duedateto != null && !duedateto.equals("")) {
            query += " AND DATE(due_date) <= :duedateto";
            parameters.put("duedateto", duedateto);
        }

        if(fromStarted != null){
            query += " AND t.start_date >= :from ";
            parameters.put("from", fromStarted);
        }

        if(toStarted != null){
            query += " AND t.start_date <= :to";
            parameters.put("to", toStarted);
        }

        if (fromCreated != null && !fromCreated.equals("")) {
            query += " AND DATE(t.created_date) >= :fromCreated";
            parameters.put("fromCreated", fromCreated);
        }
        if (toCreated != null && !toCreated.equals("")) {
            query += " AND DATE(t.created_date) <= :toCreated";
            parameters.put("toCreated", toCreated);
        }

        query += " ORDER BY " + sortBy + " " + direction;


        Query q = em.createNativeQuery(query, "TestCustomListMapping");
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            q.setParameter(entry.getKey(), entry.getValue());
        }

        int totalItems = q.getResultList().size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        q.setFirstResult(offset);
        q.setMaxResults(size);

        List<Test> resultList = q.getResultList();

        Map<String, Object> response = new HashMap<>();
        response.put("list", resultList);
        response.put("currentPage", page);
        response.put("totalPages", totalPages);
        response.put("totalItems", totalItems);

        return response;

    }

    @Override
    public Map<String, Object> getNumAttemptTest(int testid, int classid) throws ResourceNotFroundException {
        String query ="SELECT COALESCE(COUNT(DISTINCT CASE WHEN cl.status = 'enrolled' AND tl.num_attempt = 1 THEN cl.user_id END),0) AS attempted,\n" +
                "                 COALESCE(COUNT(DISTINCT CASE WHEN cl.status = 'enrolled' AND (tl.num_attempt IS NULL OR tl.num_attempt = 0) THEN cl.user_id END),0) AS notattempted\n" +
                "           FROM class_learner cl \n" +
                "           LEFT JOIN test t on t.class_id = cl.class_id ";

        Map<String, Object> parameters = new HashMap<>();

        if (testid != 0) {
            testRepository.findById(testid);
            query += " LEFT JOIN test_learner tl ON cl.user_id = tl.user_id and tl.test_id = t.id where t.id = :testId ";
            parameters.put("testId", testid);
        }

        if (classid != 0) {
            query += " AND cl.class_id = :classId";
            parameters.put("classId", classid);
        }

        Query q = em.createNativeQuery(query);
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            q.setParameter(entry.getKey(), entry.getValue());
        }

        Object[] result = (Object[]) q.getSingleResult();

        Long attemptedCount = ((Number) result[0]).longValue();
        Long notAttemptedCount = ((Number) result[1]).longValue();

        Map<String, Object> response = new HashMap<>();
        response.put("attempted", attemptedCount);
        response.put("notattempted", notAttemptedCount);

        return response;
    }

    @Override
    public Map<String, Object> getNumAttempt(int testid, int userid)  {
        String query =" SELECT MAX(tl.num_attempt) as num_attempt  from test_learner tl WHERE 1=1 ";

        Map<String, Object> parameters = new HashMap<>();

        if (testid != 0) {
            testRepository.findById(testid);
            query += " AND test_id = :testId ";
            parameters.put("testId", testid);
        }

        if (userid != 0) {
            query += " AND user_id = :userId";
            parameters.put("userId", userid);
        }

        Query q = em.createNativeQuery(query);
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            q.setParameter(entry.getKey(), entry.getValue());
        }

        List<Object> results = q.getResultList();

        Map<String, Object> response = new HashMap<>();
        if (!results.isEmpty()) {
            response.put("num_attempt", results.get(0));
        } else {
            response.put("num_attempt", 0); // hoặc giá trị mặc định khác bạn muốn
        }

        return response;
    }

    @Override
    public List<TestandClassLearnerDTO> getFilterTestLearner(String username, Double mark,int classid, int authorid,int testid, String direction, String sortBy, int page, int size) {
        int offset = (page - 1) * size;
        String query = "SELECT cl.*,tl.mark,tl.num_attempt,tl.start,tl.end\n" +
                "FROM class_learner cl\n" +
                "LEFT JOIN test_learner tl ON cl.user_id = tl.user_id \n" +
                " AND tl.test_id = :testId \n" +
                " LEFT JOIN test t ON tl.test_id = t.id\n" +
                "WHERE 1=1";


        Map<String, Object> parameters = new HashMap<>();


        if (authorid != 0 ) {
            query += " AND (cl.user_id != :authorId OR cl.user_id IS NULL)";
            parameters.put("authorId", authorid);
        }

        if (classid != 0 ) {
            query += " AND cl.class_id = :classId";
            parameters.put("classId", classid);
        }

        if (testid != 0 ) {
            parameters.put("testId", testid);
        }

        if (username != null && !username.isEmpty()) {
            User user = userRepository.findUserByUsername(username);
            query += " AND cl.user_id = :userId";
            parameters.put("userId", user.getId());
        }

        if (mark != 0) {
            query += " AND tl.mark = :mark";
            parameters.put("mark", mark);
        }

        query += " AND cl.status = 'enrolled'";

        query += " ORDER BY " + sortBy + " " + direction;

        Query q = em.createNativeQuery(query);
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            q.setParameter(entry.getKey(), entry.getValue());
        }

        int totalItems = q.getResultList().size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        q.setFirstResult(offset);
        q.setMaxResults(size);

        List<Object[]> results = q.getResultList();
        List<TestandClassLearnerDTO> resultList = new ArrayList<>();

        Map<ClassLearner, List<TestLearner>> classLearnerMap = new HashMap<>();

        for (Object[] row : results) {
            int classLearnerId = (int) row[0]; // assuming cl_id is at index 0
            Date created_date = (Date) row[1];
            String status = (String) row[2];
            int classidcl = (int) row[3];
            int useridcl = (int) row[4];
            Double marktest = (row[5] != null) ? (Double) row[5] : 0.0;
            Integer numAttempt = (row[6] != null) ? (Integer) row[6] : 0;
            Date start = (Date) row[7];
            Date end = (Date) row[8];
            // ... and so on for other columns

            ClassLearner classLearner = new ClassLearner();
            classLearner.setId(classLearnerId);
            classLearner.setCreated_date(created_date);
            Class classroom = classRepository.findClassById(classidcl);
            classLearner.setClassroom(classroom);
            User user = userRepository.findUserById(useridcl);
            classLearner.setUser(user);
            classLearner.setStatus(status);

            TestLearner testLearner = new TestLearner();
            testLearner.setNum_attempt(numAttempt);
            testLearner.setMark(marktest);
            testLearner.setStart(start);
            testLearner.setEnd(end);

            // ... create other objects as needed

            if (!classLearnerMap.containsKey(classLearner)) {
                classLearnerMap.put(classLearner, new ArrayList<>());
            }

            classLearnerMap.get(classLearner).add(testLearner);
        }

        for (Map.Entry<ClassLearner, List<TestLearner>> entry : classLearnerMap.entrySet()) {
            TestandClassLearnerDTO dto = new TestandClassLearnerDTO(entry.getKey(), entry.getValue());
            resultList.add(dto);
        }

        return resultList;
    }


    public Map<String, Object> startTest(int testId, int userId) throws ResourceNotFroundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFroundException("User is not exist with id: " + userId));
        Test test = testRepository.findById(testId)
                .orElseThrow(() -> new ResourceNotFroundException("Test is not exist with id: " + testId));
        TestLearner testLearner = TestLearner.builder()
                .test(test)
                .user(user)
                .start(new Date())
                .build();
        List<QuestionWrapper> questionWrappers = new ArrayList<>();
        List<Question> testQuestions = questionRepository.getQuestionByTestId(testId);
        for(Question question : testQuestions) {
            QuestionWrapper questionWrapper = new QuestionWrapper();
            questionWrapper.setQuestion(question);
            questionWrapper.setAnswerList(answerRepository.getAnswerByQuestionId(question.getId()));
            questionWrappers.add(questionWrapper);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("testLearner", testLearnerRepository.save(testLearner));
        response.put("questionList", questionWrappers);
        return response;
    }

    @Override
    public Map<String, Object> endTest(List<TestResult> testResultList) throws Exception {
        if(testResultList.size()==0) {
            throw new Exception("Test result must have at least one");
        } else {
            Date end = new Date();
            TestLearner testLearner = testLearnerRepository.findById(testResultList.get(0).getTestLearner().getId())
                    .orElseThrow(() -> new ResourceNotFroundException("Test leaner not exist with id: " + testResultList.get(0).getTestLearner().getId()));

            List<TestLearner> attemptList = testLearnerRepository.findByTestIdAndUserId(testLearner.getUser().getId(), testLearner.getTest().getId());
            int attempt = attemptList.size();

            int result = 0;
            int total = 0;
            for(TestResult testResult : testResultList) {
                Question tempQuestion = questionRepository.findById(testResult.getQuestion().getId())
                    .orElseThrow(() -> new ResourceNotFroundException("Question not exist with id: " + testResult.getQuestion().getId()));
                total += tempQuestion.getPoint();
                if (testResult.is_true()) {
                    result += tempQuestion.getPoint();
                }
            }

            double mark = 0;
            if(total!=0) {
                mark = ((double)result/total)*100;
            }

            double roundedMark = Math.round(mark * 100.0) / 100.0;

            testLearner.setEnd(end);
            testLearner.setMark(roundedMark);
            testLearner.setNum_attempt(attempt);
            testLearnerRepository.save(testLearner);

            testResultRepository.saveAll(testResultList);

            Map<String, Object> response = new HashMap<>();
            response.put("result", result);
            response.put("total", total);
            response.put("mark", roundedMark);

            return response;
        }
    }
}
