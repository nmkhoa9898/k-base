package com.example.kbase_backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

/**
 * OpenAPI/Swagger configuration for API documentation.
 */
@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "KBase API",
                version = "1.0.0",
                description = """
                        KBase - Knowledge Base System API
                        
                        A comprehensive REST API for managing a knowledge base system where teams can store and manage project information.
                        
                        ## Features
                        - **User Management**: Create, update, and manage user accounts with different roles (Admin, Owner, User)
                        - **Project Management**: Create and manage projects with team collaboration
                        - **Document Management**: Upload and organize project documents
                        - **Authentication**: Secure JWT-based authentication
                        
                        ## Authentication
                        This API uses JWT (JSON Web Token) for authentication. To access protected endpoints:
                        1. Register a new account or login with existing credentials
                        2. Use the returned JWT token in the Authorization header
                        3. Format: `Authorization: Bearer <token>`
                        """,
                contact = @Contact(
                        name = "KBase Support",
                        email = "support@kbase.com"
                ),
                license = @License(
                        name = "MIT License",
                        url = "https://opensource.org/licenses/MIT"
                )
        ),
        servers = {
                @Server(url = "http://localhost:8080", description = "Local Development Server"),
                @Server(url = "https://api.kbase.com", description = "Production Server")
        }
)
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT",
        description = "JWT authentication token"
)
public class OpenApiConfig {
}
