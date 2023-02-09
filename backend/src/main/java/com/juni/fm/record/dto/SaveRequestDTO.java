package com.juni.fm.record.dto;

import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

public class SaveRequestDTO {
	private Long memberID;
	@DateTimeFormat(iso = ISO.DATE_TIME)
	private ZonedDateTime startDate;
	private Long totalTime;
	private List<SetDTO> sets;
	
	public Long getMemberID() {
		return memberID;
	}
	public void setMemberID(Long memberID) {
		this.memberID = memberID;
	}
	public ZonedDateTime getStartDate() {
		return startDate;
	}
	public void setStartDate(ZonedDateTime startDate) {
		this.startDate = startDate;
	}
	public Long getTotalTime() {
		return totalTime;
	}
	public void setTotalTime(Long totalTime) {
		this.totalTime = totalTime;
	}
	public List<SetDTO> getSets() {
		return sets;
	}
	public void setSets(List<SetDTO> sets) {
		this.sets = sets;
	}
	
}
