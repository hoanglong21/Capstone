package com.capstone.project.service;

import com.capstone.project.model.Class;
import com.capstone.project.model.Post;

import java.util.List;

public interface PostService {
    List<Post> getAllPost();

    Post getPostById(int id);

    Post createPost(Post post);

    Post updatePost( Post posts,  int id);

    Boolean deletePost( int id);
}
