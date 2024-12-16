package com.ss.ToDoApplication.todo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Todo DTO
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TodoDTO {
	private int todoId;				// todo 고유 식별번호
	private String todoContent;		// todo 내용
	private int todoStatus;			// todo 상태 (0: 미완료, 1: 완료)
}
