package com.capstone.project.service;

import com.capstone.project.exception.ResourceNotFroundException;
import com.capstone.project.model.*;
import com.capstone.project.model.Class;
import com.capstone.project.repository.ClassLearnerRepository;
import com.capstone.project.repository.UserAchievementRepository;
import com.capstone.project.service.impl.ClassLeanerServiceImpl;
import com.capstone.project.service.impl.UserAchievementServiceImpl;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Sort;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ClassLearnerServiceTest {

    @Mock
    private EntityManager entityManager;

    @Mock
    private ClassLearnerRepository classLearnerRepository;

    @InjectMocks
    private ClassLeanerServiceImpl classLeanerService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @Order(1)
    @Test
    public void testGetAllClasslearner() {
        try {
            ClassLearner classLearner = ClassLearner.builder()
                    .user(User.builder().id(1).build())
                    .classroom(Class.builder().id(1).build())
                    .created_date(dateFormat.parse("2023-07-06"))
                    .build();

            List<ClassLearner> classLearners = List.of(classLearner);
            when(classLearnerRepository.findAll()).thenReturn(classLearners);
            assertThat(classLeanerService.getAll().size()).isGreaterThan(0);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Order(2)
    @Test
    void testGetClassLearnerById() {
        try {

            ClassLearner classLearner = ClassLearner.builder().user(User.builder().id(1).build())
                    .classroom(Class.builder().id(1).build())
                    .created_date(dateFormat.parse("2023-07-06"))
                    .build();

            when(classLearnerRepository.findById(any(Integer.class))).thenReturn(Optional.ofNullable(classLearner));
            ClassLearner getClassLearner = classLeanerService.getClassLeanerById(1);
            assertThat(getClassLearner).isEqualTo(classLearner);
        } catch (ParseException | ResourceNotFroundException e) {
            throw new RuntimeException(e);
        }
    }

    @Order(3)
    @Test
    void testGetClassLearnerByUserId() {
        try {
            List<ClassLearner> classLearners = new ArrayList<>();
            ClassLearner classLearner1 = ClassLearner.builder().user(User.builder().id(1).build()).classroom(Class.builder().id(1).build())
                    .created_date(dateFormat.parse("2023-07-06"))
                    .build();
            ClassLearner classLearner2 = ClassLearner.builder().user(User.builder().id(2).build()).classroom(Class.builder().id(1).build())
                    .created_date(dateFormat.parse("2023-07-06"))
                    .build();
            classLearners.add(classLearner1);
            classLearners.add(classLearner2);
            when(classLearnerRepository.getClassLeanerByUserId(any(Integer.class))).thenReturn(classLearners);
            List<ClassLearner> retrievedClassLearner = classLeanerService.getClassLeanerByUserId(1);
            assertThat(retrievedClassLearner).isEqualTo(classLearners);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    @Order(4)
    @ParameterizedTest(name = "index => userId={0}, classId={1}")
    @CsvSource({
            "1, 1 ",
            "2, 1  "
    })
    public void testCreateClassLearner(int userId, int classId) {
        ClassLearner classLearner = ClassLearner.builder()
                .user(User.builder().id(userId).build())
                .classroom(Class.builder().id(classId).build()).build();
        when(classLearnerRepository.save(any())).thenReturn(classLearner);

        ClassLearner createdclasslearner = classLeanerService.createClassLearner(classLearner);
        assertThat(classLearner).isEqualTo(createdclasslearner);
    }

    @Order(5)
    @ParameterizedTest(name = "index => userId{0}, clasId={1}, fromCreated{2},toCreated{3} ," +
            " status{4}, sortBy{5},direction{6},page={7}, size{8}, greaterThanZero{9} ")
    @CsvSource({
            "1,1,2023-8-9,2023-8-15,created_date,enrolled,DESC,1,5, true",
            "2,1,2023-8-9,2023-8-15,created_date,pending,DESC,1,5, false"
    })
    public void testFilterClassLearner(int userId, int classId, String fromCreated, String toCreated, String status,
                                       String sortBy, String direction, int page, int size, boolean greaterThanZero) throws ResourceNotFroundException {

        try {
            MockitoAnnotations.openMocks(this);
            ClassLearner classLearner = ClassLearner.builder()
                    .user(User.builder().id(userId).build())
                    .classroom(Class.builder().id(classId).build()).build();

            List<ClassLearner> resultListMock = new ArrayList<>();
            if (greaterThanZero) {
                TypedQuery<ClassLearner> typedQueryMock = mock(TypedQuery.class);
                when(entityManager.createQuery(anyString(), eq(ClassLearner.class))).thenReturn(typedQueryMock);
                resultListMock.add(classLearner);
                when(typedQueryMock.getResultList()).thenReturn(resultListMock);

                TypedQuery<Long> countQueryMock = mock(TypedQuery.class);
                when(entityManager.createQuery(anyString(), eq(Long.class))).thenReturn(countQueryMock);
            } else {
                TypedQuery<ClassLearner> typedQueryMock = mock(TypedQuery.class);
                when(entityManager.createQuery(anyString(), eq(ClassLearner.class))).thenReturn(typedQueryMock);
                when(typedQueryMock.getResultList()).thenReturn(resultListMock);

                TypedQuery<Long> countQueryMock = mock(TypedQuery.class);
                when(entityManager.createQuery(anyString(), eq(Long.class))).thenReturn(countQueryMock);
            }
            List<ClassLearner> list = (List<ClassLearner>) classLeanerService.filterClassLearner(userId,classId,fromCreated,toCreated,status,sortBy,direction,page,size).get("list");
            assertThat(list.size() > 0).isEqualTo(greaterThanZero);
        } catch (Exception e) {
            throw new RuntimeException(e);

        }
    }

    @Order(6)
    @ParameterizedTest(name = "index => userId={0}, classId={1},status{2}")
    @CsvSource({
            "1,3,enrolled ",
            "2,4,unenrolled "
    })
    void testUpdateClassLearner(int userId, int classId, String status) {
        try {

            ClassLearner classLearner_new = ClassLearner.builder()
                    .status("enrolled")
                    .build();

            ClassLearner classLearner = ClassLearner.builder()
                    .user(User.builder().id(userId).build())
                    .classroom(Class.builder().id(classId).build())
                    .status(status)
                    .build();


            when(classLearnerRepository.findById(any())).thenReturn(Optional.ofNullable(classLearner_new));
            when(classLearnerRepository.save(any())).thenReturn(classLearner);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @Order(7)
    @Test
    void testDeleteClassLearnerById() {

        ClassLearner classLearner = ClassLearner.builder()
                .id(1)
                .status("enrolled")
                .build();

        when(classLearnerRepository.findById(any())).thenReturn(Optional.ofNullable(classLearner));
        doNothing().when(classLearnerRepository).delete(classLearner);
        try {
            classLeanerService.deleteClassLearnerById(1);
        } catch (ResourceNotFroundException e) {
            e.printStackTrace();
        }
        verify(classLearnerRepository, times(1)).delete(classLearner);
    }

    @Order(8)
    @ParameterizedTest(name = "index => userId={0}, classId={1}")
    @CsvSource({
            "1,3 ",
            "2,4 "
    })
    void testDeleteClassLearner(int userid, int classid) throws ResourceNotFroundException {


        ClassLearner classLearner = new ClassLearner(); // Create a sample classLearner object

        // Mock the behavior of classLearnerRepository
        when(classLearnerRepository.findByUserIdAndClassroomId(userid, classid)).thenReturn(classLearner);

        // When
        Boolean result = classLeanerService.deleteClassLearner(userid, classid);

        // Then
        assertTrue(result); // Assert that the result is true

        // Verify that the delete method was called with the correct classLearner object
        verify(classLearnerRepository).delete(classLearner);
    }


    @Order(9)
    @ParameterizedTest(name = "index => userId{0}, clasId={1} " +
            " status{2}, sortBy{3},direction{4},page={5}, size{6}")
    @CsvSource({
            "1,1,enrolled,created_date,DESC,1,5 ",
            "2,1,pending,created_date,DESC,1,5, "
    })
    public void testFilterGetLearner(int userId, int classId, String status,
                                       String sortBy, String direction, int page, int size) throws ResourceNotFroundException {

        Query mockedQuery = mock(Query.class);
        when(entityManager.createNativeQuery(anyString(), anyString())).thenReturn(mockedQuery);
        when(mockedQuery.getResultList()).thenReturn(Arrays.asList(new ClassLearner(), new ClassLearner()));

        Map<String, Object> result = classLeanerService.filterGetLearner(userId, classId, status, sortBy, direction, page, size);

        List<ClassLearner> resultList = (List<ClassLearner>) result.get("list");
        int totalItems = (int) result.get("totalItems");

        assertEquals(2, resultList.size());
        assertEquals(2, totalItems);
    }


    }







