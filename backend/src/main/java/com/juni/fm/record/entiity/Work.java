package com.juni.fm.record.entiity;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Work {

	@Id @GeneratedValue
	private Long id;
	private Long memberId;
	private Instant startTime;
	private Long totalMs;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getMemberId() {
		return memberId;
	}
	public void setMemberId(Long memberId) {
		this.memberId = memberId;
	}
	public Instant getStartTime() {
		return startTime;
	}
	public void setStartTime(Instant startTime) {
		this.startTime = startTime;
	}
	public Long getTotalMs() {
		return totalMs;
	}
	public void setTotalMs(Long totalMs) {
		this.totalMs = totalMs;
	}
}
