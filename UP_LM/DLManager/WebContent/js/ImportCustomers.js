var popupMsg = document.getElementById('popupMsg');
var modal = document.getElementById('myModal');

function importCust(){
	$.post('uploadServlet', function(returnData) {
		modal.style.display = "block";
		if(returnData=="0"){
			popupMsg.innerHTML = "Success";
		}else if(returnData=="1"){
			popupMsg.innerHTML = "Please choose a csv file";
			setTimeout(importCust,2000);
		}else if(returnData.charAt(0)=="2"){
			popupMsg.innerHTML = "Some records are not imported. Please check "+returnData.substring(1);
		}else if(returnData=="4"){
			popupMsg.innerHTML = "Cannot open the file. Try again";
		}else if(returnData=="3"){
			popupMsg.innerHTML = "File not found. Try again";
		}else if(returnData=="5"){
			popupMsg.innerHTML = "Invalid file. Try again";
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
