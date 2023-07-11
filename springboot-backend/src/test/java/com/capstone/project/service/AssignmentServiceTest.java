package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.model.Class;
import com.capstone.project.repository.AssignmentRepository;
import com.capstone.project.repository.AttachmentRepository;
import com.capstone.project.repository.SubmissionRepository;
import com.capstone.project.service.impl.AssignmentServiceImpl;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AssignmentServiceTest {

    @Mock
    private AssignmentRepository assignmentRepository;

    @Mock
    private SubmissionRepository submissionRepository;

    @Mock
    private  AttachmentRepository attachmentRepository;

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

//    @Order(3)
//    @ParameterizedTest(name = "index => userId={0}, classId={1},created_date{2},description{3},due_date{4},modified_date{5},start_date{6} ,title{7}")
//    @CsvSource({
//            "1,3,2023-8-9, Luyen thi JLPT N5,2023-7-1,2023-8-7,2023-8-8, On thi N3 ",
//            "2,4,2023-8-9, Luyen thi JLPT N4,2023-9-9,2023-8-7,2023-8-8, On thi N3 "
//    })
//    public void testCreateAssignment(int userId,int classId, String created_date,String description,String due_date,String modified_date,String start_date,String title){
//        try {
//            Assignment assignment = Assignment.builder()
//                    .user(User.builder().id(userId).build())
//                    .classroom(Class.builder().id(classId).build())
//                    .created_date(dateFormat.parse(created_date))
//                    .description(description)
//                    .due_date(dateFormat.parse(due_date))
//                    .modified_date(dateFormat.parse(modified_date))
//                    .start_date(dateFormat.parse(start_date))
//                    .title(title)
//                    .build();
//            when(assignmentRepository.save(any())).thenReturn(assignment);
//            Assignment createdassignment = assignmentServiceImpl.createAssignment(assignment);
//            assertThat(assignment).isEqualTo(createdassignment);
//        } catch (ParseException e){
//            throw new RuntimeException(e);
//        }
//    }

    @Order(4)
    @Test
    void testGetAssignmentById() {
        Assignment assignment = Assignment.builder()
                .instruction("test for all")
                .title("assignment").build();
        when(assignmentRepository.findById(any())).thenReturn(Optional.ofNullable(assignment));
        try{
            Assignment getAssignment = assignmentServiceImpl.getAssignmentById(1);
            assertThat(getAssignment).isEqualTo(assignment);
        }catch (ResourceNotFroundException e){
            e.printStackTrace();
        }
    }


    @Order(5)
    @ParameterizedTest(name = "index => userId={0}, classId={1},created_date{2},description{3},due_date{4},modified_date{5},start_date{6} ,title{7}")
    @CsvSource({
            "1,3,2023-8-9, Luyen thi JLPT N5,2023-7-1,2023-8-7,2023-8-8, On thi N3 ",
            "2,4,2023-8-9, Luyen thi JLPT N4,2023-9-9,2023-8-7,2023-8-8, On thi N3 "
    })
    void testUpdateAssignment(int userId,int classId, String created_date,String instruction,String due_date,String modified_date,String start_date,String title) {
           try{

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
           }catch (Exception e){
               e.printStackTrace();
           }
    }

    @Order(6)
    @Test
    void testDeleteAssignment() {

        Assignment assignment = Assignment.builder()
                .id(1)
                .user(User.builder().id(2).build())
                .classroom(Class.builder().id(2).build())
                .instruction("do excersices")
                .title("Assignment 1")
                .build();

        Submission submission = Submission.builder()
                .id(1)
                .description("submit assignment")
                .assignment(assignment).build();

        Attachment attachment = Attachment.builder()
                .attachmentType(AttachmentType.builder().id(1).build())
                .file_url("tailieu.docx")
                .assignment(assignment)
                .submission(submission).build();

        doNothing().when(assignmentRepository).delete(assignment);
        doNothing().when(submissionRepository).delete(submission);
        doNothing().when(attachmentRepository).delete(attachment);

        when(assignmentRepository.findById(any())).thenReturn(Optional.ofNullable(assignment));
        doNothing().when(assignmentRepository).delete(assignment);

        when(assignmentRepository.findById(1)).thenReturn(Optional.of(assignment));
        when(submissionRepository.getSubmissionByAssignmentId(1)).thenReturn(List.of(submission));
        when(attachmentRepository.getAttachmentBySubmissionId(1)).thenReturn(List.of(attachment));

        try {
            assignmentServiceImpl.deleteAssignment(1);
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }

        verify(assignmentRepository, times(1)).delete(assignment);
        verify(submissionRepository, times(1)).delete(submission);
        verify(attachmentRepository, times(1)).delete(attachment);
    }


    }




