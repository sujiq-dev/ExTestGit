package com.lec.sts19_rest.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lec.sts19_rest.domain.WriteDAO;
import com.lec.sts19_rest.domain.WriteDTO;

// Service 단.
// 		JSP MVC2 의 Command의 역할가 비슷.
//		- Transaction 을 담당합니다. 

// JSP: Controller -> Command -> DAO


// Spring : 
//		@Controller -> @Service -> DAO -> JdbcTemplate  


@Service
public class BoardService {

	WriteDAO dao;
	
//	@Autowired 
//	public void setDao(WriteDAO dao) {  // interface 타입다형성
//		this.dao = dao;
//	}
// 데이터 받아오는건데.... 이걸 주석처리 해버림! 
	
	
	
	// STS15에서 추가되는 것.
	
	// MyBatis
	private SqlSession sqlSession;
	
	@Autowired
	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	// ppt p29 
	
	
	// 테스트 출력용
	public BoardService() {
		super();
		System.out.println("BoardService() 생성");
	}
	
	
	 
	public List<WriteDTO> list(){
		//mybatis가 만들어준 DAO......
		dao = sqlSession.getMapper(WriteDAO.class);
		return dao.select();
	}

//	
//	public int write(WriteDTO dto) {
//		dao = sqlSession.getMapper(WriteDAO.class);
//		//return dao.insert(dto);
//		return dao.insert(dto.getSubject(), dto.getContent(), dto.getName());
//	}
	
	
	public int write(WriteDTO dto) {
		dao = sqlSession.getMapper(WriteDAO.class);
		//return dao.insert(dto);		
		int result = dao.insert(dto);
		System.out.println("생성된 uid는 "+ dto.getUid());
		
		return result;
	}
	
		
	// view 
	public List<WriteDTO> viewByUid(int uid){
		//★★ 사실 요 부분에서 트랜잭션이 발생해야 한다. ★★★★
		// 1. 조회수 증가		: incViewCnt() 
		// 2. 글 하나 읽어오기	: selectByUid()
		// 한 다음에 이 블락에 @Transactional 걸어두면, STS14처럼 편하게 동작합니다. 
		dao = sqlSession.getMapper(WriteDAO.class);
		dao.incViewCnt(uid);
		return dao.selectByUid(uid);
	}	
	

	public List<WriteDTO> selectByUid(int uid){
		dao = sqlSession.getMapper(WriteDAO.class);
		return dao.selectByUid(uid);  // 1개짜리 list
	}	
		
	// update
	public int update(WriteDTO dto) {
		dao = sqlSession.getMapper(WriteDAO.class);
//		return dao.update(dto);
		return dao.update(dto.getUid(), dto);
	}	
	
	// delete
	public int deleteByUid(int uid) {
		dao = sqlSession.getMapper(WriteDAO.class);
		return dao.deleteByUid(uid);
	}
	
	
}







