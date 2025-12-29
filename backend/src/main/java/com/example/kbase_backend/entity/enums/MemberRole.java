package com.example.kbase_backend.entity.enums;

/**
 * Enumeration representing the role of a user within a specific project.
 */
public enum MemberRole {
    /**
     * Owner of the project - has full control over the project
     */
    OWNER,
    
    /**
     * Regular member of the project - can view and upload documents
     */
    MEMBER
}
