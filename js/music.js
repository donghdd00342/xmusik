/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var html = "";
var xmlData ="";
var oldIndex = 1;
var chosen = "";
var xmlDoc;
var arrPlayed = [];
function itemPLAYED(title, performer, source, backimage){
	this.title = title;
	this.performer = performer;
	this.source = source;
    this.backimage = backimage;
}
// search()
function search() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
//myOption()
function myOption(j) {
    var repeat = document.getElementById("repeat").checked;
    var random = document.getElementById("random").checked;
    var auto = document.getElementById("auto").checked;
	var item = xmlDoc.getElementsByTagName("item");
	if (j > (item.length-1)) {
		return false;
	}
    if (repeat) {
        playMusic(j);
		return;
    }
    if (auto && random) {		
        var x = Math.floor((Math.random() * item.length) + 0); // WARNING
		//alert(x);
        playMusic(x);
		return;
    }
    if(auto){
        if(j == (item.length-1)){
            playMusic(0);
			return;
        }else{
            playMusic(j+1);
			return;
        }
    }
}
// playMusic()
function playMusic(j){
    var mp3p = "";
	document.getElementById("mp3Player").innerHTML = "";
	document.getElementById("mp3Player").innerHTML = "";
    var source = xmlDoc.getElementsByTagName("source");
    var backimage = xmlDoc.getElementsByTagName("backimage");
    var title = xmlDoc.getElementsByTagName("title");
    var v_title = title[j].childNodes[0].nodeValue;
    var performer = xmlDoc.getElementsByTagName("performer");
    var v_performer = performer[j].childNodes[0].nodeValue;
    var v_source = source[j].childNodes[0].nodeValue;
    var v_backimage = backimage[j].childNodes[0].nodeValue;
	
	
	/* BEGIN: Cần nâng cấp cái này */
    mp3p = "<audio id=\"myAudio\" controls autoplay onended=\"myOption("+j+");\">";
    mp3p += "<source type=\"audio/mpeg\" src=\""+v_source+"\"></audio>";
    document.getElementById("mp3Player").innerHTML = mp3p;
	/* END: Cần nâng cấp cái này */

	changeBG();

    document.getElementById("downloadM").innerHTML = "<a href=\""+v_source+"\" download=\""+v_title+"\" style=\"text-decoration: none;\">&nbsp;"+v_title.slice(0,35)+"</a>";
    if (document.getElementById("iconP"+oldIndex) != null) {
        document.getElementById("iconP"+oldIndex).innerHTML = (oldIndex + 1) + ". ";
        document.getElementById("trP"+oldIndex).style = "";        
    }
    document.getElementById("iconP"+j).innerHTML = "<img src='images/playing.gif'>&nbsp;&nbsp;";
    document.getElementById("trP"+j).style = "background-color:rgba(0,0,0,.06);";
    var found = 0;
    for (var index = 0; index < arrPlayed.length; index++) {
        if (v_title.toLowerCase() == arrPlayed[index].title.toLowerCase()) {
            found = 1;
        }
    }
    if (found != 1) {
        var itemP = new itemPLAYED(v_title, v_performer, v_source, v_backimage);
        arrPlayed.push(itemP);
        document.getElementById("badgePlayed").innerHTML = '<span class="mdl-badge" data-badge="'+arrPlayed.length+'">Đã Nghe</span>';
    }
    oldIndex = j; 
	//////////////    	
	updateLyric(j);
}
// showPlayList()
function showPlayList(){
        var item = xmlDoc.getElementsByTagName("item");
        var title = xmlDoc.getElementsByTagName("title");
        var performer = xmlDoc.getElementsByTagName("performer");
        var source = xmlDoc.getElementsByTagName("source");
        var backimage = xmlDoc.getElementsByTagName("backimage");
        html += "<input type=\"text\" id=\"myInput\" onkeyup=\"search();\" placeholder=\"Tìm theo tên bài hát (lọc kết quả hiển thị)...\" title=\"Lọc kết quả hiển thị\">";
        html += "<table id=\"myTable\" class=\"myTable\">";
        html += "<tbody>";
        for (var i = 0; i < item.length; i++) { //html += "";
        html += "<tr onclick='playMusic("+i+");' id='trP"+i+"'>";
        html += "<td><span id='iconP"+i+"'>"+(i+1)+".  </span>";
        html += " <span onclick='playMusic("+i+");'>" + title[i].childNodes[0].nodeValue.slice(0,35) + "</span></td>"; //title
        html += "<td><span onclick='playMusic("+i+");'>" + performer[i].childNodes[0].nodeValue.slice(0,20) + "</span></td>";//performer
        html += "</tr>";                
        }// end for
        html += "</tbody>";
        html += "</table>";
        //alert(item.length);
        document.getElementById("showList").innerHTML = html;
}
// playList(listData)
function playList(listData) {
    if(chosen == listData){
        return false;
    }else{
		chosen = listData;
	}
	xmlData = "https://mp3.zing.vn/xml/album-xml/" + listData;
    html = "";    
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        letsPlay(this);
    }
};
xhttp.open("GET", xmlData, true);
xhttp.send();
function letsPlay(xml) {
    xmlDoc = xml.responseXML;
    showPlayList();
}
}//*end FUNCTION playList(listData)

////////////////////////////////////////////////////////////////////////////////////////
/////////// PREMIUM :D _ĐÃ NGHE ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//_myOption()
function _myOption(j) {
    var repeat = document.getElementById("repeat").checked;
    var random = document.getElementById("random").checked;
    var auto = document.getElementById("auto").checked;
    if (repeat) {
        _playMusic(j);
    }
    if (auto && random) {
        var x = Math.floor((Math.random() * arrPlayed.length) + 0);
        _playMusic(x);
    }
    if(auto){
        if(j == (arrPlayed.length-1)){
            _playMusic(0);
        }else{
            _playMusic(j+1);
        }
    }
}
//_playMusic(j)
function _playMusic(j){
    var mp3p = "";
	document.getElementById("mp3Player").innerHTML = "";
	document.getElementById("mp3Player").innerHTML = "";
    var source = arrPlayed[j].source;
    var backimage = arrPlayed[j].backimage;
    mp3p = "<audio controls autoplay onended=\"_myOption("+j+");\">";
    mp3p += "<source type=\"audio/mpeg\" src=\""+source+"\"></audio>";
    document.getElementById("mp3Player").innerHTML = mp3p;
	changeBG();
    document.getElementById("downloadM").innerHTML = "<a href=\""+source+"\" download=\""+arrPlayed[j].title+"\" style=\"text-decoration: none;\">&nbsp;"+arrPlayed[j].title.slice(0,35)+"</a>";
    for (var index = 0; index < arrPlayed.length; index++) {
        document.getElementById("iconP"+index).innerHTML = (index + 1) + ". ";
        document.getElementById("trP"+index).style = "";        
    }
    document.getElementById("iconP"+j).innerHTML = "<img src='images/playing.gif'>&nbsp;&nbsp;";
    document.getElementById("trP"+j).style = "background-color:rgba(0,0,0,.06);";
}
// function _playList()
function _playList(){
    chosen = "danghe";
    var html = "";
    if (arrPlayed.length == 0) {
        html = "<h5>Bạn vẫn chưa nghe bài nào! Hãy nghe nhạc trước tiên :)</h5>";
    }else{
            html += "<input type=\"text\" id=\"myInput\" onkeyup=\"search();\" placeholder=\"Tìm theo tên bài hát (lọc kết quả hiển thị)...\" title=\"Lọc kết quả hiển thị\">";
            html += "<table id=\"myTable\" class=\"myTable\">";
            html += "<tbody>";
            for (var index = 0; index < arrPlayed.length; index++) {
            var itemP = arrPlayed[index];
            html += "<tr onclick='_playMusic("+index+");' id='trP"+index+"'>";
            html += "<td><span id='iconP"+index+"'>"+(index+1)+".  </span>";
            html += " <span onclick='_playMusic("+index+");'>" + itemP.title + "</span></td>"; //title
            html += "<td><span onclick='_playMusic("+index+");'>" + itemP.performer + "</span></td>";//performer
            html += "</tr>";    
            }
            html += "</tbody>";
            html += "</table>";
    }
    document.getElementById("showList").innerHTML = html;
}

//////////////////////////////////////////////////////
/////////////// BEGIN UPDATE ////////////////////////

function updateLyric(j) {
	for (var i = 1; i < 360; i++)
        window.clearInterval(i);
	// clearing all
	
    var urlLyric = xmlDoc.getElementsByTagName("lyric");
    var v_urlLyric = urlLyric[j].childNodes[0].nodeValue;
    //alert(v_urlLyric);

    var xhr;
    if (window.XMLHttpRequest) xhr = new XMLHttpRequest(); 		// all browsers except IE
    else xhr = new ActiveXObject("Microsoft.XMLHTTP"); 		// for IE
    // FIX CORS
    if(xhr)
    {
        xhr.open('GET', 'https://donghd.16mb.com/fix.php?url='+v_urlLyric, true);
    } else return;
    
    // xhr.open('GET', 'https://donghd.16mb.com/fix.php?url='+v_urlLyric, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState===4 && xhr.status===200) {
			//////////////////////////////////////////////////////////
            //alert(xhr.responseText);
			var lrc_s = xhr.responseText; // du lieu tho
			
            const lyric = lrc_s.split('\n');
            var lrc = [];
            const lyricLen = lyric.length;
            for (let i = 0; i < lyricLen; i++) {
                // match lrc time
                const lrcTimes = lyric[i].match(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g);
                // match lrc text
                const lrcText = lyric[i].replace(/\[(\d{2}):(\d{2})\.(\d{2,3})]/g, '').replace(/^\s+|\s+$/g, '');

                if (lrcTimes != null) {
                    // handle multiple time tag
                    const timeLen = lrcTimes.length;
                    for (let j = 0; j < timeLen; j++) {
                        const oneTime = /\[(\d{2}):(\d{2})\.(\d{2,3})]/.exec(lrcTimes[j]);
                        const lrcTime = (oneTime[1]) * 60 + parseInt(oneTime[2]) + parseInt(oneTime[3]) / ((oneTime[3] + '').length === 2 ? 100 : 1000);
                        lrc.push([lrcTime, lrcText]);
                    }
                }
            }
            // sort by time
            lrc.sort((a, b) => a[0] - b[0]);
            //alert(lrc);
			//alert(document.getElementById("myAudio").duration);
			/////
			var lrcHTML = '';
			var lrcContents = document.getElementById('showLyric'); //document.getElementsById('showLyric');
			for (i = 0; i < lrc.length; i++) {
				if (lrc[i][1] == null){
					var j = i+1;
					lrcHTML += '<p>' +lrc[j][1] +'</p>'; // 0 - time
				}else{
					lrcHTML += '<p>' +lrc[i][1] +'</p>'; // 0 - time
				}
				//lrcHTML += '<p>' +lrc[i][1] +'</p>'; // 0 - time
			}
			lrcContents.innerHTML = lrcHTML;
			//alert(lrcHTML);			
			lrcContents.getElementsByTagName('p')[0].classList.add('aplayer-lrc-current');
			var timeInterval = setInterval(donghd, 200);
			//var currentTime = document.getElementById("myAudio").currentTime;
			//alert(currentTime);
			function donghd(){
				// Fix lỗi không có lyric
				if (!lrc.length || lrcContents.getElementsByClassName('aplayer-lrc-current')[0] == null) {
					clearInterval(timeInterval);
					return;
				}
				var currentTime = document.getElementById("myAudio").currentTime;
				
                for (let i = 0; i < lrc.length; i++) {
                    if (Math.round(currentTime + 1) >= Math.round(lrc[i][0] + 1) && (!lrc[i + 1] || Math.round(currentTime + 1) <= Math.round(lrc[i + 1][0] + 1))) { //(currentTime >= lrc[i][0] && (!lrc[i + 1] || currentTime < lrc[i + 1][0])) {
                        lrcContents.getElementsByClassName('aplayer-lrc-current')[0].classList.remove('aplayer-lrc-current');
                        lrcContents.getElementsByTagName('p')[i].classList.add('aplayer-lrc-current');
                    }
                }
				
				//alert(document.getElementById("myAudio").duration);
				if (currentTime >= document.getElementById("myAudio").duration) {
					clearInterval(timeInterval);
				}				
			}			
			//////////////////////////////////////////////////////////
        }
    }
    xhr.send();
}
////////////////////////////////////////////////////////////////////////////////////////