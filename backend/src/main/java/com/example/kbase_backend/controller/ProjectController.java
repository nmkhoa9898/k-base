package com.example.kbase_backend.controller;

import com.example.kbase_backend.dto.common.ApiResponse;
import com.example.kbase_backend.dto.common.PageMetadata;
import com.example.kbase_backend.dto.project.*;
import com.example.kbase_backend.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for project management endpoints.
 */
@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@Tag(name = "Projects", description = "Project management APIs")
@SecurityRequirement(name = "bearerAuth")
public class ProjectController {
    
    private final ProjectService projectService;
    
    /**
     * Get all projects with optional pagination.
     */
    @GetMapping
    @Operation(summary = "Get all projects", description = "Retrieve all projects with optional pagination")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Projects retrieved successfully"
            )
    })
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> getAllProjects(
            @Parameter(description = "Page number (0-indexed)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "20") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction") @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<ProjectDTO> projectPage = projectService.findAll(pageable);
        PageMetadata metadata = projectService.createPageMetadata(projectPage);
        
        return ResponseEntity.ok(ApiResponse.success("Projects retrieved successfully", projectPage.getContent(), metadata));
    }
    
    /**
     * Get project by ID.
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get project by ID", description = "Retrieve a specific project by its ID")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Project found",
                    content = @Content(schema = @Schema(implementation = ProjectDTO.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Project not found"
            )
    })
    public ResponseEntity<ApiResponse<ProjectDTO>> getProjectById(
            @Parameter(description = "Project ID") @PathVariable Long id) {
        ProjectDTO project = projectService.findById(id);
        return ResponseEntity.ok(ApiResponse.success(project));
    }
    
    /**
     * Get projects by owner ID.
     */
    @GetMapping("/owner/{ownerId}")
    @Operation(summary = "Get projects by owner", description = "Retrieve all projects owned by a specific user")
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> getProjectsByOwner(
            @Parameter(description = "Owner user ID") @PathVariable Long ownerId) {
        List<ProjectDTO> projects = projectService.findByOwnerId(ownerId);
        return ResponseEntity.ok(ApiResponse.success(projects));
    }
    
    /**
     * Get projects by member ID.
     */
    @GetMapping("/member/{userId}")
    @Operation(summary = "Get projects by member", description = "Retrieve all projects where a user is a member")
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> getProjectsByMember(
            @Parameter(description = "Member user ID") @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<ProjectDTO> projectPage = projectService.findByMemberId(userId, pageable);
        PageMetadata metadata = projectService.createPageMetadata(projectPage);
        
        return ResponseEntity.ok(ApiResponse.success("Projects retrieved successfully", projectPage.getContent(), metadata));
    }
    
    /**
     * Search projects.
     */
    @GetMapping("/search")
    @Operation(summary = "Search projects", description = "Search projects by name or description")
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> searchProjects(
            @Parameter(description = "Search term") @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<ProjectDTO> projectPage = projectService.searchProjects(q, pageable);
        PageMetadata metadata = projectService.createPageMetadata(projectPage);
        
        return ResponseEntity.ok(ApiResponse.success("Search results", projectPage.getContent(), metadata));
    }
    
    /**
     * Create a new project.
     */
    @PostMapping
    @Operation(summary = "Create project", description = "Create a new project")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "201",
                    description = "Project created successfully",
                    content = @Content(schema = @Schema(implementation = ProjectDTO.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Owner not found"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "409",
                    description = "Project name already exists for this owner"
            )
    })
    public ResponseEntity<ApiResponse<ProjectDTO>> createProject(@Valid @RequestBody CreateProjectRequest request) {
        ProjectDTO project = projectService.create(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.created("Project created successfully", project));
    }
    
    /**
     * Update an existing project.
     */
    @PutMapping("/{id}")
    @Operation(summary = "Update project", description = "Update an existing project")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Project updated successfully",
                    content = @Content(schema = @Schema(implementation = ProjectDTO.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Project not found"
            )
    })
    public ResponseEntity<ApiResponse<ProjectDTO>> updateProject(
            @Parameter(description = "Project ID") @PathVariable Long id,
            @Valid @RequestBody UpdateProjectRequest request) {
        ProjectDTO project = projectService.update(id, request);
        return ResponseEntity.ok(ApiResponse.success("Project updated successfully", project));
    }
    
    /**
     * Delete a project (soft delete).
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete project", description = "Soft delete a project")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Project deleted successfully"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Project not found"
            )
    })
    public ResponseEntity<ApiResponse<Void>> deleteProject(
            @Parameter(description = "Project ID") @PathVariable Long id) {
        projectService.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Project deleted successfully", null));
    }
    
    // ========== Member Management ==========
    
    /**
     * Get all members of a project.
     */
    @GetMapping("/{projectId}/members")
    @Operation(summary = "Get project members", description = "Retrieve all members of a project")
    public ResponseEntity<ApiResponse<List<ProjectMemberDTO>>> getProjectMembers(
            @Parameter(description = "Project ID") @PathVariable Long projectId) {
        List<ProjectMemberDTO> members = projectService.getProjectMembers(projectId);
        return ResponseEntity.ok(ApiResponse.success(members));
    }
    
    /**
     * Add a member to a project.
     */
    @PostMapping("/{projectId}/members")
    @Operation(summary = "Add project member", description = "Add a new member to a project")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "201",
                    description = "Member added successfully",
                    content = @Content(schema = @Schema(implementation = ProjectMemberDTO.class))
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Project or user not found"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "409",
                    description = "User is already a member"
            )
    })
    public ResponseEntity<ApiResponse<ProjectMemberDTO>> addMember(
            @Parameter(description = "Project ID") @PathVariable Long projectId,
            @Valid @RequestBody AddMemberRequest request) {
        ProjectMemberDTO member = projectService.addMember(projectId, request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.created("Member added successfully", member));
    }
    
    /**
     * Remove a member from a project.
     */
    @DeleteMapping("/{projectId}/members/{userId}")
    @Operation(summary = "Remove project member", description = "Remove a member from a project")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Member removed successfully"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Cannot remove project owner"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "404",
                    description = "Project member not found"
            )
    })
    public ResponseEntity<ApiResponse<Void>> removeMember(
            @Parameter(description = "Project ID") @PathVariable Long projectId,
            @Parameter(description = "User ID") @PathVariable Long userId) {
        projectService.removeMember(projectId, userId);
        return ResponseEntity.ok(ApiResponse.success("Member removed successfully", null));
    }
    
    /**
     * Check if user is a member of a project.
     */
    @GetMapping("/{projectId}/members/{userId}/check")
    @Operation(summary = "Check membership", description = "Check if a user is a member of a project")
    public ResponseEntity<ApiResponse<Boolean>> checkMembership(
            @Parameter(description = "Project ID") @PathVariable Long projectId,
            @Parameter(description = "User ID") @PathVariable Long userId) {
        boolean isMember = projectService.isMember(projectId, userId);
        return ResponseEntity.ok(ApiResponse.success(isMember ? "User is a member" : "User is not a member", isMember));
    }
}
