package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Attachment;
import com.capstone.project.repository.AttachmentRepository;
import com.capstone.project.service.AttachmentService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AttachmentImpl implements AttachmentService {

    private final AttachmentRepository attachmentRepository;

    public AttachmentImpl(AttachmentRepository attachmentRepository) {
        this.attachmentRepository = attachmentRepository;
    }

    @Override
    public List<Attachment> getAllAttachments() {
        return attachmentRepository.findAll();
    }

    @Override
    public Attachment createAttachment(Attachment attachment) {
        return attachmentRepository.save(attachment);
    }

    @Override
    public Attachment getAttachmentById(int id) {
        Attachment attachment = null;
        try {
            attachment = attachmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Attachment not exist with id: " + id));
        }catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        return attachment;
    }

    @Override
    public Attachment updateAttachment(int id, Attachment attachment) {
        Attachment attachment_new = null;
        try {
            attachment_new = attachmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Attachment not exist with id: " + id));
        }catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        attachment_new.setFile(attachment.getFile());
        return attachmentRepository.save(attachment_new);
    }

    @Override
    public Boolean deleteAttachment(int id) {
        Attachment attachment = null;
        try {
            attachment = attachmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Attachment not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
            return false;
        }
        attachmentRepository.delete(attachment);
        return true;
    }
    }