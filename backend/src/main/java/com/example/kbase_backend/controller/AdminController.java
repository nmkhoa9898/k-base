package com.example.kbase_backend.controller;

import com.example.kbase_backend.dto.admin.DatabaseOverviewDTO;
import com.example.kbase_backend.dto.common.ApiResponse;
import com.example.kbase_backend.dto.document.DocumentDTO;
import com.example.kbase_backend.dto.project.ProjectDTO;
import com.example.kbase_backend.dto.project.ProjectMemberDTO;
import com.example.kbase_backend.dto.user.UserDTO;
import com.example.kbase_backend.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for admin-only operations.
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Tag(name = "Admin", description = "Administrator-only APIs")
@SecurityRequirement(name = "bearerAuth")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    
    private final AdminService adminService;
    
    /**
     * Get complete database overview.
     */
    @GetMapping("/database")
    @Operation(summary = "Get database overview", description = "Retrieve complete database overview including all users, projects, documents, and memberships")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Database overview retrieved successfully"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "403",
                    description = "Access denied - Admin role required"
            )
    })
    public ResponseEntity<ApiResponse<DatabaseOverviewDTO>> getDatabaseOverview() {
        DatabaseOverviewDTO overview = adminService.getDatabaseOverview();
        return ResponseEntity.ok(ApiResponse.success("Database overview retrieved successfully", overview));
    }
    
    /**
     * Get all users (including inactive).
     */
    @GetMapping("/users")
    @Operation(summary = "Get all users", description = "Retrieve all users including inactive ones")
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        List<UserDTO> users = adminService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success("Users retrieved successfully", users));
    }
    
    /**
     * Get all projects (including inactive).
     */
    @GetMapping("/projects")
    @Operation(summary = "Get all projects", description = "Retrieve all projects including inactive ones")
    public ResponseEntity<ApiResponse<List<ProjectDTO>>> getAllProjects() {
        List<ProjectDTO> projects = adminService.getAllProjects();
        return ResponseEntity.ok(ApiResponse.success("Projects retrieved successfully", projects));
    }
    
    /**
     * Get all documents (including inactive).
     */
    @GetMapping("/documents")
    @Operation(summary = "Get all documents", description = "Retrieve all documents including inactive ones")
    public ResponseEntity<ApiResponse<List<DocumentDTO>>> getAllDocuments() {
        List<DocumentDTO> documents = adminService.getAllDocuments();
        return ResponseEntity.ok(ApiResponse.success("Documents retrieved successfully", documents));
    }
    
    /**
     * Get all project memberships.
     */
    @GetMapping("/memberships")
    @Operation(summary = "Get all memberships", description = "Retrieve all project memberships")
    public ResponseEntity<ApiResponse<List<ProjectMemberDTO>>> getAllMemberships() {
        List<ProjectMemberDTO> memberships = adminService.getAllMemberships();
        return ResponseEntity.ok(ApiResponse.success("Memberships retrieved successfully", memberships));
    }
    
    /**
     * Get database statistics.
     */
    @GetMapping("/stats")
    @Operation(summary = "Get database statistics", description = "Retrieve database statistics summary")
    public ResponseEntity<ApiResponse<DatabaseOverviewDTO.DatabaseStats>> getDatabaseStats() {
        DatabaseOverviewDTO.DatabaseStats stats = adminService.getDatabaseStats();
        return ResponseEntity.ok(ApiResponse.success("Statistics retrieved successfully", stats));
    }
}
