package com.ss.ToDoApplication.notificationlog;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// NotificationLog 엔티티 : 이메일 알림 전송 로그 관리 데이터 모델
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "notificationlog")
public class NotificationLog {
	// 알림 로그 ID
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long notificationlogId;

	// 이메일 전송 날짜
	@Column(name = "notificationlog_sent_date", nullable = false)
	private LocalDate notificationlogSentDate;

	// 로그 생성 시간
	@Column(name = "notificationlog_created_at", nullable = false, updatable = false)
	private LocalDateTime notificationlogCreatedAt;
	
	// 엔티티 저장 전 createdAt 값을 자동으로 설정
	@PrePersist
	protected void onCreate() {
		this.notificationlogCreatedAt = LocalDateTime.now();
	}
}
