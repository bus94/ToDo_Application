package com.ss.ToDoApplication.notificationlog;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// NotificationLog Repository
@Repository
public interface NotificationLogRepository extends JpaRepository<NotificationLog, Long>{
	// 오늘 이메일 전송 했는지 확인
	boolean existsByNotificationlogSentDate(LocalDate today);
	
}
