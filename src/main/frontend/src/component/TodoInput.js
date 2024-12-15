import React from 'react';
import { Button } from 'react-bootstrap';
import styles from '../styles/Cando.module.css';

const TodoInput = ({ newTodo, setNewTodo, addTodo }) => {
    return (
        <div className={styles.input_todo}>
            <input
                type="text"
                placeholder="할 일을 추가해주세요."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addTodo();
                    }
                }}
            />
            <Button onClick={addTodo}>add</Button>
        </div>
    );
};

export default TodoInput;
