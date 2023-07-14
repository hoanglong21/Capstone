package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.History;

import java.util.List;

public interface HistoryService {

    List<History> getAll();

    History createHistory(History history);

    History getHistoryById(int id) throws ResourceNotFroundException;
}
