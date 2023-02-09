package com.juni.fm.record.entiity;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class OneSet {

	@Id @GeneratedValue
	private Long id;
	private Long exrKindId;
	private Long workId;
	private Long reps;
	private Long weight;
	private Long totalMs;
	private Long restMs;
	private Instant stratTime;
	
	public Instant getStratTime() {
		return stratTime;
	}

	public void setStratTime(Instant stratTime) {
		this.stratTime = stratTime;
	}

	public Long getExrKindId() {
		return exrKindId;
	}

	public void setExrKindId(Long exrKindId) {
		this.exrKindId = exrKindId;
	}

	public Long getWorkId() {
		return workId;
	}

	public void setWorkId(Long workId) {
		this.workId = workId;
	}

	public Long getReps() {
		return reps;
	}

	public void setReps(Long reps) {
		this.reps = reps;
	}

	public Long getWeight() {
		return weight;
	}

	public void setWeight(Long weight) {
		this.weight = weight;
	}

	public Long getTotalMs() {
		return totalMs;
	}

	public void setTotalMs(Long totalMs) {
		this.totalMs = totalMs;
	}

	public Long getRestMs() {
		return restMs;
	}

	public void setRestMs(Long restMs) {
		this.restMs = restMs;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
}
