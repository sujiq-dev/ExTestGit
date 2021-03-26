package com.lec.sts19_rest.domain;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface WriteDAO {
	
	// 전체 SELECT
	public abstract List<WriteDTO> select(); //select() <-메소드 이름
	
	// 새글 작성 <-- DTO
	public abstract int insert(WriteDTO dto);
	public abstract int insert(String subject, String content, String name);
	// ↑ param으로 받아와야하는뎅
	
	// 특정 uid 글 내용 읽기, 조회수 증가	
	// viewcnt 도 1 증가해야하고, 읽어와야 한다. -> 트랜잭션 처리
	//public abstract List<WriteDTO> readByUid(int uid);
		
	//특정 uid 글 내용 읽기
	public abstract List<WriteDTO> selectByUid(int uid);
	
	
	// 특정 uid 글 수정 (제목, 내용)  <-전부 다 for문으로 넘어오기 때문에 dto로 한번에 받을 수 있다.
	public abstract int update(WriteDTO dto);	
	
	
	//특별추가
	public abstract int update(int uid, @Param("a") WriteDTO dto);
	
	
	
	// 특정 uid 글 삭제하기
	public abstract int deleteByUid(int uid);	
	
	
	// STS15에서 추가된 것
	// 특정 uid글 조회수 증가
	public abstract int incViewCnt(int uid);
	
	
	
	WriteDTO searchBySubject(String subject); // 메소드 이름:searchBySubject
	
	
	
} // end DAO









