var appVersion = "v1.0.0";

/**
 * fresh License screen constants
 */
var nameErrorMsg="Please enter customer name";
var ageErrorMsg="Please enter DOB & Age";
var dateOfBirthErrormsg = "Please select a valid date for DOB";
var dOBLimitErrormsg = "DOB cannot be a future date";
var ageLimitErrorMsg="Customer should be atleast 18 years old";
var ageLimitErrorMsgMax="Customer is too old!";
var mobErrorMsg="Mobile number field cannot be empty";
var mobLengthErrorMsg="Please enter a valid 10 digit mobile number!";
var altMobLengthErrorMsg="Please enter a valid 10 digit alternate mobile number!";
var licenseNumberErrorMsg="Please enter a valid license number";
var copyAddressMsg = "Copy the permanent address to temporary address?";
var issuedDateErrorMsg = "License issued date cannot be empty!";
var expireDateErrorMsg = "License expiry date cannot be empty!";
var renewedDateErrorMsg = "License renewed date cannot be empty!";
var addressLine1ErrorMsg = "Permanent address line 1 cannot be empty!";
var addressLine2ErrorMsg = "Permanent address line 2 cannot be empty!";
var pincodeErrorMsg = "Permanent address pin cannot be empty!";
/**
 * Admin screen constants
 */
var schoolNameErrorMsg="Please enter your school name";
var firstNameErrorMsg="Please enter your first name";
var userNameErrorMsg="Please choose a login username";
var passwordErrorMsg="Password cannot be empty";
var emailErrorMsg="Please enter a valid email";

var errorBorderHighlight = "2px solid red";
var makeBorderNone = "none";

var ageLimitMin = 18;
var ageLimitMax = 100;
var licenseExpiryPeriodInYears = 20;
var logoutTimeinMS = 180000;

var modal = document.getElementById('myModal');
var btn = document.getElementById("popupCloseBtn");


function proceedToLogout(){
	var userNameCookie = getCookie("userName");
	if(userNameCookie){
		deleteCookie("userName");
	}
	$.post('Logout?', function(returnData) {
		//Assuming it is true
		if(returnData=="true"){
			location = "Login.html";		
		}
	});
	
}

//setting cooking value
function setCookie(name, value) {
	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
		document.cookie = name + "=" + escape(value) + "; path=/; expires=";
	}
	else
	{
		localStorage.setItem(name,value);
	}

}
//deleting cookie value
function deleteCookie(name) {
	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
		document.cookie = name + "=null; path=/; expires=";
	}
	else
	{
		localStorage.removeItem(name);
	}
}
function deleteAllCookies() {
	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
		var cookies = document.cookie.split(";"),i,cookie,eqPos,name;
		for (i = 0; i < cookies.length; i++) {
			cookie = cookies[i];
			eqPos = cookie.indexOf("=");
			name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
			deleteCookie(name);
		}
	}
	else
	{
		localStorage.clear();
	}

}
function getCookie(name) {
	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
		var re = new RegExp(name + "=([^;]+)"),value;
		value = re.exec(document.cookie);
		return (value != null) ? unescape(value[1]) : null;
	}
	else
	{
		var value = localStorage.getItem(name);
		return value;
	}
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "none";
}

function proceedToContactUs(){
	window.location = "ContactUs.html";
}

function proceedToAboutUs(){
	window.location = "About.html";
}

function isNumberKey(evt)
{
   var charCode = (evt.which) ? evt.which : evt.keyCode;
   if (charCode != 46 && charCode > 31 
     && (charCode < 48 || charCode > 57))
      return false;

   return true;
}

function closeAlertPopup(){
	document.getElementById('myModal').style.display = "none";
}