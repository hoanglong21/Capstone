package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Setting;
import com.capstone.project.model.User;
import com.capstone.project.model.UserSetting;
import com.capstone.project.repository.UserSettingRepository;
import com.capstone.project.service.SettingService;
import com.capstone.project.service.UserSettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserSettingServiceImpl implements UserSettingService {

    private final UserSettingRepository userSettingRepository;

    @Autowired
    private SettingService settingService;

    public UserSettingServiceImpl(UserSettingRepository userSettingRepository) {
        this.userSettingRepository = userSettingRepository;
    }

    @Override
    public List<UserSetting> getAllUserSetting() {
        return userSettingRepository.findAll();
    }


    @Override
    public UserSetting getUserSettingById(int id) throws ResourceNotFroundException {
        UserSetting usersetting = userSettingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("UserSetting not exist with id:" + id));
        return usersetting;
    }

    @Override
    public List<UserSetting> getUserSettingBySettingId(int id) {
        return userSettingRepository.getBySettingId(id);
    }

    @Override
    public List<UserSetting> getUserSettingByUserId(int id) {
        return userSettingRepository.getByUserId(id);
    }

    @Override
    public UserSetting createUserSetting(UserSetting usersetting) {
        return userSettingRepository.save(usersetting);
    }

    @Override
    public UserSetting updateUserSetting(UserSetting usersetting, int id) throws ResourceNotFroundException {
        UserSetting usersettings = userSettingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("UserSetting not exist with id:" + id));
        usersettings.setValue(usersetting.getValue());
        return userSettingRepository.save(usersettings);
    }

    @Override
    public Boolean deleteUserSetting(int id) throws ResourceNotFroundException {
        UserSetting usersettings = userSettingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("UserSetting not exist with id:" + id));
             userSettingRepository.delete(usersettings);
        return true;
    }

    @Override
    public Map<String, String> CustomGetUserSettingByUserId(int id) {
        List<UserSetting> customUserSettings = userSettingRepository.getByUserId(id);
        Map<String, String> customMap = new HashMap<>();
        for (UserSetting userSetting : customUserSettings) {
            String settingTitle = userSetting.getSetting().getTitle();
            String settingValue = userSetting.getValue();
            customMap.put(settingTitle, settingValue);
        }

        Map<String, String> userSettingMap = new HashMap<>();
        userSettingMap.put("study reminder", "7:00");
        userSettingMap.put("language", "vn");
        userSettingMap.put("assignment due date reminder", "24");
        userSettingMap.put("test due date reminder", "24");
        userSettingMap.put("set added", "TRUE");
        userSettingMap.put("post added", "TRUE");
        userSettingMap.put("assignment assigned", "TRUE");
        userSettingMap.put("test assigned", "TRUE");
        userSettingMap.put("submission graded", "TRUE");

        userSettingMap.putAll(customMap);
        return userSettingMap;
    }

    @Override
    public UserSetting saveUserSettingCustom(int userId, int settingId, String newValue) {
        UserSetting userSetting = userSettingRepository.getUserSettingCustom(userId, settingId);
        if (userSetting == null) {
            userSetting = UserSetting.builder()
                    .value(newValue)
                    .user(User.builder().id(userId).build())
                    .setting(Setting.builder().id(settingId).build())
                    .build();
        } else {
            userSetting.setValue(newValue);
        }
        return userSettingRepository.save(userSetting);
    }
}
