$(document).ready(function() {
	if(getCookie("userName")!=null){	
		$.get('FetchAllReports?days=ALL', function(returnData) {
			if(returnData){
				populatetable(returnData);
			}else{
				alert("No user to show");
			}
		});
	}
	else{
		proceedToLogout();
	}
});


function populatetable(returnData){
	
	var userArray = returnData;
	
	var dataTableText = '<table id="reportsTable"><thead><th>Name</th><th>License Number</th><th>Mobile Number</th><th>Expiry Date</th></thead><tbody>';
	
	for(var i = 0; i < userArray.length; i++) {
	    dataTableText += '<tr><td><a href="FreshLicense.html?lnumber='+userArray[i].arg1+'" target="_self">'+userArray[i].arg0
	    +'</a></td><td>'+userArray[i].arg1+'</td><td>'+userArray[i].arg2+'</td><td>'+userArray[i].arg3+'</td></tr>';
	}
	
	dataTableText += '</tbody></table>';
	
	document.getElementById("tableHolder").innerHTML = dataTableText;
	
	$("#reportsTable").DataTable();
}