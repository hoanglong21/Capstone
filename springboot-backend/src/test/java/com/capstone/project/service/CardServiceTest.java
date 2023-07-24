package com.capstone.project.service;

import com.capstone.project.model.Card;
import com.capstone.project.model.StudySet;
import com.capstone.project.model.StudySetType;
import com.capstone.project.model.User;
import com.capstone.project.repository.CardRepository;
import com.capstone.project.repository.ContentRepository;
import com.capstone.project.service.impl.CardServiceImpl;
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Sort;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;


@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CardServiceTest {
    @Mock
    private CardRepository cardRepository;

    @Mock
    private ContentRepository contentRepository;

    @InjectMocks
    private CardServiceImpl cardService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Order(1)
    @Test
    public void getAllCards() {
        Card card = Card.builder()
                .studySet(StudySet.builder().id(1).build())
                .build();

        List<Card> cardList = List.of(card);
        when(cardRepository.findAll(Sort.by(Sort.Direction.ASC, "id"))).thenReturn(cardList);

        assertThat(cardService.getAllCards().size()).isGreaterThan(0);
    }

    @Order(2)
    @Test
    public void getAllByStudySetId() {
        Card card = Card.builder()
                .studySet(StudySet.builder().id(1).build())
                .build();

        List<Card> cardList = List.of(card);
        when(cardRepository.getCardByStudySetId(anyInt())).thenReturn(cardList);

        assertThat(cardService.getAllByStudySetId(1).size()).isGreaterThan(0);
    }

    @Order(3)
    @ParameterizedTest(name = "{index} => studySetId={0}, picture={1}, audio={2}")
    @CsvSource({
            "1, picture1, audio1",
            "2, picture2, audio2",
    })
    public void createCard(int studySetId, String picture, String audio) {
        try {
            Card card = Card.builder()
                    .studySet(StudySet.builder().id(studySetId).build())
                    .picture(picture)
                    .audio(audio)
                    .build();
            when(cardRepository.save(any())).thenReturn(card);

            // test
            Card createdCard = cardService.createCard(card);
            assertThat(card).isEqualTo(createdCard);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
