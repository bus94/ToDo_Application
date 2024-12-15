import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TodoItem from './TodoItem';
import styles from '../styles/Cando.module.css';

const TodoList = ({
    todos,
    updateTodo,
    deleteTodo,
    editContent,
    saveEditedContent,
    cancelEdit,
    setHoveredTodoId,
    hoveredTodoId,
    editingTodoId,
    editingContent,
    setEditingContent,
    inputRef,
    status,
    emptyMessage,
}) => {
    const filteredTodos = todos.filter(todo => todo.todo_status === status);

    return (
        <div className={status === 0 ? styles.total_todo_container : styles.completed_todo_container}>
            <h2>{status === 0 ? 'To-Do List' : 'Completed List'}</h2>
            {filteredTodos.length === 0 ? (
                <p className={`${styles.todo_content} ${styles.comment}`}>{emptyMessage}</p>
            ) : (
                <TransitionGroup component="ul">
                    {filteredTodos.map(todo => (
                        <CSSTransition
                            key={todo.todo_id}
                            timeout={500}
                            classNames={{
                                enter: styles.todoEnter,
                                enterActive: styles.todoEnterActive,
                                exit: styles.todoExit,
                                exitActive: styles.todoExitActive,
                            }}
                        >
                            <TodoItem
                                todo={todo}
                                updateTodo={updateTodo}
                                deleteTodo={deleteTodo}
                                editContent={editContent}
                                saveEditedContent={saveEditedContent}
                                cancelEdit={cancelEdit}
                                hoveredTodoId={hoveredTodoId}
                                setHoveredTodoId={setHoveredTodoId}
                                editingTodoId={editingTodoId}
                                editingContent={editingContent}
                                setEditingContent={setEditingContent}
                                inputRef={inputRef}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            )}
        </div>
    );
};

export default TodoList;
