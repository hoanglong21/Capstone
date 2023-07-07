package com.capstone.project.repository;

import com.capstone.project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
//    Optional<User> findByUsername(String username);
//
//    Optional<User> findByEmail(String email);

    User findUserByUsername(String username);

    User findUserByEmail(String email);

    User findUserById(int id);

    @Query("SELECT username FROM User WHERE username != :username")
    List<String> findAllNameExcept(@Param("username") String username);

    boolean existsByUsername(String username);

    boolean existsByPhone(String phone);

    boolean existsByEmail(String email);

    boolean existsByToken(String token);

    User findUserByToken(String token);

    @Query(value = "SELECT * FROM capstone.user WHERE (username like `%:name%` or first_name like `%long2%` or last_name like `%long2%` or email like `%long2%`)", nativeQuery = true)
    List<User> filterUser(String name, String gender, String phone, String role, String address, String bio, String status, String fromDob, String toDob,
                          String fromBanned, String toBanned, String fromDeleted, String toDeleted);
}
