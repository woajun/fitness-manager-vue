package com.juni.fm.record.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.juni.fm.record.dto.SaveRequestDTO;
import com.juni.fm.record.entiity.OneSet;
import com.juni.fm.record.repository.SetRepository;

@CrossOrigin
@Controller
@RequestMapping("/api/record")	
public class RecordController {
	
	@Autowired
	SetRepository sets;
	
	@PostMapping
	public void saveResult(@RequestBody SaveRequestDTO saveRequestDTO) {
		System.out.println(saveRequestDTO.getMemberID());
		OneSet set = new OneSet();
		sets.save(set);
	}
}
