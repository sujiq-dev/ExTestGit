# ExTestGit
#### A. 프로젝트명: STS19_REST<br>

#### B. 프로젝트에 사용된 기술소개 <br><br>




#### C. 프로젝트 셋업에 관한 절차
1. 새 workspace : 폴더 생성(주어진 이름) <br>
   1. window > perspective > open perspective > Others : spring/git <br>

2. server-tomcat 연결: <br>
  > 서버 클릭: apache > tomcat9: 설치경로 c\tomcat\apache~ > add&remove <br>
	> port 충돌 안나게 설정 <br>
	> 서버 더블클릭 (2+2,3 설정 후 save), <br>
	> Servers > server.xml > source: search: 20000 해서 아래 붙여넣기 <br>
	>> Connector URIEncoding="utf-8" connectionTimeout="20000" port="8080" protocol="HTTP/1.1" redirectPort="8443"/


1. 환경설정
  	- association: *.sql > sql편집기 /  *.xml > xml editor : default 설정
	- workspace : text file encoding => utf-8
	- WEB : CSS/HTML/JSP => utf-8
	- WEB : HTM/JSP - editor - templates => html lang = "ko"

4. 드라이버 관리자 : 
	- default DB: XE
	- libraries-all delete + c\oracle\~product\~jdbc6.jar
5. web.xml, servlet, pox.xml 업데이트

6. import 프로젝트

7. 데이터 베이스 연결:
	- oracle + 해당 PJT 선택 > XE, sid, scott26/tiger26 > test connection > finish

8. 프로젝트 우클릭 > team > share
	- configure git repository > 차례대로 클릭, finish
	- git staging 갯수 확인
9. new file : .gitignore 파일 생성, 작성, 저장 > git staging 갯수 확인
10. github 사이트 계정 로그인
11. new repository > create >  code 복사
12. GIT 돌아와서 remote 우클릭 > create remote
13. chage > code 붙여넣기, 아이디/pw 확인
14. advanced> add all branches > save > remote 하단에 pull push 확인
15. 파일등 내용 변경 > commit&push 후 변경 내용 확인 > github에 내용 변경된 거 확인
16. github Readme 파일 작성, commit
17. eclipse git으로 돌아와서 pull 후 readme 파일 들어와졌는지 확인



