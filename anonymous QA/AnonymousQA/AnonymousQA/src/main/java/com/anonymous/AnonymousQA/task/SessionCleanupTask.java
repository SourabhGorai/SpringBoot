package com.anonymous.AnonymousQA.task;


import com.anonymous.AnonymousQA.entity.Sessions;
import com.anonymous.AnonymousQA.repository.ResponseRepository;
import com.anonymous.AnonymousQA.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;


@Component
public class SessionCleanupTask {

    @Autowired
    private SessionRepository sessionRepo;

    @Autowired
    private ResponseRepository responseRepo;

    // Runs every hour to close expired sessions
    @Scheduled(cron = "0 0 * * * *") // Every hour
    public void autoCloseExpiredSessions() {
        LocalDateTime expiryThreshold = LocalDateTime.now().minusHours(24);
        List<Sessions> activeSessions = sessionRepo.findByIsActiveTrueAndCreatedAtBefore(expiryThreshold);

        for (Sessions s : activeSessions) {
            s.setActive(false);
            s.setClosedAt(LocalDateTime.now());
            sessionRepo.save(s);
        }
    }

    // Runs daily at midnight to clean up sessions closed >3 days ago
    @Scheduled(cron = "0 0 0 * * *")
    public void cleanOldClosedSessions() {
        LocalDateTime threshold = LocalDateTime.now().minusDays(3);
        List<Sessions> expired = sessionRepo.findByIsActiveFalseAndClosedAtBefore(threshold);

        for (Sessions s : expired) {
            responseRepo.deleteBySessionId(s.getId());
            sessionRepo.delete(s);
        }
    }
}

