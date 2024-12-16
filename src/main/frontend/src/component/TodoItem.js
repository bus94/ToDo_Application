import React from 'react';
import styles from '../styles/Cando.module.css';

const TodoItem = ({
    todo,
    updateTodo,
    deleteTodo,
    editContent,
    saveEditedContent,
    cancelEdit,
    hoveredTodoId,
    setHoveredTodoId,
    editingTodoId,
    editingContent,
    setEditingContent,
    inputRef,
}) => {
    return (
        <li
            className={`${styles.todo_list} ${
                todo.todo_status === 1 ? styles.completed_list : ''
            }`}
            onMouseEnter={() => setHoveredTodoId(todo.todo_id)}
            onMouseLeave={() => setHoveredTodoId(null)}
        >
            <div className={styles.todo_content}>
                <input
                    type="checkbox"
                    checked={todo.todo_status === 1}
                    onChange={() =>
                        updateTodo(todo.todo_id, 'status', todo.todo_status === 0 ? 1 : 0)
                    }
                />
                {editingTodoId === todo.todo_id ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        onBlur={() => saveEditedContent(todo.todo_id)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEditedContent(todo.todo_id);
                            if (e.key === 'Escape') cancelEdit();
                        }}
                    />
                ) : (
                    <span onDoubleClick={() => editContent(todo.todo_id, todo.todo_content)}>
                        {todo.todo_content}
                    </span>
                )}
            </div>
            {hoveredTodoId === todo.todo_id && editingTodoId !== todo.todo_id && (
                <div className={styles.icon_buttons}>
                    <button
                        className={styles.edit_button}
                        onClick={() => editContent(todo.todo_id, todo.todo_content)}
                    >
                        ✏️
                    </button>
                    <button
                        className={styles.delete_button}
                        onClick={() => deleteTodo(todo.todo_id)}
                    >
                        🗑️
                    </button>
                </div>
            )}
        </li>
    );
};

export default TodoItem;
