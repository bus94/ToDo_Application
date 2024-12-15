import React from 'react';
import { Button } from 'react-bootstrap';
import styles from '../styles/Cando.module.css';

const Header = ({ search, setSearch, sendEmail }) => {
    return (
        <header className={styles.header}>
            <div className={styles.title_container}>
                <h1>Can Do</h1>
                <Button onClick={sendEmail}>메일 보내기</Button>
            </div>
            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="단어 검색"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            console.log('Search:', search);
                        }
                    }}
                />
                <Button onClick={() => console.log('Search:', search)}>search</Button>
            </div>
        </header>
    );
};

export default Header;
