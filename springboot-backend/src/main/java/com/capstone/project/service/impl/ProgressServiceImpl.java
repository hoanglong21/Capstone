package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Progress;
import com.capstone.project.repository.ProgressRepository;
import com.capstone.project.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgressServiceImpl implements ProgressService {
    private final ProgressRepository progressRepository;

    @Autowired
    public ProgressServiceImpl(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    @Override
    public List<Progress> getAllProgresses() {
        return progressRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @Override
    public Progress createProgress(Progress progress) {
        try {
            return progressRepository.save(progress);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("Duplicate entry, make sure id of user and card are not duplicated");
        }
    }

    @Override
    public Progress getProgressById(int id) throws ResourceNotFroundException {
        Progress progress = progressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Progress not exist with id: " + id));
        return progress;
    }

    @Override
    public Progress updateProgress(int id, Progress progressDetails) throws ResourceNotFroundException {
        Progress progress = progressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Progress not exist with id: " + id));
        progress.setStatus(progressDetails.getStatus());
        progress.setRight(progressDetails.getRight());
        progress.setWrong(progressDetails.getWrong());
        progress.setTotal_wrong(progressDetails.getTotal_wrong());
        progress.set_star(progressDetails.is_star());
        progress.setNote(progressDetails.getNote());
        progress.setAudio(progressDetails.getAudio());
        progress.setPicture(progressDetails.getPicture());

        Progress updateProgress = progressRepository.save(progress);
        return updateProgress;
    }

    @Override
    public Boolean deleteProgress(int id) throws ResourceNotFroundException {
        Progress progress = progressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Progress not exist with id: " + id));
        progressRepository.delete(progress);
        return true;
    }
}
