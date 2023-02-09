package com.juni.fm.record.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.juni.fm.record.dto.SaveRequestDTO;
import com.juni.fm.record.entiity.Work;
import com.juni.fm.record.service.RecordService;

@CrossOrigin
@Controller
@RequestMapping("/api/record")	
public class RecordController {
	
	@Autowired
	RecordService recordService;
	
	@PostMapping
	public ResponseEntity<String> saveResult(@RequestBody SaveRequestDTO saveRequestDTO) {
		Work saveWork = recordService.saveWork(saveRequestDTO);
		return ResponseEntity.ok(saveWork.toString());
	}
}
