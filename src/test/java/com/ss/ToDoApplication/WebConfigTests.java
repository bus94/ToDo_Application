package com.ss.ToDoApplication;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
public class WebConfigTests {

    @Autowired
    private WebApplicationContext context;

    @Test
    public void testCorsConfiguration() throws Exception {
        // MockMvc를 설정하여 컨텍스트 기반 테스트 준비
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(context).build();

        // OPTIONS 요청으로 CORS 설정 테스트 (Preflight 요청)
        mockMvc.perform(options("/api/test") // 테스트 경로 (실제 경로로 변경 필요)
                .header("Origin", "http://localhost:3000")
                .header("Access-Control-Request-Method", "GET"))
                .andExpect(status().isOk()) // Preflight 응답 상태 확인
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:3000")) // 허용된 Origin 확인
                .andExpect(header().string("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")); // 허용된 HTTP 메서드 확인
    }
}
