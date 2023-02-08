package com.juni.fm.record;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin
@Controller
@RequestMapping("/api/record")	
public class RecordController {

	@PostMapping
	public void addRecord(@RequestBody AddRecordDto addRecordDto) {
		System.out.println(addRecordDto.getHello());
	}
}
