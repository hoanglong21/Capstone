package com.capstone.project.service.impl;

import com.capstone.project.model.FeedbackType;
import com.capstone.project.repository.FeedbackTypeRepository;
import com.capstone.project.service.FeedbackTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackTypeServiceImpl implements FeedbackTypeService {

    final
    FeedbackTypeRepository feedbackTypeRepository;

    public FeedbackTypeServiceImpl(FeedbackTypeRepository feedbackTypeRepository) {
        this.feedbackTypeRepository = feedbackTypeRepository;
    }

    @Override
    public List<FeedbackType> getAll() {
        return feedbackTypeRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }
}
