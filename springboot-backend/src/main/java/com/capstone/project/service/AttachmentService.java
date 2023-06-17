package com.capstone.project.service;

import com.capstone.project.model.Attachment;

import java.util.List;

public interface AttachmentService {

    List<Attachment> getAllAttachments();

    Attachment createAttachment( Attachment attachment);

    Attachment getAttachmentById( int id);

    Attachment updateAttachment ( int id, Attachment attachment);

    Boolean deleteAttachment ( int id);
}
