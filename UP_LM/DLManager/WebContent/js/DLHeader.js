var frameEl = document.getElementById("contentHolder");
var logoutTimer = null;

$(document).ready(function() {
	$("#settingsWrapper").css("display","none");
	document.getElementById("appVersionSpan").innerHTML = appVersion;
	if(getCookie("userName")!=null){
		frameEl.src = "FreshLicense.html";
		$("#freshTab").addClass("tabsClassSelected");
		$("#searchUserTab").removeClass("tabsClassSelected");
		$("#reportsTab").removeClass("tabsClassSelected");
		document.getElementById("loginNameSpan").innerHTML = getCookie("userName");
		logoutTimer = setTimeout(proceedToLogout,logoutTimeinMS);
		logoutListener();
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
    
    /**
     * Listen to enter key and close the custom alert popup if open
     */
    document.querySelector('body').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
          closeAlertPopup();
        }
    });
});

$('html').click(function(event) {                
	clearTimeout(logoutTimer);
	logoutTimer = setTimeout(proceedToLogout,logoutTimeinMS);
	
	if(! (event.target.className.indexOf("menuList") > -1)
			&& ! (event.target.className.indexOf("square") > -1)
			&& ! (event.target.id.indexOf("settingsIcon") > -1)){
		$("#settingsWrapper").css("display","none");
	}
});

function showFreshLicenseForm(){
	frameEl.src = "FreshLicense.html";

	$("#searchUserTab").removeClass("tabsClassSelected");
	$("#reportsTab").removeClass("tabsClassSelected");

	$("#freshTab").addClass("tabsClassSelected");
}

function showSearchUserScreen(){
	frameEl.src = "SearchUser.html";

	$("#freshTab").removeClass("tabsClassSelected");
	$("#reportsTab").removeClass("tabsClassSelected");

	$("#searchUserTab").addClass("tabsClassSelected");
}

function showReportsScreen(){
	frameEl.src = "Reports.html";

	$("#freshTab").removeClass("tabsClassSelected");
	$("#searchUserTab").removeClass("tabsClassSelected");

	$("#reportsTab").addClass("tabsClassSelected");
}

function logoutListener(){
	var userNameCookie = getCookie("userName");
	if(!userNameCookie){
		proceedToLogout();
	}else{
		setTimeout(logoutListener,5000);
	}
}
function selectFreshLisenceTab(){
	$("#searchUserTab").removeClass("tabsClassSelected");
	$("#reportsTab").removeClass("tabsClassSelected");
	$("#freshTab").addClass("tabsClassSelected");
}

function showSettingsPopup(){
	$('#settingsWrapper').slideToggle(800);
}

function closeSettingsPopup(){
	$('#settingsWrapper').slideUp(800);
}