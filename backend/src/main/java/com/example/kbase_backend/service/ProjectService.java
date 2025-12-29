package com.example.kbase_backend.service;

import com.example.kbase_backend.dto.common.PageMetadata;
import com.example.kbase_backend.dto.project.*;
import com.example.kbase_backend.entity.*;
import com.example.kbase_backend.entity.enums.MemberRole;
import com.example.kbase_backend.exception.BadRequestException;
import com.example.kbase_backend.exception.DuplicateResourceException;
import com.example.kbase_backend.exception.ResourceNotFoundException;
import com.example.kbase_backend.repository.DocumentRepository;
import com.example.kbase_backend.repository.ProjectMemberRepository;
import com.example.kbase_backend.repository.ProjectRepository;
import com.example.kbase_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for project-related business logic.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProjectService {
    
    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final UserRepository userRepository;
    private final DocumentRepository documentRepository;
    
    /**
     * Get all projects.
     */
    @Transactional(readOnly = true)
    public List<ProjectDTO> findAll() {
        log.debug("Fetching all projects");
        return projectRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get all active projects.
     */
    @Transactional(readOnly = true)
    public List<ProjectDTO> findAllActive() {
        log.debug("Fetching all active projects");
        return projectRepository.findByIsActive(true).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get projects with pagination.
     */
    @Transactional(readOnly = true)
    public Page<ProjectDTO> findAll(Pageable pageable) {
        log.debug("Fetching projects with pagination: {}", pageable);
        return projectRepository.findAll(pageable).map(this::convertToDTO);
    }
    
    /**
     * Get project by ID.
     */
    @Transactional(readOnly = true)
    public ProjectDTO findById(Long id) {
        log.debug("Fetching project by id: {}", id);
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        return convertToDTO(project);
    }
    
    /**
     * Get projects by owner ID.
     */
    @Transactional(readOnly = true)
    public List<ProjectDTO> findByOwnerId(Long ownerId) {
        log.debug("Fetching projects by owner id: {}", ownerId);
        return projectRepository.findByOwnerUserId(ownerId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get projects where user is a member.
     */
    @Transactional(readOnly = true)
    public List<ProjectDTO> findByMemberId(Long userId) {
        log.debug("Fetching projects for member id: {}", userId);
        return projectRepository.findProjectsByMemberId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get projects where user is a member (with pagination).
     */
    @Transactional(readOnly = true)
    public Page<ProjectDTO> findByMemberId(Long userId, Pageable pageable) {
        log.debug("Fetching projects for member id: {} with pagination", userId);
        return projectRepository.findProjectsByMemberId(userId, pageable).map(this::convertToDTO);
    }
    
    /**
     * Search projects by name or description.
     */
    @Transactional(readOnly = true)
    public Page<ProjectDTO> searchProjects(String search, Pageable pageable) {
        log.debug("Searching projects with term: {}", search);
        return projectRepository.searchProjects(search, pageable).map(this::convertToDTO);
    }
    
    /**
     * Create a new project.
     */
    public ProjectDTO create(CreateProjectRequest request) {
        log.info("Creating new project: {}", request.getProjectName());
        
        // Find the owner
        User owner = userRepository.findById(request.getOwnerId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getOwnerId()));
        
        // Check for duplicate project name for this owner
        if (projectRepository.existsByProjectNameAndOwnerUserId(request.getProjectName(), request.getOwnerId())) {
            throw new DuplicateResourceException("Project", "name", request.getProjectName());
        }
        
        Project project = Project.builder()
                .projectName(request.getProjectName())
                .description(request.getDescription())
                .owner(owner)
                .isActive(true)
                .build();
        
        Project savedProject = projectRepository.save(project);
        
        // Add owner as a member with OWNER role
        ProjectMember ownerMember = ProjectMember.builder()
                .id(new ProjectMemberId(savedProject.getProjectId(), owner.getUserId()))
                .project(savedProject)
                .user(owner)
                .role(MemberRole.OWNER)
                .isActive(true)
                .build();
        projectMemberRepository.save(ownerMember);
        
        log.info("Created project with id: {}", savedProject.getProjectId());
        return convertToDTO(savedProject);
    }
    
    /**
     * Update an existing project.
     */
    public ProjectDTO update(Long id, UpdateProjectRequest request) {
        log.info("Updating project with id: {}", id);
        
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        
        if (request.getProjectName() != null) {
            project.setProjectName(request.getProjectName());
        }
        if (request.getDescription() != null) {
            project.setDescription(request.getDescription());
        }
        if (request.getIsActive() != null) {
            project.setIsActive(request.getIsActive());
        }
        
        Project updatedProject = projectRepository.save(project);
        log.info("Updated project with id: {}", updatedProject.getProjectId());
        return convertToDTO(updatedProject);
    }
    
    /**
     * Delete a project (soft delete by deactivating).
     */
    public void delete(Long id) {
        log.info("Deleting project with id: {}", id);
        
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        
        project.setIsActive(false);
        projectRepository.save(project);
        log.info("Soft deleted project with id: {}", id);
    }
    
    /**
     * Hard delete a project (permanent).
     */
    public void hardDelete(Long id) {
        log.warn("Hard deleting project with id: {}", id);
        
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project", "id", id);
        }
        
        projectRepository.deleteById(id);
        log.info("Hard deleted project with id: {}", id);
    }
    
    // ========== Member Management ==========
    
    /**
     * Get all members of a project.
     */
    @Transactional(readOnly = true)
    public List<ProjectMemberDTO> getProjectMembers(Long projectId) {
        log.debug("Fetching members for project id: {}", projectId);
        
        // Verify project exists
        if (!projectRepository.existsById(projectId)) {
            throw new ResourceNotFoundException("Project", "id", projectId);
        }
        
        return projectMemberRepository.findByProjectId(projectId).stream()
                .map(this::convertMemberToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Add a member to a project.
     */
    public ProjectMemberDTO addMember(Long projectId, AddMemberRequest request) {
        log.info("Adding member {} to project {}", request.getUserId(), projectId);
        
        // Find project
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));
        
        // Find user
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUserId()));
        
        // Check if already a member
        if (projectMemberRepository.isMember(projectId, request.getUserId())) {
            throw new DuplicateResourceException("Member already exists in project");
        }
        
        ProjectMember member = ProjectMember.builder()
                .id(new ProjectMemberId(projectId, request.getUserId()))
                .project(project)
                .user(user)
                .role(request.getRole() != null ? request.getRole() : MemberRole.MEMBER)
                .isActive(true)
                .build();
        
        ProjectMember savedMember = projectMemberRepository.save(member);
        log.info("Added member {} to project {}", request.getUserId(), projectId);
        return convertMemberToDTO(savedMember);
    }
    
    /**
     * Remove a member from a project (soft delete).
     */
    public void removeMember(Long projectId, Long userId) {
        log.info("Removing member {} from project {}", userId, projectId);
        
        ProjectMember member = projectMemberRepository.findByProjectIdAndUserId(projectId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Project member not found"));
        
        // Don't allow removing the owner
        if (member.getRole() == MemberRole.OWNER) {
            throw new BadRequestException("Cannot remove the project owner");
        }
        
        member.setIsActive(false);
        projectMemberRepository.save(member);
        log.info("Removed member {} from project {}", userId, projectId);
    }
    
    /**
     * Check if user is a member of a project.
     */
    @Transactional(readOnly = true)
    public boolean isMember(Long projectId, Long userId) {
        return projectMemberRepository.isMember(projectId, userId);
    }
    
    /**
     * Convert Project entity to ProjectDTO.
     */
    private ProjectDTO convertToDTO(Project project) {
        int memberCount = (int) projectMemberRepository.countActiveMembers(project.getProjectId());
        long documentCount = documentRepository.countByProjectId(project.getProjectId());
        
        return ProjectDTO.builder()
                .projectId(project.getProjectId())
                .projectName(project.getProjectName())
                .description(project.getDescription())
                .ownerId(project.getOwner().getUserId())
                .ownerName(project.getOwner().getFullName())
                .ownerEmail(project.getOwner().getEmail())
                .isActive(project.getIsActive())
                .memberCount(memberCount)
                .documentCount((int) documentCount)
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
    
    /**
     * Convert ProjectMember entity to ProjectMemberDTO.
     */
    private ProjectMemberDTO convertMemberToDTO(ProjectMember member) {
        return ProjectMemberDTO.builder()
                .projectId(member.getProject().getProjectId())
                .userId(member.getUser().getUserId())
                .userEmail(member.getUser().getEmail())
                .userFullName(member.getUser().getFullName())
                .role(member.getRole())
                .isActive(member.getIsActive())
                .joinedAt(member.getJoinedAt())
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
