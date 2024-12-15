import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import styles from '../styles/Cando.module.css';

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
        if (!newTodo.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }

        const newTodoFromServer = await fetchAPI('http://localhost:8080/api/todo', 'POST', {
            todo_content: newTodo,
            todo_status: 0,
        });
        setTodos([newTodoFromServer, ...todos]);
        setNewTodo('');
        setHoveredTodoId(null);

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
        await fetchAPI(`http://localhost:8080/api/todo/${todo_id}`, 'DELETE');

        setTodos(todos.filter(todo => todo.todo_id !== todo_id));
    }

    // 이메일 전송
    const sendEmail = async () => {
        try {
            await fetchAPI('http://localhost:8080/api/email/send', 'POST');
            alert('이메일 전송이 완료되었습니다.');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('이메일 전송에 실패했습니다.');
        }
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
        if (!editingContent.trim()) {
            alert('내용을 입력하세요.');

            // 수정 완료 후 초기화
            setEditingTodoId(null);
            setEditingContent('');
            return
        }

        await updateTodo(todo_id, "content", editingContent);

        // 수정 완료 후 초기화
        setEditingTodoId(null);
        setEditingContent('');
    }

    // 수정 취소
    const cancelEdit = () => {
        setEditingTodoId(null);
        setEditingContent('');
    }

    return (
        <div className={styles.main_container}>
            <Header search={search} setSearch={setSearch} sendEmail={sendEmail} />
            <div className={styles.total_container}>
                <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
                <div className={styles.todo_lists_container}>
                    <TodoList
                        todos={filteredTodos}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                        editContent={editContent}
                        saveEditedContent={saveEditedContent}
                        cancelEdit={cancelEdit}
                        setHoveredTodoId={setHoveredTodoId}
                        hoveredTodoId={hoveredTodoId}
                        editingTodoId={editingTodoId}
                        editingContent={editingContent}
                        setEditingContent={setEditingContent}
                        inputRef={inputRef}
                        status={0}
                        emptyMessage={search.trim() ? '검색 결과가 없습니다' : '할 일을 추가해주세요'}
                    />
                    <TodoList
                        todos={filteredTodos}
                        updateTodo={updateTodo}
                        deleteTodo={deleteTodo}
                        editContent={editContent}
                        saveEditedContent={saveEditedContent}
                        cancelEdit={cancelEdit}
                        setHoveredTodoId={setHoveredTodoId}
                        hoveredTodoId={hoveredTodoId}
                        editingTodoId={editingTodoId}
                        editingContent={editingContent}
                        setEditingContent={setEditingContent}
                        inputRef={inputRef}
                        status={1}
                        emptyMessage={search.trim() ? '검색 결과가 없습니다' : '완료된 일이 없습니다'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Cando;