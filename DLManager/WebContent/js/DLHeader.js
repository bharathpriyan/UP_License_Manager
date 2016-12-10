var frameEl = document.getElementById("contentHolder");

$(document).ready(function() {
	
	if(getCookie("userName")){
		frameEl.src = "FreshLicense.html";
		$("#freshTab").addClass("tabsClassSelected");
		$("#searchUserTab").removeClass("tabsClassSelected");
		$("#reportsTab").removeClass("tabsClassSelected");
	}else{
		proceedToLogout();
	}
	
});

function proceedToLogout(){
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