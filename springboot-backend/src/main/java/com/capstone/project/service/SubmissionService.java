package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.StudySet;
import com.capstone.project.model.Submission;

import java.text.ParseException;
import java.util.List;

public interface SubmissionService {

    List<Submission> getAllSubmissionByAssignmentId(int id);
    List<Submission> getAllSubmission();

//    Submission createSubmission(Submission submission, List<String> file_names, int type, List<String> urls, List<String> file_types);

    Submission createSubmission(Submission submission);

    Submission getSubmissionById (int id) throws ResourceNotFroundException;

//    Submission updateSubmission(int id, Submission submission, List<String> file_names, int type, List<String> urls, List<String> file_types) throws ResourceNotFroundException;

    Submission updateSubmission(int id, Submission submission) throws ResourceNotFroundException;

    Boolean deleteSubmission(int id) throws ResourceNotFroundException;


}
