package com.capstone.project.service.impl;

import com.capstone.project.exception.DuplicateValueException;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.model.Class;
import com.capstone.project.repository.*;
import com.capstone.project.service.ClassService;
import com.capstone.project.service.UserService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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
    private final CommentRepository commentRepository;
    private final AssignmentRepository assignmentRepository;
    private final AttachmentRepository attachmentRepository;
    private final SubmissionRepository submissionRepository;
    private final UserRepository userRepository;

    private final UserService userService;

    @Autowired
    public ClassServiceImpl(ClassRepository classRepository, PostRepository postRepository, CommentRepository commentRepository, AssignmentRepository assignmentRepository, AttachmentRepository attachmentRepository, SubmissionRepository submissionRepository, UserRepository userRepository, UserService userService) {
        this.classRepository = classRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
        this.assignmentRepository = assignmentRepository;
        this.attachmentRepository = attachmentRepository;
        this.submissionRepository = submissionRepository;
        this.userRepository = userRepository;
        this.userService = userService;
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
        classroom.setDeleted_date(classrooms.getDeleted_date());
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
            for(Comment comment : commentRepository.getCommentByPostId(post.getId())){
                commentRepository.delete(comment);
            }
            postRepository.delete(post);
        }
        for(Assignment assignment : assignmentRepository.getAssignmentByClassroomId(classroom.getId())){
            for(Submission submission : submissionRepository.getSubmissionByAssignmentId(assignment.getId())){
                for(Attachment attachment : attachmentRepository.getAttachmentBySubmissionId(submission.getId())){
                    attachmentRepository.delete(attachment);
                }
                submissionRepository.delete(submission);
            }
            assignmentRepository.delete(assignment);
        }
        classRepository.delete(classroom);
        return true;
    }

    @Override
    public Map<String, Object> getFilterClass(Boolean isDeleted, String search, String author, String from, String to, int page, int size) throws ResourceNotFroundException {
        int offset = (page - 1) * size;

        String query ="SELECT * FROM class WHERE 1=1";

        Map<String, Object> parameters = new HashMap<>();

        if (isDeleted != null && isDeleted) {
            query += " AND is_deleted = :isDeleted";
            parameters.put("isDeleted", true);

        }

        if (author != null && !author.isEmpty()) {
            query += " AND author_id = :authorId OR EXISTS (SELECT * FROM class_learner cl WHERE cl.class_id = capstone.class.id AND cl.user_id = :authorId)";
            User user = userService.getUserByUsername(author);
            parameters.put("authorId", user.getId());
        }

        if (search != null && !search.isEmpty()) {
            query += " AND (class_name LIKE :search OR description LIKE :search)";
            parameters.put("search", "%" + search + "%");
        }

        if ((isDeleted == null || isDeleted)) {
            if (from != null) {
                query += " AND deleted_date >= :from";
                parameters.put("from", from);
            }
            if (to != null) {
                query += " AND deleted_date <= :to";
                parameters.put("to", to);
            }
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


        if (classroom.getUsers().contains(user)) {
            throw new ResourceNotFroundException("You are already in the class !");
        }

        if(classroom.is_deleted() ==true){
            throw new ResourceNotFroundException("Class is not exist !");
        }

        // add user to classroom
        classroom.getUsers().add(user);
        return classRepository.save(classroom);
    }

    @Override
    public Class ResetClassCode(int id) throws ResourceNotFroundException {
        Class classroom = classRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Class not exist with id:" + id));
        String newCode = generateClassCode();
        classroom.setClasscode(newCode);
        return classRepository.save(classroom);
    }


}

