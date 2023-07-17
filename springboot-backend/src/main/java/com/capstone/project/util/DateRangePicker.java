package com.capstone.project.util;

import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class DateRangePicker {
    public List<String> getDateRange() {
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

    public List<String> getShortDateRange() {
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
