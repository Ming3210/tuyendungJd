package com.nhom5.backend.repository;

import com.nhom5.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByUserName(String userName);

    @Query("SELECT u FROM User u WHERE u.userName = :usernameOrEmail OR u.email = :usernameOrEmail")
    Optional<User> findByUserNameOrEmail(@Param("usernameOrEmail") String usernameOrEmail);

    @Query(value = "SELECT * FROM users WHERE " +
           "(:role IS NULL OR role = :role) " +
           "AND (:q IS NULL OR user_name LIKE %:q% OR email LIKE %:q%)",
           countQuery = "SELECT count(*) FROM users WHERE " +
           "(:role IS NULL OR role = :role) " +
           "AND (:q IS NULL OR user_name LIKE %:q% OR email LIKE %:q%)",
           nativeQuery = true)
    Page<User> findUsersPaginated(
            @Param("role") String role, 
            @Param("q") String q, 
            Pageable pageable);
}
