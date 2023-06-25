package com.capstone.project.service;

import com.capstone.project.model.StudySet;
import com.capstone.project.model.Submission;

import java.text.ParseException;
import java.util.List;

public interface SubmissionService {

    List<Submission> getAllSubmissionByAssignmentId(int id);
    List<Submission> getAllSubmission();

    Submission createSubmission( Submission submission) throws ParseException;

    Submission getSubmissionById ( int id);

    Submission updateSubmission( int id, Submission submission);

    Boolean deleteSubmission( int id);

}
