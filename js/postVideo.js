var reEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var reDate = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
var found = 1;
//////////////////////////////////
function check() {
    //$(#youtubeId).val()
    if (($("#youtubeId").val().trim() == "")||($("#youtubeId").val().trim().length == 0)||($("#youtubeId").val().trim().length < 6 )||($("#youtubeId").val().trim().length > 20)) {
        $("#youtubeIdValidate").css("visibility","visible");
        found = 1;
        return;
    }else{
        $("#youtubeIdValidate").css("visibility","hidden");
        found = 0;
    }
    //Tên Video
    if (($("#name").val().trim() == "")||($("#name").val().trim().length < 10 )||($("#name").val().trim().length > 150)) {
        $("#nameValidate").css("visibility","visible");
        found = 1;
        return;
    }else{
        $("#nameValidate").css("visibility","hidden");
        found = 0;
    }
    //Mô tả
    if (($("#description").val().trim() == "")||($("#description").val().trim().length < 20 )||($("#description").val().trim().length > 300)) {
        $("#descriptionValidate").css("visibility","visible");
        found = 1;
        return;
    }else{
        $("#descriptionValidate").css("visibility","hidden");
        found = 0;
    }
    //keyword
    if ($("#keyword").val().trim() == "") {
        $("#keywordValidate").css("visibility","visible");
        found = 1;
        return;
    }else{
        $("#keywordValidate").css("visibility","hidden");
        found = 0;
    }
    //Tên tác giả
    if ($("#authorName").val().trim() == "") {
        $("#authorNameValidate").css("visibility","visible");
        found = 1;
        return;
    }else{
        $("#authorNameValidate").css("visibility","hidden");
        found = 0;
    }
    //email reEmail.test($("#email").val());
    if (reEmail.test($("#email").val()) == false) {
        $("#emailValidate").css("visibility","visible");
        found = 1;
        return;
    }else{
        $("#emailValidate").css("visibility","hidden");
        found = 0;
    }
    // ngày sinh
    if (reDate.test($("#birthday").val()) == false) {
        $("#birthdayValidate").css("visibility","visible");
        found = 1;
        return;
    }else{
        $("#birthdayValidate").css("visibility","hidden");
        found = 0;
    }
}
function refresh(){ // bỏ hàm này
    $("#youtubeId").val("");
    $("#name").val("");
    $("#description").val("");
    $("#keyword").val("");
    $("#authorName").val("");
    $("#email").val("");
    $("#birthday").val("");
}
function send() {
    check();
    if (found == 1) {
        alert("Vui lòng chỉnh sửa các phần (màu đỏ) cho hợp lệ!");
    }else{
        var youtubeVideo = {
		"videoId": $("#youtubeId").val(), 
	    "name": $("#name").val(),
	    "description": $("#description").val(),
	    "keywords": $("#keyword").val(),
	    "category": $("#cataloge").val(),
	    "genre": $("#genre").val(),
	    "authorName": $("#authorName").val(),
	    "authorEmail": $("#email").val(),
	    "birthday": $("#birthday").val(),
	    };
        var url = "http://youtube-video-api-1608.appspot.com/youtube/api";
        $.ajax({
                url: url,
                data: JSON.stringify(youtubeVideo),
                type: 'POST',	    	   
                success: function(data, status) { 
                    alert("Success, " + data.name); 
                    //refresh();	
                    getVideo();
                },
                error: function() { 
                    alert('Failed!'); 	
                }
            });
    } // end if else
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////  postVideo();  /////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function postVideo() {
    var html = '';
        html += '<form onclick="check();" onchange="check();" onkeyup="check();" style="margin: 15px 15px;">'; // onclick="check();" onchange="check();" 
        html += '                    <h5>Thông tin Video</h5><hr style="box-shadow:0px 3px 15px #ddd;">';
        html += '                    <table>';
        html += '                        <tr>';
        html += '                            <td></td>';
        html += '                            <td><input type="text" id="fullLink" class="mdl-textfield__input" onchange="getFull();" onkeyup="getFull();" placeholder="Youtube Full Link (lấy thông tin nhanh)"><br></td>'; //onclick="getFull();"                      
        html += '                        </tr>'; // Full link;
        html += '                        <tr>';
        html += '                            <td></td>';
        html += '                            <td><input type="text" id="youtubeId" class="mdl-textfield__input" placeholder="Youtube ID"><span id="youtubeIdValidate" style="color: red;visibility: hidden;">ID video: min = 6; max = 20</span></td>';                      
        html += '                        </tr>';
        html += '                        <tr>';
        html += '                            <td></td>';
        html += '                            <td><input type="text" id="name" class="mdl-textfield__input" placeholder="Tên Video"><span id="nameValidate" style="color: red;visibility: hidden;">Tên video: min = 10; max = 150</span></td>';
        html += '                        </tr>';
        html += '                        <tr>';
        html += '                            <td></td>';
        html += '                            <td><textarea rows="5" cols="80" id="description" class="mdl-textfield__input" placeholder="Mô tả"></textarea><span id="descriptionValidate" style="color: red;visibility: hidden;">Mô tả: min = 20; max = 300</span></td>';
        html += '                        </tr>';
        html += '                        <tr>';
        html += '                            <td></td>';
        html += '                            <td><input type="text" id="keyword" class="mdl-textfield__input" placeholder="Từ khóa video (không để trống)"><span id="keywordValidate" style="color: red;visibility: hidden;">Không để trống ...</span></td>';
        html += '                        </tr>';
        html += '                    </table>';
        html += '                    <h5>Thông tin tác giả</h5><hr style="box-shadow:0px 3px 15px #ddd;">';
        html += '                    <table>';
        html += '                        <tr>';
        html += '                            <td></td>';
        html += '                            <td><input type="text" id="authorName" size="80" class="mdl-textfield__input" placeholder="Tên tác giả (không để trống)"><span id="authorNameValidate" style="color: red;visibility: hidden;">Không để trống...</span></td>';
        html += '                        </tr>';
        html += '                        <tr>';
        html += '                            <td></td>';
        html += '                            <td><input type="text" name="" id="email" size="80" class="mdl-textfield__input" placeholder="Email (định dạng abc@xyz.com)"><span id="emailValidate" style="color: red;visibility: hidden;">Định dạng: abc@xyz.com</span></td>';
        html += '                        </tr>';
        html += '                        <tr>';
        html += '                            <td></td>';
        html += '                            <td><input type="text" name="" id="birthday" size="80" class="mdl-textfield__input" placeholder="Ngày sinh (định dạng dd/mm/yyyy)"><span id="birthdayValidate" style="color: red;visibility: hidden;"s>Định dạng: dd/mm/yyyy</span></td>';
        html += '                        </tr>';
        html += '                    </table>';
        html += '                <div id="button" style="text-align: center;margin-top: 10px">';
        html += '                    <input type="button" value="Gửi Video" onclick="send();" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">';
        html += '                    <input type="reset" value="Làm lại" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">';
        html += '                </div>';
        html += '            </form>';
        document.getElementById("showList").innerHTML = html;
}
/////////////////////////////////////// //////////////////////////////////////////
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function getFull() {
    var full_link = $("#fullLink").val();
    if (full_link.trim() == "") {
        alert("Nhập vào một Full Link Video!");
        return;
    }
    var videoId = getParameterByName("v", full_link);
    //alert(videoId);
    var url = "https://www.googleapis.com/youtube/v3/videos?id="+videoId+"&key=AIzaSyDppf9BzCqWQ3EZgTdfIJSedczjeXl9FXs&part=snippet,contentDetails,statistics,status";
  $.ajax(
	{
	    url: url,	    
	    type: 'GET',
	    success: function(data, status) {
        $("#youtubeId").val(data.items[0].id);
	    $("#name").val(data.items[0].snippet.title.slice(0,149));
	    $("#description").val(data.items[0].snippet.description.slice(0,299));
        $("#keyword").val("keywords");
	    $("#authorName").val(data.items[0].snippet.channelTitle);
	    $("#email").val("abc@xyz.com");
        $("#birthday").val("12/12/2012");
        },
	    error: function() { 
	    	alert('Lỗi không thể sửa dữ liệu!'); 	
		}
	});
}