var popupMsg = document.getElementById('popupMsg');
var modal = document.getElementById('myModal');

function importCust(){
    var x = document.getElementById("fileBrowserId");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                var file = x.files[i];
                
                var formData = new FormData();
                formData.append("file", file);

            	jQuery.support.cors=true; 
            	$.ajax({  
            		url: 'uploadServlet',  
            		type: "POST",  
            		data: formData,  
            		headers : {
            			"X-Requested-With" : "XMLHttpRequest"
            		},
            		processData: false,  // tell jQuery not to process the data 
            		contentType: false, // tell jQuery not to set contentType 
            		async : false,
            		success : function(returnedData) {
            			txt = "Import completed!";
            		},
            		error : function(jqXHR, textStatus, errorThrown) {
            		}
            	}); 
            }
        }
    } 
    else {
        if (x.value == "") {
            txt = "Select one or more files";
        } else {
            txt = "The files property is not supported by your browser!";
            txt = "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
        }
    }
    popupMsg.innerHTML = txt;
	modal.style.display = "block";
}