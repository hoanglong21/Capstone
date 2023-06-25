package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Card;
import com.capstone.project.model.Class;
import com.capstone.project.model.Post;
import com.capstone.project.repository.ClassRepository;
import com.capstone.project.repository.PostRepository;
import com.capstone.project.repository.UserRepository;
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
    public List<Post> getAllPostByClassId(int id) {
        return postRepository.getPostByClassroomId(id);
    }

    @Override
    public Post getPostById(int id) {
        Post post = null;
        try{
            post = postRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Post not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
             return post;
    }

    @Override
    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Post posts, int id) {
        Post post = null;
        try {
            post = postRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Post not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        post.setContent(posts.getContent());
        return postRepository.save(post);
    }

    @Override
    public Boolean deletePost(int id) {
        Post post;
        try {
            post = postRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Post not exist with id: " + id));
        }catch (ResourceNotFroundException e) {
            e.printStackTrace();
            return false;
        }
        postRepository.delete(post);
        return true;
    }
    }
