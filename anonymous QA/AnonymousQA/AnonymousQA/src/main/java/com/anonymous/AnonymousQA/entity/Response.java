package com.anonymous.AnonymousQA.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "responses")
public class Response {
    @Id
    private String id;
    private String sessionId; // public token (used to manage responses)
    private String message;
    private String relationshipType;
    private LocalDateTime createdAt = LocalDateTime.now();
}
