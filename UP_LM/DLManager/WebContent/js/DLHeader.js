var frameEl = document.getElementById("contentHolder");
var logoutTimer = null;

$(document).ready(function() {
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

});

$('html').click(function(e) {                
	clearTimeout(logoutTimer);
	logoutTimer = setTimeout(proceedToLogout,logoutTimeinMS);
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