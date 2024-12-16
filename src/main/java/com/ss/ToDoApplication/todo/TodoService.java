package com.ss.ToDoApplication.todo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Todo 서비스
@Service
public class TodoService {
	@Autowired
	private TodoMapper mapper;

	// 할 일 전체 조회
	public List<TodoDTO> getTodoList() {
		return mapper.getTodoList();
	}

	// 할 일 추가
	public TodoDTO addTodo(TodoDTO todoDTO) {
		mapper.addTodo(todoDTO);
		System.out.println("service todoDTO: " + todoDTO);
		return todoDTO;
	}

	// 할 일 수정
	public TodoDTO updateTodo(TodoDTO todoDTO) {
		mapper.updateTodo(todoDTO);
		return todoDTO;
	}

	// 할 일 삭제
	public void deleteTodo(int todoId) {
		mapper.deleteTodo(todoId);
	}
}
