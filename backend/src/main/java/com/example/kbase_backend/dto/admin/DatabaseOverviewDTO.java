package com.example.kbase_backend.dto.admin;

import com.example.kbase_backend.dto.document.DocumentDTO;
import com.example.kbase_backend.dto.project.ProjectDTO;
import com.example.kbase_backend.dto.project.ProjectMemberDTO;
import com.example.kbase_backend.dto.user.UserDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO for complete database overview (admin only).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Complete database overview for administrators")
public class DatabaseOverviewDTO {
    
    @Schema(description = "All users in the system")
    private List<UserDTO> users;
    
    @Schema(description = "All projects in the system")
    private List<ProjectDTO> projects;
    
    @Schema(description = "All documents in the system")
    private List<DocumentDTO> documents;
    
    @Schema(description = "All project memberships in the system")
    private List<ProjectMemberDTO> projectMembers;
    
    @Schema(description = "Summary statistics")
    private DatabaseStats stats;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "Database statistics summary")
    public static class DatabaseStats {
        @Schema(description = "Total number of users")
        private long totalUsers;
        
        @Schema(description = "Total number of active users")
        private long activeUsers;
        
        @Schema(description = "Total number of projects")
        private long totalProjects;
        
        @Schema(description = "Total number of active projects")
        private long activeProjects;
        
        @Schema(description = "Total number of documents")
        private long totalDocuments;
        
        @Schema(description = "Total number of active documents")
        private long activeDocuments;
        
        @Schema(description = "Total number of project memberships")
        private long totalMemberships;
    }
}
