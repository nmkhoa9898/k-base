package com.example.kbase_backend.repository;

import com.example.kbase_backend.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Project entity operations.
 */
@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    
    /**
     * Find all projects owned by a specific user.
     */
    List<Project> findByOwnerUserId(Long ownerId);
    
    /**
     * Find all active projects.
     */
    List<Project> findByIsActive(Boolean isActive);
    
    /**
     * Find active projects with pagination.
     */
    Page<Project> findByIsActive(Boolean isActive, Pageable pageable);
    
    /**
     * Find projects by name containing (case-insensitive).
     */
    @Query("SELECT p FROM Project p WHERE LOWER(p.projectName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Project> findByNameContaining(@Param("name") String name);
    
    /**
     * Find all projects where a user is a member.
     */
    @Query("SELECT DISTINCT p FROM Project p JOIN p.members m WHERE m.user.userId = :userId AND m.isActive = true")
    List<Project> findProjectsByMemberId(@Param("userId") Long userId);
    
    /**
     * Find all projects where a user is a member (with pagination).
     */
    @Query("SELECT DISTINCT p FROM Project p JOIN p.members m WHERE m.user.userId = :userId AND m.isActive = true")
    Page<Project> findProjectsByMemberId(@Param("userId") Long userId, Pageable pageable);
    
    /**
     * Search projects by name or description.
     */
    @Query("SELECT p FROM Project p WHERE p.isActive = true AND " +
           "(LOWER(p.projectName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Project> searchProjects(@Param("search") String search, Pageable pageable);
    
    /**
     * Check if a project with the given name exists for an owner.
     */
    boolean existsByProjectNameAndOwnerUserId(String projectName, Long ownerId);
    
    /**
     * Count projects by active status.
     */
    long countByIsActive(Boolean isActive);
}
