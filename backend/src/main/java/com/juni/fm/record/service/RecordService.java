package com.juni.fm.record.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juni.fm.record.dto.SaveRequestDTO;
import com.juni.fm.record.entiity.Work;
import com.juni.fm.record.repository.WorkRepository;

@Service
public class RecordService {

	@Autowired
	WorkRepository works;
	
	public Work saveWork(SaveRequestDTO dto) {
		Work work = new Work(
				dto.getMemberID(),
				dto.getStartDate().toInstant(), 
				dto.getTotalTime());
		Work saved = works.save(work);
		return saved;
	}
}
