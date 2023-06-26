package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.repository.AssignmentRepository;
import com.capstone.project.repository.AttachmentRepository;
import com.capstone.project.repository.SubmissionRepository;
import com.capstone.project.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
    public Assignment createAssignment(Assignment assignment) {
        assignment.setCreated_date(new Date());
        return assignmentRepository.save(assignment);
    }

    @Override
    public Assignment getAssignmentById(int id) throws ResourceNotFroundException {
        Assignment assignment = assignmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Assignment not exist with id:" + id));
        return assignment;
    }

    @Override
    public Assignment updateAssignment(int id, Assignment assignment) throws ResourceNotFroundException {
        Assignment assignmentclass = assignmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Assignment not exist with id:" + id));
        assignmentclass.setDescription(assignment.getDescription());
        assignmentclass.setDue_date(assignment.getDue_date());
        assignmentclass.setModified_date(new Date());
        assignmentclass.setTitle(assignment.getTitle());
        return assignmentRepository.save(assignmentclass);
    }

    @Override
    public Boolean deleteAssignment(int id) throws ResourceNotFroundException {
        Assignment assignmentclass = assignmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Assignment not exist with id:" + id));
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

