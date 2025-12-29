package com.example.kbase_backend.service;

import com.example.kbase_backend.dto.common.PageMetadata;
import com.example.kbase_backend.dto.user.CreateUserRequest;
import com.example.kbase_backend.dto.user.UpdateUserRequest;
import com.example.kbase_backend.dto.user.UserDTO;
import com.example.kbase_backend.entity.User;
import com.example.kbase_backend.entity.enums.UserRole;
import com.example.kbase_backend.exception.DuplicateResourceException;
import com.example.kbase_backend.exception.ResourceNotFoundException;
import com.example.kbase_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for user-related business logic.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    /**
     * Get all users.
     */
    @Transactional(readOnly = true)
    public List<UserDTO> findAll() {
        log.debug("Fetching all users");
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get all active users.
     */
    @Transactional(readOnly = true)
    public List<UserDTO> findAllActive() {
        log.debug("Fetching all active users");
        return userRepository.findAllActiveUsers().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get users with pagination.
     */
    @Transactional(readOnly = true)
    public Page<UserDTO> findAll(Pageable pageable) {
        log.debug("Fetching users with pagination: {}", pageable);
        return userRepository.findAll(pageable).map(this::convertToDTO);
    }
    
    /**
     * Get user by ID.
     */
    @Transactional(readOnly = true)
    public UserDTO findById(Long id) {
        log.debug("Fetching user by id: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return convertToDTO(user);
    }
    
    /**
     * Get user entity by ID.
     */
    @Transactional(readOnly = true)
    public User findEntityById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }
    
    /**
     * Get user by email.
     */
    @Transactional(readOnly = true)
    public UserDTO findByEmail(String email) {
        log.debug("Fetching user by email: {}", email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return convertToDTO(user);
    }
    
    /**
     * Get users by role.
     */
    @Transactional(readOnly = true)
    public List<UserDTO> findByRole(UserRole role) {
        log.debug("Fetching users by role: {}", role);
        return userRepository.findByRole(role).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Search users by name or email.
     */
    @Transactional(readOnly = true)
    public Page<UserDTO> searchUsers(String search, Pageable pageable) {
        log.debug("Searching users with term: {}", search);
        return userRepository.searchUsers(search, pageable).map(this::convertToDTO);
    }
    
    /**
     * Create a new user.
     */
    public UserDTO create(CreateUserRequest request) {
        log.info("Creating new user with email: {}", request.getEmail());
        
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("User", "email", request.getEmail());
        }
        
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .role(request.getRole())
                .isActive(true)
                .build();
        
        User savedUser = userRepository.save(user);
        log.info("Created user with id: {}", savedUser.getUserId());
        return convertToDTO(savedUser);
    }
    
    /**
     * Update an existing user.
     */
    public UserDTO update(Long id, UpdateUserRequest request) {
        log.info("Updating user with id: {}", id);
        
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        
        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
        }
        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }
        if (request.getIsActive() != null) {
            user.setIsActive(request.getIsActive());
        }
        
        User updatedUser = userRepository.save(user);
        log.info("Updated user with id: {}", updatedUser.getUserId());
        return convertToDTO(updatedUser);
    }
    
    /**
     * Delete a user (soft delete by deactivating).
     */
    public void delete(Long id) {
        log.info("Deleting user with id: {}", id);
        
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        
        user.setIsActive(false);
        userRepository.save(user);
        log.info("Soft deleted user with id: {}", id);
    }
    
    /**
     * Hard delete a user (permanent).
     */
    public void hardDelete(Long id) {
        log.warn("Hard deleting user with id: {}", id);
        
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User", "id", id);
        }
        
        userRepository.deleteById(id);
        log.info("Hard deleted user with id: {}", id);
    }
    
    /**
     * Check if email exists.
     */
    @Transactional(readOnly = true)
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }
    
    /**
     * Convert User entity to UserDTO.
     */
    private UserDTO convertToDTO(User user) {
        return UserDTO.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .isActive(user.getIsActive())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
    
    /**
     * Create PageMetadata from Page object.
     */
    public PageMetadata createPageMetadata(Page<?> page) {
        return PageMetadata.builder()
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .first(page.isFirst())
                .last(page.isLast())
                .build();
    }
}
