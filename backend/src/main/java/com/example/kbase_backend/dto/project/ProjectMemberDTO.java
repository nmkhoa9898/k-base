package com.example.kbase_backend.dto.project;

import com.example.kbase_backend.entity.enums.MemberRole;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for Project Member responses.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Project member information")
public class ProjectMemberDTO {
    
    @Schema(description = "Project ID", example = "1")
    private Long projectId;
    
    @Schema(description = "User ID", example = "1")
    private Long userId;
    
    @Schema(description = "User email", example = "john.doe@example.com")
    private String userEmail;
    
    @Schema(description = "User full name", example = "John Doe")
    private String userFullName;
    
    @Schema(description = "Member role in the project", example = "MEMBER")
    private MemberRole role;
    
    @Schema(description = "Whether the membership is active", example = "true")
    private Boolean isActive;
    
    @Schema(description = "Date the user joined the project")
    private LocalDateTime joinedAt;
}
