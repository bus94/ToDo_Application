package com.ss.ToDoApplication.notificationlog;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notification-log")
public class NotificationLogController {
	private final NotificationLogService service;

	// 생성자 통한 의존성 주입
	public NotificationLogController(NotificationLogService service) {
		this.service = service;
	}

	// 모든 알림 전송한 기록 조회
	@GetMapping
	public List<NotificationLog> getAllLogs() {
		return service.getAllLogs();
	}

	// 메일을 보냈는지 여부 확인
	@GetMapping("/check")
	public boolean checkToday() {
		return service.checkToday();
	}
}
