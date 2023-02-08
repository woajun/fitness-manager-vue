package com.juni.fm.record;

import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

public class SaveRequestDTO {
	private Integer memberID;
	@DateTimeFormat(iso = ISO.DATE_TIME)
	private ZonedDateTime startDate;
	private Integer totalTime;
	private List<SetDTO> sets;
	
	public Integer getMemberID() {
		return memberID;
	}
	public void setMemberID(Integer memberID) {
		this.memberID = memberID;
	}
	public ZonedDateTime getStartDate() {
		return startDate;
	}
	public void setStartDate(ZonedDateTime startDate) {
		this.startDate = startDate;
	}
	public Integer getTotalTime() {
		return totalTime;
	}
	public void setTotalTime(Integer totalTime) {
		this.totalTime = totalTime;
	}
	public List<SetDTO> getSets() {
		return sets;
	}
	public void setSets(List<SetDTO> sets) {
		this.sets = sets;
	}
	
}
