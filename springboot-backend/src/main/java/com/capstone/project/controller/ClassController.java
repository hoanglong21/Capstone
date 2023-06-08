package com.capstone.project.controller;

import com.capstone.project.model.Class;
import com.capstone.project.service.ClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/v1/")
public class ClassController {

    private final ClassService classService;

@Autowired
    public ClassController(ClassService classService) {
        this.classService = classService;
    }

    @GetMapping("/class")
    public List<Class> getAllClass() {
        return classService.getAllClass();
    }

    @PostMapping("/class")
    public Class createClassroom(@RequestBody Class classroom) throws ParseException {
        Date currentDate = new Date();
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
        String formattedDate = dateFormat.format(currentDate);
        Date parsedDate = dateFormat.parse(formattedDate);
        String classCode = generateClassCode();
        classroom.setClass_code(classCode);
        classroom.setCreated_date(parsedDate);
        return classService.createClassroom(classroom);
    }

    private String generateClassCode() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        int codeLength = 6;
        Random random = new Random();

        StringBuilder classCode = new StringBuilder();
        for (int i = 0; i < codeLength; i++) {
            int index = random.nextInt(characters.length());
            char randomChar = characters.charAt(index);
            classCode.append(randomChar);
        }

        return classCode.toString();
    }

    @GetMapping("/class/{id}")
    public Class getClassroomById(@PathVariable int id) {
        return classService.getClassroomById(id);
    }

    @PutMapping("/class/{id}")
    Class updateClassroom(@RequestBody Class classrooms, @PathVariable int id) {
        return classService.updateClassroom(classrooms,id);
    }

    @DeleteMapping("/class/{id}")
    String deleteClass(@PathVariable int id) {
        return classService.deleteClass(id);
    }

}
