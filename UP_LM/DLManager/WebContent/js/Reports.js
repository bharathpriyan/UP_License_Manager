$(document).ready(function() {
    populatetable();
});


function populatetable(){
	
	//var userArray = [];
	var userArray = [{ "username": "Bharath", "licenseNumber": "AWS12345", "mobileNumber": "111111111", "expirydate": "30-Aug-2016" }, { "username": "Arumai", "licenseNumber": "AWS65432", "mobileNumber": "2222222222", "expirydate": "30-Aug-2017" }, { "username": "Karthick", "licenseNumber": "AWS654562", "mobileNumber": "3333333333", "expirydate": "30-Aug-2015" }, { "username": "Bharath", "licenseNumber": "AWS12345", "mobileNumber": "111111111", "expirydate": "30-Aug-2016" }, { "username": "Arumai", "licenseNumber": "AWS65432", "mobileNumber": "2222222222", "expirydate": "30-Aug-2017" }, { "username": "Karthick", "licenseNumber": "AWS654562", "mobileNumber": "3333333333", "expirydate": "30-Aug-2015" }, { "username": "Bharath", "licenseNumber": "AWS12345", "mobileNumber": "111111111", "expirydate": "30-Aug-2016" }, { "username": "Arumai", "licenseNumber": "AWS65432", "mobileNumber": "2222222222", "expirydate": "30-Aug-2017" }, { "username": "Karthick", "licenseNumber": "AWS654562", "mobileNumber": "3333333333", "expirydate": "30-Aug-2015" }, { "username": "Bharath", "licenseNumber": "AWS12345", "mobileNumber": "111111111", "expirydate": "30-Aug-2016" }, { "username": "Arumai", "licenseNumber": "AWS65432", "mobileNumber": "2222222222", "expirydate": "30-Aug-2017" }, { "username": "Karthick", "licenseNumber": "AWS654562", "mobileNumber": "3333333333", "expirydate": "30-Aug-2015" }, { "username": "Bharath", "licenseNumber": "AWS12345", "mobileNumber": "111111111", "expirydate": "30-Aug-2016" }, { "username": "Arumai", "licenseNumber": "AWS65432", "mobileNumber": "2222222222", "expirydate": "30-Aug-2017" }, { "username": "Karthick", "licenseNumber": "AWS654562", "mobileNumber": "3333333333", "expirydate": "30-Aug-2015" }, { "username": "Bharath", "licenseNumber": "AWS12345", "mobileNumber": "111111111", "expirydate": "30-Aug-2016" }, { "username": "Arumai", "licenseNumber": "AWS65432", "mobileNumber": "2222222222", "expirydate": "30-Aug-2017" }, { "username": "Karthick", "licenseNumber": "AWS654562", "mobileNumber": "3333333333", "expirydate": "30-Aug-2015" }, { "username": "Karthick", "licenseNumber": "AWS654562", "mobileNumber": "3333333333", "expirydate": "30-Aug-2015" }, { "username": "Karthick", "licenseNumber": "AWS654562", "mobileNumber": "3333333333", "expirydate": "30-Aug-2015" }, { "username": "Karthick", "licenseNumber": "AWS654562", "mobileNumber": "3333333333", "expirydate": "30-Aug-2015" }, { "username": "Karthick", "licenseNumber": "AWS654562", "mobileNumber": "3333333333", "expirydate": "30-Aug-2015" }, { "username": "Karthick", "licenseNumber": "AWS654562", "mobileNumber": "3333333333", "expirydate": "30-Aug-2015" }, { "username": "Karthick", "licenseNumber": "AWS654562", "mobileNumber": "3333333333", "expirydate": "30-Aug-2015" }, { "username": "Karthick", "licenseNumber": "AWS654562", "mobileNumber": "3333333333", "expirydate": "30-Aug-2015" }, { "username": "Karthick", "licenseNumber": "AWS654562", "mobileNumber": "3333333333", "expirydate": "30-Aug-2015" }, { "username": "Karthick", "licenseNumber": "AWS654562", "mobileNumber": "3333333333", "expirydate": "30-Aug-2015" }, { "username": "Karthick", "licenseNumber": "AWS654562", "mobileNumber": "3333333333", "expirydate": "30-Aug-2015" }];
	
	var dataTableText = '<table id="reportsTable"><thead><th>Name</th><th>License Number</th><th>Mobile Number</th><th>Expiry Date</th></thead><tbody>';
	
	
	
	for(var loopVar=0;loopVar<userArray.length;loopVar++){
		
	dataTableText += '<tr><td><input id="'+userArray[loopVar].licenseNumber+'" class="userCheckBoxClass" type="checkbox"><a class="userNameClass" href="FreshLicense.html?lnumber='+userArray[loopVar].licenseNumber+'" target="_self">'+userArray[loopVar].username+'</a></td><td>'+userArray[loopVar].licenseNumber+'</td><td>'+userArray[loopVar].mobileNumber+'</td><td>'+userArray[loopVar].expirydate+'</td></tr>';
		
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
		if(returnData=='true'){
			populatetable(returnData);
		}else{
			alert("Please provide valid crendentials!");
			password.value="";
		}
	});
}