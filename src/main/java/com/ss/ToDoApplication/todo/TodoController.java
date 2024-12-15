package com.ss.ToDoApplication.todo;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {
	@Autowired
	private TodoService service;

	// Get 요청
	// 할 일 전체 리스트 가져오기
	@Operation(summary = "할 일 목록 조회", description = "모든 할 일 목록을 조회합니다.")
	@GetMapping("/todo")
	public List<TodoDTO> getTodoList() {
		System.out.println("todoList: " + service.getTodoList());
		return service.getTodoList();
	}

	// Post 요청
	// 할 일 추가
	@Operation(summary = "할 일 추가", description = "새로운 할 일을 추가합니다.")
	@PostMapping("/todo")
	public TodoDTO addTodo(@RequestBody TodoDTO todoDTO) {
		return service.addTodo(todoDTO);
	}

	// Put 요청
	// 할 일 수정 (내용 및 상태)
	@Operation(summary = "할 일 수정", description = "할 일의 내용 또는 상태를 수정합니다.")
	@PutMapping("/todo/{todoId}")
	public TodoDTO updateTodo(@PathVariable("todoId") int todoId, @RequestBody Map<String, Object> requestBody) {
		TodoDTO todoDTO = new TodoDTO();
		todoDTO.setTodoId(todoId);
		
		String updateType = (String) requestBody.get("updateType");
		if ("content".equals(updateType)) {
			todoDTO.setTodoContent((String) requestBody.get("todo_content"));
		} else if ("status".equals(updateType)) {
			todoDTO.setTodoStatus((Integer) requestBody.get("todo_status"));
		}
		
		return service.updateTodo(todoDTO);
	}
	
	// Delete 요청
	// 할 일 삭제
	@Operation(summary = "할 일 삭제", description = "할 일을 삭제합니다.")
	@DeleteMapping("/todo/{todoId}")
	public ResponseEntity<Map<String, Object>> deleteTodo(@PathVariable("todoId") int todoId) {
		try {
			service.deleteTodo(todoId);
			// 성공 시 JSON 형식의 응답 반환
	        Map<String, Object> response = Map.of(
	            "message", "삭제가 완료되었습니다.",
	            "todoId", todoId
	        );
	        return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			// 실패 시 JSON 형식의 에러 메시지 반환
	        Map<String, Object> errorResponse = Map.of(
	            "message", "삭제를 실패하였습니다.",
	            "error", e.getMessage()
	        );
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
	    }
	}
}
