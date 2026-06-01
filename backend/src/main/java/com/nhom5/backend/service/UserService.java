package com.nhom5.backend.service;

import com.nhom5.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Page<User> getUsersPaginated(String role, String q, String sort, Pageable pageable);
    Optional<User> getUserById(Long id);
    User createUser(User user);
    Optional<User> updateUser(Long id, User userDetails);
    boolean deleteUser(Long id);
}
