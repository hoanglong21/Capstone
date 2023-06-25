package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.repository.AssignmentRepository;
import com.capstone.project.repository.AttachmentRepository;
import com.capstone.project.repository.SubmissionRepository;
import com.capstone.project.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class AssignmentServiceImpl implements AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final SubmissionRepository submissionRepository;

    private final AttachmentRepository attachmentRepository;

    @Autowired
    public AssignmentServiceImpl(AssignmentRepository assignmentRepository, SubmissionRepository submissionRepository, AttachmentRepository attachmentRepository) {
        this.assignmentRepository = assignmentRepository;
        this.submissionRepository = submissionRepository;
        this.attachmentRepository = attachmentRepository;
    }


    @Override
    public List<Assignment> getAllAssignment() {
        return assignmentRepository.findAll();
    }

    @Override
    public List<Assignment> getAllAssignmentByClassId(int id) {
        return assignmentRepository.getAssignmentByClassroomId(id);
    }

    @Override
    public Assignment createAssignment(Assignment assignment) throws ParseException {
        Date currentDate = new Date();
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        String formattedDate = dateFormat.format(currentDate);
        Date parsedDate = dateFormat.parse(formattedDate);
        assignment.setCreated_date(parsedDate);
        return assignmentRepository.save(assignment);
    }

    @Override
    public Assignment getAssignmentById(int id) {
        Assignment assignment = null;
        try {
            assignment = assignmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Assignment not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        return assignment;
    }

    @Override
    public Assignment updateAssignment(int id, Assignment assignment) throws ParseException {
        Assignment assignmentclass = null;
        try {
            assignmentclass = assignmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Assignment not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        Date currentDate = new Date();
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        String formattedDate = dateFormat.format(currentDate);
        Date parsedDate = dateFormat.parse(formattedDate);
        assignmentclass.setDescription(assignment.getDescription());
        assignmentclass.setDue_date(assignment.getDue_date());
        assignmentclass.setModified_date(parsedDate);
        assignmentclass.setTitle(assignment.getTitle());
        return assignmentRepository.save(assignmentclass);
    }

    @Override
    public Boolean deleteAssignment(int id) {
        Assignment assignmentclass = null;
        try {
            assignmentclass = assignmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Assignment not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
            return false;
        }

        for (Submission submission : submissionRepository.getSubmissionByAssignmentId(assignmentclass.getId())) {
            for (Attachment attachment : attachmentRepository.getAttachmentBySubmissionId(submission.getId())) {
               attachmentRepository.delete(attachment);
            }
            submissionRepository.delete(submission);
        }
        assignmentRepository.delete(assignmentclass);
        return true;
    }
    }

