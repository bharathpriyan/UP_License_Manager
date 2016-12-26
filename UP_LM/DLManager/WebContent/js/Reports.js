$(document).ready(function() {
	if(getCookie("userName")!=null){
		fetchReports();
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