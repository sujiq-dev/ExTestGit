# ExTestGit
#### A. 프로젝트명: STS19_REST<br>

#### B. 프로젝트에 사용된 기술소개 <br><br>




#### C. 프로젝트 셋업에 관한 절차
  1. 새 workspace : 폴더 생성(주어진 이름) <br>
		> window > perspective > open perspective > Others : spring/git <br>

  3. server-tomcat 연결: <br>
		> 서버 클릭: apache > tomcat9: 설치경로 c\tomcat\apache~ > add&remove <br>
		> port 충돌 안나게 설정 <br>
		> 서버 더블클릭 (2+2,3 설정 후 save), <br>
		> Servers > server.xml > source: search: 20000 해서 아래 붙여넣기 <br>
		>> Connector URIEncoding="utf-8" connectionTimeout="20000" port="8080" protocol="HTTP/1.1" redirectPort="8443"/


5. 환경설정
  	- association: *.sql > sql편집기 /  *.xml > xml editor : default 설정
	- workspace : text file encoding > utf-8
	- WEB : CSS/HTML/JSP => utf-8
	- WEB : HTM/JSP - editor - templates > <html lang = "ko">

3. 드라이버 관리자 : 
	- default DB: XE, 
	- libraries-all delete + c\oracle\~product\~jdbc6.jar
8. web.xml, servlet, pox.xml - 문서 보고 넣기


1. 프로젝트 생성
	(( dynamic web PJT > next x 2 > xml // Java PJT (batch용) ))
	- Spring legacy Project > 프로젝트 이름, Spring MVC project 
		> com.~~.~~ 


4. 데이터 베이스 연결:
	- oracle + 해당 PJT > XE, sid, scott26/tiger26 > test connection









6. lib 파일 : webcontent/web info / lib 폴더에 넣기

7. base pck는 그냥 (프로젝트이름)10로 만들고, 프로젝트 우클릭 후 properties
 	> Web Project Settings 에서 "restaurant10"으로 바꿔줄 것 

