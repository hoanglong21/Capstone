package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.repository.CommentRepository;
import com.capstone.project.service.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CommentServiceImpl implements CommentService {


    @PersistenceContext
    private EntityManager em;
    private final CommentRepository commentRepository;

    private final UserService userService;
    private final CommentTypeService commentTypeService;
    private final PostService postService;
    private final TestService testService;
    private final StudySetService studySetService;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, UserService userService, CommentTypeService commentTypeService, PostService postService, TestService testService, StudySetService studySetService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
        this.commentTypeService = commentTypeService;
        this.postService = postService;
        this.testService = testService;
        this.studySetService = studySetService;
    }


    @Override
    public List<Comment> getAllComment() {
        return commentRepository.findAll();
    }

    @Override
    public List<Comment> getAllCommentByPostId(int id) {
        return commentRepository.getCommentByPostId(id);
    }

    @Override
    public List<Comment> getAllCommentByRootId(int id) {
        return commentRepository.getCommentByRootId(id);
    }

    @Override
    public List<Comment> getAllCommentByStudySetId(int id) {
        return commentRepository.getCommentByStudySetId(id);
    }

    @Override
    public List<Comment> getAllCommentByTestId(int id) {
        return commentRepository.getCommentByTestId(id);
    }

    @Override
    public Comment getCommentById(int id) throws ResourceNotFroundException {
        Comment comment = commentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Comment not exist with id:" + id));
        return comment;
    }

    @Override
    public Comment createComment(Comment comment) {
        comment.setCreated_date(new Date());
        return commentRepository.save(comment);
    }

    @Override
    public Comment updateComment(Comment comment, int id) throws ResourceNotFroundException {
        Comment comment_new = commentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Comment not exist with id:" + id));
        comment_new.setContent(comment.getContent());
        return commentRepository.save(comment_new);
    }

    @Override
    public Boolean deleteComment(int id) throws ResourceNotFroundException {
        Comment comment = commentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Comment not exist with id:" + id));
        commentRepository.delete(comment);
        return true;
    }

    @Override
    public Map<String, Object> getFilterComment( String search, String author,String direction, int typeid,int postid, int testid,int studysetid, int rootid, int page, int size) throws ResourceNotFroundException {
        int offset = (page - 1) * size;

        String query = "SELECT * FROM comment WHERE 1=1";

        Map<String, Object> parameters = new HashMap<>();

        if (author != null && !author.isEmpty()) {
            query += " AND author_id = :authorId";
            User user = userService.getUserByUsername(author);
            parameters.put("authorId", user.getId());
        }

        if (postid != 0) {
            query += " AND post_id = :postId";
            Post post = postService.getPostById(postid);
            parameters.put("postId",  post.getId());
        }

        if (studysetid != 0) {
            query += " AND studyset_id = :studysetId";
            StudySet studySet = studySetService.getStudySetById(studysetid);
            parameters.put("studysetId",  studySet.getId());
        }


        if (testid != 0) {
            query += " AND test_id = :testId";
            Test test = testService.getTestById(testid);
            parameters.put("testId",  test.getId());
        }

        if (rootid != 0) {
            query += " AND root_id = :rootId";
            Comment comment = getCommentById(rootid);
            parameters.put("rootId", comment.getId());
        }

        if (typeid != 0) {
            query += " AND type_id = :typeId";
            CommentType commentType = commentTypeService.getCommentTypeById(typeid);
            parameters.put("typeId", commentType.getId());
        }

//        if (type != null && !type.isEmpty()) {
//            query += " AND type_id = :typeId";
//            CommentType commentType = commentTypeService.getCommentTypeByName(type);
//            parameters.put("typeId", commentType.getId());
//        }

        if (search != null && !search.isEmpty()) {
            query += " AND content LIKE :search ";
            parameters.put("search", "%" + search + "%");
        }


        String direct = "desc";
        if(direction != null && !direction.isEmpty()){
            if (direction.equalsIgnoreCase("asc")) {
                direct = "asc";
            }
        }
        query += " ORDER BY created_date " + " " + direct;

        Query q = em.createNativeQuery(query, Comment.class);
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            q.setParameter(entry.getKey(), entry.getValue());
        }

        int totalItems = q.getResultList().size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        q.setFirstResult(offset);
        q.setMaxResults(size);

        List<Comment> resultList = q.getResultList();

        Map<String, Object> response = new HashMap<>();
        response.put("list", resultList);
        response.put("currentPage", page);
        response.put("totalPages", totalPages);
        response.put("totalItems", totalItems);
        return response;
    }
}
