package com.lec.sts19_rest.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lec.sts19_rest.domain.AjaxDAO;
import com.lec.sts19_rest.domain.WriteDTO;

@Service
public class AjaxService {
	AjaxDAO dao;
	
	@Autowired
	private SqlSession sqlSession;
	
	public List<WriteDTO> list(int from, int pageRows){
		dao = sqlSession.getMapper(AjaxDAO.class);
		return dao.selectFromRow(from, pageRows);
	}
	
	public int count() {
		dao = sqlSession.getMapper(AjaxDAO.class); // MyBatis 사용
		return dao.countAll();
	}
	
	public List<WriteDTO> viewByUid(int uid) {
		dao = sqlSession.getMapper(AjaxDAO.class); // MyBatis 사용
		// ※ 트랜잭션 처리해야 한다.
		dao.incViewCnt(uid);
		return dao.selectByUid(uid);
	}
	
	public int write(WriteDTO dto) {
		dao = sqlSession.getMapper(AjaxDAO.class); // MyBatis 사용
		return dao.insert(dto); 
	}
	
	public int update(WriteDTO dto) {
		dao = sqlSession.getMapper(AjaxDAO.class); // MyBatis 사용
		return dao.update(dto);
	}
	
	public int deleteByUid(int [] uids) {
		dao = sqlSession.getMapper(AjaxDAO.class); // MyBatis 사용
		return dao.deleteByUid(uids);
	}
	
	public List<WriteDTO> selectByUid(int uid) {
		dao = sqlSession.getMapper(AjaxDAO.class); // MyBatis 사용
		return dao.selectByUid(uid);  // 1개짜리 List
	}
	
	
}















