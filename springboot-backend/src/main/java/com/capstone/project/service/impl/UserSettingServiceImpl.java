package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Setting;
import com.capstone.project.model.UserSetting;
import com.capstone.project.repository.UserSettingRepository;
import com.capstone.project.service.UserSettingService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserSettingServiceImpl implements UserSettingService {

    private final UserSettingRepository userSettingRepository;

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
}
