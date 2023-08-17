package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.model.Class;
import com.capstone.project.repository.*;
import com.capstone.project.service.ClassService;
import com.capstone.project.service.StudySetService;
import com.capstone.project.service.UserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import net.loomchild.segment.util.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.Query;

import java.util.*;

@Service
public class ClassServiceImpl implements ClassService {

    @PersistenceContext
    private EntityManager em;

    private final ClassRepository classRepository;
    private final PostRepository postRepository;
    private final TestRepository testRepository;
    private final TestLearnerRepository testLearnerRepository;
    private final TestResultRepository testResultRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final CommentRepository commentRepository;
    private final AssignmentRepository assignmentRepository;
    private final AttachmentRepository attachmentRepository;
    private final SubmissionRepository submissionRepository;
    private final UserRepository userRepository;
    private final StudySetRepository studySetRepository;
    private final StudySetService studySetService;
    private final ClassLearnerRepository classLearnerRepository;

    private final UserService userService;

    @Autowired
    public ClassServiceImpl(ClassRepository classRepository,EntityManager em, PostRepository postRepository, TestRepository testRepository, TestLearnerRepository testLearnerRepository, TestResultRepository testResultRepository, QuestionRepository questionRepository, AnswerRepository answerRepository, CommentRepository commentRepository, AssignmentRepository assignmentRepository, AttachmentRepository attachmentRepository, SubmissionRepository submissionRepository, UserRepository userRepository, StudySetRepository studySetRepository, StudySetService studySetService, ClassLearnerRepository classLearnerRepository, UserService userService) {
        this.classRepository = classRepository;
        this.postRepository = postRepository;
        this.testRepository = testRepository;
        this.testLearnerRepository = testLearnerRepository;
        this.testResultRepository = testResultRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.commentRepository = commentRepository;
        this.assignmentRepository = assignmentRepository;
        this.attachmentRepository = attachmentRepository;
        this.submissionRepository = submissionRepository;
        this.userRepository = userRepository;
        this.studySetRepository = studySetRepository;
        this.studySetService = studySetService;
        this.classLearnerRepository = classLearnerRepository;
        this.userService = userService;
        this.em = em;
    }

    @Override
    public List<Class> getAllClass() {
        return classRepository.findAll();
    }

    @Override
    public Class getClassroomById(int id) throws ResourceNotFroundException {
        Class classroom = classRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Class not exist with id:" + id));
        return classroom;
    }

    @Override
    public Class createClassroom(Class classroom){
        String classCode = generateClassCode();
        classroom.setClasscode(classCode);
        classroom.setCreated_date(new Date());
        return classRepository.save(classroom);
    }
    private String generateClassCode() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        int codeLength = 7;
        Random random = new Random();

        StringBuilder classCode = new StringBuilder();
        for (int i = 0; i < codeLength; i++) {
            int index = random.nextInt(characters.length());
            char randomChar = characters.charAt(index);
            classCode.append(randomChar);
        }

        return classCode.toString();
    }

    @Override
    public Class updateClassroom(Class classrooms, int id) throws ResourceNotFroundException {
        Class classroom = classRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Class not exist with id:" + id));
        classroom.setClass_name(classrooms.getClass_name());
        classroom.setDescription(classrooms.getDescription());
        classroom.set_deleted(classrooms.is_deleted());
        return classRepository.save(classroom);
    }

    @Override
    public Boolean deleteClass(int id) throws ResourceNotFroundException {
        Class classroom = classRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Class not exist with id:" + id));
        classroom.set_deleted(true);
        classroom.setDeleted_date(new Date());
        classRepository.save(classroom);
        return true;
    }

    @Override
    public Boolean deleteHardClass(int id) throws ResourceNotFroundException {
        Class classroom = classRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Class not exist with id:" + id));
        for(Post post : postRepository.getPostByClassroomId(classroom.getId())){
            for(Comment commentroot : commentRepository.getCommentByPostId(post.getId())){
                for(Comment comment : commentRepository.getCommentByRootId(commentroot.getId())){
                    commentRepository.delete(comment);
                }
                commentRepository.delete(commentroot);
            }
            for(Attachment attachment : attachmentRepository.getAttachmentByPostId(post.getId())){
                attachmentRepository.delete(attachment);
            }
            postRepository.delete(post);
        }
        for(Test test : testRepository.getTestByClassroomId(classroom.getId())){
            for(Question question: questionRepository.getQuestionByTestId(test.getId())){
                for(Answer answer : answerRepository.getAnswerByQuestionId(question.getId())){
                    answerRepository.delete(answer);
                }
                for(TestResult testResult : testResultRepository.getTestResultByQuestionId(question.getId())){
                    testResultRepository.delete(testResult);
                }
                questionRepository.delete(question);
            }
            for(TestLearner testLearner : testLearnerRepository.getTestLearnerByTestId(test.getId())){
                for(TestResult testResult : testResultRepository.getTestResultBytestLearnerId(testLearner.getId())){
                    testResultRepository.delete(testResult);
                }
                testLearnerRepository.delete(testLearner);
            }

            for(Comment commentroot : commentRepository.getCommentByTestId(test.getId())){
                for(Comment comment : commentRepository.getCommentByRootId(commentroot.getId())){
                    commentRepository.delete(comment);
                }
                commentRepository.delete(commentroot);
            }
            testRepository.delete(test);
        }
        for(Assignment assignment : assignmentRepository.getAssignmentByClassroomId(classroom.getId())){
            for(Submission submission : submissionRepository.getSubmissionByAssignmentId(assignment.getId())){
                for(Attachment attachment : attachmentRepository.getAttachmentBySubmissionId(submission.getId())){
                    attachmentRepository.delete(attachment);
                }
                for(Comment commentroot : commentRepository.getCommentBySubmissionId(submission.getId())){
                    for(Comment comment : commentRepository.getCommentByRootId(commentroot.getId())){
                        commentRepository.delete(comment);
                    }
                    commentRepository.delete(commentroot);
                }
                submissionRepository.delete(submission);
            }
            for(Attachment attachment : attachmentRepository.getAttachmentByAssignmentId(assignment.getId())){
                attachmentRepository.delete(attachment);
            }
            for(Comment commentroot : commentRepository.getCommentByAssignmentId(assignment.getId())){
                for(Comment comment : commentRepository.getCommentByRootId(commentroot.getId())){
                    commentRepository.delete(comment);
                }
                commentRepository.delete(commentroot);
            }
            assignmentRepository.delete(assignment);
        }
        classRepository.delete(classroom);
        return true;
    }

    @Override
    public Map<String, Object> getFilterClass(int classid,Boolean isDeleted, String search, String author,String learner, String fromDeleted, String toDeleted,
                                              String fromCreated, String toCreated,String sortBy,String direction, int page, int size) throws ResourceNotFroundException {
        int offset = (page - 1) * size;

//        String query ="SELECT * FROM class WHERE 1=1";

        String query = "SELECT c.*, COUNT(CASE WHEN cl.status = 'enrolled' THEN cl.user_id END) AS member,  (SELECT COUNT(sudyset_id) FROM class_studyset cs WHERE cs.class_id = c.id) AS studyset,u.avatar,u.username as author " +
                "FROM class c " +
                "LEFT JOIN class_learner cl ON c.id = cl.class_id " +
                "LEFT JOIN class_studyset cs ON c.id = cs.class_id " +
                "LEFT JOIN user u ON u.id = c.author_id " +
                "GROUP BY c.id HAVING 1=1 ";

        Map<String, Object> parameters = new HashMap<>();

        if (classid != 0) {
            query += " AND c.id = :classId";
            parameters.put("classId", classid);
        }

        if (isDeleted != null) {
            query += " AND is_deleted = :isDeleted";
            parameters.put("isDeleted", isDeleted);
        }

        if (search != null && !search.isEmpty()) {
            query += " AND (class_name LIKE :search OR description LIKE :search)";
            parameters.put("search", "%" + search + "%");
        }

        boolean checkAuthorNull = author == null || author.isEmpty();
        boolean checkLearnerNull = learner == null || learner.isEmpty();
        if (!checkAuthorNull && !checkLearnerNull) {
            query += " AND u.username = :authorname OR EXISTS (SELECT * FROM class_learner cl LEFT JOIN user r ON cl.user_id = r.id WHERE cl.class_id = c.id AND r.username = :learner)";
            parameters.put("authorname", author);
            parameters.put("learner", learner);
        }
        if (!checkAuthorNull && checkLearnerNull) {
            query += " AND u.username = :authorname";
            parameters.put("authorname", author);
        }
        if (checkAuthorNull && !checkLearnerNull) {
            query += " AND EXISTS (SELECT * FROM class_learner cl LEFT JOIN user r ON cl.user_id = r.id WHERE cl.class_id = c.id AND r.username = :learner)";
            parameters.put("learner", learner);
        }

        if ((isDeleted == null || isDeleted)) {
            if (fromDeleted != null) {
                query += " AND DATE(deleted_date) >= :from";
                parameters.put("from", fromDeleted);
            }
            if (toDeleted != null) {
                query += " AND DATE(deleted_date) <= :to";
                parameters.put("to", toDeleted);
            }
        }

        if (fromCreated != null && !fromCreated.equals("")) {
            query += " AND DATE(created_date) >= :fromCreated";
            parameters.put("fromCreated", fromCreated);
        }
        if (toCreated != null && !toCreated.equals("")) {
            query += " AND DATE(created_date) <= :toCreated";
            parameters.put("toCreated", toCreated);
        }

        query += " ORDER BY " + sortBy + " " + direction;

//        String direct = "desc";
//        if(direction != null && !direction.isEmpty()){
//            if (direction.equalsIgnoreCase("asc")) {
//                direct = "asc";
//            }
//        }
//        query += " ORDER BY created_date " + " " + direct;

        Query q = em.createNativeQuery(query, "ClassCustomListMapping");
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            q.setParameter(entry.getKey(), entry.getValue());
        }

        int totalItems = q.getResultList().size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        q.setFirstResult(offset);
        q.setMaxResults(size);

        List<Class> resultList = q.getResultList();

        Map<String, Object> response = new HashMap<>();
        response.put("list", resultList);
        response.put("currentPage", page);
        response.put("totalPages", totalPages);
        response.put("totalItems", totalItems);

        return response;
    }

    @Override
    public Class joinClass(String classCode, String username) throws ResourceNotFroundException {
        Class classroom = classRepository.findByClasscode(classCode);
        if (classroom == null) {
            throw new ResourceNotFroundException("Class not exist with code: " +classCode);
        }


        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new ResourceNotFroundException("User not exist with username: " +username);
        }

        if(classroom.getUser().getUsername().contains(username)){
            throw new ResourceNotFroundException("You cannot join your class !");
        }

        ClassLearner classLearner = classLearnerRepository.findByUserIdAndClassroomId(user.getId(),classroom.getId());
        if (classLearner != null) {
            if ("unenrolled".equals(classLearner.getStatus())) {
                classLearner.setStatus("enrolled");
                classLearnerRepository.save(classLearner);
                return classRepository.save(classroom);
            } else {
                throw new ResourceNotFroundException("You are already in the class !");
            }
        }

        if(classroom.is_deleted() == true) {
            throw new ResourceNotFroundException("Class is not exist !");
        }

        classLearner = new ClassLearner();
        classLearner.setUser(user);
        classLearner.setClassroom(classroom);
        classLearner.setCreated_date(new Date());
        classLearner.setStatus("enrolled");
        classLearnerRepository.save(classLearner);

        return classRepository.save(classroom);
    }

    @Override
    public Map<String, Object> getFilterClassStudySet(String search, int studysetassigned, int studysetnotassigned, int page, int size) throws ResourceNotFroundException {

        int offset = (page - 1) * size;

        String query = "SELECT c.*\n" +
                "FROM class c\n" +
                "WHERE 1=1";

        Map<String, Object> parameters = new HashMap<>();

        if (studysetassigned != 0) {
            query += " AND EXISTS (SELECT 1 FROM class_studyset cs WHERE cs.class_id = c.id AND cs.sudyset_id = :studysetassigned)";
            parameters.put("studysetassigned", studysetassigned);
        }

        if (studysetnotassigned != 0) {
            query += " AND NOT EXISTS (SELECT 1 FROM class_studyset cs WHERE cs.class_id = c.id AND cs.sudyset_id = :studysetnotassigned)";
            parameters.put("studysetnotassigned", studysetnotassigned);
        }

        if (search != null && !search.isEmpty()) {
            query += "  AND class_name LIKE :search";
            parameters.put("search", "%" + search + "%");
        }


        Query q = em.createNativeQuery(query, Class.class);
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            q.setParameter(entry.getKey(), entry.getValue());
        }

        int totalItems = q.getResultList().size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        q.setFirstResult(offset);
        q.setMaxResults(size);

        List<Class> resultList = q.getResultList();

        Map<String, Object> response = new HashMap<>();
        response.put("list", resultList);
        response.put("currentPage", page);
        response.put("totalPages", totalPages);
        response.put("totalItems", totalItems);

        return response;
    }

    @Override
    public Boolean AssignStudyset(int classid, int studysetid) throws ResourceNotFroundException {
        Class classroom = classRepository.findById(classid)
                .orElseThrow(() -> new ResourceNotFroundException("Class not exist with id:" + classid));

        StudySet studySet = studySetRepository.findById(studysetid)
                .orElseThrow(() -> new ResourceNotFroundException("Studyset not exist with id:" + studysetid));

//        StudySet studySet_class = studySetService.createStudySet(studySet);

        classroom.getStudySets().add(studySet);
        classRepository.save(classroom);
        return true;
    }

    @Transactional
    @Override
    public Boolean UnassignStudyset(int classid, int studysetid) throws ResourceNotFroundException {
        Class classroom = classRepository.findById(classid)
                .orElseThrow(() -> new ResourceNotFroundException("Class not exist with id:" + classid));

        StudySet studySet = studySetRepository.findById(studysetid)
                .orElseThrow(() -> new ResourceNotFroundException("Studyset not exist with id:" + studysetid));

        classroom.getStudySets().remove(studySet);
        deleteClassStudyset(studySet.getId());

        classRepository.save(classroom);

        return true;
    }

    @Transactional
    public void deleteClassStudyset(int studysetid){

        String query = "DELETE FROM class_studyset where studyset_id = :studysetId";

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("studysetId", studysetid);

        em.createNativeQuery(query)
                .setParameter("studysetId", studysetid)
                .executeUpdate();

    }


    @Override
    public Class ResetClassCode(int id) throws ResourceNotFroundException {
        Class classroom = classRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Class not exist with id:" + id));
        String newCode = generateClassCode();
        classroom.setClasscode(newCode);
        return classRepository.save(classroom);
    }


    @Override
    public Boolean CheckUserClass(int userId, int classId) throws ResourceNotFroundException {
        Class classroom = classRepository.findById(classId)
                .orElseThrow(() -> new ResourceNotFoundException("Class not exist with id:" + classId));


        User user = userRepository.findUserById(userId);
        if (user == null) {
            throw new ResourceNotFroundException("User not exist with id: " + userId);
        }

        ClassLearner classLearner = classLearnerRepository.findByUserIdAndClassroomId(user.getId(),classroom.getId());
        if (classLearner!= null) {
            if(classLearner.getUser().getId() == userId && classLearner.getStatus().equals("enrolled")){
                return true;}
        }

        if (user.getUsername().equals(classroom.getUser().getUsername())) {
            return true;
        }


        return false;
    }

    @Override
    public Boolean CheckUserClassWaiting(int userId, int classId) throws ResourceNotFroundException {
        Class classroom = classRepository.findById(classId)
                .orElseThrow(() -> new ResourceNotFoundException("Class not exist with id:" + classId));


        User user = userRepository.findUserById(userId);
        if (user == null) {
            throw new ResourceNotFroundException("User not exist with id: " + userId);
        }

        ClassLearner classLearner = classLearnerRepository.findByUserIdAndClassroomId(user.getId(),classroom.getId());
        if (classLearner!= null) {
            if(classLearner.getUser().getId() == userId && classLearner.getStatus().equals("pending")){
                return true;}
        }
        return false;
    }


}

