package com.juni.fm.login.service;

import java.net.URI;

import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class KakaoLoginService {
	
	public String getToken(String code) {

	    String accessToken = "";

	    RestTemplate restTemplate = new RestTemplate();
	    URI uri = URI.create("https://kauth.kakao.com/oauth/token");

	    HttpHeaders headers = new HttpHeaders();

	    MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<String, Object>();
	    parameters.set("grant_type", "authorization_code");
	    parameters.set("client_id", "fa73116a415652fa5a3cd28f5d2af7c4");
	    parameters.set("redirect_uri", "http://127.0.0.1:5173");
	    parameters.set("code", code);

	    HttpEntity<MultiValueMap<String, Object>> restRequest = new HttpEntity<>(parameters, headers);
	    ResponseEntity<JSONObject> apiResponse = restTemplate.postForEntity(uri, restRequest, JSONObject.class);
	    JSONObject responseBody = apiResponse.getBody();
	    accessToken = (String) responseBody.get("access_token");

	    return accessToken;
	}

}
