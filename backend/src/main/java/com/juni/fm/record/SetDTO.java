package com.juni.fm.record;

import java.time.ZonedDateTime;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

public class SetDTO {

	private Integer exrID;
	private Integer weight;
	private Integer rep;
	private Integer restSec;
	private Integer totalSec;
	@DateTimeFormat(iso = ISO.DATE_TIME)
	private ZonedDateTime startDate;
	
	public Integer getExrID() {
		return exrID;
	}
	public void setExrID(Integer exrID) {
		this.exrID = exrID;
	}
	public Integer getWeight() {
		return weight;
	}
	public void setWeight(Integer weight) {
		this.weight = weight;
	}
	public Integer getRep() {
		return rep;
	}
	public void setRep(Integer rep) {
		this.rep = rep;
	}
	public Integer getRestSec() {
		return restSec;
	}
	public void setRestSec(Integer restSec) {
		this.restSec = restSec;
	}
	public Integer getTotalSec() {
		return totalSec;
	}
	public void setTotalSec(Integer totalSec) {
		this.totalSec = totalSec;
	}
	public ZonedDateTime getStartDate() {
		return startDate;
	}
	public void setStartDate(ZonedDateTime startDate) {
		this.startDate = startDate;
	}
	
	
}
