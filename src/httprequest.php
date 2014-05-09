<?php
// $url = "http://www.google.com/";
// $ch = curl_init($url);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// $response = curl_exec($ch);
// $content_type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
// echo $content_type;

function downloadURL($URL) {
 if(!function_exists('curl_init')) {
 die ("Curl PHP package not installedn");
 }

 /*Initializing CURL*/
 $curlHandle = curl_init();

 /*The URL to be downloaded is set*/
 curl_setopt($curlHandle, CURLOPT_URL, $URL);
 /*Return the HTTP headers*/
 curl_setopt($curlHandle, CURLOPT_HEADER, true);
 /*Now execute the CURL, download the URL specified*/
 $response = curl_exec($curlHandle);
 return $response;
}
function getLink($id){
	$vipUrl = "http://mp3.zing.vn/download/vip/song/";
	//$id = $_REQUEST["id"] . ".html";
	$url = $vipUrl . $id . ".html";
	$headers = get_headers($url);
	$i = 2;
	foreach($headers as $key => $value){
		//echo $key . "<br />";
		$str = substr($value, 0, 8);
		//echo $str . "<br />";
		if($str == "Location"){
			$i = $key;
			break;
		}
	}
	$location = $headers[$i];
	//var_dump(get_headers($url));
	$len = strlen($location);
	return substr($location, 10, $len);
}
// $vipUrl = "http://mp3.zing.vn/download/vip/song/";
// $id = "IW9U7I7C";
// $url = $vipUrl . $id  . ".html";
// $headers = get_headers($url);
// $location = $headers[6];
// //echo $location;
// $len = strlen($location);
// echo substr($location, 10, $len);
$id = $_REQUEST["id"];
echo getLink($id);
?>
