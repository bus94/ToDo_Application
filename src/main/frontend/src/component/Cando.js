import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Cando.module.css';
import { Button } from 'react-bootstrap';

const Cando = () => {
    const [todos, setTodos] = useState([]); // 전체 할 일
    const [newTodo, setNewTodo] = useState(''); // 추가 할 일
    const [search, setSearch] = useState(''); // 검색
    const [hoveredTodoId, setHoveredTodoId] = useState(null); // hover된 todo_id
    const [editingTodoId, setEditingTodoId] = useState(null); // 편집 중인 todo_id
    const [editingContent, setEditingContent] = useState(''); // 편집 중인 todo_content
    const inputRef = useRef(null);

    // API 호출 함수
    const fetchAPI = async (url, method, body) => {
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: body ? JSON.stringify(body) : null,
            })
            if (!response.ok) throw new Error(`API reauest failed with status ${response.status}`);
            return response.json();
        } catch (error) {
            console.error('API Error:', error);
            alert('다시 시도해주세요.');
            throw error;
        }
    }

    // 할 일 전체 리스트 가져오기
    useEffect(() => {
        fetch('http://localhost:8080/api/todo')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setTodos(data);
            })
            .catch((error) => console.error('Error fetching the data:', error));
    }, []);

    // 할 일 추가
    const addTodo = async () => {
        if (newTodo.trim()) {
            const newTodoFromServer = await fetchAPI('http://localhost:8080/api/todo', 'POST', {
                todo_content: newTodo,
                todo_status: 0,
            });
            setTodos([newTodoFromServer, ...todos]);
            console.log('newTodoFromServer:', newTodoFromServer);
            setNewTodo('');
            setHoveredTodoId(null);
        }
    };

    // 할 일 업데이트 (내용 수정, 상태 변경(전체 할 일 ↔ 완료된 일))
    const updateTodo = async (todo_id, updateType, updatedValue) => {
        console.log('수정할 todo_id:', todo_id)
        console.log('수정할 updateType:', updateType)
        console.log('수정할 updatedValue:', updatedValue)
        const previousTodos = [...todos];

        try {
            await fetchAPI(`http://localhost:8080/api/todo/${todo_id}`, 'PUT', {
                updateType,
                ...(updateType === 'content' ? { todo_content: updatedValue } : { todo_status: updatedValue })
            });

            setTodos((prevTodos) => prevTodos.map((todo) => todo.todo_id === todo_id ? {
                ...todo, [updateType === 'content' ? 'todo_content' : 'todo_status']: updatedValue,
            } : todo));

            console.log("서버로 수정 보내고 난 todos:", todos);
        } catch (error) {
            console.error('Error updating todo:', error);
            alert('업데이트에 실패했습니다. 이전 상태로 복구합니다.');
            setTodos(previousTodos);
        }
    };

    // 할 일 삭제
    const deleteTodo = async (todo_id) => {
        // 삭제 확인
        const isConfirmed = window.confirm("삭제하시겠습니까?");
        if(!isConfirmed) {
            return;
        }

        const response = await fetchAPI(`http://localhost:8080/api/todo/${todo_id}`, 'DELETE');
        
        if (response && response.message) {
            alert(response.message);
        }
        
        setTodos(todos.filter(todo => todo.todo_id !== todo_id));
    }

    // 검색 필터링
    const filteredTodos = todos.filter(todo =>
        // todo_content가 비어있거나 문자열이 아니면 제외
        // todo_content에 search 문자열이 포함되어 있는지 확인
        todo.todo_content?.toLowerCase().includes(search.toLowerCase())
    );

    // 내용 수정
    const editContent = (todo_id, todo_content) => {
        setEditingTodoId(todo_id);
        setEditingContent(todo_content);
    }

    useEffect(() => {
        if (editingTodoId && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingTodoId]);

    // 수정된 내용 저장
    const saveEditedContent = async (todo_id) => {
        if (editingContent.trim()) {
            await updateTodo(todo_id, "content", editingContent);

            // 수정 완료 후 초기화
            setEditingTodoId(null);
            setEditingContent('');
        }
    }

    // 수정 취소
    const cancelEdit = () => {
        setEditingTodoId(null);
        setEditingContent('');
    }

    return (
        <div className={styles.main_container}>
            <header className={styles.header}>
                <h1>Can Do</h1>
                <div className={styles.search}>
                    <input type='text' placeholder='단어 검색' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button onClick={addTodo}>search</Button>
                </div>
            </header>

            <div className={styles.todo_main_container}>
                <div className={styles.input_todo}>
                    <input type='text' placeholder='할 일을 추가해주세요.' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                    <Button onClick={addTodo}>add</Button>
                </div>

                <div className={styles.todo_lists_container}>
                    <div className={styles.total_todo_container}>
                        <h2>To-Do List</h2>
                        <ul>
                            {filteredTodos.filter(todo => todo.todo_status === 0).map(todo => (
                                <li key={todo.todo_id} className={`${styles.total_todo}`} onMouseEnter={() => {console.log('onMouseEnter triggered for todo_id:', todo.todo_id); setHoveredTodoId(todo.todo_id);}} onMouseLeave={() => setHoveredTodoId(null)}>
                                    <div className={styles.todo_content}>
                                        <input type='checkbox' onChange={() => updateTodo(todo.todo_id, "status", todo.todo_status === 0 ? 1 : 0)} />
                                        {editingTodoId === todo.todo_id ? (
                                            <input ref={inputRef} type='text' value={editingContent} onChange={(e) => setEditingContent(e.target.value)} onBlur={() => saveEditedContent(todo.todo_id)} onKeyDown={(e) => {
                                                if (e.key === 'Enter') saveEditedContent(todo.todo_id);
                                                if (e.key === 'Escape') cancelEdit();
                                            }} />
                                        ) : (
                                            <span onDoubleClick={() => editContent(todo.todo_id, todo.todo_content)}>
                                                {todo.todo_content}
                                            </span>
                                        )}
                                    </div>
                                    {hoveredTodoId === todo.todo_id && editingTodoId !== todo.todo_id && (
                                        <div className={styles.icon_buttons}>
                                            <button className={styles.edit_button} onClick={() => editContent(todo.todo_id, todo.todo_content)}>&nbsp;✏️</button>
                                            <button className={styles.delete_button} onClick={() => deleteTodo(todo.todo_id)}>🗑️</button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.completed_todo_container}>
                        <h2>Completed List</h2>
                        <ul>
                            {filteredTodos.filter(todo => todo.todo_status === 1).map(todo => (
                                <li key={todo.todo_id} className={`${styles.total_todo} ${styles.completed_todo}`} onMouseEnter={() => setHoveredTodoId(todo.todo_id)} onMouseLeave={() => setHoveredTodoId(null)}>
                                    <div className={styles.todo_content}>
                                        <input type='checkbox' checked={todo.todo_status === 1} onChange={() => updateTodo(todo.todo_id, "status", todo.todo_status === 1 ? 0 : 1)} />
                                        {editingTodoId === todo.todo_id ? (
                                            <input type='text' value={editingContent} onChange={(e) => setEditingContent(e.target.value)} onBlur={() => saveEditedContent(todo.todo_id)} onKeyDown={(e) => {
                                                if (e.key === 'Enter') saveEditedContent(todo.todo_id);
                                                if (e.key === 'Escape') cancelEdit();
                                            }} />
                                        ) : (
                                            <span onDoubleClick={() => editContent(todo.todo_id, todo.todo_content)}>
                                                {todo.todo_content}
                                            </span>
                                        )}
                                    </div>
                                    {hoveredTodoId === todo.todo_id && editingTodoId !== todo.todo_id && (
                                        <div className={styles.icon_buttons}>
                                            <button className={styles.edit_button} onClick={() => editContent(todo.todo_id, todo.todo_content)}>&nbsp;✏️</button>
                                            <button className={styles.delete_button} onClick={() => deleteTodo(todo.todo_id)}>🗑️</button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cando;