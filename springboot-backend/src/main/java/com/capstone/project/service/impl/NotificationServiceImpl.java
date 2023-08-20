package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.Notification;
import com.capstone.project.repository.NotificationRepository;
import com.capstone.project.service.NotificationService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NotificationServiceImpl implements NotificationService {

    @PersistenceContext
    private EntityManager em;

    private final NotificationRepository notificationRepository;


    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public static Date localDateTimeToDate(LocalDateTime localDateTime) {
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }

    @Override
    public List<Notification> getAllNotification() {
        return notificationRepository.findAll();
    }

    @Override
    public Notification getNotificationById(int id) throws ResourceNotFroundException {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Notification not exist with id:" + id));
        return notification;
    }

    @Override
    public Notification getNotificationByUserId(int id) throws ResourceNotFroundException {
        Notification notification = notificationRepository.getNotificationByUserId(id);
        return notification;
    }


    @Override
    public Notification createNotification(Notification notification) {
        LocalDateTime localDateTime = LocalDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
        Date date = localDateTimeToDate(localDateTime);
        notification.setDatetime(date);
        notification.set_read(false);
        return notificationRepository.save(notification);
    }

    @Override
    public Notification updateNotification(Notification noti, int id) throws ResourceNotFroundException {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Notification not exist with id:" + id));
        notification.setContent(noti.getContent());
        notification.set_read(noti.is_read());
        notification.setTitle(noti.getTitle());
        notification.setUrl(noti.getUrl());
        return notificationRepository.save(notification);
    }

    @Override
    public Boolean deleteNotification(int id) throws ResourceNotFroundException {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("Notification not exist with id:" + id));
        notificationRepository.delete(notification);
        return true;
    }

    @Override
    public Map<String, Object> getFilterNotification(String content, Boolean isRead, String title, String fromdatetime, String todatetime, int userid, String direction, int page, int size) {
        int offset = (page - 1) * size;

        String query ="SELECT * FROM notification WHERE 1=1";

        Map<String, Object> parameters = new HashMap<>();

        if (content != null && !content.isEmpty()) {
            query += " AND content LIKE :content";
            parameters.put("content", "%" + content + "%");
        }

        if (isRead != null) {
            query += " AND is_read = :isRead";
            parameters.put("isRead", isRead);
        }

        if (userid != 0) {
            query += " AND user_id = :userId";
            parameters.put("userId", userid);
        }

        if (title != null && !title.isEmpty()) {
            query += " AND title LIKE :title";
            parameters.put("title","%" + title + "%");
        }

        if (fromdatetime != null && !fromdatetime.equals("")) {
            query += " AND datetime >= :fromdattime";
            parameters.put("fromdatetime", fromdatetime);
        }
        if (todatetime != null && !todatetime.equals("")) {
            query += " AND datetime <= :todatetime";
            parameters.put("todatetime", todatetime);
        }

        query += " ORDER BY datetime " + direction;


        Query q = em.createNativeQuery(query, Notification.class);
        for (Map.Entry<String, Object> entry : parameters.entrySet()) {
            q.setParameter(entry.getKey(), entry.getValue());
        }

        int totalItems = q.getResultList().size();
        int totalPages = (int) Math.ceil((double) totalItems / size);

        q.setFirstResult(offset);
        q.setMaxResults(size);

        List<Notification> resultList = q.getResultList();

        Map<String, Object> response = new HashMap<>();
        response.put("list", resultList);
        response.put("currentPage", page);
        response.put("totalPages", totalPages);
        response.put("totalItems", totalItems);

        return response;
    }


}
