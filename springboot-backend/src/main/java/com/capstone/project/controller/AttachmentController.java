package com.capstone.project.controller;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Attachment;
import com.capstone.project.service.AttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class AttachmentController {

    private final AttachmentService attachmentService;

    @Autowired
    public AttachmentController(AttachmentService attachmentService) {
        this.attachmentService = attachmentService;
    }


    @GetMapping("/attachments")
    public ResponseEntity<?> getAllAttachments() {
        return ResponseEntity.ok( attachmentService.getAllAttachment());
    }
    @GetMapping("/attachmentsbysubmissionid/{id}")
    public ResponseEntity<?> getAllAttachmentsBySubmissionId(@PathVariable int id) {
       return ResponseEntity.ok( attachmentService.getAllAttachmentBySubmissionId(id));
    }

    @GetMapping("/attachmentsbyassignmentid/{id}")
    public ResponseEntity<?> getAllAttachmentsByAssignmentId(@PathVariable int id) {
        return ResponseEntity.ok( attachmentService.getAllAttachmentByAssignmentId(id));
    }
    @GetMapping("/attachments/{id}")
    public ResponseEntity<?> getAttachmentById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(attachmentService.getAttachmentById(id));
        } catch(ResourceNotFroundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/attachments")
    public ResponseEntity<?> createAttachment(@RequestBody Attachment attachment) {
        return ResponseEntity.ok(attachmentService.createAttachment(attachment));
    }



    @PutMapping("/attachments/{id}")
    public ResponseEntity<?> updateAttachment(@PathVariable int id, @RequestBody Attachment attachment) {
           try {
               return ResponseEntity.ok(attachmentService.updateAttachment(id, attachment));
           } catch (ResourceNotFroundException e){
               return ResponseEntity.badRequest().body(e.getMessage());
           }
    }

    @DeleteMapping("/attachments/{id}")
    public ResponseEntity<?> deleteAttachment(@PathVariable int id) {
        try {
            return ResponseEntity.ok(attachmentService.deleteAttachment(id));
        } catch (ResourceNotFroundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
