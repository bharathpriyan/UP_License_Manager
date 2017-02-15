var popupMsg = document.getElementById('popupMsg');
var modal = document.getElementById('myModal');

function importCust(){
	$.post('uploadServlet', function(returnData) {
		if(returnData=="0"){
			//alert("Congrats! User is registered successfully..");
			popupMsg.innerHTML = "Success";
			modal.style.display = "block";
		}else{
			//alert("User sign up failed :( due to connectivity issues..Please try again");
			popupMsg.innerHTML = "Fail";
			modal.style.display = "block";
		}
	});
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
