package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.model.Class;
import com.capstone.project.repository.*;
import com.capstone.project.service.impl.AssignmentServiceImpl;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AssignmentServiceTest {

    @Mock
    private EntityManager em;

    @Mock
    private UserService userService;

    @Mock
    private ClassService classService;
    @Mock
    private AssignmentRepository assignmentRepository;
    @Mock
    private ClassRepository classRepository;

    @Mock
    private ClassLearnerRepository classLearnerRepository;

    @Mock
    private SubmissionRepository submissionRepository;

    @Mock
    private AttachmentRepository attachmentRepository;

    @Mock
    private Query query;

    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    private AssignmentServiceImpl assignmentServiceImpl;
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Order(1)
    @Test
    void testGetAllAssginment() {
        Assignment assignment = Assignment.builder()
                .instruction("Test for all")
                .title("PT1").build();
        List<Assignment> assignments = List.of(assignment);
        when(assignmentRepository.findAll()).thenReturn(assignments);
        assertThat(assignmentServiceImpl.getAllAssignment().size()).isGreaterThan(0);
    }

    @Order(2)
    @Test
    void testGetAllAssginmentByClassId() {
        List<Assignment> assignments = new ArrayList<>();
        Assignment assignment1 = Assignment.builder().instruction("test for all").title("assignment 1").build();
        Assignment assignment2 = Assignment.builder().instruction("test for all").title("assignment 2").build();
        assignments.add(assignment1);
        assignments.add(assignment2);

        when(assignmentRepository.getAssignmentByClassroomId(any(Integer.class))).thenReturn(assignments);
        List<Assignment> retrievedAssignment = assignmentServiceImpl.getAllAssignmentByClassId(1);
        assertThat(retrievedAssignment).isEqualTo(assignments);
    }

    @Order(3)
    @ParameterizedTest(name = "index => userId={0}, classId={1},instruction{2},due_date{3},modified_date{4},start_date{5} ,title{6}")
    @CsvSource({
            "1,3, Luyen thi JLPT N5,2023-7-1,2023-08-07,2023-08-30, On thi N3 ",
            "2,4, Luyen thi JLPT N4,2023-9-9,2023-08-07,2023-08-30, On thi N3 "
    })
    public void testCreateAssignment(int userId, int classId, String instruction, String due_date, String modified_date, String start_date, String title) {
        try {
            Class classroom = new Class();
            Assignment assignment = Assignment.builder()
                    .user(User.builder().id(userId).build())
                    .classroom(Class.builder().id(classId).build())
                    .instruction(instruction)
                    .due_date(dateFormat.parse(due_date))
                    .modified_date(dateFormat.parse(modified_date))
                    .start_date(dateFormat.parse(start_date))
                    .title(title)
                    .build();
            when(assignmentRepository.save(any())).thenReturn(assignment);
            when(classRepository.findClassById(anyInt())).thenReturn(classroom);
            Assignment createdassignment = assignmentServiceImpl.createAssignment(assignment);
            assertThat(assignment).isEqualTo(createdassignment);
        } catch (ParseException | ResourceNotFroundException e) {
            throw new RuntimeException(e);
        }
    }

    @Order(4)
    @Test
    void testGetAssignmentById() {
        Assignment assignment = Assignment.builder()
                .instruction("test for all")
                .title("assignment").build();
        when(assignmentRepository.findById(any())).thenReturn(Optional.ofNullable(assignment));
        try {
            Assignment getAssignment = assignmentServiceImpl.getAssignmentById(1);
            assertThat(getAssignment).isEqualTo(assignment);
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
    }


    @Order(5)
    @ParameterizedTest(name = "index => userId={0}, classId={1},created_date{2},description{3},due_date{4},modified_date{5},start_date{6} ,title{7}")
    @CsvSource({
            "1,3,2023-8-9, Luyen thi JLPT N5,2023-7-1,2023-8-7,2023-8-8, On thi N3 ",
            "2,4,2023-8-9, Luyen thi JLPT N4,2023-9-9,2023-8-7,2023-8-8, On thi N3 "
    })
    void testUpdateAssignment(int userId, int classId, String created_date, String instruction, String due_date, String modified_date, String start_date, String title) {
        try {

            Assignment assignment_new = Assignment.builder()
                    .instruction("Luyen de")
                    .title("Bt ngu phap N3")
                    .build();

            Assignment assignment = Assignment.builder()
                    .user(User.builder().id(userId).build())
                    .classroom(Class.builder().id(classId).build())
                    .created_date(dateFormat.parse(created_date))
                    .instruction(instruction)
                    .due_date(dateFormat.parse(due_date))
                    .modified_date(dateFormat.parse(modified_date))
                    .start_date(dateFormat.parse(start_date))
                    .title(title)
                    .build();
            when(assignmentRepository.findById(any())).thenReturn(Optional.ofNullable(assignment_new));
            when(assignmentRepository.save(any())).thenReturn(assignment);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Order(6)
    @Test
    void testDeleteAssignment() throws ResourceNotFroundException {

        Assignment assignment = new Assignment();
        assignment.setId(1);

        Submission submission = new Submission();
        submission.setId(2);

        Attachment attachment = new Attachment();
        attachment.setId(3);

        Comment comment = new Comment();
        comment.setId(4);

        when(assignmentRepository.findById(1)).thenReturn(Optional.of(assignment));
        when(submissionRepository.getSubmissionByAssignmentId(1)).thenReturn(List.of(submission));
        when(attachmentRepository.getAttachmentBySubmissionId(2)).thenReturn(List.of(attachment));
        when(attachmentRepository.getAttachmentByAssignmentId(1)).thenReturn(List.of(attachment));
        when(commentRepository.getCommentBySubmissionId(2)).thenReturn(List.of(comment));


        Boolean result = assignmentServiceImpl.deleteAssignment(1);

        assertTrue(result);
        
        verify(attachmentRepository, times(2)).delete(attachment);
        verify(commentRepository, times(1)).delete(any());
        verify(submissionRepository, times(1)).delete(submission);
        verify(assignmentRepository, times(1)).delete(assignment);
    }


    @Order(7)
    @ParameterizedTest(name = "index => search={0},author{1},fromStart{2}, toStart{3},fromCreated{4},toCreated{5} ,duedatefrom{6}, duedateto{7},isDraft{8},direction{9}, sortBy{10},classId={11}, page{12}, size{13}")
    @CsvSource({
            "Homework1,quantruong,2023-8-9,2023-8-15,2023-8-1,2023-8-5,2023-8-1,2023-8-5,true,DESC,created_date,1,1,5",
            "Homwork2,ngocnguyen,2023-8-9,2023-8-15,2023-8-1,2023-8-5,2023-8-1,2023-8-5,false,DESC,created_date,1,0,5",
            "Homwork2,ngocnguyen,2023-8-9,2023-8-15,2023-8-1,2023-8-5,2023-8-1,2023-8-5,false,DESC,created_date,1,0,2",
            "Homework1,quantruong,2023-8-9,2023-8-15,2023-8-1,2023-8-5,true,2023-8-1,2023-8-5,DESC,created_date,1,1,0",
            "Homework1,quantruong,2023-8-9,2023-8-15,2023-8-1,2023-8-5,true,2023-8-1,2023-8-5,DESC,created_date,1,1,-3",
    })
    public void testGetFilterAssignment(String search, String author, String fromStart, String toStart, String fromCreated, String toCreated,
                                        String duedatefrom, String duedateto,Boolean isDraft, String direction, String sortBy, int classid, int page, int size) {

        MockitoAnnotations.openMocks(this);
        Assignment assignment = Assignment.builder()
                .user(User.builder().build())
                .classroom(Class.builder().build())
                .instruction("do excersices")
                .title("Assignment 1")
                .build();


        Query mockedQuery = mock(Query.class);
        when(em.createNativeQuery(anyString(), eq(Assignment.class))).thenReturn(mockedQuery);
        when(mockedQuery.setParameter(anyString(), any())).thenReturn(mockedQuery);
        when(mockedQuery.setMaxResults(anyInt())).thenReturn(mockedQuery);
        when(mockedQuery.getResultList()).thenReturn(List.of(assignment));


        try {
            Map<String, Object> result = assignmentServiceImpl.getFilterAssignment(search, author, fromStart, toStart, fromCreated, toCreated,duedatefrom,duedateto, isDraft
                    , direction, sortBy, classid, page, size);
            assertThat(result.get("list")).isEqualTo(mockedQuery.getResultList());
        } catch (Exception e) {
            assertThat("Please provide valid page and size").isEqualTo(e.getMessage());
        }
    }


    @Order(8)
    @ParameterizedTest(name = "index => assignmentid={0},classid{1}")
    @CsvSource({
            "1,2",
            "2,1",
    })
    public void testgetNumSubmitAssignment(int assignmentid, int classid) throws ResourceNotFroundException {

        // Mock the behavior of EntityManager and Query
        Mockito.when(em.createNativeQuery(anyString())).thenReturn(query);
        Mockito.when(query.setParameter(anyString(), Mockito.any())).thenReturn(query);
        Mockito.when(query.getSingleResult()).thenReturn(new Object[]{1L, 2L});

        // Call the method to be tested
        Map<String, Object> result = assignmentServiceImpl.getNumSubmitAssignment(assignmentid, classid);

        // Verify the results
        assertEquals(1L, result.get("submitted"));
        assertEquals(2L, result.get("notsubmitted"));
    }

}




