package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.History;
import com.capstone.project.repository.HistoryRepository;
import com.capstone.project.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository historyRepository;

    @Autowired
    public HistoryServiceImpl(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    @Override
    public List<History> getAll() {
        return historyRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @Override
    public History createHistory(History history) {
        history.setDatetime(new Date());
        return historyRepository.save(history);
    }

    @Override
    public History getHistoryById(int id) throws ResourceNotFroundException {
        History history = historyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("History not exist with id: " + id));
        return history;
    }
}
