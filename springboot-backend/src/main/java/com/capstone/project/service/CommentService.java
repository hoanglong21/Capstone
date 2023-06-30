package com.capstone.project.service;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Comment;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface CommentService {

    List<Comment> getAllComment();
    List<Comment> getAllCommentByPostId(int id);
    List<Comment> getAllCommentByRootId(int id);
    List<Comment> getAllCommentByStudySetId(int id);
    List<Comment> getAllCommentByTestId(int id);

    Comment getCommentById(int id) throws ResourceNotFroundException;

    Comment createComment(Comment comment);

    Comment updateComment( Comment comment,  int id) throws ResourceNotFroundException;

    Boolean deleteComment (int id) throws ResourceNotFroundException;

    Map<String, Object> getFilterComment( String search, String author, int typeid,int postid,int testid,int studysetid,int rootid, int page, int size) throws ResourceNotFroundException;
}
