package com.capstone.project.startup;

import com.capstone.project.model.Field;
import com.capstone.project.model.StudySetType;
import com.capstone.project.model.User;
import com.capstone.project.repository.FieldRepository;
import com.capstone.project.repository.StudySetTypeRepository;
import com.capstone.project.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ApplicationStartup implements ApplicationRunner {

    @Autowired
    private StudySetTypeRepository studysetTypeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
//    @PostConstruct
    public void run(ApplicationArguments args) throws Exception {
        if (studysetTypeRepository.count() == 0) {
            List<String> defaultNames = Arrays.asList("normal", "kanji", "grammar");
            List<StudySetType> studysetTypes = new ArrayList<>();
            for (String name : defaultNames) {
                StudySetType studysetType = new StudySetType();
                studysetType.setName(name);
                studysetTypes.add(studysetType);
            }
            studysetTypeRepository.saveAll(studysetTypes);
        }

        if(fieldRepository.count() == 0) {
            List<Field> fields = Arrays.asList(
                    new Field(1, "term"),
                    new Field(1, "definition"),
                    new Field(2, "character"),
                    new Field(2, "name"),
                    new Field(2, "gradeLevel"),
                    new Field(2, "strokes"),
                    new Field(2, "jlptLevel"),
                    new Field(2, "radical"),
                    new Field(2, "onyomi"),
                    new Field(2, "kunyomi"),
                    new Field(2, "meanings"),
                    new Field(2, "strokeOrder"),
                    new Field(3, "title"),
                    new Field(3, "jlptLevel"),
                    new Field(3, "meaning"),
                    new Field(3, "example"),
                    new Field(3, "explanation"),
                    new Field(3, "note"));
            fieldRepository.saveAll(fields);
        }

        if(userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);
        }
    }
}