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
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Work {

	@Id @GeneratedValue
	private Long id;
	@Column(nullable = false)
	private Long memberId;
	private Instant startTime;
	private Long totalMs;
	@OneToMany(cascade = CascadeType.ALL)
	private Set<OneSet> sets = new HashSet<>();
	
	public Work() {
	}

	public Work(Long memberId, Instant startTime, Long totalMs) {
		this.memberId = memberId;
		this.startTime = startTime;
		this.totalMs = totalMs;
	}
	
}
