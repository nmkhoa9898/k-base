package com.example.kbase_backend.repository;

import com.example.kbase_backend.entity.ProjectMember;
import com.example.kbase_backend.entity.ProjectMemberId;
import com.example.kbase_backend.entity.enums.MemberRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for ProjectMember entity operations.
 */
@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, ProjectMemberId> {
    
    /**
     * Find all members of a specific project.
     */
    @Query("SELECT pm FROM ProjectMember pm WHERE pm.project.projectId = :projectId AND pm.isActive = true")
    List<ProjectMember> findByProjectId(@Param("projectId") Long projectId);
    
    /**
     * Find all project memberships for a user.
     */
    @Query("SELECT pm FROM ProjectMember pm WHERE pm.user.userId = :userId AND pm.isActive = true")
    List<ProjectMember> findByUserId(@Param("userId") Long userId);
    
    /**
     * Find a specific project membership.
     */
    @Query("SELECT pm FROM ProjectMember pm WHERE pm.project.projectId = :projectId AND pm.user.userId = :userId")
    Optional<ProjectMember> findByProjectIdAndUserId(@Param("projectId") Long projectId, @Param("userId") Long userId);
    
    /**
     * Check if a user is a member of a project.
     */
    @Query("SELECT CASE WHEN COUNT(pm) > 0 THEN true ELSE false END FROM ProjectMember pm " +
           "WHERE pm.project.projectId = :projectId AND pm.user.userId = :userId AND pm.isActive = true")
    boolean isMember(@Param("projectId") Long projectId, @Param("userId") Long userId);
    
    /**
     * Find members by role in a project.
     */
    @Query("SELECT pm FROM ProjectMember pm WHERE pm.project.projectId = :projectId AND pm.role = :role AND pm.isActive = true")
    List<ProjectMember> findByProjectIdAndRole(@Param("projectId") Long projectId, @Param("role") MemberRole role);
    
    /**
     * Count active members in a project.
     */
    @Query("SELECT COUNT(pm) FROM ProjectMember pm WHERE pm.project.projectId = :projectId AND pm.isActive = true")
    long countActiveMembers(@Param("projectId") Long projectId);
    
    /**
     * Count members in a project (for admin).
     */
    int countByProjectProjectId(Long projectId);
}
