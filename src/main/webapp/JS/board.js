var page = 1;               // 현재 페이지
var pageRows = 10;          // 페이지당 글의 개수
var viewItem = undefined;   // 가장 최근에 view한 글의 데이터 ,, // 전역변수.

// 페이지 최초 로딩되면 게시글 목록의 첫 페이지분이 로딩되도록!!
$(document).ready(function(){
    loadPage(page);     //페이지 최초 로딩

    // '글 작성' 버튼 누르면 '팝업' 동작 수행  // line 219 정도 참조.
    $("#btnWrite").click(function(){
        setPopup("write");  //글 작성 용으로 모달 팝업을 수행합니당
        $("#dlg_write").show();
    });


    // 모달 대화상자 close 버튼 누르면
    $(".modal .close").click(function(){
        $(this).parents(".modal").hide();   // 팝업창 닫는 동작
    });


    // '글 작성' 폼이 submit 되면
    $("#frmWrite").submit(function(){
        $(this).parents(".modal").hide();   // 팝업창 닫는 동작

        return chkWrite();          // 새 글 등록하기 // line 222 정도 참조.
    });


    // '글 삭제' 버튼 누르면 
    $("#btnDel").click(function(){
        chkDelete();
    }); // line 320 정도 참조


    // 글 읽기(view) 대화 상자에서 삭제 버튼을 누르면 해당 글(uid) 삭제 진행 ,, line 237
    $("#viewDelete").click(function(){
        var uid = viewItem.uid;
        if(deleteUid(uid)){
            $(this).parents(".modal").hide();       // 삭제 성공하면 팝업창 닫기
        }
    }); // line 380 정도 참조



    // 글 읽기(view) 대화 상자에서 수정 버튼을 누르면  , line 265
    $("#viewUpdate").click(function(){
        setPopup("update");
    });



    // 글 수정에서 완료 버튼을 누르면~~~
    $("#updateOk").click(function(){
        chkUpdate();
    });


});



//page 번째의 페이지 목록 읽어오기
function loadPage(page){
    $.ajax({
        url : "./"+page+"/"+pageRows,
        type : "GET",
        cache : false, 
        success : function(data, status){ 
            // 여기서 data변수에는 뭐가 담겨있을까? 이제까지 작업한 GET해서 받아오는 그 데이터들! 
            if(status == "success"){
               // alert("성공했슴당 :)");

               //이제, 받아온 data (=java script object)로 화면 업데이트 할 거얌
        //    updateList(data);   // application/json이면 이미 parse 되어있다.  
            //↓ 정상적으로 성공했느냐에 따라 반응 달라지는 거 
                if(updateList(data)){ // application/json이면 이미 parse 되어있다.

                    // 업데이트 된 list에 view 동작 이벤트 가동
                    addViewEvent();
                    // ★ 만약 위 코드를 $(document).ready() 에 두면 동작 안할것이다!
                    
                };  
            }
        }
    }); // end $.java
} // end loadPage()



function updateList(jsonObj){
    
    var result = "";       // 최종 결과

    if(jsonObj.status == "OK"){
        // .status <- "정상적으로 서비스 되면 ok로 들어오는 값"을 찾는거
        var count = jsonObj.count;

        // window <-전역변수
        window.page = jsonObj.page;
        window.pageRows = jsonObj.pagerows;

        var items = jsonObj.data; // 배열

        for(var i=0; i< count; i++){
            result += "<tr>\n";
            result += "<td><input type='checkbox' name='uid' value='" + items[i].uid + "'>" + "</td>\n";
            result += "<td>" + items[i].uid + "</td>\n";
            result += "<td><span class='subject' data-uid='" + items[i].uid + "'>" + items[i].subject + "</span></td>\n";
            result += "<td>" + items[i].name + "</td>\n";
            result += "<td><span data-viewcnt='"+ items[i].uid +"'>" + items[i].viewcnt + "</span></td>\n";
            result += "<td>" + items[i].regDateTime + "</td>\n";
            result += "</tr>\n";
        }
        $("#list tbody").html(result);  // 업데이트
    
        // 페이지 정보 업데이트
        $("#pageinfo").text(jsonObj.page + "/"+ jsonObj.totalpage + "페이지, "+jsonObj.totalcnt + "개의 글");
    	
        // pageRows 
        // TODO  -- for문으로 작성해 볼 것. 왜냐? 옵션 많아지면 어쩔겨? 
        // var txt = "<select id = 'rows' onchange='TODO'>\n";
        var txt = "<select id = 'rows' onchange='changePageRows()'>\n";
        txt += "<option " + ((window.pageRows==10) ? "selected" : "") + " value ='10'>" + "10개씩</option>\n";
        txt += "<option " + ((window.pageRows==20) ? "selected" : "") + " value ='20'>" + "20개씩</option>\n";
        txt += "<option " + ((window.pageRows==50) ? "selected" : "") + " value ='50'>" + "50개씩</option>\n";
        txt += "<option " + ((window.pageRows==100) ? "selected" : "") + " value ='100'>" + "100개씩</option>\n";
        txt += "</select>\n";
        $("#pageRows").html(txt); // var txt~txt의 내용을 현재 이 라인에 업데이트.

        // [페이징 정보 업데이트]
        var pagination = buildPagination(jsonObj.writepages, jsonObj.totalpage, jsonObj.page, jsonObj.pagerows);
        $("#pagination").html(pagination);

        return true;    // 목록 업데이트 성공하면 true 리턴
    } else {
        alert ("내용이 없습니다.");
        return false;
    }

}   // end updateList()





// 게시판 밑에 1~10으로 나타나는 작업

// 페이징 생성
// 한페이징에 표시될 페이지수 --> writePages
// 총 페이지수 --> totalPage
// 현재 페이지 --> curPage

function buildPagination(writePages, totalPage, curPage, pageRows){

    // 해당 내용은 JSP15_JDBC > Web > 01page > pagination.jsp에 있다.
    // 같은 내용, 거기는 java, 여기서는 java script일 뿐


	var str = "";   // 최종적으로 페이징에 나타날 HTML 문자열 <li> 태그로 구성
	
	// 페이징에 보여질 숫자들 (시작숫자 start_page ~ 끝숫자 end_page)
    var start_page = ( (parseInt( (curPage - 1 ) / writePages ) ) * writePages ) + 1;
    var end_page = start_page + writePages - 1;

    if (end_page >= totalPage){
    	end_page = totalPage;
    }
    
  //■ << 표시 여부
	if(curPage > 1){
		str += "<li><a onclick='loadPage(" + 1 + ")' class='tooltip-top' title='처음'><i class='fas fa-angle-double-left'></i></a></li>\n";
	}
	
  	//■  < 표시 여부
    if (start_page > 1) 
    	str += "<li><a onclick='loadPage(" + (start_page - 1) + ")' class='tooltip-top' title='이전'><i class='fas fa-angle-left'></i></a></li>\n";
    
    //■  페이징 안의 '숫자' 표시	
	if (totalPage > 1) {
	    for (var k = start_page; k <= end_page; k++) {
	        if (curPage != k)
	            str += "<li><a onclick='loadPage(" + k + ")'>" + k + "</a></li>\n";
	        else
	            str += "<li><a class='active tooltip-top' title='현재페이지'>" + k + "</a></li>\n";
	    }
	}
	
	//■ > 표시
    if (totalPage > end_page){   // onclick마다 loadPage 하는거. (n번쨰 페이지)
    	str += "<li><a onclick='loadPage(" + (end_page + 1) + ")' class='tooltip-top' title='다음'><i class='fas fa-angle-right'></i></a></li>\n";
    }

	//■ >> 표시
    if (curPage < totalPage) {
        str += "<li><a onclick='loadPage(" + totalPage + ")' class='tooltip-top' title='맨끝'><i class='fas fa-angle-double-right'></i></a></li>\n";
    }

    return str;

} // end buildPagination()





//<select> 에서 pageRows 값 변경할때마다
function changePageRows(){
    window.pageRows = $("#rows").val();
    loadPage(window.page);

} // end changePageRows()



// 글 쓰기/읽기/수정 대화 상자 세팅
function setPopup(mode){

	// 글 작성
	if(mode == "write"){	            // line 9에서 모드가 write일 때, 
		$('#frmWrite')[0].reset();      // form 내의 기존 내용 reset	
		$("#dlg_write .title").text("새글 작성");
		$("#dlg_write .btn_group_header").hide();
		$("#dlg_write .btn_group_write").show();
		$("#dlg_write .btn_group_view").hide();
		$("#dlg_write .btn_group_update").hide();

		$("#dlg_write input[name='subject']").attr("readonly", false);
		$("#dlg_write input[name='subject']").css("border", "1px solid #ccc");
		$("#dlg_write input[name='name']").attr("readonly", false);
		$("#dlg_write input[name='name']").css("border", "1px solid #ccc");
		$("#dlg_write textarea[name='content']").attr("readonly", false);
		$("#dlg_write textarea[name='content']").css("border", "1px solid #ccc");
	} 


    // 글 읽기 모드. (수정ㄴㄴ)
	if(mode == "view"){
		$("#dlg_write .title").text("글 읽기");
		$("#dlg_write .btn_group_header").show();
		$("#dlg_write .btn_group_write").hide();
		$("#dlg_write .btn_group_view").show();
		$("#dlg_write .btn_group_update").hide();	
		
		$("#dlg_write #viewcnt").text("#" + viewItem.uid + " - 조회수: " + viewItem.viewcnt);
		$("#dlg_write #regdate").text(viewItem.regDateTime);  // DTO 의 getRegDate() 
		
		$("#dlg_write input[name='uid']").val(viewItem.uid);  // 나중에 삭제나 수정을 위해 uid 필요
        // rest.jsp 의 line 81 정도의 name="uid" 입니다!!!!
		
		$("#dlg_write input[name='subject']").val(viewItem.subject);
		$("#dlg_write input[name='subject']").attr("readonly", true);
		$("#dlg_write input[name='subject']").css("border", "none");
		
		$("#dlg_write input[name='name']").val(viewItem.name);
		$("#dlg_write input[name='name']").attr("readonly", true);
		$("#dlg_write input[name='name']").css("border", "none");
		
		$("#dlg_write textarea[name='content']").val(viewItem.content);
		$("#dlg_write textarea[name='content']").attr("readonly", true);
		$("#dlg_write textarea[name='content']").css("border", "none");		
	}


	// 글 수정
	if(mode == "update"){
		$("#dlg_write .title").text("글 수정");
		
		$("#dlg_write .btn_group_header").show();
		$("#dlg_write .btn_group_write").hide();
		$("#dlg_write .btn_group_view").hide();
		$("#dlg_write .btn_group_update").show();
		
		$("#dlg_write input[name='subject']").attr("readonly", false);
		$("#dlg_write input[name='subject']").css("border", "1px solid #ccc");
		$("#dlg_write input[name='name']").attr("readonly", true);  // 작성자는 수정 불가
		$("#dlg_write textarea[name='content']").attr("readonly", false);
		$("#dlg_write textarea[name='content']").css("border", "1px solid #ccc");		
	}




}  // end setPopup()



// 새 글 등록 처리
function chkWrite(){

    var data = $("#frmWrite").serialize();

    $.ajax({
        url : ".",
        type : "POST",
        cache : false,     // (질문) 왜 cache는 false인가? 
        data : data,        // POST로 ajax request 할 경우 data에 parameter 넘기기
        
        success : function(data, status){   // 넘어오는데 성공한 데이터
            if(status == "success"){
                if(data.status == "OK"){
                    alert("INSERT 성공 "+data.count+"개: "+data.status);
                    loadPage(1);        // 첫페이지 데이터 로딩
                } else {
                    alert("INSERT 실패! "+data.status+ " : "+data.message);
                }
            }
        }
    }); // end $ajax

    // request(글쓰기 완료) 끝나고 나서 그 창에 남아있는 입력된 값들 지워주는 작업. 

    return false;       //(질문) 지금 현재 기본이 submit으로 되어있어서, false(submit안됨)으로 넘어가기

} // end chkWrite()



//현재 글 목록 list 에 대해 이벤트 등록
//- 제목(subject) 클릭하면 view 팝업 화면 뜰수 있게 하기
function addViewEvent(){
    $("#list .subject").click(function(){
        // 읽어오기
        $.ajax({
            //line 200~ 참조
            url : "./" + $(this).attr("data-uid"),      // url : /board/{uid}
            type : "GET",
            cache : false,
            success : function(data, status){
                if(status == "success"){
                    if(data.status == "OK"){
                        // ↓읽어온 데이터는 어디에 있는가?
                        //data.data[0]        // data라는 배열에 담아뒀고, 0번째 값을 받아오는거 
                        window.viewItem = data.data[0];

                        setPopup("view");       // 글 읽기 팝업 띄우기
                        $("#dlg_write").show();

                        // ↓ 리스트 상의 조회수 증가 작업 ,, line 94 정도 참조
                        $("#list [data-viewcnt='" + viewItem.uid + "']").text(viewItem.viewcnt);
                    } else {
                        alert ("VIEW 실패 : " + data.message);
                    }
                } 

            }
        });
    });
} // end addViewEvent()


//check 된 uid 의 게시글들만 삭제하기
function chkDelete(){
    var uids = [];  // check 된 uid들을 담을 배열 준비
    
    // list 에서 name이 uid인것들만 가져올 거다! 
    $("#list tbody input[name=uid]").each(function(){
        // 각 input에 대해서 아래 를 수행
        if($(this).is(":checked")){      // jQuery에서 checked 여부를 확인하는 함수. if 넣었으니 true/false로 결괏값 나오겠지? 
            uids.push(parseInt($(this).val())); // uid 달고 있는 애들은 다 삭제 대상.

        }
    });
    
    // 만약 배열에 아무것도 없다면? -> check된 게 아무것도 없다. 
    // 즉, request 할 이유가 없다!
    if(uids.length == 0){
        alert("삭제할 글을 선택해주세요.");
    } else {
        if(!confirm(uids.length + "개의 글을 삭제하시겠습니까?")) 
            return false;

        var data = $("#frmList").serialize();

        $.ajax({
            url : ".",  // 같은 경로
            type : "DELETE",
            data : data,
            cache : false,
            success : function(data, status){
                if(status == "success"){
                    if(data.status == "OK"){
                        // 삭제가 정상적으로 발생한 것임 'ㅅ')/
                        alert("DELETE 성공: "+ data.count +"개");
                        loadPage(window.page);      //현재 페이지 목록을 다시 로딩합니다.
                    } else {
                        alert("DELETE 실패: "+ data.message);
                        return false;
                    }
                }
            }
        });
    } // end if

    return true;
} // end chkDelete()



// 특정 uid 의 글 삭제하기
function deleteUid(uid){
		
	if(!confirm(uid + "글을 삭제하시겠습니까?")) return false;
	
	// DELETE 방식
	$.ajax({
		url : ".",       // URL: /board
		type : "DELETE",
		data : "uid=" + uid,			
		cache : false,
		success : function(data, status){
			if(status == "success"){
				if(data.status == "OK"){						
					alert("DELETE성공 " + data.count + "개:");  // 설사 이미 지워져서 0개를 리턴해도 성공이다.
					loadPage(window.page);  // 현재 페이지 로딩
				} else {
					alert("DELETE실패 " + data.message);
					return false;
				}
			}
		}
	});
	
	return true;
} // end deleteUid(uid)



// 글 수정 처리
function chkUpdate(){

    var data = $("#frmWrite").serialize();

    $.ajax({
        url : ".",      // URL: /board
        type : "PUT",
        cache : false,
        data : data,
        success : function(data, status){
            if (status == "success"){
                if(data.status == "OK"){
                    alert("UPDATE 성공 "+ data.count + "개:"+ data.status);
                    loadPage(window.page);;     //현재 페이지 로딩
                } else {
                    alert("UPDATE 실패"+data.status+ " : "+data.message);
                }
                
                // 현재 팝업 닫기
                $("#dlg_write").hide();
            }

        }
    });

} // end chkUpdate()






