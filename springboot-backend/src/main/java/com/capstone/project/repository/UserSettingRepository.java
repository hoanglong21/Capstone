package com.capstone.project.repository;

import com.capstone.project.model.ClassLearner;
import com.capstone.project.model.UserSetting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserSettingRepository extends JpaRepository<UserSetting,Integer> {

    List<UserSetting> getByUserId(int id);
    List<UserSetting> getBySettingId(int id);
}
