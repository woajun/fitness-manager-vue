package com.juni.fm.login.service;

import java.net.URI;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class KakaoLoginService {
	
	private final String KAKAO_URI = "https://kauth.kakao.com";
	private final String REDIRECT_URI = "http://127.0.0.1:5000";
	private final String KAKAO_CLIENT_ID = "fa73116a415652fa5a3cd28f5d2af7c4"; 
	

	public String getLoginURL() {
		String redirect = REDIRECT_URI + "/api/login/kakao/apple";
		return KAKAO_URI + "/oauth/authorize"
				+ "?client_id=" + KAKAO_CLIENT_ID + 
				"&redirect_uri=" + redirect + 
				"&response_type=code";
	}
	
	public String getToken(String code) {

		URI uri = URI.create(KAKAO_URI + "/oauth/token");
		RestTemplate restTemplate = new RestTemplate();

	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

	    LinkedMultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
	    parameters.set("grant_type", "authorization_code");
	    parameters.set("client_id", KAKAO_CLIENT_ID);
	    parameters.set("redirect_uri", REDIRECT_URI + "/api/login/kakao/apple");
	    parameters.set("code", code);

	    HttpEntity<MultiValueMap<String, String>> restRequest = new HttpEntity<>(parameters, headers);
	    ResponseEntity<String> apiResponse = restTemplate.postForEntity(uri, restRequest, String.class);
	    String result = apiResponse.getBody();
	    System.out.println(result);
	    return result;
	}

}
