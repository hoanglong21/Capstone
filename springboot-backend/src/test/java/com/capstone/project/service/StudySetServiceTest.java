package com.capstone.project.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;

import com.capstone.project.exception.DuplicateValueException;
import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.repository.CardRepository;
import com.capstone.project.repository.ContentRepository;
import com.capstone.project.repository.StudySetRepository;
import com.capstone.project.repository.UserRepository;
import com.capstone.project.service.impl.StudySetServiceImpl;
import com.capstone.project.service.impl.UserServiceImpl;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class StudySetServiceTest {
    @Mock
    private StudySetRepository studySetRepository;

    @Mock
    private CardRepository cardRepository;

    @Mock
    private ContentRepository contentRepository;

    @InjectMocks
    private StudySetServiceImpl studySetServiceImpl;

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Order(1)
    @Test
    void testGetAllStudySets() {
        StudySet studySet = StudySet.builder()
                .title("Stub")
                .studySetType(StudySetType.builder().id(1).build())
                .build();

        List<StudySet> studySets = List.of(studySet);
        when(studySetRepository.findAll(Sort.by(Sort.Direction.ASC, "id"))).thenReturn(studySets);

        assertThat(studySetServiceImpl.getAllStudySets().size()).isGreaterThan(0);
    }

    @Order(2)
    @ParameterizedTest(name = "{index} => userId={0}, title={1}, description={2}," +
            " is_deleted={3}, is_public={4}, is_draft={5}, studySetTypeId={6}, deleted_date={7}")
    @CsvSource({
            "1, title1, description1, true, false, false, 1, 2023-6-7",
            "2, title2, description2, false, true, false, 2, 2023-6-8",
    })
    void testCreateStudySet(int userId, String title, String description, boolean is_deleted, boolean is_public,
                        boolean is_draft, int studySetTypeId, String deleted_date) {
        try {
            StudySet studySet = StudySet.builder()
                    .user(User.builder().id(userId).build())
                    .title(title)
                    .description(description)
                    .is_public(is_public)
                    .is_draft(is_draft)
                    .is_deleted(is_deleted)
                    .studySetType(StudySetType.builder().id(studySetTypeId).build())
                    .deleted_date(dateFormat.parse(deleted_date))
                    .build();
            when(studySetRepository.save(any())).thenReturn(studySet);

            // test
            StudySet createdStudySet = studySetServiceImpl.createStudySet(studySet);
            assertThat(studySet).isEqualTo(createdStudySet);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Order(3)
    @ParameterizedTest(name = "{index} => userId={0}, title={1}, description={2}," +
            " is_deleted={3}, is_public={4}, is_draft={5}, studySetTypeId={6}, deleted_date={7}")
    @CsvSource({
            "1, title1, description1, true, false, true, 1, 2023-6-7",
            "2, title2, description2, false, true, false, 2, 2023-6-8"
    })
    void testUpdateStudySet(int userId, String title, String description, boolean is_deleted, boolean is_public,
                            boolean is_draft, int studySetTypeId, String deleted_date) {
        try {
            StudySet studySet = StudySet.builder()
                    .user(User.builder().id(10).build())
                    .title("init title")
                    .description("init description")
                    .is_public(false)
                    .is_draft(false)
                    .is_deleted(false)
                    .studySetType(StudySetType.builder().id(10).build())
                    .deleted_date(dateFormat.parse("2023-1-1"))
                    .build();

            StudySet studySetDetails = StudySet.builder()
                    .user(User.builder().id(userId).build())
                    .title(title)
                    .description(description)
                    .is_public(is_public)
                    .is_draft(is_draft)
                    .is_deleted(is_deleted)
                    .studySetType(StudySetType.builder().id(studySetTypeId).build())
                    .deleted_date(dateFormat.parse(deleted_date))
                    .build();
            when(studySetRepository.findById(any())).thenReturn(Optional.ofNullable(studySet));
            when(studySetRepository.save(any())).thenReturn(studySetDetails);

            // test
            StudySet createdStudySet = studySetServiceImpl.updateStudySet(1, studySetDetails);
            assertThat(createdStudySet).isEqualTo(studySetDetails);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Order(4)
    @Test
    void deleteStudySet() {
        StudySet studySet = StudySet.builder()
                .title("Stub")
                .is_deleted(false)
                .studySetType(StudySetType.builder().id(1).build())
                .build();

        when(studySetRepository.findById(any())).thenReturn(Optional.ofNullable(studySet));
        try {
            studySetServiceImpl.deleteStudySet(1);
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        assertThat(studySet.is_deleted()).isEqualTo(true);
    }

    @Order(5)
    @Test
    void deleteHardStudySet() {
        StudySet studySet = StudySet.builder()
                .id(1)
                .title("Stub")
                .studySetType(StudySetType.builder().id(1).build())
                .build();

        Card card = Card.builder().id(1).studySet(studySet).build();
        Content content = Content.builder().id(1).card(card).build();

        doNothing().when(studySetRepository).delete(studySet);
        doNothing().when(cardRepository).delete(card);
        doNothing().when(contentRepository).delete(content);

        when(studySetRepository.findById(1)).thenReturn(Optional.of(studySet));
        when(cardRepository.getCardByStudySetId(1)).thenReturn(List.of(card));
        when(contentRepository.getContentByCardId(1)).thenReturn(List.of(content));

        try {
            studySetServiceImpl.deleteHardStudySet(1);
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }

        verify(studySetRepository, times(1)).delete(studySet);
        verify(cardRepository, times(1)).delete(card);
        verify(contentRepository, times(1)).delete(content);
    }



}
