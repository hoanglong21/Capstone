package com.capstone.project.service;

import static org.mockito.ArgumentMatchers.any;

import com.capstone.project.dto.FilterStudySetByClassResponse;
import com.capstone.project.exception.DuplicateValueException;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.repository.*;
import com.capstone.project.service.impl.ProgressServiceImpl;
import com.capstone.project.service.impl.StudySetServiceImpl;
import com.capstone.project.service.impl.UserServiceImpl;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.AssertionErrors;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ProgressServiceTest {

    @Mock
    private ProgressRepository progressRepository;

    @InjectMocks
    private ProgressServiceImpl progressService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Order(1)
    @Test
    public void getAllProgresses() {
        Progress progress = Progress.builder().build();

        List<Progress> progressList = List.of(progress);
        when(progressRepository.findAll(Sort.by(Sort.Direction.ASC, "id"))).thenReturn(progressList);

        assertThat(progressService.getAllProgresses().size()).isGreaterThan(0);
    }

    @Order(2)
    @Test
    public void testCreateStudySet() {
        try {
            Progress progress = Progress.builder().build();
            when(progressRepository.save(any())).thenReturn(progress);

            // test
            Progress createdProgress = progressService.createProgress(progress);
            assertThat(progress).isEqualTo(createdProgress);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Order(3)
    @Test
    public void getProgressById() {
        try {
            Progress progress = Progress.builder().build();
            when(progressRepository.findById(anyInt())).thenReturn(Optional.ofNullable(progress));

            // test
            Progress getProgress = progressService.getProgressById(1);
            assertThat(progress).isEqualTo(getProgress);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Order(4)
    @Test
    public void deleteProgress() {
        try {
            Progress progress = Progress.builder().build();
            when(progressRepository.findById(anyInt())).thenReturn(Optional.ofNullable(progress));
            doNothing().when(progressRepository).delete(progress);
            progressService.deleteProgress(1);

            // test
            verify(progressRepository, times(1)).delete(progress);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Order(5)
    @ParameterizedTest
    @CsvSource({
            "1", "-1"
    })
    public void updateScore(int score) {
        Progress progress = Progress.builder().right(0).wrong(0).build();
        when(progressRepository.findByCardIdAndUserId(anyInt(), anyInt())).thenReturn(progress);
        progressService.updateScore(1, 1, score);
        // check plus
        if(score<0) {
            assertThat(progress.getWrong()).isGreaterThan(0);
        } else if (score>0) {
            assertThat(progress.getRight()).isGreaterThan(0);
        }
    }

    @Order(6)
    @Test
    public void customUpdateProgress() {
        try {
            Progress progress = Progress.builder().status("not studied").build();
            User user = User.builder().id(1).build();
            Card card = Card.builder().id(1).build();
            when(progressRepository.findByCardIdAndUserId(anyInt(), anyInt())).thenReturn(progress);

            progressService.customUpdateProgress(user, card, false, "myPicture", "myAudio", "myNote", "still learning");
            // test

            assertThat(progress.getNote()).isEqualTo("myNote");
            assertThat(progress.getStatus()).isEqualTo("still learning");
            assertThat(progress.getAudio()).isEqualTo("myAudio");
            assertThat(progress.getPicture()).isEqualTo("myPicture");
            assertThat(progress.is_star()).isEqualTo(false);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Order(7)
    @Test
    public void resetProgress() {
        Progress progress = Progress.builder().build();
        when(progressRepository.findByStudySetIdAndUserId(anyInt(), anyInt())).thenReturn(List.of(progress));

        progressService.resetProgress(1, 1);
        // test

        assertThat(progress.getStatus()).isEqualTo("not studied");
        assertThat(progress.getRight()).isEqualTo(0);
        assertThat(progress.getWrong()).isEqualTo(0);
    }

    @Order(8)
    @Test
    public void getProgressByUserIdAndCardId() {
        Progress progress = Progress.builder().build();
        when(progressRepository.findByCardIdAndUserId(anyInt(), anyInt())).thenReturn(progress);

        try {
            Progress getProgress = progressService.getProgressByUserIdAndCardId(1, 1);
            assertThat(getProgress).isEqualTo(progress);
        } catch (ResourceNotFroundException e) {
            throw new RuntimeException(e);
        }

    }
}
