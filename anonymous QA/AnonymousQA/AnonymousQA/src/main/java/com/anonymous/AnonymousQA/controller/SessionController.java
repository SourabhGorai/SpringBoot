package com.anonymous.AnonymousQA.controller;

import com.anonymous.AnonymousQA.entity.Response;
import com.anonymous.AnonymousQA.entity.Sessions;
import com.anonymous.AnonymousQA.repository.ResponseRepository;
import com.anonymous.AnonymousQA.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/sourabh")
@CrossOrigin(origins = "http://localhost:5173")
public class SessionController {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private ResponseRepository responseRepository;

    private String generateRandomId(){
        return UUID.randomUUID().toString().substring(0,8);
    }

//    @PostMapping("/sessions")
//    public Map<String, String> createSession(@RequestBody Sessions session){
//        session.setId(generateRandomId());
//        session.setAccessKey(generateRandomId());
//        sessionRepository.save(session);
//
//        Map<String, String> result = new HashMap<>();
//        result.put("sessionId", session.getId());
//        result.put("accessKey", session.getAccessKey());
//        return result;
//    }

    @PostMapping("/sessions")
    public Map<String, String> createSession(@RequestBody Sessions session) {
        session.setId(generateRandomId());
        session.setAccessKey(generateRandomId());

        if (session.getCreatedAt() == null) {
            session.setCreatedAt(LocalDateTime.now());
        }

        // Explicitly set default values
        session.setActive(true);
        if (session.getGender() == null) session.setGender("Unknown");
        if (session.getDescription() == null) session.setDescription("Ask me anything");

        sessionRepository.save(session);

        Map<String, String> result = new HashMap<>();
        result.put("sessionId", session.getId());
        result.put("accessKey", session.getAccessKey());
        return result;
    }


    @PostMapping("/sessions/{sessionId}/responses")
    public ResponseEntity<?> submitResponse(@PathVariable String sessionId, @RequestBody Map<String, String> payload){
        Optional<Sessions> optional = sessionRepository.findById(sessionId);
        if (optional.isEmpty()) return ResponseEntity.badRequest().body("Session not found");

        Sessions s = optional.get();

        // Expiry Check (24 hours)
        if (Duration.between(s.getCreatedAt(), LocalDateTime.now()).toHours() >= 24) {
            s.setActive(false);
            s.setClosedAt(LocalDateTime.now());
            sessionRepository.save(s);
            return ResponseEntity.badRequest().body("Session expired after 24 hours");
        }

        if (!s.isActive()) return ResponseEntity.badRequest().body("Session is closed");

        Response r = new Response();
        r.setSessionId(sessionId);
        r.setMessage(payload.get("message"));
        r.setRelationshipType(payload.get("relationshipType"));
        responseRepository.save(r);
        return ResponseEntity.ok("Response submitted");
    }

    @GetMapping("/manage/{accessKey}")
    public ResponseEntity<?> getResponses(@PathVariable String accessKey){
        Optional<Sessions> optional = sessionRepository.findByAccessKey(accessKey);
        if (optional.isEmpty()) return ResponseEntity.badRequest().body("Invalid access key");

        Sessions s = optional.get();
        List<Response> responses = responseRepository.findBySessionId(s.getId());

        Map<String, Object> result = new HashMap<>();
        result.put("session", s);
        result.put("responses", responses);
        return ResponseEntity.ok(result);
    }

    @PatchMapping("/manage/{accessKey}/close")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<?> closeSession(@PathVariable String accessKey) {
        Optional<Sessions> optional = sessionRepository.findByAccessKey(accessKey);
        if (optional.isEmpty()) return ResponseEntity.badRequest().body("Invalid access key");

        Sessions s = optional.get();
        s.setActive(false);
        s.setClosedAt(LocalDateTime.now());
        sessionRepository.save(s);
        return ResponseEntity.ok("Session closed");
    }

}
