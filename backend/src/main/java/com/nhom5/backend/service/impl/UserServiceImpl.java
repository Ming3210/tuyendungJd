package com.nhom5.backend.service.impl;

import com.nhom5.backend.model.User;
import com.nhom5.backend.repository.UserRepository;
import com.nhom5.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> updateUser(Long id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setFirstName(userDetails.getFirstName());
            user.setLastName(userDetails.getLastName());
            user.setFullName(userDetails.getFullName());
            user.setEmail(userDetails.getEmail());
            user.setUserName(userDetails.getUserName());
            user.setStatus(userDetails.getStatus());
            user.setPassword(userDetails.getPassword());
            user.setAddress(userDetails.getAddress());
            user.setPhone(userDetails.getPhone());
            user.setRole(userDetails.getRole());
            user.setLock(userDetails.getLock());
            user.setGender(userDetails.getGender());
            user.setLevel(userDetails.getLevel());
            user.setSkills(userDetails.getSkills());
            user.setYearsOfExperience(userDetails.getYearsOfExperience());
            user.setAvatar(userDetails.getAvatar());
            user.setPosition(userDetails.getPosition());
            user.setBirthdate(userDetails.getBirthdate());
            return userRepository.save(user);
        });
    }
    
    @Override
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
