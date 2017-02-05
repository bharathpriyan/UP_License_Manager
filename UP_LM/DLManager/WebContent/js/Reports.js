$(document).ready(function() {
	if(getCookie("userName")!=null){
		fetchReports();
	}
	else{
		proceedToLogout();
	}
});

var exDate = "";

function populatetable(returnData){
	
	var userArray = returnData;
	
	var dataTableText = '<table id="reportsTable"><thead><th>Name</th><th>License Number</th><th>Mobile Number</th><th>Expiry Date</th></thead><tbody>';
	
	for(var i = 0; i < userArray.length; i++) {
	    dataTableText += '<tr><td><input id="'+userArray[i].arg1+'" class="userCheckBoxClass" type="checkbox"><a href="FreshLicense.html?lnumber='+userArray[i].arg1+'" target="_self">'+userArray[i].arg0
	    +'</a></td><td>'+userArray[i].arg1+'</td><td>'+userArray[i].arg2+'</td><td>'+userArray[i].arg3+'</td></tr>';
	}
	
	dataTableText += '</tbody></table>';
	
	document.getElementById("tableHolder").innerHTML = dataTableText;
	
	$("#reportsTable").DataTable({
		"scrollY":        "500px",
        "scrollCollapse": true,
        "paging":         false
	});
	$(".dataTables_length").css("display","none");
}

function fetchReports(){
	var e = document.getElementById("reportDate");
	var selectedValue = e.options[e.selectedIndex].value;

	//get records from Db with selected days
	
	$.get('FetchAllReports?days='+selectedValue, function(returnData) {
		//Assuming it is true
		if(returnData){
			populatetable(returnData);
		}else{
			alert("No customer matching the search criteria");
		}
	});
}

/**
 * Set date fields
 */
function setExpiryDate(returnData){
	var expiryDate = new Date();
	var ageFromDB = 18;
	var custDOB = new Date(returnData[17].trim());
	ageFromDB = expiryDate.getFullYear() - custDOB.getFullYear();
	var licenseTypeFromDB = returnData[13].trim();
		if(licenseTypeFromDB == "LMVH" || licenseTypeFromDB == "MCWG"){
			if(ageFromDB<=40){
				expiryDate.setYear(expiryDate.getFullYear()+(40-ageFromDB));
			}else if(ageFromDB>40 && ageFromDB<=50){
				expiryDate.setYear(expiryDate.getFullYear()+10);
			}else if(ageFromDB>50){
				expiryDate.setYear(expiryDate.getFullYear()+5);
			}
		}else if(licenseTypeFromDB == "HAZ"){
			expiryDate.setYear(expiryDate.getFullYear()+1);
		}else{
			expiryDate.setYear(expiryDate.getFullYear()+3);
		}

	exDate = expiryDate.getFullYear()+"-"+(expiryDate.getMonth()+1)+"-"+expiryDate.getDate();
}

function fetchDetailsByLNumber(lisenceNumber){
	$.get('FetchUserDetails?lNumber='+lisenceNumber, function(returnData) {
		//Assuming it is true
		if(returnData!=null){
			alert('Pogala')
			returnData = returnData.substring(1,returnData.length-1);
			var returnArray = returnData.split(",");
			setExpiryDate(returnArray);
			alert(exDate);
		}else{
			alert("Renewal failed due to connectivity issues..Please try again");
		}
	});
}

function renewSelectedUsers(){
	var fields = $("input[class='userCheckBoxClass']:checked"); 
    if (fields.length == 0) 
    { 
        alert('Please select atleast one user for renewal'); 
    } 
    else 
    { 
        for (var int = 0; int < fields.length; int++) {
        	var lNumber = fields[int].id;
        	$.post('RenewUser?licenseNumber='+fields[int].id, function(returnData) {
        		if(returnData){
        			alert("Renewal success for customer :"+lNumber);
        		}else{
        			alert("Renewal failed for customer :"+lNumber);
        		}
        	});
        	
//        	$.when(fetchDetailsByLNumber(fields[int].id)).then(webServiceCallForRenewal(fields[int].id,exDate));
        	/*if(fetchDetailsByLNumber(fields[int].id)=="true"){
        	alert("back");
        	if(exDate && fields[int].id){
        		webServiceCallForRenewal(fields[int].id,newExpiryDate);
        	}
        	}*/
		} 
    }
}

function webServiceCallForRenewal(lNumber){
	$.post('RenewUser?licenseNumber='+lNumber, function(returnData) {
		alert(lNumber)
		//Assuming it is true
		if(returnData){
			alert("Renewal success for customer :"+lisenceNumber);
		}else{
			alert("Renewal failed for customer :"+lisenceNumber);
		}
	});
}

function webServiceCallForRenewal(lNumber,expiryDate){
	$.post('RenewUser?licenseNumber='+lNumber+'&expiryDate='+expiryDate, function(returnData) {
		alert(lNumber)
		//Assuming it is true
		if(returnData){
			alert("Renewal success for customer :"+lisenceNumber);
		}else{
			alert("Renewal failed for customer :"+lisenceNumber);
		}
	});
}