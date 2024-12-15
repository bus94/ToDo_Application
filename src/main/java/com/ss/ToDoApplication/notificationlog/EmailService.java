package com.ss.ToDoApplication.notificationlog;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.ss.ToDoApplication.todo.TodoDTO;

@Service
public class EmailService {
	private final JavaMailSender mailSender;
	private final NotificationLogRepository notificationLogRepository;
	
	@Value("${spring.mail.username}")
	private String smtpUsername;
	
	@Value("${notification.email}")
	private String notificationEmail;
	
	public EmailService(JavaMailSender mailSender, NotificationLogRepository notificationLogRepository) {
		this.mailSender = mailSender;
		this.notificationLogRepository = notificationLogRepository;
	}
	
	public void sendTodoEmail (List<TodoDTO> todos) {
		String subject = "[오늘의 To do List]";
		
		// To-Do List, Completed List
		List<TodoDTO> todoList = todos.stream().filter(todo -> todo.getTodoStatus() == 0).collect(Collectors.toList());
		List<TodoDTO> completedList = todos.stream().filter(todo -> todo.getTodoStatus() == 1).collect(Collectors.toList());
		
		// 이메일 본문
		StringBuilder messageBody = new StringBuilder();
		messageBody.append("오늘의 할 일 내용 요약입니다.\n\n");
		messageBody.append("전체 할 일: ").append(todos.size()).append("개\n");
		messageBody.append("To-Do List: ").append(todoList.size()).append("개\n");
		messageBody.append("Completed List: ").append(completedList.size()).append("개\n");
		
		if (!todoList.isEmpty()) {
			messageBody.append("\n[To-Do List]\n");
			todoList.forEach(todo -> messageBody.append("- ").append(todo.getTodoContent()).append("\n"));
		} else {
			messageBody.append("\n모든 할 일을 완료하였습니다! 👍\n");
		}
		
		if (!completedList.isEmpty()) {
			messageBody.append("\n[Completed List]\n");
			completedList.forEach(todo -> messageBody.append("- ").append(todo.getTodoContent()).append("\n"));
		} else {
			messageBody.append("\n완료된 일이 없습니다.\n");
		}
		
		// 이메일 객체 생성
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(notificationEmail);
		message.setSubject(subject);
		message.setText(messageBody.toString());
		message.setFrom(smtpUsername);
		
		// 메일 전송
		mailSender.send(message);
		
		// 이메일 전송 후 저장
		NotificationLog log = new NotificationLog();
		log.setNotificationlogSentDate(LocalDate.now());
		notificationLogRepository.save(log);
	}
}
