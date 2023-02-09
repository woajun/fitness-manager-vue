package com.juni.fm.record.entiity;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Work {

	@Id @GeneratedValue
	private Long id;
	@Column(nullable = false)
	private Long memberId;
	private Instant startTime;
	private Long totalMs;
	@OneToMany(cascade = CascadeType.ALL)
	private Set<OneSet> sets = new HashSet<>();
	
	public Work(Long memberId, Instant startTime, Long totalMs) {
		this.memberId = memberId;
		this.startTime = startTime;
		this.totalMs = totalMs;
	}
	
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

	public Set<OneSet> getSets() {
		return sets;
	}

	public void setSets(Set<OneSet> sets) {
		this.sets = sets;
	}
	
}
