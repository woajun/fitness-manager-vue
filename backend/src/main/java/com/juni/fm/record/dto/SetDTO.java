package com.juni.fm.record.dto;

import java.time.ZonedDateTime;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

public class SetDTO {

	private Long exrID;
	private Double weight;
	private Long rep;
	private Long restSec;
	private Long totalSec;
	@DateTimeFormat(iso = ISO.DATE_TIME)
	private ZonedDateTime recordDate;
	
	public Long getExrID() {
		return exrID;
	}
	public void setExrID(Long exrID) {
		this.exrID = exrID;
	}
	public Double getWeight() {
		return weight;
	}
	public void setWeight(Double weight) {
		this.weight = weight;
	}
	public Long getRep() {
		return rep;
	}
	public void setRep(Long rep) {
		this.rep = rep;
	}
	public Long getRestSec() {
		return restSec;
	}
	public void setRestSec(Long restSec) {
		this.restSec = restSec;
	}
	public Long getTotalSec() {
		return totalSec;
	}
	public void setTotalSec(Long totalSec) {
		this.totalSec = totalSec;
	}
	public ZonedDateTime getRecordDate() {
		return recordDate;
	}
	public void setRecordDate(ZonedDateTime recordDate) {
		this.recordDate = recordDate;
	}
	
}
