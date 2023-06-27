package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Progress;

import java.util.List;

public interface ProgressService {

    List<Progress> getAllProgresses();

    Progress createProgress(Progress progress);

    Progress getProgressById(int id) throws ResourceNotFroundException;

    Progress updateProgress(int id, Progress progressDetails) throws ResourceNotFroundException;

    Boolean deleteProgress(int id) throws ResourceNotFroundException;
}
