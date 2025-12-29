package com.example.kbase_backend.repository;

import com.example.kbase_backend.entity.User;
import com.example.kbase_backend.entity.enums.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for User entity operations.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Find a user by their email address.
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Check if a user exists with the given email.
     */
    boolean existsByEmail(String email);
    
    /**
     * Find all users with a specific role.
     */
    List<User> findByRole(UserRole role);
    
    /**
     * Find all active or inactive users.
     */
    List<User> findByIsActive(Boolean isActive);
    
    /**
     * Find all active users with pagination.
     */
    Page<User> findByIsActive(Boolean isActive, Pageable pageable);
    
    /**
     * Find users by role with pagination.
     */
    Page<User> findByRole(UserRole role, Pageable pageable);
    
    /**
     * Search users by name or email (case-insensitive).
     */
    @Query("SELECT u FROM User u WHERE LOWER(u.fullName) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<User> searchUsers(@Param("search") String search, Pageable pageable);
    
    /**
     * Find all active users (default list).
     */
    @Query("SELECT u FROM User u WHERE u.isActive = true ORDER BY u.createdAt DESC")
    List<User> findAllActiveUsers();
}
