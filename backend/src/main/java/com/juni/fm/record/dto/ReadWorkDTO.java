package com.juni.fm.record.dto;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import com.juni.fm.record.entiity.Work;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReadWorkDTO {

	private Long id;
	private Instant startTime;
	private Long totalMs;
	private List<ReadSetDTO> sets;

	public static ReadWorkDTO convert(Work w) {
		ReadWorkDTO rw = new ReadWorkDTO();
		rw.setId(w.getId());
		rw.setStartTime(w.getStartTime());
		rw.setTotalMs(w.getTotalMs());
		rw.setSets(w.getSets().stream()
				.map(ReadSetDTO::convert)
				.collect(Collectors.toList()));
		return rw;
	}
}