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

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class StudySetRepositoryTest {

    @Autowired
    private StudySetRepository studySetRepository;

    @Autowired
    private UserRepository userRepository;

    @Order(1)
    @ParameterizedTest(name = "{index} => trueId={0}")
    @CsvSource({
            "true", "false"
    })
    public void testFindStudySetByAuthor_id(boolean trueId) {
        // create stub
        User user = User.builder().username("test_stub").email("teststub@gmail.com").build();
        userRepository.save(user);

        StudySet studySet = StudySet.builder()
                .title("Stub")
                .studySetType(StudySetType.builder().id(1).build())
                .user(user).build();
        studySetRepository.save(studySet);
        // end of create stub

        if(trueId) {
            List<StudySet> result = studySetRepository.findStudySetByAuthor_id(user.getId());
            assertThat(result.size()).isGreaterThan(0);
        } else {
            List<StudySet> result = studySetRepository.findStudySetByAuthor_id(-1);
            assertThat(result.size()).isEqualTo(0);
        }
    }

    @Order(2)
    @Test
    public void countCardInSetWithCondition() {
        User userInit = User.builder()
                .username("test")
                .email("test99999@gmail.com")
                .build();
        userRepository.save(userInit);

        StudySet studySetInit = StudySet.builder()
                .studySetType(StudySetType.builder().id(1).build())
                .user(userInit)
                .build();

        studySetRepository.save(studySetInit);

        Integer count= studySetRepository.countCardInSetWithCondition(studySetInit.getId(), userInit.getId(), "not study", false);
        Assertions.assertThat(count).isEqualTo(0);
    }

    @Order(3)
    @Test
    public void findListIdToDelete() {
        Date currentDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        calendar.add(Calendar.DAY_OF_MONTH, -31);
        Date date30DaysAgo = calendar.getTime();

        StudySet studySetInit = StudySet.builder()
                .id(99999)
                .studySetType(StudySetType.builder().id(1).build())
                .user(User.builder().id(1).build())
                .is_deleted(true)
                .deleted_date(date30DaysAgo)
                .build();
        studySetRepository.save(studySetInit);

        List<Integer> deleteInt = studySetRepository.findListIdToDelete();
        Assertions.assertThat(deleteInt.size()).isGreaterThan(0);
    }
}
