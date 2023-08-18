package com.capstone.project.repository;
import com.capstone.project.model.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ProgressRepositoryTest {

    @Autowired
    private ProgressRepository progressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private StudySetRepository studySetRepository;

    @Order(1)
    @Test
    public void findByCardIdAndUserId() {
        User user = User.builder().username("test_stub").email("teststub@gmail.com").build();
        userRepository.save(user);

        StudySet studySet = StudySet.builder().title("Stub").studySetType(StudySetType.builder().id(1).build()).user(user).build();
        studySetRepository.save(studySet);

        Card card = Card.builder()
                .audio("audio")
                .picture("picture")
                .studySet(studySet)
                .build();
        cardRepository.save(card);

        Progress progress = Progress.builder().user(user).card(card).build();
        progressRepository.save(progress);

        Progress getProgress = progressRepository.findByCardIdAndUserId(user.getId(), card.getId());

        assertThat(getProgress).isEqualTo(progress);
    }

    @Order(1)
    @Test
    public void findByStudySetIdAndUserId() {
        User user = User.builder().username("test_stub").email("teststub@gmail.com").build();
        userRepository.save(user);

        StudySet studySet = StudySet.builder().title("Stub").studySetType(StudySetType.builder().id(1).build()).user(user).build();
        studySetRepository.save(studySet);

        Card card = Card.builder()
                .audio("audio")
                .picture("picture")
                .studySet(studySet)
                .build();
        cardRepository.save(card);

        Progress progress = Progress.builder().user(user).card(card).build();
        progressRepository.save(progress);

        List<Progress> getProgress = progressRepository.findByStudySetIdAndUserId(user.getId(), studySet.getId());

        assertThat(getProgress.contains(progress)).isTrue();
    }
}
