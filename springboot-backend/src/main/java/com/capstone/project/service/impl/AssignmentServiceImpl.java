package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.model.Class;
import com.capstone.project.repository.AssignmentRepository;
import com.capstone.project.repository.AttachmentRepository;
import com.capstone.project.repository.SubmissionRepository;
import com.capstone.project.service.AssignmentService;
import com.capstone.project.service.ClassService;
import com.capstone.project.service.UserService;
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
public class AssignmentServiceImpl implements AssignmentService {

    @PersistenceContext
    private EntityManager em;

    private final AssignmentRepository assignmentRepository;
    private final SubmissionRepository submissionRepository;

    private final AttachmentRepository attachmentRepository;

    private final UserService userService;
    private final ClassService classService;

    @Autowired
    public AssignmentServiceImpl(AssignmentRepository assignmentRepository, SubmissionRepository submissionRepository, AttachmentRepository attachmentRepository, UserService userService, ClassService classService) {
        this.assignmentRepository = assignmentRepository;
        this.submissionRepository = submissionRepository;
        this.attachmentRepository = attachmentRepository;
        this.userService = userService;
        this.classService = classService;
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

        Assignment savedAssignment = assignmentRepository.save(assignment);

//        if (file_names != null && urls != null && file_types != null  && type != 0) {
//            int numOfAttachments = Math.min(file_names.size(), Math.min(urls.size(), file_types.size()));
//            for (int i = 0; i < numOfAttachments; i++) {
//                String file_name = file_names.get(i);
//                String url = urls.get(i);
//                String file_type = file_types.get(i);
//
//                Attachment attachment = new Attachment();
//                attachment.setFile_name(file_name);
//                attachment.setFile_type(file_type);
//                attachment.setFile_url(url);
//
//                AttachmentType attachmentType = new AttachmentType();
//                attachmentType.setId(type);
//
//                attachment.setAttachmentType(attachmentType);
//                attachment.setAssignment(savedAssignment);
//
//                attachmentRepository.save(attachment);
//            }
//        }

        return savedAssignment;
    }

    @Override
    public Assignment getAssignmentById(int id) throws ResourceNotFroundException {
        Assignment assignment = assignmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Assignment not exist with id:" + id));
        return assignment;
    }

    @Override
    public Assignment updateAssignment(int id, Assignment assignment) throws ResourceNotFroundException {
        Assignment existingAssignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Assignment does not exist with id: " + id));
        if (assignment.getStart_date() != null && existingAssignment.getCreated_date() != null &&
                assignment.getStart_date().before(existingAssignment.getCreated_date())) {
            throw new ResourceNotFroundException("Start date must be >= created date");
        }
        existingAssignment.setInstruction(assignment.getInstruction());
        existingAssignment.setDue_date(assignment.getDue_date());
        existingAssignment.setModified_date(new Date());
        existingAssignment.setStart_date(assignment.getStart_date());
        existingAssignment.setTitle(assignment.getTitle());
        existingAssignment.set_draft(assignment.is_draft());

        List<Attachment> attachments = attachmentRepository.getAttachmentByAssignmentId(existingAssignment.getId());

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
//                attachment.setFile_type(file_type);
//                attachment.setFile_url(url);
//
//                AttachmentType attachmentType = new AttachmentType();
//                attachmentType.setId(type);
//
//                attachment.setAttachmentType(attachmentType);
//                attachment.setAssignment(existingAssignment);
//
//                attachmentRepository.save(attachment);
//            }
//        }
        return assignmentRepository.save(existingAssignment);
    }

    @Override
    public Boolean deleteAssignment(int id) throws ResourceNotFroundException {
        Assignment assignmentclass = assignmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Assignment not exist with id:" + id));
        for (Submission submission : submissionRepository.getSubmissionByAssignmentId(assignmentclass.getId())) {
            submissionRepository.delete(submission);
        }
        for (Attachment attachment : attachmentRepository.getAttachmentByAssignmentId(assignmentclass.getId())) {
            attachmentRepository.delete(attachment);
        }
        assignmentRepository.delete(assignmentclass);
        return true;
    }

    @Override
    public Map<String, Object> getFilterAssignment(String search, String author, String from, String to,Boolean isDraft,String direction,int classid ,int page, int size) throws ResourceNotFroundException {
        int offset = (page - 1) * size;

        String query ="SELECT * FROM assignment WHERE 1=1";

        Map<String, Object> parameters = new HashMap<>();

        if (author != null && !author.isEmpty()) {
            query += " AND author_id = :authorId";
            User user = userService.getUserByUsername(author);
            parameters.put("authorId", user.getId());
        }

        if (search != null && !search.isEmpty()) {
            query += " AND (title LIKE :search OR description LIKE :search)";
            parameters.put("search", "%" + search + "%");
        }

        if (classid != 0) {
            query += " AND class_id = :classId";
            Class classroom = classService.getClassroomById(classid);
            parameters.put("classId", classroom.getId());
        }

        if (isDraft != null) {
            query += " AND is_draft = :isDraft";
            parameters.put("isDraft", isDraft);
        }

        if(from != null){
            query += " AND start_date >= :from ";
            parameters.put("from", from);
        }

        if(to != null){
            query += " AND start_date <= :to";
            parameters.put("to", to);
        }

        String direct = "desc";
        if(direction != null && !direction.isEmpty()){
            if (direction.equalsIgnoreCase("asc")) {
                direct = "asc";
            }
        }
        query += " ORDER BY created_date " + " " + direct;

        Query q = em.createNativeQuery(query, Assignment.class);
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            q.setParameter(entry.getKey(), entry.getValue());
        }

        int totalItems = q.getResultList().size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        q.setFirstResult(offset);
        q.setMaxResults(size);

        List<Assignment> resultList = q.getResultList();

        Map<String, Object> response = new HashMap<>();
        response.put("list", resultList);
        response.put("currentPage", page);
        response.put("totalPages", totalPages);
        response.put("totalItems", totalItems);

        return response;
    }
}

