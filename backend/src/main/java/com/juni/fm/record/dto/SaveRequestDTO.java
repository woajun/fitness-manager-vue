package com.juni.fm.record.dto;

import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SaveRequestDTO {
	
	private Long memberID;
	@DateTimeFormat(iso = ISO.DATE_TIME)
	private ZonedDateTime startDate;
	private Long totalTime;
	private List<SetDTO> sets;
	
}
