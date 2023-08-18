package com.capstone.project.repository;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification,Integer> {

    Notification getNotificationByUserId(int id);
}
