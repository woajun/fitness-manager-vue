package com.juni.fm.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.juni.fm.login.service.KakaoLoginService;

@RestController
public class LoginController {

	@Autowired
	KakaoLoginService kakaoLoginService;
	
	@GetMapping("/api/login/kakao")
	public ResponseEntity<String> getKakaoAuthUrl() {
		return ResponseEntity.ok(kakaoLoginService.getLoginURL());
	}
	
	@GetMapping("/api/login/kakao/apple")
	public ResponseEntity<String> login(@RequestParam String code) {
		System.out.println(code);
		
		String accessToken = kakaoLoginService.getToken(code);
		System.out.println(accessToken);
		return ResponseEntity.ok(accessToken);
	}
	
}
