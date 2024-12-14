package com.ss.ToDoApplication.notificationlog;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "notificationlog")
public class NotificationLog {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long notificationlogId;

	@Column(name = "notificationlog_sent_date", nullable = false)
	private LocalDate notificationlogSentDate;

	@Column(name = "notificationlog_created_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private LocalDateTime notificationlogCreatedAt;
}
