/**
 * fresh License screen constants
 */
var nameErrorMsg="We would like to know your customer's name &#128522;";
var ageErrorMsg="We would like to know your customer's age as well..";
var ageLimitErrorMsg="(S)He is too young to hold a license! &#128520;";
var ageLimitErrorMsgMax="OMG!! (S)He is too old to hold a license!";
var mobErrorMsg="Mobile number is as important as his/her name &#128516;";
var mobLengthErrorMsg="Please enter a valid 10 digit mobile number! &#128555;";
var altMobLengthErrorMsg="Please enter a valid 10 digit alternate mobile number! &#128555;";
var licenseNumberErrorMsg="Every License will have a number. Doesn't it?! &#128557;";
var copyAddressMsg = "Copy the permanent address to temporary address? &#128520;";
var issuedDateErrorMsg = "License issued date cannot be empty!";
var expireDateErrorMsg = "License expiry date cannot be empty!";
var renewedDateErrorMsg = "License renewed date cannot be empty!";
/**
 * Admin screen constants
 */
var schoolNameErrorMsg="Please enter your school name &#128522;";
var firstNameErrorMsg="Please enter your first name &#128522;";
var userNameErrorMsg="Please choose a login username &#128522;";
var passwordErrorMsg="Password cannot be empty &#128522;";
var emailErrorMsg="Please enter a valid email &#128522;";

var errorBorderHighlight = "2px solid red";
var makeBorderNone = "none";

var ageLimitMin = 18;
var ageLimitMax = 100;
var licenseExpiryPeriodInYears = 20;
var logoutTimeInMilliSecs = 60000;







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