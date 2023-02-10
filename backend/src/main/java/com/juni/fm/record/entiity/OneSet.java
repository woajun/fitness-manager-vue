package com.juni.fm.record.entiity;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter 
public class OneSet {

	@Id @GeneratedValue
	private Long id;
	private Long exrKindId;
	private Long workId;
	private Long reps;
	private Double weight;
	private Long totalMs;
	private Long restMs;
	private Instant recordTime;
	
}
