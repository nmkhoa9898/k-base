package com.example.kbase_backend.dto.project;

import com.example.kbase_backend.entity.enums.MemberRole;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for adding a member to a project.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Request body for adding a member to a project")
public class AddMemberRequest {
    
    @NotNull(message = "User ID is required")
    @Schema(description = "User ID to add as member", example = "2", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long userId;
    
    @Schema(description = "Role of the member (OWNER or MEMBER)", example = "MEMBER", defaultValue = "MEMBER")
    private MemberRole role = MemberRole.MEMBER;
}
