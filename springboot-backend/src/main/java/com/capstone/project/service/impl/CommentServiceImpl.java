package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Class;
import com.capstone.project.model.Comment;
import com.capstone.project.model.Content;
import com.capstone.project.repository.CommentRepository;
import com.capstone.project.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
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
    }
