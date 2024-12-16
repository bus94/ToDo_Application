package com.ss.ToDoApplication.notificationlog;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ss.ToDoApplication.todo.TodoDTO;
import com.ss.ToDoApplication.todo.TodoService;

import io.swagger.v3.oas.annotations.Operation;

// 이메일 전송 컨트롤러
@RestController
@RequestMapping("/api/email")
public class EmailController {
	private final EmailService service;
	private final TodoService todoService;

	public EmailController(EmailService service, TodoService todoService) {
		this.service = service;
		this.todoService = todoService;
	}

	// 이메일 전송 API
	@Operation(summary = "이메일 전송", description = "모든 할 일 목록을 이메일로 전송합니다.")
	@PostMapping("/send")
	public ResponseEntity<Map<String, String>> sendEmail() {
		// 모든 할 일 가져오기
		List<TodoDTO> todos = todoService.getTodoList();
		// 이메일 전송
		service.sendTodoEmail(todos);
		
		// JSON 형식으로 메시지 반환
		Map<String, String> response = new HashMap<String, String>();
		response.put("message", "이메일 전송 완료!");
		return ResponseEntity.ok(response);
	}
}
