package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Assignment;
import com.capstone.project.repository.AssignmentRepository;
import com.capstone.project.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class AssignmentServiceImpl implements AssignmentService {

    private final AssignmentRepository assignmentRepository;

    @Autowired
    public AssignmentServiceImpl(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    @Override
    public List<Assignment> getAllAssignment() {
        return assignmentRepository.findAll();
    }

    @Override
    public Assignment createAssignment(Assignment assignment) {
        return assignmentRepository.save(assignment);
    }

    @Override
    public Assignment getAssignmentById(int id) {
        Assignment assignment = null;
        try {
            assignment = assignmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Assignment not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        return assignment;
    }

    @Override
    public Assignment updateAssignment(int id, Assignment assignment) throws ParseException {
        Assignment assignmentclass = null;
        try {
            assignmentclass = assignmentRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFroundException("Assignment not exist with id:" + id));
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        Date currentDate = new Date();
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        String formattedDate = dateFormat.format(currentDate);
        Date parsedDate = dateFormat.parse(formattedDate);
        assignmentclass.setDescription(assignment.getDescription());
        assignmentclass.setDue_date(assignment.getDue_date());
        assignmentclass.setModified_date(parsedDate);
        assignmentclass.setTitle(assignment.getTitle());
        return assignmentRepository.save(assignmentclass);
    }
    }

