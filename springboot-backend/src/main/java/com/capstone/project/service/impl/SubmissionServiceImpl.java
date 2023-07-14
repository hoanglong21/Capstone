package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.model.Class;
import com.capstone.project.repository.AttachmentRepository;
import com.capstone.project.repository.SubmissionRepository;
import com.capstone.project.service.SubmissionService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SubmissionServiceImpl implements SubmissionService {

    @PersistenceContext
    private EntityManager em;
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
        existingSubmission.setMark(submission.getMark());
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

    @Override
    public Map<String, Object> getFilterSubmission(String search, int authorId, double mark, String from, String to, String direction, int page, int size) throws ResourceNotFroundException {
        int offset = (page - 1) * size;
        String query ="SELECT * FROM submission WHERE 1=1";

        Map<String, Object> parameters = new HashMap<>();


        if (search != null && !search.isEmpty()) {
            query += " AND description LIKE :search ";
            parameters.put("search", "%" + search + "%");
        }

        if (authorId != 0) {
            query += " AND author_id = :authorId";
            parameters.put("authorId", authorId);
        }

        if (mark != 0) {
            query += " AND mark = :mark";
            parameters.put("mark", mark);
        }

        if (from != null) {
            query += " AND created_date >= :from";
            parameters.put("from", from);
        }
        if (to != null) {
            query += " AND created_date <= :to";
            parameters.put("to", to);
        }

        String direct = "desc";
        if(direction != null && !direction.isEmpty()){
            if (direction.equalsIgnoreCase("asc")) {
                direct = "asc";
            }
        }
        query += " ORDER BY created_date " + " " + direct;

        Query q = em.createNativeQuery(query, Submission.class);
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            q.setParameter(entry.getKey(), entry.getValue());
        }

        int totalItems = q.getResultList().size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        q.setFirstResult(offset);
        q.setMaxResults(size);


        List<Submission> resultList = q.getResultList();

        Map<String, Object> response = new HashMap<>();
        response.put("list", resultList);
        response.put("currentPage", page);
        response.put("totalPages", totalPages);
        response.put("totalItems", totalItems);

        return response;
    }


}
