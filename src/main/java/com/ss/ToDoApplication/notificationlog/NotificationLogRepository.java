package com.ss.ToDoApplication.notificationlog;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationLogRepository extends JpaRepository<NotificationLog, Long>{

	boolean existsByNotificationlogSentDate(LocalDate today);
	
}
