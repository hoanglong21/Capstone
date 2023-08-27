package com.capstone.project.service;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.model.Class;
import com.capstone.project.repository.*;
import com.capstone.project.service.impl.PostServiceImpl;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class PostServiceTest {

    @Mock
    private EntityManager em;
    @Mock
    private PostRepository postRepository;
    @Mock
    private ClassRepository classRepository;

    @Mock
    private ClassLearnerRepository classLearnerRepository;
    @Mock
    private AttachmentRepository attachmentRepository;

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
        Class classroom = new Class();
        when(postRepository.save(any())).thenReturn(post);
        when(classRepository.findClassById(anyInt())).thenReturn(classroom);
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
    void testDeletePost() throws ResourceNotFroundException {

        Post post = new Post();
        post.setId(1);

        Comment rootComment = new Comment();
        rootComment.setId(2);

        Comment childComment = new Comment();
        childComment.setId(3);

        Attachment attachment = new Attachment();
        attachment.setId(4);


        when(postRepository.findById(1)).thenReturn(Optional.of(post));
        when(commentRepository.getCommentByPostId(1)).thenReturn(List.of(rootComment));
        when(commentRepository.getCommentByRootId(2)).thenReturn(List.of(childComment));
        when(attachmentRepository.getAttachmentByPostId(1)).thenReturn(List.of(attachment));

        Boolean result = postServiceImpl.deletePost(1);

        assertTrue(result);

        verify(commentRepository, times(2)).delete(any());
        verify(attachmentRepository, times(1)).delete(attachment);
        verify(postRepository, times(1)).delete(post);
    }

    @Order(7)
    @ParameterizedTest(name = "index => search={0},author{1},fromCreated{2}, toCreated{3}, sortBy{4},direction{5}, classId{6}, page{7}, size{8}")
    @CsvSource({
            "Review test,quantruong,2023-8-9,2023-8-15,created_date,DESC,1,1,5",
            "Guide slide,ngocnguyen,2023-8-9,2023-8-15,created_date,DESC,1,0,5",
            "Review test,quantruong,2023-8-9,2023-8-15,created_date,DESC,1,1,-5",
            "Guide slide,ngocnguyen,2023-8-9,2023-8-15,created_date,DESC,1,1,0",
    })
    public void testGetFilterPost(String search, String author,String fromCreated,String toCreated,String sortBy, String direction, int classid,
                                  int page, int size) throws ResourceNotFroundException {

        MockitoAnnotations.openMocks(this);
        Post post = Post.builder()
                .id(1)
                .user(User.builder().id(1).build())
                .classroom(Class.builder().id(1).build())
                .content("Submit Assignment Deadline")
                .build();
        Query mockedQuery = mock(Query.class);
        when(em.createNativeQuery(anyString(),eq(Post.class))).thenReturn(mockedQuery);
        when(mockedQuery.setParameter(anyString(), any())).thenReturn(mockedQuery);
        when(mockedQuery.getResultList()).thenReturn(List.of(post));
        try {
            Map<String, Object> result = postServiceImpl.getFilterPost(search, author, fromCreated, toCreated, sortBy, direction, classid, page, size);
            assertThat(result.get("list")).isEqualTo(mockedQuery.getResultList());
        } catch (Exception e) {
            assertThat("Please provide valid page and size").isEqualTo(e.getMessage());
        }

    }

}
