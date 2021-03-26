package com.lec.sts19_rest.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lec.sts19_rest.domain.EmployeeVO;
import com.lec.sts19_rest.domain.WriteDAO;
import com.lec.sts19_rest.domain.WriteDTO;

@RestController
@RequestMapping("MyRest")
public class MyRestController {

	WriteDAO dao;
	
	// MyBatis
	@Autowired
	private SqlSession sqlSession;
	
	
	// TEXT 데이터 response
	@RequestMapping("/")
	public String helloTEXT() { //helloTEXT()는 그냥 이름입니다
		return "Hello REST";
	}
	
	@RequestMapping("/a")
	public String helloTEXT2() { 
		return "이렇게 id별로 정보를 띄울 수 있겠구나"; // 한글 인코딩 필요합니다.
	}
	

	// JSON 데이터 response
	@RequestMapping("/helloJSON")
	public WriteDTO helloJSON() { //helloTEXT()는 그냥 이름입니다
		WriteDTO dto = 
				new WriteDTO (100, "안녕하세요", "REST", "하하하", 123, LocalDateTime.now());
		// 여기서 둘 다 나오는 이유는 getter에서 우리가 getRegDate, getRegDateTime() 두 개 만들어둬서!
		// field명이 중요한 게 아니고 getter/setter명이 중요하다!
		
		return dto;
	}
	
	
	// JSON 배열 데이터 <-자바객체 List<>
	@RequestMapping("/listJSON")
	public List<WriteDTO> listJSON(){
		WriteDAO dao = sqlSession.getMapper(WriteDAO.class);
		// list받아오기 위에 상위에 MyBatis설정
		return dao.select();
	}
	
	
	
	
	
	// JSON 배열 데이터 <-자바 배열
	@RequestMapping("/arrJSON")
	public WriteDTO [] arrJSON() {
		WriteDAO dao = sqlSession.getMapper(WriteDAO.class);
		List<WriteDTO> list = dao.select();
		WriteDTO [] arr = new WriteDTO[list.size()];
		return list.toArray(arr);
	}
	
	
	// JSON object 데이터 <- 자바 객체 Map<k, v>
	@RequestMapping("/mapJSON")
	public Map<Integer, WriteDTO> mapJSON(){
		WriteDAO dao = sqlSession.getMapper(WriteDAO.class);
		List<WriteDTO> list = dao.select();
		
		Map<Integer, WriteDTO> map = new HashMap<Integer, WriteDTO>();
		
		for(WriteDTO dto:list) {
			map.put(dto.getUid(), dto);
		}
		
		return map;
	}
	
	
	
	
	
	// XML response
	
	// XML 데이터 <-- 자바 객체
//	@RequestMapping("/helloXML")
//	public EmployeeVO helloXML() {
//		return new EmployeeVO (100, "홍길동", 200, new int[] {10,20,30}, 34.2);
//	}
//	-> 기본 JSON변환이라, 이렇게만 작성하면 chrome에서 봐도 json으로 보인다. 
//  employeeVO.java에 가서 수정하자!	
	
	@RequestMapping("/helloXML")
	public EmployeeVO helloXML() {
		return new EmployeeVO (100, "홍길동", 200, new int[] {10,20,30}, 34.2);
	}
	
	//------------------------------------------------------------
	
//	@RequestMapping("/read/{uid}")
//	public List<WriteDTO> read(@PathVariable("uid") int uid){ // 경로상에 있는 {uid}가 int uid로 들어가고 그게 pathvariable의 "uid"가 됨.
//		WriteDAO dao = sqlSession.getMapper(WriteDAO.class);
//		return dao.selectByUid(uid);	// 특정 uid의 글을 읽어오겠습니다.		
//	}
	
	@RequestMapping("/read/{uid}")
	public ResponseEntity<WriteDTO> read(@PathVariable("uid") int uid){ // 경로상에 있는 {uid}가 int uid로 들어가고 그게 pathvariable의 "uid"가 됨.
		WriteDAO dao = sqlSession.getMapper(WriteDAO.class);
		List<WriteDTO> list = dao.selectByUid(uid);
		
		
		//실패  -- 없는 uid의 글을 불러올 때
		if (list == null || list.size() == 0)
			return new ResponseEntity<WriteDTO>(HttpStatus.NOT_FOUND);	// 404 에러
		
		// 성공	
		return new ResponseEntity<WriteDTO>(list.get(0), HttpStatus.OK);			
	}
	

	
	
	
	
}



