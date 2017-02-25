var popupMsg = document.getElementById('popupMsg');
var modal = document.getElementById('myModal');

$(document).ready(function() {
	if(getCookie("userName")!=null){	
		$.get('FetchAllReports?days=ALL', function(returnData) {
			if(returnData){
				populatetable(returnData);
			}else{
				//alert("No user to show");
				popupMsg.innerHTML = "0 customers fetched! Please use Fresh License section to add new customers.";
				modal.style.display = "block";
			}
		});
	}
	else{
		proceedToLogout();
	}
    /**
     * Listen to enter key and close the custom alert popup if open
     */
    document.querySelector('body').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
          closeAlertPopup();
        }
    });
    logoutTimer = setTimeout(proceedToLogout,logoutTimeinMS);
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

parent.$("html").click(function() {                
	parent.$("#settingsWrapper").css("display","none");
	clearTimeout(logoutTimer);
	logoutTimer = setTimeout(proceedToLogout,logoutTimeinMS);
});

$('html').click(function(event) {                
	clearTimeout(logoutTimer);
	logoutTimer = setTimeout(proceedToLogout,logoutTimeinMS);
});