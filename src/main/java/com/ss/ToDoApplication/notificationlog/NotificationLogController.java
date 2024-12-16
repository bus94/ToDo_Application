package com.ss.ToDoApplication.notificationlog;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;

// NotificationLog 컨트롤러
@RestController
@RequestMapping("/notification-log")
public class NotificationLogController {
	private final NotificationLogService service;

	// 생성자 통한 의존성 주입
	public NotificationLogController(NotificationLogService service) {
		this.service = service;
	}

	// 모든 알림 전송한 기록 조회
	@Operation(summary = "알림 기록 조회", description = "모든 알림 전송 기록을 조회합니다.")
	@GetMapping
	public List<NotificationLog> getAllLogs() {
		return service.getAllLogs();
	}

	// 오늘 메일을 보냈는지 여부 확인
	@Operation(summary = "오늘 알림 전송 여부 확인", description = "오늘 알림이 전송되었는지 확인합니다.")
	@GetMapping("/check")
	public boolean checkToday() {
		return service.checkToday();
	}
}
