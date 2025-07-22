package com.anonymous.AnonymousQA.repository;

import com.anonymous.AnonymousQA.entity.Sessions;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SessionRepository extends MongoRepository<Sessions, String> {
    Optional<Sessions> findByAccessKey(String accessKey);
    List<Sessions> findByIsActiveFalseAndClosedAtBefore(LocalDateTime cutoff);
    List<Sessions> findByIsActiveTrueAndCreatedAtBefore(LocalDateTime dateTime);

}
