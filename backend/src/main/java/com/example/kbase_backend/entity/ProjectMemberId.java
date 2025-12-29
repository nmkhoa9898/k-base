package com.example.kbase_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

/**
 * Composite primary key for the ProjectMember entity.
 * Combines projectId and userId to create a unique identifier.
 */
@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectMemberId implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Column(name = "project_id")
    private Long projectId;
    
    @Column(name = "user_id")
    private Long userId;
}
