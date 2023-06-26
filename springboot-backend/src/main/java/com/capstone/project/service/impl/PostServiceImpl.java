package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Post;
import com.capstone.project.repository.PostRepository;
import com.capstone.project.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }


    @Override
    public List<Post> getAllPost() {
        return postRepository.findAll();
    }

    @Override
    public List<Post> getAllPostByClassId(int id) {
        return postRepository.getPostByClassroomId(id);
    }

    @Override
    public Post getPostById(int id) throws ResourceNotFroundException {
        Post post = postRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Post not exist with id:" + id));
             return post;
    }

    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Post posts, int id) throws ResourceNotFroundException {
        Post post = postRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Post not exist with id:" + id));
        post.setContent(posts.getContent());
        return postRepository.save(post);
    }

    @Override
    public Boolean deletePost(int id) throws ResourceNotFroundException {
        Post post = postRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Post not exist with id: " + id));
        postRepository.delete(post);
        return true;
    }
    }
