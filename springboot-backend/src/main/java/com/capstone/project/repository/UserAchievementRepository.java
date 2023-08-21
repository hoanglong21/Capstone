package com.capstone.project.repository;

import com.capstone.project.model.UserAchievement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAchievementRepository extends JpaRepository<UserAchievement, Integer> {

    @Query(value = " SELECT ua.* FROM user_achievement ua INNER JOIN achievement a ON ua.achievement_id = a.id WHERE ua.user_id = :userId AND a.type_id = :typeId", nativeQuery = true)
    List<UserAchievement> getUserAchievementByUserIdAndTypeId(int userId, int typeId);
}
