package com.capstone.project.service.impl;

import com.capstone.project.service.OverviewStatisticService;
import com.capstone.project.service.StudySetService;
import com.capstone.project.service.UserService;
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
}
