package com.ss.ToDoApplication;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ToDoApplicationTests {
    @Test
    void contextLoads() {
    }
    
    @Test
    public void testDotenvLoading() {
    	// .env에서 값을 로드했는지 확인
        String smtpHost = System.getProperty("SMTP_HOST");
        String smtpPort = System.getProperty("SMTP_PORT");
        
        // .env 파일에 정의된 값과 일치하는지 검증
        assertEquals("smtp.gmail.com", smtpHost);
        assertEquals("587", smtpPort);
    }
}