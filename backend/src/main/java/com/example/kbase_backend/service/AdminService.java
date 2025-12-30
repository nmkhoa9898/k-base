package com.example.kbase_backend.service;

import com.example.kbase_backend.dto.admin.DatabaseOverviewDTO;
import com.example.kbase_backend.dto.document.DocumentDTO;
import com.example.kbase_backend.dto.project.ProjectDTO;
import com.example.kbase_backend.dto.project.ProjectMemberDTO;
import com.example.kbase_backend.dto.user.UserDTO;
import com.example.kbase_backend.entity.Document;
import com.example.kbase_backend.entity.Project;
import com.example.kbase_backend.entity.ProjectMember;
import com.example.kbase_backend.entity.User;
import com.example.kbase_backend.repository.DocumentRepository;
import com.example.kbase_backend.repository.ProjectMemberRepository;
import com.example.kbase_backend.repository.ProjectRepository;
import com.example.kbase_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for admin-only operations.
 */
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class AdminService {
    
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final DocumentRepository documentRepository;
    private final ProjectMemberRepository projectMemberRepository;
    
    /**
     * Get complete database overview.
     */
    public DatabaseOverviewDTO getDatabaseOverview() {
        log.info("Fetching complete database overview");
        
        return DatabaseOverviewDTO.builder()
                .users(getAllUsers())
                .projects(getAllProjects())
                .documents(getAllDocuments())
                .projectMembers(getAllMemberships())
                .stats(getDatabaseStats())
                .build();
    }
    
    /**
     * Get all users including inactive ones.
     */
    public List<UserDTO> getAllUsers() {
        log.debug("Fetching all users for admin");
        return userRepository.findAll().stream()
                .map(this::convertUserToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get all projects including inactive ones.
     */
    public List<ProjectDTO> getAllProjects() {
        log.debug("Fetching all projects for admin");
        return projectRepository.findAll().stream()
                .map(this::convertProjectToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get all documents including inactive ones.
     */
    public List<DocumentDTO> getAllDocuments() {
        log.debug("Fetching all documents for admin");
        return documentRepository.findAll().stream()
                .map(this::convertDocumentToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get all project memberships.
     */
    public List<ProjectMemberDTO> getAllMemberships() {
        log.debug("Fetching all project memberships for admin");
        return projectMemberRepository.findAll().stream()
                .map(this::convertMemberToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Get database statistics.
     */
    public DatabaseOverviewDTO.DatabaseStats getDatabaseStats() {
        log.debug("Calculating database statistics");
        
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.countByIsActive(true);
        long totalProjects = projectRepository.count();
        long activeProjects = projectRepository.countByIsActive(true);
        long totalDocuments = documentRepository.count();
        long activeDocuments = documentRepository.countByIsActive(true);
        long totalMemberships = projectMemberRepository.count();
        
        return DatabaseOverviewDTO.DatabaseStats.builder()
                .totalUsers(totalUsers)
                .activeUsers(activeUsers)
                .totalProjects(totalProjects)
                .activeProjects(activeProjects)
                .totalDocuments(totalDocuments)
                .activeDocuments(activeDocuments)
                .totalMemberships(totalMemberships)
                .build();
    }
    
    // DTO conversion methods
    
    private UserDTO convertUserToDTO(User user) {
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
    
    private ProjectDTO convertProjectToDTO(Project project) {
        int memberCount = projectMemberRepository.countByProjectProjectId(project.getProjectId());
        int documentCount = documentRepository.countByProjectProjectId(project.getProjectId());
        
        return ProjectDTO.builder()
                .projectId(project.getProjectId())
                .projectName(project.getProjectName())
                .description(project.getDescription())
                .ownerId(project.getOwner().getUserId())
                .ownerName(project.getOwner().getFullName())
                .ownerEmail(project.getOwner().getEmail())
                .isActive(project.getIsActive())
                .memberCount(memberCount)
                .documentCount(documentCount)
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
    
    private DocumentDTO convertDocumentToDTO(Document document) {
        return DocumentDTO.builder()
                .documentId(document.getDocumentId())
                .projectId(document.getProject().getProjectId())
                .projectName(document.getProject().getProjectName())
                .uploadedById(document.getUploadedBy().getUserId())
                .uploadedByName(document.getUploadedBy().getFullName())
                .title(document.getTitle())
                .fileName(document.getFileName())
                .fileType(document.getFileType())
                .fileSize(document.getFileSize())
                .mimeType(document.getMimeType())
                .description(document.getDescription())
                .isActive(document.getIsActive())
                .createdAt(document.getCreatedAt())
                .updatedAt(document.getUpdatedAt())
                .build();
    }
    
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
}
