package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Class;
import com.capstone.project.model.Post;

import java.util.List;
import java.util.Map;

public interface PostService {

    List<Post> getAllPost();

    List<Post> getAllPostByClassId(int id);

    Post getPostById(int id) throws ResourceNotFroundException;

    Post createPost(Post post);

    Post updatePost( Post posts,  int id) throws ResourceNotFroundException;

    Boolean deletePost( int id) throws ResourceNotFroundException;

    Map<String, Object> getFilterPost(String search, String author, int classid, int page, int size) throws ResourceNotFroundException;
}
