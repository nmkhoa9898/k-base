package com.example.kbase_backend.controller;

import com.example.kbase_backend.dto.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Health check controller for monitoring application status.
 */
@RestController
@RequestMapping("/api")
@Tag(name = "Health", description = "Health check endpoints")
public class PingController {

    @GetMapping("/ping")
    @Operation(summary = "Health check", description = "Simple health check endpoint that returns 'pong'")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Application is healthy"
            )
    })
    public String ping() {
        return "pong";
    }
    
    @GetMapping("/health")
    @Operation(summary = "Health status", description = "Detailed health status of the application")
    public ResponseEntity<ApiResponse<Map<String, Object>>> health() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", LocalDateTime.now());
        health.put("application", "KBase Backend");
        health.put("version", "1.0.0");
        
        return ResponseEntity.ok(ApiResponse.success("Application is healthy", health));
    }
}
