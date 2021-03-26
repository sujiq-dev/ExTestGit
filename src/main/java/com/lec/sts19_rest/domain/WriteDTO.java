package com.lec.sts19_rest.domain;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WriteDTO {
	private int uid; // wr_uid
	private String subject; // wr_subject
	private String content; // wr_content
	private String name; // wr_name
	@JsonProperty("viewcnt")
	private int viewCnt; // wr_viewcnt
	@JsonProperty("regdate")
	private LocalDateTime regDate; // wr_regdate

	// 웹개발시...
	// 가능한, 다음 3가지는 이름을 일치시켜주는게 좋습니다.
	// 클래스 필드명 = DB 필드명 = form의 name명

	// 생성자
	public WriteDTO() {
		super();
		System.out.println("WriteDTO() 객체 생성");
	}

	public WriteDTO(int uid, String subject, String content, String name, int viewCnt, LocalDateTime regDate) {
		super();
		this.uid = uid;
		this.subject = subject;
		this.content = content;
		this.name = name;
		this.viewCnt = viewCnt;
		this.regDate = regDate;
		System.out.printf("WriteDTO(%d, %s, %s, %s, %d) 객체 생성\n", uid, subject, content, name, viewCnt);
	}

	public int getUid() {
//		System.out.println("getUid() 호출");
		return uid;
	}

	public void setUid(int uid) {
//		System.out.println("setUid(" + uid + ") 호출");
		this.uid = uid;
	}

	public String getSubject() {
//		System.out.println("getSubject() 호출");
		return subject;
	}

	public void setSubject(String subject) {
//		System.out.println("setSubject(" + subject + ") 호출");
		this.subject = subject;
	}

	public String getContent() {
//		System.out.println("getContent() 호출");
		return content;
	}

	public void setContent(String content) {
//		System.out.println("setContent(" + content + ") 호출");
		this.content = content;
	}

	public String getName() {
//		System.out.println("getName() 호출");
		return name;
	}

	public void setName(String name) {
//		System.out.println("setName(" + name + ") 호출");
		this.name = name;
	}

	public int getViewCnt() {
//		System.out.println("getViewCnt() 호출");
		return viewCnt;
	}

	public void setViewCnt(int viewCnt) {
//		System.out.println("setViewCnt(" + viewCnt + ") 호출");
		this.viewCnt = viewCnt;
	}

	public LocalDateTime getRegDate() {
//		System.out.println("getRegDate() 호출");
		return this.regDate;
	}

	public void setRegDate(LocalDateTime regDate) {
//		System.out.println("setRegDate(" + regDate + ") 호출");
		this.regDate = regDate;
	}

	//  regDate 를 String 으로 리턴하는 getter
	public String getRegDateTime() {
		if(this.regDate == null) return "";
		return this.regDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
	}
	
	@Override
	public String toString() {
		return String.format("WriteDTO] %d : %s : %s : %s : %d : %s", 
				uid, subject, content, name, viewCnt, regDate);
	}
	
	
} // end DTO












