package com.ss.ToDoApplication.todo;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TodoMapper {

	// 할 일 전체 조회
	List<TodoDTO> getTodoList();

	// 할 일 추가
	void addTodo(TodoDTO todoDTO);

	// 할 일 수정
	void updateTodo(TodoDTO todoDTO);

	// 할 일 삭제
	void deleteTodo(int todoId);
	
}
