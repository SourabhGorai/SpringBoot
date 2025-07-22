package com.anonymous.AnonymousQA.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.temporal.Temporal;

@Data
@Document(collection = "sessions")
public class Sessions {

    @Id
    private String id;
    private String accessKey; // private token (used to manage owners session)
    private String name;
    private String gender;
    private String description;
    private boolean isActive = true;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime closedAt;

}
