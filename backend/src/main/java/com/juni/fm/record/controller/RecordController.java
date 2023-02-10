package com.juni.fm.record.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.juni.fm.record.dto.CreateWorkDTO;
import com.juni.fm.record.dto.ReadWorkDTO;
import com.juni.fm.record.entiity.Work;
import com.juni.fm.record.service.RecordService;

@CrossOrigin
@Controller
@RequestMapping("/api/record")	
public class RecordController {
	
	@Autowired
	RecordService recordService;
	
	@PostMapping
	public ResponseEntity<String> createWork(@RequestBody CreateWorkDTO saveRequestDTO) {
		Work saveWork = recordService.saveWork(saveRequestDTO);
		return ResponseEntity.ok(saveWork.toString());
	}
	
	@GetMapping("/{memberId}")
	public ResponseEntity<List<ReadWorkDTO>> readWork(@PathVariable Long memberId) {
		List<ReadWorkDTO> dtos = recordService.getWorkDTO(memberId);
		return ResponseEntity.ok(dtos);
	}
}
