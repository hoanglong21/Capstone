package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Class;
import com.capstone.project.model.Notification;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface NotificationService {
    List<Notification> getAllNotification();

    Notification getNotificationById(int id) throws ResourceNotFroundException;

    Notification getNotificationByUserId(int id) throws ResourceNotFroundException;

    Notification createNotification(Notification noti);

    Notification updateNotification( Notification noti,  int id) throws ResourceNotFroundException;
    Boolean deleteNotification( int id) throws ResourceNotFroundException;

    Map<String, Object> getFilterNotification(String content, Boolean isRead, String title, String fromdatetime, String todatetime, int userid, String direction, int page, int size);
}
