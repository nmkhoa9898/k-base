package com.example.kbase_backend.dto.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

/**
 * Generic API response wrapper that provides a consistent response structure.
 *
 * @param <T> Type of the result data
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "Standard API response wrapper")
public class ApiResponse<T> {
    
    @Schema(description = "HTTP status code", example = "200")
    private int status;
    
    @Schema(description = "Response message", example = "Operation successful")
    private String message;
    
    @Schema(description = "Response data/result")
    private T result;
    
    @Schema(description = "Additional metadata (pagination, etc.)")
    private Object metadata;
    
    @Schema(description = "Response timestamp")
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
    
    /**
     * Create a success response with data.
     */
    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
                .status(HttpStatus.OK.value())
                .message("Success")
                .result(data)
                .timestamp(LocalDateTime.now())
                .build();
    }
    
    /**
     * Create a success response with message and data.
     */
    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.<T>builder()
                .status(HttpStatus.OK.value())
                .message(message)
                .result(data)
                .timestamp(LocalDateTime.now())
                .build();
    }
    
    /**
     * Create a success response with message, data, and metadata.
     */
    public static <T> ApiResponse<T> success(String message, T data, Object metadata) {
        return ApiResponse.<T>builder()
                .status(HttpStatus.OK.value())
                .message(message)
                .result(data)
                .metadata(metadata)
                .timestamp(LocalDateTime.now())
                .build();
    }
    
    /**
     * Create a created response (HTTP 201).
     */
    public static <T> ApiResponse<T> created(String message, T data) {
        return ApiResponse.<T>builder()
                .status(HttpStatus.CREATED.value())
                .message(message)
                .result(data)
                .timestamp(LocalDateTime.now())
                .build();
    }
    
    /**
     * Create an error response.
     */
    public static <T> ApiResponse<T> error(HttpStatus status, String message) {
        return ApiResponse.<T>builder()
                .status(status.value())
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
    }
    
    /**
     * Create an error response with details.
     */
    public static <T> ApiResponse<T> error(HttpStatus status, String message, T details) {
        return ApiResponse.<T>builder()
                .status(status.value())
                .message(message)
                .result(details)
                .timestamp(LocalDateTime.now())
                .build();
    }
}
