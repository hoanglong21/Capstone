package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Attachment;

import java.util.List;

public interface AttachmentService {

    List<Attachment> getAllAttachment();
    List<Attachment> getAllAttachmentBySubmissionId(int id);
    List<Attachment> getAllAttachmentByAssignmentId(int id);

    Attachment createAttachment( Attachment attachment);

    Attachment getAttachmentById( int id) throws ResourceNotFroundException;

    Attachment updateAttachment ( int id, Attachment attachment) throws ResourceNotFroundException;

    Boolean deleteAttachment ( int id) throws ResourceNotFroundException;
}
