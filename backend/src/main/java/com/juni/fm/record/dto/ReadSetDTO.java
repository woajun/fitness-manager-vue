package com.juni.fm.record.dto;

import java.time.Instant;

import com.juni.fm.record.entiity.OneSet;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter 
public class ReadSetDTO {

	private Long id;
	private Long exrId;
	private Long reps;
	private Double weight;
	private Long restMs;
	private Long totalMs;
	private Instant recordTime;
	
	public static ReadSetDTO convert(OneSet s) {
		ReadSetDTO rs = new ReadSetDTO();
		rs.setId(s.getId());
		rs.setExrId(s.getExrId());
		rs.setReps(s.getReps());
		rs.setWeight(s.getWeight());
		rs.setRestMs(s.getRestMs());
		rs.setTotalMs(s.getTotalMs());
		rs.setRecordTime(s.getRecordTime());
		return rs;
	}
}
