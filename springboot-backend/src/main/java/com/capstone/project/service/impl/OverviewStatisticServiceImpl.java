package com.capstone.project.service.impl;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class OverviewStatisticServiceImpl implements OverviewStatisticService {

    @Autowired
    private UserService userService;

    @Autowired
    private StudySetService studySetService;

    @Autowired
    private HistoryService historyService;

    @Autowired
    private ClassService classService;

    @Override
    public List<Integer> getUserGrowth() {
        List<Integer> result = new ArrayList<>();
        List<String> listDate = getDateRange();
        for(int i=0; i<listDate.size()-1; i++) {
            Map<String, Object> response = userService.filterUser(null,null, null, null, null,
                    new String[]{"ROLE_LEARNER", "ROLE_TUTOR"}, null, null, null,
                    null, null, null, null, null, null, listDate.get(i), listDate.get(i+1),
                    "created_date", "DESC", 1, 5);
            result.add(Integer.parseInt(String.valueOf(response.get("totalItems"))));
        }
        return result;
    }

    @Override
    public List<Integer> getStudySetGrowth() {
        List<Integer> result = new ArrayList<>();
        List<String> listDate = getDateRange();
        for(int i=0; i<listDate.size()-1; i++) {
            Map<String, Object> response = studySetService.getFilterList(null, null, null, null,
                    0, 0, null, null, null, listDate.get(i), listDate.get(i+1),
                    "created_date", "DESC", 1, 5);
            result.add(Integer.parseInt(String.valueOf(response.get("totalItems"))));
        }
        return result;
    }

    @Override
    public Integer getAccessNumber() {
        List<String> listDate = getShortDateRange();
        Map<String, Object> response = historyService.filterHistory(0, 0, 1, listDate.get(0), listDate.get(1),
                "datetime", "DESC", 1, 5);
        return Integer.parseInt(String.valueOf(response.get("totalItems")));
    }

    @Override
    public Integer getRegisterNumber() {
        List<String> listDate = getShortDateRange();
        Map<String, Object> response = userService.filterUser(null,null, null, null, null,
                new String[]{"ROLE_LEARNER", "ROLE_TUTOR"}, null, null, null,
                null, null, null, null, null, null, listDate.get(0), listDate.get(1),
                "created_date", "DESC", 1, 5);
        return Integer.parseInt(String.valueOf(response.get("totalItems")));

    }

    @Override
    public Integer getClassNumber() throws ResourceNotFroundException {
        List<String> listDate = getShortDateRange();
        Map<String, Object> response = classService.getFilterClass(null, null, null,
                listDate.get(0), listDate.get(1),"DESC", 1, 5);
        // TODO edit after change order by
        return Integer.parseInt(String.valueOf(response.get("totalItems")));
    }

    @Override
    public Integer getStudySetNumber() {
        List<String> listDate = getShortDateRange();
        Map<String, Object> response = studySetService.getFilterList(null, null, null, null, 0,
                0, null, null, null,
                listDate.get(0), listDate.get(1), "created_date", "DESC", 1, 5);
        return Integer.parseInt(String.valueOf(response.get("totalItems")));
    }

    private List<String> getDateRange() {
        // Get the current date
        Date currentDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        List<String> listOfDate = new ArrayList<>();
        listOfDate.add(dateFormat.format(currentDate));
        for(int i=0; i<12; i++) {
            // Subtract 7 days
            calendar.add(Calendar.DAY_OF_MONTH, -7);

            // Get the updated date as a Date object
            Date updatedDate = calendar.getTime();

            // Now currentDate contains the date 7 days ago from today
            listOfDate.add(dateFormat.format(updatedDate));
        }
        Collections.reverse(listOfDate);

        return listOfDate;
    }

    private List<String> getShortDateRange() {
        Date currentDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        List<String> listOfDate = new ArrayList<>();

        // Subtract 30 days
        calendar.add(Calendar.DAY_OF_MONTH, -30);
        // Get the updated date as a Date object
        Date updatedDate = calendar.getTime();

        // Now currentDate contains the date 7 days ago from today
        listOfDate.add(dateFormat.format(updatedDate));
        listOfDate.add(dateFormat.format(currentDate));

        return listOfDate;
    }
}
