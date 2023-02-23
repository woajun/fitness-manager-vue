package com.juni.fm.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.juni.fm.login.service.KakaoLoginService;

@RestController
public class LoginController {

	@Autowired
	KakaoLoginService kakaoLoginService;
	
	@GetMapping("/api/login/{code}")
	public ResponseEntity<String> login(@PathVariable String code) {
		System.out.println(code);
		
		String accessToken = kakaoLoginService.getToken(code);
		System.out.println(accessToken);
		return ResponseEntity.ok(accessToken);
	}
	
}
