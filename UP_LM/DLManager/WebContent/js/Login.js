var popupMsg = document.getElementById('popupMsg');
var modal = document.getElementById('myModal');

/**
 * On Load Function
 */
$(document).ready(function() {
	//proceed to application features if the user has already logged in
	var loggedInUser = getCookie("userName");
	if(loggedInUser){
		proceedToApplicationFeatures();
	}
});

/**
 * Servlet call to validate login credentials
 */
function validateLogin(){
	var username = document.getElementById("login-name");
	var password = document.getElementById("login-pass");

	//$('<form action="Login"><input type="hidden" name="username" value="'+username.value+'"><input type="hidden" name="password" value="'+password+'"></form>').appendTo('body').submit();

	setTimeout(webServiceCall(username,password),500);
}
function webServiceCall(username,password){
	$.post('Login?uName='+username.value+'&pWord='+password.value, function(returnData) {
		//Assuming it is true
		if(returnData=="true"){
			setCookie("userName", username.value);
			proceedToApplicationFeatures();
		}
		else{
//			alert("Please provide valid crendentials!");
			popupMsg.innerHTML = "Please provide valid crendentials!";
			modal.style.display = "block";
			password.value="";
		}
	});
}
function proceedToApplicationFeatures(){
	window.location = "DLHeader.html";
}