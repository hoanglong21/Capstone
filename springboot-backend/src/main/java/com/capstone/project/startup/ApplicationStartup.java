package com.capstone.project.startup;

import com.capstone.project.model.*;
import com.capstone.project.repository.*;
import com.capstone.project.service.GrammarService;
import com.capstone.project.service.KanjiService;
import com.capstone.project.service.VocabularyService;
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
    private FeedbackTypeRepository feedbackTypeRepository;

    @Autowired
    private CommentTypeRepository commentTypeRepository;

    @Autowired
    private QuestionTypeRepository questionTypeRepository;

    @Autowired
    private AttachmentTypeRepository attachmentTypeRepository;

    @Autowired
    private AchievementTypeRepository achievementTypeRepository;

    @Autowired
    private HistoryTypeRepository historyTypeRepository;

    @Autowired
    private AchievementRepository achievementRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private SettingRepository settingRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public KanjiService kanjiService;

    @Autowired
    public VocabularyService vocabularyService;

    @Autowired
    public GrammarService grammarService;

    public KanjiService getKanjiService() {
        return kanjiService;
    }

    public VocabularyService getVocabularyService() {
        return vocabularyService;
    }

    public GrammarService getGrammarService() {
        return grammarService;
    }

    @Override
    @Transactional
//    @PostConstruct
    public void run(ApplicationArguments args) throws Exception {
        if (studysetTypeRepository.count() == 0) {
            List<String> defaultNames = Arrays.asList("vocabulary", "kanji", "grammar");
            List<StudySetType> studysetTypes = new ArrayList<>();
            for (String name : defaultNames) {
                StudySetType studysetType = new StudySetType();
                studysetType.setName(name);
                studysetTypes.add(studysetType);
            }
            studysetTypeRepository.saveAll(studysetTypes);
        }

        if (feedbackTypeRepository.count() == 0) {
            List<String> defaultNames = Arrays.asList("sexual content", "violent or repulsive content", "hateful or abusive",
                    "harassment or bullying", "harmful or dangerous acts", "misinformation", "child abuse", "promotes terrorism",
                    "spam or misleading", "infringes rights", "caption issue", "suggestions");
            List<FeedbackType> feedbackTypes = new ArrayList<>();
            for (String name : defaultNames) {
                FeedbackType feedbackType = new FeedbackType();
                feedbackType.setName(name);
                feedbackTypes.add(feedbackType);
            }
            feedbackTypeRepository.saveAll(feedbackTypes);
        }

        if (commentTypeRepository.count() == 0) {
            List<String> defaultNames = Arrays.asList("post", "studySet", "test", "assignment", "submission");
            List<CommentType> commentTypes = new ArrayList<>();
            for (String name : defaultNames) {
                CommentType commentType = new CommentType();
                commentType.setName(name);
                commentTypes.add(commentType);
            }
            commentTypeRepository.saveAll(commentTypes);
        }

        if (questionTypeRepository.count() == 0) {
            List<String> defaultNames = Arrays.asList("written", "multiple choice", "true_false");
            List<QuestionType> questionTypes = new ArrayList<>();
            for (String name : defaultNames) {
                QuestionType questionType = new QuestionType();
                questionType.setName(name);
                questionTypes.add(questionType);
            }
            questionTypeRepository.saveAll(questionTypes);
        }

        if (attachmentTypeRepository.count() == 0) {
            List<String> defaultNames = Arrays.asList("assignment", "submission", "post");
            List<AttachmentType> attachmentTypes = new ArrayList<>();
            for (String name : defaultNames) {
                AttachmentType attachmentType = new AttachmentType();
                attachmentType.setName(name);
                attachmentTypes.add(attachmentType);
            }
            attachmentTypeRepository.saveAll(attachmentTypes);
        }

        if (achievementTypeRepository.count() == 0) {
            List<String> defaultNames = Arrays.asList("study", "lifetime", "streaks", "class");
            List<AchievementType> achievementTypes = new ArrayList<>();
            for (String name : defaultNames) {
                AchievementType achievementType = new AchievementType();
                achievementType.setName(name);
                achievementTypes.add(achievementType);
            }
            achievementTypeRepository.saveAll(achievementTypes);
        }

        if (historyTypeRepository.count() == 0) {
            List<String> defaultNames = Arrays.asList("attend", "studyset", "class", "createset", "donelearn", "donetest", "doneflashcard", "acceptjoin");
            List<HistoryType> historyTypes = new ArrayList<>();
            for (String name : defaultNames) {
                HistoryType historyType = new HistoryType();
                historyType.setName(name);
                historyTypes.add(historyType);
            }
            historyTypeRepository.saveAll(historyTypes);
        }

        if(achievementRepository.count() == 0) {
            List<Achievement> achievements = Arrays.asList(
                    new Achievement(1, "Active learner", "Awarded for completing your first Flashcard session!", 0),
                    new Achievement(1, "Committed learner", "Awarded for completing your first Learn session!", 0),
                    new Achievement(1, "Night owl", "Awarded for a late night study session!", 0),
                    new Achievement(1, "Early bird", "Awarded for an early morning study session!", 0),
                    new Achievement(1, "Test acer", "Awarded for studying with Test for the first time!", 0),
                    new Achievement(1, "Set builder", "Awarded for creating your first set!", 0),
                    new Achievement(2, "Studied first round", "Awarded for studying your first round.", 1),
                    new Achievement(2, "3 rounds studied", "Awarded for studying 3 rounds.", 3),
                    new Achievement(2, "5 rounds studied", "Awarded for studying 5 rounds.", 5),
                    new Achievement(2, "10 rounds studied", "Awarded for studying 10 rounds.", 10),
                    new Achievement(2, "25 rounds studied", "Awarded for studying 25 rounds.", 25),
                    new Achievement(2, "50 rounds studied", "Awarded for studying 50 rounds.", 50),
                    new Achievement(2, "75 rounds studied", "Awarded for studying 75 rounds.", 75),
                    new Achievement(2, "100 rounds studied", "Awarded for studying 100 rounds.", 100),
                    new Achievement(2, "150 rounds studied", "Awarded for studying 150 rounds.", 150),
                    new Achievement(2, "200 rounds studied", "Awarded for studying 200 rounds.", 200),
                    new Achievement(2, "250 rounds studied", "Awarded for studying 250 rounds.", 250),
                    new Achievement(2, "300 rounds studied", "Awarded for studying 300 rounds.", 300),
                    new Achievement(2, "350 rounds studied", "Awarded for studying 350 rounds.", 350),
                    new Achievement(2, "400 rounds studied", "Awarded for studying 400 rounds.", 400),
                    new Achievement(2, "450 rounds studied", "Awarded for studying 450 rounds.", 450),
                    new Achievement(2, "500 rounds studied", "Awarded for studying 500 rounds.", 500),
                    new Achievement(2, "600 rounds studied", "Awarded for studying 600 rounds.", 600),
                    new Achievement(2, "700 rounds studied", "Awarded for studying 700 rounds.", 700),
                    new Achievement(2, "800 rounds studied", "Awarded for studying 800 rounds.", 800),
                    new Achievement(2, "900 rounds studied", "Awarded for studying 900 rounds.", 900),
                    new Achievement(2, "1000 rounds studied", "Awarded for studying 1000 sets.", 1000),
                    new Achievement(3, "3-day streak", "Awarded for studying 3 days in a row.", 3),
                    new Achievement(3, "5-day streak", "Awarded for studying 5 days in a row.", 5),
                    new Achievement(3, "7-day streak", "Awarded for studying 7 days in a row.", 7),
                    new Achievement(3, "10-day streak", "Awarded for studying 10 days in a row.", 10),
                    new Achievement(3, "20-day streak", "Awarded for studying 20 days in a row.", 20),
                    new Achievement(3, "30-day streak", "Awarded for studying 30 days in a row.", 30),
                    new Achievement(3, "45-day streak", "Awarded for studying 45 days in a row.", 45),
                    new Achievement(3, "60-day streak", "Awarded for studying 60 days in a row.", 60),
                    new Achievement(3, "70-day streak", "Awarded for studying 70 days in a row.", 70),
                    new Achievement(3, "80-day streak", "Awarded for studying 80 days in a row.", 80),
                    new Achievement(3, "100-day streak", "Awarded for studying 100 days in a row.", 100),
                    new Achievement(3, "150-day streak", "Awarded for studying 150 days in a row.", 150),
                    new Achievement(3, "200-day streak", "Awarded for studying 200 days in a row.", 200),
                    new Achievement(3, "250-day streak", "Awarded for studying 250 days in a row.", 250),
                    new Achievement(3, "300-day streak", "Awarded for studying 300 days in a row.", 300),
                    new Achievement(3, "350-day streak", "Awarded for studying 350 days in a row.", 350),
                    new Achievement(3, "400-day streak", "Awarded for studying 400 days in a row.", 400),
                    new Achievement(3, "450-day streak", "Awarded for studying 450 days in a row.", 450),
                    new Achievement(3, "500-day streak", "Awarded for studying 500 days in a row.", 500),
                    new Achievement(3, "600-day streak", "Awarded for studying 600 days in a row.", 600),
                    new Achievement(3, "700-day streak", "Awarded for studying 700 days in a row.", 700),
                    new Achievement(3, "800-day streak", "Awarded for studying 800 days in a row.", 800),
                    new Achievement(3, "900-day streak", "Awarded for studying 900 days in a row.", 900),
                    new Achievement(3, "1000-day streak", "Awarded for studying 1000 days in a row.", 1000),
                    new Achievement(4, "First member", "Awarded for having the first member.", 1),
                    new Achievement(4, "5 member", "Awarded for having 5 members.", 5),
                    new Achievement(4, "10 member", "Awarded for having 10 members.", 10),
                    new Achievement(4, "20 member", "Awarded for having 20 members.", 20),
                    new Achievement(4, "50 member", "Awarded for having 50 members.", 50),
                    new Achievement(4, "100 member", "Awarded for having 100 members.", 100),
                    new Achievement(4, "200 member", "Awarded for having 200 members.", 200),
                    new Achievement(4, "500 member", "Awarded for having 500 members.", 500),
                    new Achievement(4, "1000 member", "Awarded for having 1000 members.", 1000));
            achievementRepository.saveAll(achievements);
        }

        if(fieldRepository.count() == 0) {
            List<Field> fields = Arrays.asList(
                    new Field(1, "term"),
                    new Field(1, "definition"),
                    new Field(1, "example"),
                    new Field(2, "character"),
                    new Field(2, "name"),
                    new Field(2, "strokes"),
                    new Field(2, "jlptLevel"),
                    new Field(2, "radical"),
                    new Field(2, "onyomi"),
                    new Field(2, "kunyomi"),
                    new Field(2, "meanings"),
                    new Field(2, "strokeOrder"),
                    new Field(2, "example"),
                    new Field(3, "title"),
                    new Field(3, "jlptLevel"),
                    new Field(3, "meaning"),
                    new Field(3, "example"),
                    new Field(3, "explanation"),
                    new Field(3, "note"),
                    new Field(3, "structure"));
            fieldRepository.saveAll(fields);
        }

        if (settingRepository.count() == 0) {
            List<String> defaultNames = Arrays.asList("study reminder", "language", "assignment due date reminder",
                    "test due date reminder", "set added", "post added", "assignment assigned", "test assigned", "submission graded");
            List<Setting> settings = new ArrayList<>();
            for (String name : defaultNames) {
                Setting setting = new Setting();
                setting.setTitle(name);
                settings.add(setting);
            }
            settingRepository.saveAll(settings);
        }

        if(userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin"));
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);
        }

        // Kanji Dictionary
        Thread.sleep(5000); // Delay for 5 seconds (adjust as needed)
        kanjiService.initKanji();
        if(kanjiService.getKanjiList().size()>0) {
            System.out.println("Kanji Dictionary is ready");
        }
        // End OF Kanji Dictionary

        // Vocabulary Dictionary
        Thread.sleep(5000); // Delay for 5 seconds (adjust as needed)
        vocabularyService.initVocabulary();
        if(vocabularyService.getVocabularyList().size()>0) {
            System.out.println("Vocabulary Dictionary is ready");
        }
        // End OF Vocabulary Dictionary

        // Grammar Dictionary
        Thread.sleep(5000); // Delay for 5 seconds (adjust as needed)
        grammarService.initGrammars();
        if(grammarService.getGrammarList().size()>0) {
            System.out.println("Grammar Dictionary is ready");
        }
        // End OF Grammar Dictionary
    }
}