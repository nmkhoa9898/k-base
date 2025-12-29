package com.example.kbase_backend.entity.enums;

/**
 * Enumeration representing the different roles a user can have in the system.
 */
public enum UserRole {
    /**
     * Administrator with full system access - can manage all users and projects
     */
    ADMIN,
    
    /**
     * Project owner - can create projects and invite team members
     */
    OWNER,
    
    /**
     * Regular user - can upload documents and interact with projects they belong to
     */
    USER
}
