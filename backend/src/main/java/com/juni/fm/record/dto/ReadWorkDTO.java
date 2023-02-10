package com.juni.fm.record.dto;

import java.time.Instant;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter 
public class ReadWorkDTO {
	
	private Long id;
	private Instant startTime;
	private Long totalMs;
	private List<ReadSetDTO> sets;
	
}