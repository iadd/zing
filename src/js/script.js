function createCORSRequest(method, url){
	var xhr = new XMLHttpRequest();
	
	if("withCredentials" in xhr){
		// Check if the XMLHttpRequest object has a "withCredentials" property.
		// "withCredentials" only exists on XMLHTTPRequest2 object
		xhr.open(method, url, true);
	}else{
		if(typeof XDomainRequest != "undefined"){
			// Otherwise, check if XDomainRequest.
			// XDomainRequest only exists in IE, and is IE's way of making CORS request
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else{
			// Otherwise, CORS is not support by the browser.
			xhr = null;
		}
	}
	return xhr;
}

function test(){
	//var vipUrl = "http://mp3.zing.vn/download/vip/song/";
	var id = document.getElementById("txtUrl").value;

	var url = "http://www.google.com";

	var xhr = createCORSRequest("GET", url);
	if(!xhr){
		throw new Error("CORS not supported");
	}
	//alert(xhr);
	xhr.onreadystatechange = OnReadyStateChange;
	function OnReadyStateChange(){
		alert("load");
		var lblLink = document.getElementById("lblLink");
		if (xhr.readyState== 4 && xhr.status==200){
			lblLink.innerHTML = xhr.getResponseHeader("Server");
		}
	}
	xhr.send();
}

function getLink(){
	var xmlHttp = null;
	var lblLink = document.getElementById("lblLink");
	//var vipUrl = "http://mp3.zing.vn/download/vip/song/";
	//var id = document.getElementById("txtUrl").value+".html";
	var id=document.getElementById("txtUrl").value;
	
	if(window.XMLHttpRequest){
		xmlHttp = new XMLHttpRequest();
	}else{
		//IE6, IE5
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	/*
	if("withCredentials" in xmlHttp){
		// xmlHttp for chrome/Firefox/Opera/Safari
		xmlHttp.open("GET", vipUrl+id, true);
	}else{
		if(typeof XDomainRequest != "undefined"){
			// Otherwise, check if XDomainRequest,
			//
			xmlHttp = new XDomainRequest();
			xmlHttp.open("GET", vipUrl+id);
		}else{
			// not support CORS
			xmlHttp = null;
		}
	}
	*/
	//xmlHttp.open("GET", vipUrl+id, true);
	xmlHttp.open("GET", "httprequest.php?id="+id, true);
	//xmlHttp.open("GET", "http://www.google.com/", true);
	xmlHttp.onreadystatechange= OnReadyStateChange;
	
	function OnReadyStateChange(){
		if (xmlHttp.readyState== 4 && xmlHttp.status==200){
			lblLink.innerHTML = xmlHttp.responseText;
		}
	}
	xmlHttp.send();
	xmlHttp.onabort=function(){
		alert("abort");
	}
}

function download(){
	var vipUrl = "http://mp3.zing.vn/download/vip/song/";
	var id = document.getElementById("txtUrl").value+".html";
	window.location.replace(vipUrl+id);
}
function redirect(){
	//alert("Redirect");
	window.location.replace("https://www.google.com/");
}