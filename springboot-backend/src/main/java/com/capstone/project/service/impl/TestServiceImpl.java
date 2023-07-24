package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.repository.*;
import com.capstone.project.service.TestService;
import com.capstone.project.service.UserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TestServiceImpl  implements TestService {


    @PersistenceContext
    private EntityManager em;
    private final TestRepository testRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final CommentRepository commentRepository;
    private final UserService userService;

    private final UserRepository userRepository;


    @Autowired
    public TestServiceImpl(TestRepository testRepository, QuestionRepository questionRepository, AnswerRepository answerRepository, CommentRepository commentRepository, UserService userService, UserRepository userRepository) {
        this.testRepository = testRepository;
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
        return testRepository.save(test);
    }

    @Override
    public Test getTestById(int id) throws ResourceNotFroundException {
        Test test =  testRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Test is not exist with id: " + id));
        return test;
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
        for (Question question : questionRepository.getQuestionByTestId(testclass.getId())) {
            for (Answer answer : answerRepository.getAnswerByQuestionId(question.getId())) {
                  answerRepository.delete(answer);
            }
              questionRepository.delete(question);
        }
        for(Comment comment : commentRepository.getCommentByTestId(testclass.getId())){
            commentRepository.delete(comment);
        }
        testRepository.delete(testclass);
        return true;
    }

    @Override
    public Map<String, Object> getFilterTest(String search, String author, String direction, int duration, int classid,
                                             String fromStarted, String toStarted, String fromCreated, String toCreated, Boolean isDraft, String sortBy, int page, int size) throws ResourceNotFroundException {
        int offset = (page - 1) * size;

        String query ="select t.id,t.created_date,t.description,t.duration,t.modified_date,t.title,t.author_id,t.class_id,t.due_date,t.is_draft,t.num_attemps,t.start_date," +
                "(select count(*) from capstone.question where test_id = t.id) as totalquestion," +
                "(select count(*) from capstone.comment where test_id = t.id) as totalcomment from test t inner join user u on u.id = author_id where 1=1 ";

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
}
