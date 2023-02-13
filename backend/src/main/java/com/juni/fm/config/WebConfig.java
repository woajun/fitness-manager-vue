package com.juni.fm.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
			.allowedOrigins("http://127.0.0.1:5173/", "https://symphonious-eclair-024f7d.netlify.app/")
			.allowedMethods("GET", "POST", "DELETE", "PUT")
			.allowCredentials(true)
			.maxAge(3000);
	}
}
