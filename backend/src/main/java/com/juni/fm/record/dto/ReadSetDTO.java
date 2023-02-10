package com.juni.fm.record.dto;

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
	private String recordTime;
	
}
