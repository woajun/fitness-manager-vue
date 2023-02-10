package com.juni.fm.record.dto;

import java.time.ZonedDateTime;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter 
public class SetDTO {

	private Long exrID;
	private Double weight;
	private Long rep;
	private Long restSec;
	private Long totalSec;
	@DateTimeFormat(iso = ISO.DATE_TIME)
	private ZonedDateTime recordDate;
	
}
