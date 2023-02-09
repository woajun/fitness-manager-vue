package com.juni.fm.record.service;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juni.fm.record.dto.SaveRequestDTO;
import com.juni.fm.record.entiity.OneSet;
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
		
		Set<OneSet> collect = dto.getSets().stream().map(e -> {
			OneSet oneSet = new OneSet();
			oneSet.setExrKindId(e.getExrID());
			oneSet.setWorkId(saved.getId());
			oneSet.setReps(e.getRep());
			oneSet.setWeight(e.getWeight());
			oneSet.setTotalMs(e.getTotalSec());
			oneSet.setRestMs(e.getRestSec());
			oneSet.setRecordTime(e.getRecordDate().toInstant());
			return oneSet;
		}).collect(Collectors.toSet());
		
		saved.setSets(collect);
		
		Work ssaved = works.save(saved);
		return ssaved;
	}
}
