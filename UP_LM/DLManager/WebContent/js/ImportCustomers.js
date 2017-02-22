var popupMsg = document.getElementById('popupMsg');
var modal = document.getElementById('myModal');

function importCust(){
	$.post('uploadServlet', function(returnData) {
		if(returnData=="0"){
			popupMsg.innerHTML = "Success";
			modal.style.display = "block";
		}else{
			popupMsg.innerHTML = "Fail";
			modal.style.display = "block";
		}
	});
}
/**
 * Download template
 */
function downloadTemplate(){
	location.href = "importCustTemplate.csv";
}

$(document).ready(function() {
	$("#settingsWrapper").css("display","none");
	document.getElementById("appVersionSpan").innerHTML = appVersion;
	if(getCookie("userName")!=null){
//		document.getElementById("loginNameSpan").innerHTML = getCookie("userName");
//		logoutTimer = setTimeout(proceedToLogout,logoutTimeinMS);
//		logoutListener();
	}
	else{
		proceedToLogout();
	}
	$("#settingsIcon").click(function(){
		var btnOffset = $("#settingsIcon").offset();
		$("#settingsWrapper").css("top",btnOffset.top+30);
		$("#settingsWrapper").css("left",btnOffset.left-95);
		$("#settingsWrapper").css("display","block");
	});
	$(".menuList").click(function(){
		$("#settingsWrapper").css("display","none");
	});
    $(window).resize(function(){
    	$("#settingsWrapper").css("display","none");
    });
});

function showMsg(event){
//	var btnOffset = "";
//	if(event.parentElement.id == "templateContainer"){
//		document.getElementById("infoToUserContainer").innerHTML = "Get the template. Fill it up and upload. As simple as that!";
//		btnOffset = $("templateContainer").offset();
//	}
//	if(event.parentElement.id == "importContainer"){
//		document.getElementById("infoToUserContainer").innerHTML = "Hassale free mutiple customer addition to the app!";
//		btnOffset = $("importContainer").offset();
//	}
//	$("#infoToUserContainer").css("display","none");
//	$("#infoToUserContainer").css("top",btnOffset.top-10);
//	$("#infoToUserContainer").css("left",btnOffset.left+40);
}

function hideMsg(){
	$("#infoToUserContainer").css("display","block");
}
