package com.juni.fm.record.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.juni.fm.record.dto.CreateWorkDTO;
import com.juni.fm.record.dto.ReadWorkDTO;
import com.juni.fm.record.entiity.Work;
import com.juni.fm.record.service.RecordService;

@RestController
public class RecordController {
	
	@Autowired
	RecordService recordService;
	
	@GetMapping("/error")
	public ResponseEntity<String> error() {
		return ResponseEntity.ok("Hello World");
	}
	
	@PostMapping("/api/record")	
	public ResponseEntity<String> createWork(@RequestBody CreateWorkDTO saveRequestDTO) {
		Work saveWork = recordService.saveWork(saveRequestDTO);
		return ResponseEntity.ok(saveWork.toString());
	}
	
	@GetMapping("/api/record/{memberId}")
	public ResponseEntity<List<ReadWorkDTO>> readWork(@PathVariable Long memberId) {
		List<ReadWorkDTO> dtos = recordService.getWorkDTO(memberId);
		return ResponseEntity.ok(dtos);
	}
}
