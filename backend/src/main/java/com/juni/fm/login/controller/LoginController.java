package com.juni.fm.login.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.juni.fm.login.service.KakaoLoginService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
public class LoginController {

	@Autowired
	KakaoLoginService kakaoLoginService;
	
	@GetMapping("/api/login/kakao")
	public ResponseEntity<String> getKakaoAuthUrl() {
		return ResponseEntity.ok(kakaoLoginService.getLoginURL());
	}
	
	@GetMapping("/api/login/kakao/apple")
	public void login(HttpServletResponse response, @RequestParam String code) throws IOException {
		System.out.println(code);
		
		String accessToken = kakaoLoginService.getToken(code);
		System.out.println(accessToken);
		response.sendRedirect("http://127.0.0.1:5173/code=?"+accessToken);
	}
	
}
