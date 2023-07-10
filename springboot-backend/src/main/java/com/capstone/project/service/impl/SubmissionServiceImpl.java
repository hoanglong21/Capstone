package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.repository.AttachmentRepository;
import com.capstone.project.repository.SubmissionRepository;
import com.capstone.project.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class SubmissionServiceImpl implements SubmissionService {

    private final SubmissionRepository submissionRepository;

    private final AttachmentRepository attachmentRepository;

    @Autowired
    public SubmissionServiceImpl(SubmissionRepository submissionRepository, AttachmentRepository attachmentRepository) {
        this.submissionRepository = submissionRepository;
        this.attachmentRepository = attachmentRepository;
    }

    @Override
    public List<Submission> getAllSubmissionByAssignmentId(int id) {
        return submissionRepository.getSubmissionByAssignmentId(id);
    }

    @Override
    public List<Submission> getAllSubmission() {
        return submissionRepository.findAll();
    }


    @Override
    public Submission createSubmission(Submission submission,List<String> files, int type) {
        submission.setCreated_date(new Date());
        // Lưu submission
        Submission savedSubmission = submissionRepository.save(submission);

        if (files != null && !files.isEmpty() && type != 0) {
            for (String file : files) {
                if (file != null && !file.isEmpty()) {
                    Attachment attachment = new Attachment();
                    attachment.setFile(file);

                    AttachmentType attachmentType = new AttachmentType();
                    attachmentType.setId(type);

                    attachment.setAttachmentType(attachmentType);
                    attachment.setSubmission(savedSubmission);

                    attachmentRepository.save(attachment);
                }
            }
        }
            return savedSubmission;
    }

    @Override
    public Submission getSubmissionById(int id) throws ResourceNotFroundException {
        Submission submission = submissionRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Submission not exist with id:" + id));
        return submission;
    }

    @Override
    public Submission updateSubmission(int id, Submission submission, List<String> files, int type) throws ResourceNotFroundException {
        Submission existingSubmission = submissionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Submission does not exist with id: " + id));

        existingSubmission.setDescription(submission.getDescription());
        existingSubmission.setModified_date(new Date());

        if (files != null && !files.isEmpty()) {
            for (String file : files) {
                Attachment attachment = new Attachment();
                attachment.setFile(file);

                AttachmentType attachmentType = new AttachmentType();
                attachmentType.setId(type);

                attachment.setAttachmentType(attachmentType);
                attachment.setSubmission(existingSubmission);

                attachmentRepository.save(attachment);
            }
        }

        return submissionRepository.save(existingSubmission);
    }

    @Override
    public Boolean deleteSubmission(int id) throws ResourceNotFroundException {
        Submission submission_new  = submissionRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Submission not exist with id:" + id));
            for (Attachment attachment : attachmentRepository.getAttachmentBySubmissionId(submission_new.getId())) {
                attachmentRepository.delete(attachment);
            }

         submissionRepository.delete(submission_new);
        return true;
    }
    }
