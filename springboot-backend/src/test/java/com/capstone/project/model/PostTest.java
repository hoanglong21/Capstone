package com.capstone.project.model;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.Assertions.assertThat;
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class PostTest {

    @ParameterizedTest(name = "index => userId={0}, classId={1}, content{2}")
    @CsvSource({
            "1,1,Submit all assignment ",
            "2,2, Class will be off on Sunday "
    })
    public void testPost(int userId,int classId,String content ){
         Post post = Post.builder()
                 .user(User.builder().id(userId).build())
                 .classroom(Class.builder().id(classId).build())
                 .content(content)
                 .build();
         assertThat(post).isNotNull();
         assertThat(post.getUser().getId()).isEqualTo(userId);
         assertThat(post.getClassroom().getId()).isEqualTo(classId);
         assertThat(post.getContent()).isEqualTo(content);
    }
}
