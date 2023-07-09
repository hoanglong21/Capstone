package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Attachment;
import com.capstone.project.repository.AttachmentRepository;
import com.capstone.project.service.AttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AttachmentImpl implements AttachmentService {

    private final AttachmentRepository attachmentRepository;

    @Autowired
    public AttachmentImpl(AttachmentRepository attachmentRepository) {
        this.attachmentRepository = attachmentRepository;
    }


    @Override
    public List<Attachment> getAllAttachment() {
        return attachmentRepository.findAll();
    }

    @Override
    public List<Attachment> getAllAttachmentBySubmissionId(int id) {
        return attachmentRepository.getAttachmentBySubmissionId(id);
    }

    @Override
    public List<Attachment> getAllAttachmentByAssignmentId(int id) {
        return attachmentRepository.getAttachmentByAssignmentId(id);
    }


    @Override
    public Attachment createAttachment(Attachment attachment) {
        return attachmentRepository.save(attachment);
    }

    @Override
    public Attachment getAttachmentById(int id) throws ResourceNotFroundException {
        Attachment attachment = attachmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Attachment not exist with id: " + id));
        return attachment;
    }

    @Override
    public Attachment updateAttachment(int id, Attachment attachment) throws ResourceNotFroundException {
        Attachment attachment_new = attachmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Attachment not exist with id: " + id));
        attachment_new.setFile(attachment.getFile());
        attachment_new.setAttachmentType(attachment.getAttachmentType());
        return attachmentRepository.save(attachment_new);
    }

    @Override
    public Boolean deleteAttachment(int id) throws ResourceNotFroundException {
        Attachment attachment = attachmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Attachment not exist with id:" + id));
        attachmentRepository.delete(attachment);
        return true;
    }
    }