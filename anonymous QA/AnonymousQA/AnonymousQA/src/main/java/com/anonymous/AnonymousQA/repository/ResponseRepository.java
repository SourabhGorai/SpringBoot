package com.anonymous.AnonymousQA.repository;

import com.anonymous.AnonymousQA.entity.Response;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ResponseRepository extends MongoRepository<Response, String> {
    List<Response> findBySessionId(String sessionId);
    void deleteBySessionId(String sessionId);
}
