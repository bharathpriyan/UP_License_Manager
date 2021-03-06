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

	$.get('Login?uName='+username.value+'&pWord='+password.value, function(returnData) {
		//Assuming it is true
		if(returnData=='true'){
			setCookie("userName", username);
			proceedToApplicationFeatures();
		}else{
			alert("Please provide valid crendentials!");
			password.value="";
		}
	});
}

function proceedToApplicationFeatures(){
	window.location = "DLHeader.html";
}