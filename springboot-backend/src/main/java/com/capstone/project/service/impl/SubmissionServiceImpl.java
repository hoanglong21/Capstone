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
    public Submission createSubmission(Submission submission) {
        submission.setCreated_date(new Date());

        Submission savedSubmission = submissionRepository.save(submission);

//        if (file_names != null && urls != null && file_types != null  && type != 0) {
//            int numOfAttachments = Math.min(file_names.size(), Math.min(urls.size(), file_types.size()));
//            for (int i = 0; i < numOfAttachments; i++) {
//                String file_name = file_names.get(i);
//                String url = urls.get(i);
//                String file_type = file_types.get(i);
//
//                Attachment attachment = new Attachment();
//                attachment.setFile_name(file_name);
//                attachment.setFile_url(file_type);
//                attachment.setFile_url(url);
//
//                AttachmentType attachmentType = new AttachmentType();
//                attachmentType.setId(type);
//
//                attachment.setAttachmentType(attachmentType);
//                attachment.setSubmission(savedSubmission);
//
//                attachmentRepository.save(attachment);
//            }
//        }
            return savedSubmission;
    }

    @Override
    public Submission getSubmissionById(int id) throws ResourceNotFroundException {
        Submission submission = submissionRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Submission not exist with id:" + id));
        return submission;
    }

    @Override
    public Submission updateSubmission(int id, Submission submission) throws ResourceNotFroundException {
        Submission existingSubmission = submissionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Submission does not exist with id: " + id));

        existingSubmission.setDescription(submission.getDescription());
        existingSubmission.setModified_date(new Date());
        
        List<Attachment> attachments = attachmentRepository.getAttachmentBySubmissionId(existingSubmission.getId());

        for (Attachment attachment : attachments) {
            attachmentRepository.delete(attachment);
        }

//        if (file_names != null && urls != null && file_types != null  && type != 0) {
//            int numOfAttachments = Math.min(file_names.size(), Math.min(urls.size(), file_types.size()));
//            for (int i = 0; i < numOfAttachments; i++) {
//                String file_name = file_names.get(i);
//                String url = urls.get(i);
//                String file_type = file_types.get(i);
//
//                Attachment attachment = new Attachment();
//                attachment.setFile_name(file_name);
//                attachment.setFile_url(file_type);
//                attachment.setFile_url(url);
//
//                AttachmentType attachmentType = new AttachmentType();
//                attachmentType.setId(type);
//
//                attachment.setAttachmentType(attachmentType);
//                attachment.setSubmission(existingSubmission);
//
//                attachmentRepository.save(attachment);
//            }
//        }
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
