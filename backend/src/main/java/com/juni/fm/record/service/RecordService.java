package com.juni.fm.record.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.juni.fm.record.dto.CreateWorkDTO;
import com.juni.fm.record.dto.ReadWorkDTO;
import com.juni.fm.record.entiity.OneSet;
import com.juni.fm.record.entiity.Work;
import com.juni.fm.record.repository.WorkRepository;

@Service
public class RecordService {

	@Autowired
	WorkRepository works;

	public Work saveWork(CreateWorkDTO dto) {
		Work work = new Work(
				dto.getMemberId(),
				dto.getStartTime().toInstant(), 
				dto.getTotalMs());
		Work saved = works.save(work);
		
		Set<OneSet> collect = dto.getSets().stream().map(e -> {
			OneSet oneSet = new OneSet();
			oneSet.setExrId(e.getExrId());
			oneSet.setReps(e.getReps());
			oneSet.setWeight(e.getWeight());
			oneSet.setTotalMs(e.getTotalMs());
			oneSet.setRestMs(e.getRestMs());
			oneSet.setRecordTime(e.getRecordTime().toInstant());
			return oneSet;
		}).collect(Collectors.toSet());
		
		saved.setSets(collect);
		
		Work ssaved = works.save(saved);
		return ssaved;
	}

	public List<ReadWorkDTO> getWorkDTO(Long memberId) {
		List<Work> finded = works.findByMemberId(memberId);
		List<ReadWorkDTO> result =  finded.stream().map(w-> {
			ReadWorkDTO rw = new ReadWorkDTO();
			rw.setId(w.getId());
			rw.setStartTime(w.getStartTime());
			rw.setTotalMs(w.getTotalMs());
			return rw;
		}).collect(Collectors.toList());
		// TODO Auto-generated method stub
		return result;
	}
}
