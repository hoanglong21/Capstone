package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.UserAchievement;

import java.util.List;

public interface UserAchievementService {

    List<UserAchievement> getAll();

    UserAchievement createUserAchievement(UserAchievement userAchievement);

    UserAchievement getUserAchievementById(int id) throws ResourceNotFroundException;

    List<UserAchievement> getUserAchievementByUserId(int id);

}
