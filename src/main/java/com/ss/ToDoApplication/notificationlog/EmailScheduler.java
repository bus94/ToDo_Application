package com.ss.ToDoApplication.notificationlog;

import java.time.LocalDate;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ss.ToDoApplication.todo.TodoDTO;
import com.ss.ToDoApplication.todo.TodoService;

import jakarta.annotation.PostConstruct;

// 이메일 스케줄러
@Component
public class EmailScheduler {
	private final EmailService emailService;
	private final TodoService todoService;
	private final NotificationLogRepository notificationLogRepository;
	private LocalDate today = LocalDate.now();
	
	public EmailScheduler(EmailService emailService, TodoService todoService, NotificationLogRepository notificationLogRepository) {
		this.emailService = emailService;
		this.todoService = todoService;
		this.notificationLogRepository = notificationLogRepository;
	}
	
	// 매일 오전 9시 실행 (임
	// 알림 로그에 전송 기록이 없는 경우 메일 전송
	@Scheduled(cron = "0 0 9 * * ?")
	public void run() {
		// 메일 발송되었는지 확인
		if (!notificationLogRepository.existsByNotificationlogSentDate(today)) {
			sendEmail();
		}
	}
	
	// 서버 시작 시 전송 여부 확인 후 메일 전송
	@PostConstruct
	public void checkAndSendEmail() {
		if (!notificationLogRepository.existsByNotificationlogSentDate(today)) {
			sendEmail();
		}
	}
	
	// 오전 9시 이후 서버 실행 시 전송 여부 확인 후 메일 전송
	@Scheduled(initialDelay = 1000, fixedRate = Long.MAX_VALUE)
	public void sendEmailIfNotSent() {
		if (!notificationLogRepository.existsByNotificationlogSentDate(today)) {
			sendEmail();
		}
	}
	
	// 메일 전송 메서드
	private void sendEmail() {
		// 할 일 목록 가져오기
		List<TodoDTO> todoList = todoService.getTodoList();
		
		// 메일 전송
		emailService.sendTodoEmail(todoList);
	}
}
