package com.juni.fm.record.dto;

import java.time.ZonedDateTime;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter 
public class CreateSetDTO {

	private Long exrId;
	private Double weight;
	private Long reps;
	private Long restMs;
	private Long totalMs;
	@DateTimeFormat(iso = ISO.DATE_TIME)
	private ZonedDateTime recordTime;
	
}
