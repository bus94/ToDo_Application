package com.ss.ToDoApplication.notificationlog;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

// NotificationLog 서비스
@Service
public class NotificationLogService {
	private final NotificationLogRepository repository;
	
	public NotificationLogService(NotificationLogRepository repository) {
        this.repository = repository;
    }
	
	// 모든 전송 로그 조회
	public List<NotificationLog> getAllLogs() {
		return repository.findAll();
	}
	
	// 오늘 메일 전송 여부 확인
    public boolean checkToday() {
        return repository.existsByNotificationlogSentDate(LocalDate.now());
    }

}
