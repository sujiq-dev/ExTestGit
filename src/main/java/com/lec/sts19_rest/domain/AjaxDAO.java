package com.lec.sts19_rest.domain;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

@MapperScan
public interface AjaxDAO {

	/**
	 * 페이징용 SELECT
	 * @param from 몇번째 row 부터
	 * @param pageRows 몇개의 데이터(게시글)
	 * @return
	 */
	public List<WriteDTO> selectFromRow(
			@Param("from") int from,			// 몇번째부터
			@Param("pageRows") int pageRows);	// 몇번째인가

	// 전체 글의 개수
	public int countAll();
	
	// 글 읽기
	public List<WriteDTO> selectByUid(int uid);
	// 조회수 증가
	public int incViewCnt(int uid);
	
	// 글작성
	public int insert(WriteDTO dto);
	
	// 글수정
	public int update(WriteDTO dto);
	
	// 특정 uid 글(들) 삭제하기
	public int deleteByUid(int [] uids);
	
	/*
	 * DELETE FROM test_write 
	 * WHERE uid in (10, 20, 30)
	 * 
	 * WHERE uid in (1, 2)
	 * 
	 * WHERE uid in (11)
	 * 
	 */
	
}









