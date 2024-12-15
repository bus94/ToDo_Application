package com.ss.ToDoApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {
	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI().info(new Info().title("To Do API Documentation").version("1.0").description("To Do Application의 API 명세서입니다."));
	}
}
