var infoToUserEl = document.getElementById("infoToUserContainer");
var popupMsg = document.getElementById('popupMsg');
var modal = document.getElementById('myModal');

/**
 * on load
 */
$(document).ready(function() {
	$( ".userInputClass" ).keyup(function() {
		$("#infoToUserContainer").css("display","none");
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

/**
 * Clear Input fields
 */
function resetInputs(){
	document.getElementById("drivingSchoolName").value = "";
	document.getElementById("firstName").value = "";
	document.getElementById("userName").value = "";
	document.getElementById("lastName").value = "";
	document.getElementById("password").value = "";
	document.getElementById("mobNumber").value = "";
	document.getElementById("altMobNumber").value = "";
	document.getElementById("emailId").value = "";
}
/**
 * validate inputs and call servlet
 */
function saveListener(){
	var schoolName = document.getElementById("drivingSchoolName").value;
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var userName = document.getElementById("userName").value;
	var password = document.getElementById("password").value;
	var mobNumber = document.getElementById("mobNumber").value;
	var altMobNumber = document.getElementById("altMobNumber").value;
	var emailId = document.getElementById("emailId").value;

	if(schoolName){
		document.getElementById("drivingSchoolName").style.border = makeBorderNone;
	}else{
		displayErrorMessage("drivingSchoolName",schoolNameErrorMsg);
		document.getElementById("drivingSchoolName").style.border = errorBorderHighlight;
		return;
	}

	if(firstName){
		document.getElementById("firstName").style.border = makeBorderNone;
	}else{
		displayErrorMessage("firstName",firstNameErrorMsg);
		document.getElementById("firstName").style.border = errorBorderHighlight;
		return;
	}

	if(userName){
		document.getElementById("userName").style.border = makeBorderNone;
	}else{
		displayErrorMessage("userName",userNameErrorMsg);
		document.getElementById("userName").style.border = errorBorderHighlight;
		return;
	}

	if(password){
		document.getElementById("password").style.border = makeBorderNone;
	}else{
		displayErrorMessage("password",passwordErrorMsg);
		document.getElementById("password").style.border = errorBorderHighlight;
		return;
	}

	if(mobNumber)
	{
		if(mobNumber.length == 10)
		{
			document.getElementById("mobNumber").style.border = makeBorderNone;
		}
		else
		{
			displayErrorMessage("mobNumber",mobLengthErrorMsg);
			document.getElementById("mobNumber").style.border = errorBorderHighlight;
			return;
		}

	}
	else{
		displayErrorMessage("mobNumber",mobErrorMsg);
		document.getElementById("mobNumber").style.border = errorBorderHighlight;
		return;
	}

	if(altMobNumber)
	{
		if(altMobNumber.length == 10)
		{
			document.getElementById("altMobNumber").style.border = makeBorderNone;
		}
		else
		{
			displayErrorMessage("altMobNumber",altMobLengthErrorMsg);
			document.getElementById("altMobNumber").style.border = errorBorderHighlight;
			return;
		}
	}
	if(emailId){
		var atpos = emailId.indexOf("@");
		var dotpos = emailId.lastIndexOf(".");

		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=emailId.length) {
			displayErrorMessage("emailId",emailErrorMsg);
			document.getElementById("emailId").style.border = errorBorderHighlight;
			return;
		}else{
			document.getElementById("emailId").style.border = makeBorderNone;
		}
	}

	var registrationDetails = '{"schoolName":"'+schoolName+'","firstName":"'+firstName+'","lastName":"'+lastName+'","userName":"'+userName+'","password":"'+password+'","mobNumber":"'+mobNumber+'","altMobNumber":"'+altMobNumber+'","emailId":"'+emailId+'"}';
	registrationDetails = encodeURIComponent(registrationDetails);
	$.post('SignUp?userData='+registrationDetails, function(returnData) {
		//Assuming it is true
		if(returnData){
			//alert("Congrats! User is registered successfully..");
			popupMsg.innerHTML = "Congrats! User is registered successfully..";
			modal.style.display = "block";
			setTimeout(resetInputs(),10000);
		}else{
			//alert("User sign up failed :( due to connectivity issues..Please try again");
			popupMsg.innerHTML = "User sign up failed due to connectivity issues! Please try again";
			modal.style.display = "block";
		}
	});
}

/**
 * Display messages to the user
 */
function displayErrorMessage(elementName,msgToUser){
	$("#"+elementName).focus();
	var btnOffset = $("#"+elementName).offset();
	infoToUserEl.innerHTML = msgToUser;

	$("#infoToUserContainer").css("top",btnOffset.top-5);
	$("#infoToUserContainer").css("left",btnOffset.left+460);
	$("#infoToUserContainer").css("display","block");
}

function validateUserName(event){
	document.getElementById("userName").style.border = "none";
		var userName = document.getElementById("userName").value;
		$.get('CheckAdminAvailability?lNumber='+userName, function(returnData) {
			//True if already available
			if(returnData!='true'){
				displayErrorMessage("userName","Username is already available in our records!");
				document.getElementById("userName").style.border = errorBorderHighlight;
			}else{
				return;
			}
		});
}