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
    private UserRepository userRepository;

    @Autowired
    private FieldRepository fieldRepository;

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
            List<String> defaultNames = Arrays.asList("post", "studyset", "test");
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