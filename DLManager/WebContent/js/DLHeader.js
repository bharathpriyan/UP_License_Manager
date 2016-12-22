var frameEl = document.getElementById("contentHolder");
var logoutTimer = null;

$(document).ready(function() {
	document.getElementById("appVersionSpan").innerHTML = appVersion;
	if(getCookie("userName")){
	frameEl.src = "FreshLicense.html";
	$("#freshTab").addClass("tabsClassSelected");
	$("#searchUserTab").removeClass("tabsClassSelected");
	$("#reportsTab").removeClass("tabsClassSelected");
	document.getElementById("loginNameSpan").innerHTML = getCookie("userName");
	}else{
	proceedToLogout();
	}

	logoutTimer = setTimeout(proceedToLogout,logoutTimeInMilliSecs);

});

$('html').click(function(e) {                
	clearTimeout(logoutTimer);
	logoutTimer = setTimeout(proceedToLogout,logoutTimeInMilliSecs);
});

function proceedToLogout(){
	//deleteCookie("userName");
	window.location = "Login.html";
}

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