package com.capstone.project.controller;

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
    public List<Attachment> getAllAttachments() {
        return attachmentService.getAllAttachments();
    }

    @PostMapping("/attachments")
    public Attachment createAttachment(@RequestBody Attachment attachment) {
        return attachmentService.createAttachment(attachment);
    }

    @GetMapping("/attachments/{id}")
    public ResponseEntity<Attachment> getAttachmentById(@PathVariable int id) {
        Attachment attachment = attachmentService.getAttachmentById(id);
        return ResponseEntity.ok(attachment);
    }

    @PutMapping("/attachments/{id}")
    public ResponseEntity<Attachment> updateAttachment(@PathVariable int id, @RequestBody Attachment attachment) {
        Attachment attachment_new = attachmentService.updateAttachment(id,attachment);
        return ResponseEntity.ok(attachment_new);
    }

    @DeleteMapping("/attachments/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteAttachment(@PathVariable int id) {
        boolean deleted = attachmentService.deleteAttachment(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

}
