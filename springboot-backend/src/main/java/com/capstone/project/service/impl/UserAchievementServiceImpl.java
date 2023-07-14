package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.User;
import com.capstone.project.model.UserAchievement;
import com.capstone.project.repository.UserAchievementRepository;
import com.capstone.project.repository.UserRepository;
import com.capstone.project.service.UserAchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UserAchievementServiceImpl implements UserAchievementService {

    private final UserAchievementRepository userAchievementRepository;

    public UserAchievementServiceImpl(UserAchievementRepository userAchievementRepository) {
        this.userAchievementRepository = userAchievementRepository;
    }

    @Override
    public List<UserAchievement> getAll() {
        return userAchievementRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @Override
    public UserAchievement createUserAchievement(UserAchievement userAchievement) {
        try {
            userAchievement.setCreated_date(new Date());
            return userAchievementRepository.save(userAchievement);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("Duplicate entry, make sure id of user and achievement are not duplicated");
        }
    }

    @Override
    public UserAchievement getUserAchievementById(int id) throws ResourceNotFroundException {
        UserAchievement userAchievement = userAchievementRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Achievement not exist with id: " + id));
        return userAchievement;
    }

    @Override
    public List<UserAchievement> getUserAchievementByUserId(int id) {
        return userAchievementRepository.getUserAchievementByUserId(id);
    }
}
