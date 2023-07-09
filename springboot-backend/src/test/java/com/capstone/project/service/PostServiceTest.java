package com.capstone.project.service;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.model.Class;
import com.capstone.project.repository.CommentRepository;
import com.capstone.project.repository.PostRepository;
import com.capstone.project.service.impl.PostServiceImpl;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    private PostServiceImpl postServiceImpl;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Order(1)
    @Test
    void testGetAllPost() {
        Post post = Post.builder().content("Deadline for assignment").build();

        List<Post> posts = List.of(post);
        when(postRepository.findAll()).thenReturn(posts);
        assertThat(postServiceImpl.getAllPost().size()).isGreaterThan(0);

    }

    @Order(2)
    @Test
    void testGetAllPostByClassId() {
        List<Post> posts = new ArrayList<>();
        Post post1 = Post.builder().content("Deadline for assignment1").build();
        Post post2 = Post.builder().content("Deadline for assignment2").build();
        posts.add(post1);
        posts.add(post2);

        when(postRepository.getPostByClassroomId(any(Integer.class))).thenReturn(posts);
        List<Post> retrievedPosts = postServiceImpl.getAllPostByClassId(1);
        assertThat(retrievedPosts).isEqualTo(posts);
    }

    @Order(3)
    @Test
    void testGetPostById() {
        Post post = Post.builder()
                .content("Deadline for assignment1").build();
        when(postRepository.findById(any())).thenReturn(Optional.ofNullable(post));
        try{
            Post getPost = postServiceImpl.getPostById(1);
            assertThat(getPost).isEqualTo(post);
        }catch (ResourceNotFroundException e){
            e.printStackTrace();
        }
    }

    @Order(4)
    @ParameterizedTest(name = "index => userId={0}, classId={1}, content{2}")
    @CsvSource({
            "1,1,Submit all assignment ",
            "2,2, Class will be off on Sunday "
    })
    public void testCreatePost(int userId,int classId,String content ){

        Post post = Post.builder()
                .user(User.builder().id(userId).build())
                .classroom(Class.builder().id(classId).build())
                .content(content)
                .build();

        when(postRepository.save(any())).thenReturn(post);
        Post createdpost = postServiceImpl.createPost(post);
        assertThat(post).isEqualTo(createdpost);
    }

    @Order(5)
    @ParameterizedTest(name = "index => userId={0}, classId={1}, content{2}")
    @CsvSource({
            "1,1,Submit all assignment ",
            "2,2, Class will be off on Sunday "
    })
    public void testUpdatePost(int userId,int classId,String content ){

        Post post_new = Post.builder()
                .content("Submit Test")
                .build();

        Post post = Post.builder()
                .user(User.builder().id(userId).build())
                .classroom(Class.builder().id(classId).build())
                .content(content)
                .build();

        when(postRepository.findById(any())).thenReturn(Optional.ofNullable(post_new));
        when(postRepository.save(any())).thenReturn(post);
    }

    @Order(6)
    @Test
    void testDeletePost() {
        Post post = Post.builder()
                .id(1)
                .user(User.builder().id(1).build())
                .classroom(Class.builder().id(1).build())
                .content("Submit Assignment Deadline")
                .build();

        Comment comment = Comment.builder()
                .commentType(CommentType.builder().id(1).build())
                .content("Hello")
                .build();

        doNothing().when(postRepository).delete(post);
        doNothing().when(commentRepository).delete(comment);

        when(postRepository.findById(1)).thenReturn(Optional.of(post));
        when(commentRepository.getCommentByPostId(1)).thenReturn(List.of(comment));

        try {
            postServiceImpl.deletePost(1);
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }

        verify(postRepository, times(1)).delete(post);
        verify(commentRepository, times(1)).delete(comment);
    }

}
