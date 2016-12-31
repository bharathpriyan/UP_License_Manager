/**
 * Create new entry for user
 * 
 */
var userUpdateBool=false;
var firstNameToDB="", firstNameFromDB="";
var lastNameToDB="",lastNameFromDB="";
var genderToDB="Male",genderFromDB="";
var dateOfBirthToDB="01/07/1998",dateOfBirthFromDB="";
var ageToDB="",ageFromDB="";
var mobNumberToDB="",mobNumberFromDB="";
var altMobToDB="",altMobFromDB="";
var licenseNumberToDB="",licenseNumberFromDB="";
var licenseTypeToDB="LMVH",licenseTypeFromDB="LMVH";
var permanentAddressLine1ToDB = "",permanentAddressLine1FromDB="";
var permanentAddressLine2ToDB = "",permanentAddressLine2FromDB = "";
var permanentAddressPinToDB = "",permanentAddressPinFromDB = "";
var temporaryAddressLine1ToDB = "",temporaryAddressLine1FromDB = "";
var temporaryAddressLine2ToDB = "",temporaryAddressLine2FromDB = "";
var temporaryAddressPinToDB = "",temporaryAddressPinFromDB = "";
var guardianNameToDB = "",guardianNameFromDB = "";
var issuedDateToDB = "",issuedDateFromDB = "";
var expireDateToDB = "",expireDateFromDB = "";
var monthArr = ["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"];
var infoToUserEl = document.getElementById("infoToUserContainer");

$(document).ready(function() {
	/**
	 * Page initializing scripts - Start
	 */
	var copyAddEl = document.getElementById("copyAddress");
	var btnOffset = $("#copyAddress").offset();

	copyAddEl.onmouseover=function(){

		infoToUserEl.innerHTML = copyAddressMsg;

		$("#infoToUserContainer").css("top",btnOffset.top-10);
		$("#infoToUserContainer").css("left",btnOffset.left+40);
		$("#infoToUserContainer").css("display","block");
	};
	copyAddEl.onmouseout=function(){
		$("#infoToUserContainer").css("display","none");
	};

	$( ".userInputClass" ).keyup(function() {
		$("#infoToUserContainer").css("display","none");
	});

	$( ".makeReadOnly" ).removeAttr("readonly");
	/**
	 * Page initializing scripts - End
	 */
	if(getCookie("userName")!=null){	
		if(window.location.href.indexOf('?lnumber')>-1){
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for (var i = 0; i < hashes.length; i++) {
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
			var lisenceNumber = vars["lnumber"];
			$.get('FetchUserDetails?lNumber='+lisenceNumber, function(returnData) {
				//Assuming it is true
				if(returnData){
					returnData = returnData.substring(1,returnData.length-1);
					var returnArray = returnData.split(",");
					setFieldsForUserDetailUpdate(returnArray);
					userUpdateBool = true;
				}else{
					alert("Fetch user details failed due to connectivity issues..Please try again");
				}
				parent.selectFreshLisenceTab();
			});
		}else{
			//setInitialValues();
		}
	}
	else{
		proceedToLogout();
	}

});

function setFieldsForUserDetailUpdate(returnData){

	document.getElementById("firstName").value = returnData[0].trim();
	var tLNmae = returnData[1].trim();
	document.getElementById("lastName").value = (tLNmae==="null"?"":tLNmae);
	var tFHName = returnData[2].trim();
	document.getElementById("fatherHusbandName").value = (tFHName==="null"?"":tFHName);
	document.getElementById("dateOfBirth").value = returnData[17].trim();
	document.getElementById("gender").value = returnData[3].trim()=='M'?"Male":"Female";
	document.getElementById("mobNumber").value = returnData[4].trim();
	var tAltMob = returnData[5].trim();
	document.getElementById("alternateMobNumber").value = (tAltMob==="null"?"":tAltMob);
	document.getElementById("licenseNumber").value = returnData[12].trim();
	document.getElementById("licenseType").value = returnData[13].trim();
	document.getElementById("permanentAddressLine1").value = returnData[6].trim();
	var tPAdd2 = returnData[7].trim();
	document.getElementById("permanentAddressLine2").value = (tPAdd2==="null"?"":tPAdd2);
	document.getElementById("permanentAddressPin").value = returnData[8].trim();
	var ttadd1 = returnData[9].trim();
	var ttadd2 = returnData[10].trim();
	var tPin = returnData[11].trim();
	document.getElementById("temporaryAddressLine1").value = (ttadd1==="null"?"":ttadd1);
	document.getElementById("temporaryAddressLine2").value = (ttadd2==="null"?"":ttadd2);
	document.getElementById("temporaryAddressPin").value = (tPin==="null"?"":tPin);
	document.getElementById("issuedDate").value = returnData[14].trim();
	document.getElementById("expireDate").value = returnData[15].trim();

	$('.makeReadOnly').attr( 'readonly','readonly');

	document.getElementById("saveDetails").innerHTML = "Update";

	licenseTypeFromDB=returnData[13].trim();
	expireDateFromDB=returnData[15].trim();

	updateAge();

}

/**
 * Set date fields
 */
function setExpiryDate(){
	var issuedDateVal= document.getElementById("issuedDate").value;
	var issuedDate = new Date(issuedDateVal);
	var oldExpiryDate = new Date(expireDateFromDB);
	var expiryDate = new Date(issuedDateVal);

	if(userUpdateBool){
		if((licenseTypeFromDB == "Batch" && licenseTypeToDB == "HTV") || (licenseTypeFromDB == "HTV" && licenseTypeToDB == "HTV")){
			expiryDate.setYear(issuedDate.getFullYear()+3);
		}else if(licenseTypeFromDB == "HTV" && licenseTypeToDB == "HAZ"){
			var tempDate = new Date(issuedDate);
			tempDate.setMonth(issuedDate.getMonth()+10)
			//if HTV's expiry is lesser than HAZ, HAZ will expire on HTV's expiry date
			if(oldExpiryDate.getTime()>tempDate.getTime()){
				expiryDate.setYear(issuedDate.getFullYear()+1);
			}else{
				expiryDate=oldExpiryDate;
			}
		}else if(licenseTypeFromDB != "HTV" && licenseTypeToDB == "HAZ"){
			expiryDate.setYear(issuedDate.getFullYear()+1);
		}else{
			expiryDate.setYear(issuedDate.getFullYear()+3);
		}
	}
	else{
		if(licenseTypeToDB == "LMVH" || licenseTypeToDB == "MCWG"){
			if(ageToDB<=40){
				expiryDate.setYear(issuedDate.getFullYear()+(40-ageToDB));
			}else if(ageToDB>40 && ageToDB<=50){
				expiryDate.setYear(issuedDate.getFullYear()+10);
			}else if(ageToDB>50){
				expiryDate.setYear(issuedDate.getFullYear()+5);
			}
		}else if(licenseTypeToDB == "HAZ"){
			expiryDate.setYear(issuedDate.getFullYear()+1);
		}else{
			expiryDate.setYear(issuedDate.getFullYear()+3);
		}
	}
	var monthVal = expiryDate.getMonth()+1;
	if(monthVal.toString().length==1){
		monthVal ="0".concat(monthVal.toString());
	}
	var dateVal = expiryDate.getDate();
	if(dateVal.toString().length==1){
		dateVal ="0".concat(dateVal.toString());
	}
	document.getElementById("expireDate").value = expiryDate.getFullYear()+"-"+monthVal+"-"+dateVal;
}

/**
 * Copy permanent address to temporary address field
 */
function copyPremAddressToTempAddress(){

	var copyAddressEl =	document.getElementById("copyAddress");
	var permanentAddressLine1 =	document.getElementById("permanentAddressLine1").value;
	var permanentAddressLine2 =	document.getElementById("permanentAddressLine2").value;
	var permanentAddressPin =	document.getElementById("permanentAddressPin").value;

	if(copyAddressEl.checked){
		document.getElementById("temporaryAddressLine1").value = permanentAddressLine1;
		document.getElementById("temporaryAddressLine2").value = permanentAddressLine2;
		document.getElementById("temporaryAddressPin").value = permanentAddressPin;
	}else{
		document.getElementById("temporaryAddressLine1").value = "";
		document.getElementById("temporaryAddressLine2").value = "";
		document.getElementById("temporaryAddressPin").value = "";
	}
}
/**
 * Validate inputs from the user and provide appropriate error msg
 */
function saveListener()
{
	//validate customer name 
	var customerName =	document.getElementById("firstName").value;
	var customerLastName =	document.getElementById("lastName").value;
	if(customerName)
	{
		firstNameToDB=customerName;
		document.getElementById("lastName").style.border = makeBorderNone;
	}
	else{
		//alert(nameErrorMsg);
		displayErrorMessage("firstName",nameErrorMsg);
		document.getElementById("firstName").style.border = errorBorderHighlight;
		return;
	}
	if(customerLastName){
		lastNameToDB = customerLastName;
	}
	//validate date of birth
	var dateOfBirth = document.getElementById("dateOfBirth").value;
	if(dateOfBirth){
		var customerDOB = new Date(dateOfBirth);
		var cDate = new Date();
		if(customerDOB.getTime() > cDate.getTime()){
			displayErrorMessage("dateOfBirth",dOBLimitErrormsg);
			document.getElementById("dateOfBirth").style.border = errorBorderHighlight;
			return;
		}else{
			dateOfBirthToDB = dateOfBirth;
			document.getElementById("dateOfBirth").style.border = makeBorderNone;
		}
	}else{
		displayErrorMessage("dateOfBirth",dateOfBirthErrormsg);
		document.getElementById("dateOfBirth").style.border = errorBorderHighlight;
		return;
	}
	//validate customer age
	var customerAge =	document.getElementById("age").value;

	if(customerAge)
	{
		if (parseInt(customerAge) < ageLimitMin){
			displayErrorMessage("dateOfBirth",ageLimitErrorMsg);
			document.getElementById("age").style.border = errorBorderHighlight;
			return;
		}else if (parseInt(customerAge) > ageLimitMax){
			displayErrorMessage("dateOfBirth",ageLimitErrorMsgMax);
			document.getElementById("age").style.border = errorBorderHighlight;
			return;
		}
		else{
			ageToDB=customerAge;
			document.getElementById("age").style.border = makeBorderNone;
		}
	}
	else {
		displayErrorMessage("dateOfBirth",ageErrorMsg);
		document.getElementById("age").style.border = errorBorderHighlight;
		return;
	}

	//validate customer mobile number
	var customerMobNumber = document.getElementById("mobNumber").value;

	if(customerMobNumber!="" && customerMobNumber!="null" && customerMobNumber!=null)
	{
		if(customerMobNumber.length == 10)
		{
			mobNumberToDB=customerMobNumber;
			document.getElementById("mobNumber").style.border = makeBorderNone;
		}
		else
		{
			//alert(mobLengthErrorMsg);
			displayErrorMessage("mobNumber",mobLengthErrorMsg);
			document.getElementById("mobNumber").style.border = errorBorderHighlight;
			return;
		}

	}
	else{
		//alert(mobErrorMsg);
		displayErrorMessage("mobNumber",mobErrorMsg);
		document.getElementById("mobNumber").style.border = errorBorderHighlight;
		return;
	}

	//validate customer alternate mobile number
	var customerAltMobNumber =	document.getElementById("alternateMobNumber").value;

	if(customerAltMobNumber!="" && customerAltMobNumber!="null" && customerAltMobNumber!=null)
	{
		if(customerAltMobNumber.length == 10)
		{
			altMobToDB=customerAltMobNumber;
			document.getElementById("alternateMobNumber").style.border = makeBorderNone;
		}
		else
		{
			//alert(altMobLengthErrorMsg);
			displayErrorMessage("alternateMobNumber",altMobLengthErrorMsg);
			document.getElementById("alternateMobNumber").style.border = errorBorderHighlight;
			return;
		}
	}

	var permanentAddressLine1 =	document.getElementById("permanentAddressLine1").value;
	var permanentAddressLine2 =	document.getElementById("permanentAddressLine2").value;
	var permanentAddressPin =	document.getElementById("permanentAddressPin").value;
	if(permanentAddressLine1){
		permanentAddressLine1ToDB = permanentAddressLine1;
		document.getElementById("permanentAddressLine1").style.border = makeBorderNone;
	}else{
		displayErrorMessage("permanentAddressLine1",addressLine1ErrorMsg);
		document.getElementById("permanentAddressLine1").style.border = errorBorderHighlight;
		return;
	}
	if(permanentAddressLine2){
		permanentAddressLine2ToDB = permanentAddressLine2;
		document.getElementById("permanentAddressLine2").style.border = makeBorderNone;
	}else{
		displayErrorMessage("permanentAddressLine2",addressLine2ErrorMsg);
		document.getElementById("permanentAddressLine2").style.border = errorBorderHighlight;
		return;
	}
	if(permanentAddressPin){
		permanentAddressPinToDB = permanentAddressPin;
		document.getElementById("permanentAddressPin").style.border = makeBorderNone;
	}else{
		displayErrorMessage("permanentAddressPin",pincodeErrorMsg);
		document.getElementById("permanentAddressPin").style.border = errorBorderHighlight;
		return;
	}

	//validate customer License number
	var customerLicenseNumber =	document.getElementById("licenseNumber").value;
	if(customerLicenseNumber!="" && customerLicenseNumber!="null" && customerLicenseNumber!=null)
	{
		licenseNumberToDB=customerLicenseNumber;
		document.getElementById("licenseNumber").style.border = makeBorderNone;
	}
	else
	{
		//alert(licenseNumberErrorMsg);
		displayErrorMessage("licenseNumber",licenseNumberErrorMsg);
		document.getElementById("licenseNumber").style.border = errorBorderHighlight;
		return;
	}
	var issuedDate = document.getElementById("issuedDate").value;
	if(issuedDate)
	{
		issuedDateToDB=issuedDate;
		document.getElementById("issuedDate").style.border = makeBorderNone;
	}
	else
	{
		displayErrorMessage("issuedDate",issuedDateErrorMsg);
		document.getElementById("issuedDate").style.border = errorBorderHighlight;
		return;
	}
	var expireDate = document.getElementById("expireDate").value;
	if(expireDate)
	{
		expireDateToDB=expireDate;
		document.getElementById("expireDate").style.border = makeBorderNone;
	}
	else
	{
		displayErrorMessage("expireDate",expireDateErrorMsg);
		document.getElementById("expireDate").style.border = errorBorderHighlight;
		return;
	}

	var temporaryAddressLine1 =	document.getElementById("temporaryAddressLine1").value;
	var temporaryAddressLine2 =	document.getElementById("temporaryAddressLine2").value;
	var temporaryAddressPin =	document.getElementById("temporaryAddressPin").value;
	if(temporaryAddressLine1){
		temporaryAddressLine1ToDB = temporaryAddressLine1;
	}
	if(temporaryAddressLine2){
		temporaryAddressLine2ToDB = temporaryAddressLine2;
	}
	if(temporaryAddressPin){
		temporaryAddressPinToDB = temporaryAddressPin;
	}

	var guardianName = document.getElementById("fatherHusbandName").value;
	if(guardianName){
		guardianNameToDB = guardianName;
	}
	var btnEl = document.getElementById("saveDetails");
	if(btnEl.innerHTML.toLowerCase()=="save"){
		proceedToSave();
	}else if(btnEl.innerHTML.toLowerCase()=="update"){
		proceedToUpdate();
	}
}

/**
 * Call servlet to insert new customer
 */
function proceedToSave()
{
	//call servlet to make entry into DB

	var permanentAddressToDB = '{"permanentAddressLine1":"'+permanentAddressLine1ToDB+'","permanentAddressLine2":"'+permanentAddressLine2ToDB+'","permanentAddressPin":"'+permanentAddressPinToDB+'"}';
	var temporaryAddressToDB = '{"temporaryAddressLine1":"'+temporaryAddressLine1ToDB+'","temporaryAddressLine2":"'+temporaryAddressLine2ToDB+'","temporaryAddressPin":"'+temporaryAddressPinToDB+'"}';

	var newCustomerDetails = '{"customerFirstName":"'+firstNameToDB+'","customerLastName":"'+lastNameToDB+'","guardianName":"'+guardianNameToDB+'","customerAge":"'+dateOfBirthToDB+'","gender":"'+genderToDB+'","mobileNumber":"'+mobNumberToDB+'","altMobileNumber":"'+altMobToDB+'","licenseNumber":"'+licenseNumberToDB+'","licenseType":"'+licenseTypeToDB+'","permenantAddress":'+permanentAddressToDB+',"temporaryAddress":'+temporaryAddressToDB+',"licenseIssuedDate":"'+issuedDateToDB+'","licenseExpiryDate":"'+expireDateToDB+'","licensRenewedDate":""}';
	newCustomerDetails = encodeURIComponent(newCustomerDetails);
	$.post('addNewCustomer?userData='+newCustomerDetails, function(returnData) {
		//Assuming it is true
		if(returnData){
			alert("Congrats! Your customer details are saved successfully..");
			setTimeout(resetInputs(),1000);
		}else{
			alert("User sign up failed due to connectivity issues..Please try again");
		}
	});
}

/**
 * Call servlet to update existing customer details
 */
function proceedToUpdate()
{
	//call servlet to make entry into DB

	var permanentAddressToDB = '{"permanentAddressLine1":"'+permanentAddressLine1ToDB+'","permanentAddressLine2":"'+permanentAddressLine2ToDB+'","permanentAddressPin":"'+permanentAddressPinToDB+'"}';
	var temporaryAddressToDB = '{"temporaryAddressLine1":"'+temporaryAddressLine1ToDB+'","temporaryAddressLine2":"'+temporaryAddressLine2ToDB+'","temporaryAddressPin":"'+temporaryAddressPinToDB+'"}';

	var newCustomerDetails = '{"customerFirstName":"'+firstNameToDB+'","customerLastName":"'+lastNameToDB+'","guardianName":"'+guardianNameToDB+'","customerAge":"'+dateOfBirthToDB+'","gender":"'+genderToDB+'","mobileNumber":"'+mobNumberToDB+'","altMobileNumber":"'+altMobToDB+'","licenseNumber":"'+licenseNumberToDB+'","licenseType":"'+licenseTypeToDB+'","permenantAddress":'+permanentAddressToDB+',"temporaryAddress":'+temporaryAddressToDB+',"licenseIssuedDate":"'+issuedDateToDB+'","licenseExpiryDate":"'+expireDateToDB+'","licensRenewedDate":""}';
	newCustomerDetails = encodeURIComponent(newCustomerDetails);
	$.post('UpdateCustomerDetail?userData='+newCustomerDetails, function(returnData) {
		//Assuming it is true
		if(returnData){
			alert("Congrats! Your customer details are saved successfully..");
			setTimeout(showSearchUserScreen(),5000);
		}else{
			alert("Update customer details failed due to connectivity issues..Please try again");
		}
	});
}

/**
 * Save gender
 */
function captureGender(){
	var e = document.getElementById("gender");
	var selectedValue = e.options[e.selectedIndex].value;
	genderToDB = selectedValue;
}

/**
 * Save LicenseType
 */
function captureLicenseType(){
	var e = document.getElementById("licenseType");
	var selectedValue = e.options[e.selectedIndex].value;
	licenseTypeToDB = selectedValue;
}

/**
 * Clear Input fields
 */
function resetInputs(){
	document.getElementById("firstName").value = "";
	document.getElementById("lastName").value = "";
	document.getElementById("age").value = "";
	document.getElementById("mobNumber").value = "";
	document.getElementById("alternateMobNumber").value = "";
	document.getElementById("fatherHusbandName").value = "";
	$(".pAddress").val("");
	$(".tAddress").val("");
	document.getElementById("licenseNumber").value = "";
	document.getElementById("licenseType").value = "LMVH";
	document.getElementById("dateOfBirth").value = "1998-01-07";

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

function updateAge(){
	var dateOfBirth = document.getElementById("dateOfBirth").value;
	var customerDOB = new Date(dateOfBirth);
	var cDate = new Date();

	document.getElementById("age").value = cDate.getFullYear()-customerDOB.getFullYear();
}