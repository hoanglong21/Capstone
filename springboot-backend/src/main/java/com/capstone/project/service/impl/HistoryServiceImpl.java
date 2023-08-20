package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.model.Class;
import com.capstone.project.repository.HistoryRepository;
import com.capstone.project.repository.UserRepository;
import com.capstone.project.service.*;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class HistoryServiceImpl implements HistoryService {

    private final HistoryRepository historyRepository;

    private final JdbcTemplate jdbcTemplate;

    private final UserRepository userRepository;

    private final UserAchievementService userAchievementService;

    private final ClassService classService;

    private final AchievementService achievementService;

    private final NotificationService notificationService;

    @Autowired
    public HistoryServiceImpl(HistoryRepository historyRepository, JdbcTemplate jdbcTemplate, UserRepository userRepository, UserAchievementService userAchievementService, ClassService classService, AchievementService achievementService, NotificationService notificationService) {
        this.historyRepository = historyRepository;
        this.jdbcTemplate = jdbcTemplate;
        this.userRepository = userRepository;
        this.userAchievementService = userAchievementService;
        this.classService = classService;
        this.achievementService = achievementService;
        this.notificationService = notificationService;
    }

    @Override
    public List<History> getAll() {
        return historyRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @Override
    public History createHistory(History history) {
        history.setDatetime(new Date());
        History saveHistory = historyRepository.save(history);
        setAchievement(history);
        return saveHistory;
    }

    @Override
    public History getHistoryById(int id) throws ResourceNotFroundException {
        History history = historyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFroundException("History not exist with id: " + id));
        return history;
    }

    @Override
    public Map<String, Object> filterHistory(int userId, int destinationId, int typeId, int categoryId, String fromDatetime, String toDatetime,
                                       String sortBy, String direction, int page, int size) {
        String sql = "SELECT h.* FROM history h";

//        if(userId!=0) {
//            sql += " LEFT JOIN user u ON h.user_id = u.id";
//        }
        if (typeId==2) {
            sql += " LEFT JOIN studyset s ON h.studyset_id = s.id";
        }
//        if (typeId==3) {
//            sql += " LEFT JOIN class c ON h.class_id = c.id";
//        }

        sql += " WHERE 1=1 ";

        List<Object> params = new ArrayList<>();

        if(userId!=0) {
            sql += " AND h.user_id = ? ";
            params.add(userId);
        } if(typeId==2 && destinationId!=0) {
            sql += " AND h.studyset_id = ? ";
            params.add(destinationId);
        } if (typeId==3 && destinationId!=0) {
            sql += " AND h.class_id = ? ";
            params.add(destinationId);
        }

        if(typeId==2 && categoryId!=0) {
            sql += " AND s.type_id = ? ";
            params.add(categoryId);
        }

        sql += " AND h.type_id = ?";
        params.add(typeId);


        if (fromDatetime != null && !fromDatetime.isEmpty()) {
            sql += " AND DATE(h.datetime) >= ? ";
            params.add(fromDatetime);
        }

        if (toDatetime != null && !toDatetime.isEmpty()) {
            sql += " AND DATE(h.datetime) <= ? ";
            params.add(toDatetime);
        }

        if(sortBy != null && !sortBy.equals("") && direction != null && !direction.equals("")) {
            sortBy = "h." + sortBy;
            sql += " ORDER BY " + sortBy + " " + direction;
        }

        // Count total items
        String countSql = "SELECT COUNT(*) FROM (" + sql + ") AS countQuery";
        long totalItems = jdbcTemplate.queryForObject(countSql, Long.class, params.toArray());

        // Apply pagination
        int offset = (page - 1) * size;
        sql += " LIMIT ? OFFSET ?";
        params.add(size);
        params.add(offset);

        List<History> historyList = jdbcTemplate.query(sql, params.toArray(), new BeanPropertyRowMapper<>(History.class));
        int totalPages = (int) Math.ceil((double) totalItems / size);

        Map<String, Object> response = new HashMap<>();
        response.put("list", historyList);
        response.put("currentPage", page);
        response.put("totalItems", totalItems);
        response.put("totalPages", totalPages);

        return response;
    }

    private void setAchievement(History history){
        try {
            if(history.getUser() == null) {
                return;
            }
            User user = userRepository.findById(history.getUser().getId())
                    .orElseThrow(() -> new ResourceNotFroundException("User not exist with id: " + history.getUser().getId()));

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(history.getDatetime());

            // Get the hour of the day (in 24-hour format)
            int hour = calendar.get(Calendar.HOUR_OF_DAY);

            Integer achievementId = null;

            if(history.getHistoryType().getId()==2 && (hour >= 5 && hour <= 7)) {
                achievementId = 4;
            }
            if(history.getHistoryType().getId()==2 && (hour >= 22 || hour <= 2)) {
                achievementId = 3;
            }
            if(history.getHistoryType().getId()==1) {
                String sql = " SELECT COUNT(*) AS consecutive_days FROM ( SELECT DATE(datetime) AS datetime, DATE(datetime) - INTERVAL ROW_NUMBER() OVER (ORDER BY DATE(datetime)) DAY AS grp " +
                        " FROM history WHERE user_id = " + user.getId() + " ) AS subquery GROUP BY grp ORDER BY consecutive_days DESC LIMIT 1 ";
                Integer result = jdbcTemplate.queryForObject(sql, Integer.class);

                Map<Integer, Integer> streakToAchievementMap = new HashMap<>();

                // Populate the map with the mappings
                streakToAchievementMap.put(3, 28);
                streakToAchievementMap.put(5, 29);
                streakToAchievementMap.put(7, 30);
                streakToAchievementMap.put(10, 31);
                streakToAchievementMap.put(20, 32);
                streakToAchievementMap.put(30, 33);
                streakToAchievementMap.put(45, 34);
                streakToAchievementMap.put(60, 35);
                streakToAchievementMap.put(70, 36);
                streakToAchievementMap.put(80, 37);
                streakToAchievementMap.put(100, 38);
                streakToAchievementMap.put(150, 39);
                streakToAchievementMap.put(200, 40);
                streakToAchievementMap.put(250, 41);
                streakToAchievementMap.put(300, 42);
                streakToAchievementMap.put(350, 43);
                streakToAchievementMap.put(400, 44);
                streakToAchievementMap.put(450, 45);
                streakToAchievementMap.put(500, 46);
                streakToAchievementMap.put(600, 47);
                streakToAchievementMap.put(700, 48);
                streakToAchievementMap.put(800, 49);
                streakToAchievementMap.put(900, 50);
                streakToAchievementMap.put(1000, 51);

                achievementId = streakToAchievementMap.get(result);
            }
            if(history.getHistoryType().getId()==2) {
                String sql = " SELECT COUNT(*) FROM history WHERE user_id = " + user.getId() + " AND type_id = 2 ";
                Integer result = jdbcTemplate.queryForObject(sql, Integer.class);

                Map<Integer, Integer> setsToAchievementMap = new HashMap<>();

                setsToAchievementMap.put(1, 7);
                setsToAchievementMap.put(3, 8);
                setsToAchievementMap.put(5, 9);
                setsToAchievementMap.put(10, 10);
                setsToAchievementMap.put(25, 11);
                setsToAchievementMap.put(50, 12);
                setsToAchievementMap.put(75, 13);
                setsToAchievementMap.put(100, 14);
                setsToAchievementMap.put(150, 15);
                setsToAchievementMap.put(200, 16);
                setsToAchievementMap.put(250, 17);
                setsToAchievementMap.put(300, 18);
                setsToAchievementMap.put(350, 19);
                setsToAchievementMap.put(400, 20);
                setsToAchievementMap.put(450, 21);
                setsToAchievementMap.put(500, 22);
                setsToAchievementMap.put(600, 23);
                setsToAchievementMap.put(700, 24);
                setsToAchievementMap.put(800, 25);
                setsToAchievementMap.put(900, 26);
                setsToAchievementMap.put(1000, 27);

                achievementId = setsToAchievementMap.get(result);
            }
            if(history.getHistoryType().getId()==3) {
                Class classroom = classService.getClassroomById(history.getClassroom().getId());
                String sql = " SELECT COUNT(*) FROM class_learner WHERE class_id = " + classroom.getId() + " AND status = 'enrolled' ";
                Integer result = jdbcTemplate.queryForObject(sql, Integer.class);

                Map<Integer, Integer> membersToAchievementMap = new HashMap<>();

                membersToAchievementMap.put(1, 52);
                membersToAchievementMap.put(5, 53);
                membersToAchievementMap.put(10, 54);
                membersToAchievementMap.put(20, 55);
                membersToAchievementMap.put(50, 56);
                membersToAchievementMap.put(100, 57);
                membersToAchievementMap.put(200, 58);
                membersToAchievementMap.put(500, 59);
                membersToAchievementMap.put(1000, 60);

                achievementId = membersToAchievementMap.get(result);
            }
            if(history.getHistoryType().getId()==4) {
                achievementId = 6;
            }
            if(history.getHistoryType().getId()==5) {
                achievementId = 2;
            }
            if(history.getHistoryType().getId()==6) {
                achievementId = 5;
            }
            if(history.getHistoryType().getId()==7) {
                achievementId = 1;
            }

            if(achievementId!=null) {
                UserAchievement userAchievement = UserAchievement.builder()
                        .user(user)
                        .achievement(Achievement.builder().id(achievementId).build())
                        .created_date(new Date())
                        .build();
                userAchievementService.createUserAchievement(userAchievement);
                Achievement achievement = achievementService.getById(achievementId);

                Dotenv dotenv = Dotenv.load();
                notificationService.createNotification(Notification.builder()
                        .title("Unlock " + achievement.getName() + " achievement")
                        .user(user)
                        .url(dotenv.get("FRONTEND_HOST_URL") + "/library/achievements")
                        .content(achievement.getDescription())
                        .build());
            }
        } catch (Exception e) {
//            System.out.println(e.getMessage());
        }
    }
}
