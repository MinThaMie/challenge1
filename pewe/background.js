
var blacklistArray = [
  "cdn.krxd.net",
  "google-analytics",
  "www.gstatic.com",
  "effectivemeasure",
  "googletagservice"
];

function init(){
  var blacklist = get_blacklist();
  for (var i = 0; i < blacklistArray.length; i++){
    if (!blacklist.includes(blacklistArray[i])){
        blacklist.push(blacklistArray[i]);
    }
  }
  localStorage.setItem('blacklist', JSON.stringify(blacklist));
    console.log(blacklist);
}

function get_blacklist() {
    var todos = new Array;
    var todos_str = localStorage.getItem('blacklist');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}

function onrequest(req) {
  // This function will be called everytime the browser is about to send out an http or https request.
  // The req variable contains all information about the request.
  // If we return {}  the request will be performed, without any further changes
  // If we return {cancel:true} , the request will be cancelled.
  // If we return {requestHeaders:req.requestHeaders} , any modifications made to the requestHeaders (see below) are sent.

  // log what file we're going to fetch:
  console.log("Loading: " + req.method +" "+ req.url + " "+ req.type);

  if (req.url.includes("lib.min.js")) { // this is kinda
    return {cancel:true};
  }
  // let's do something special if an image is loaded:
  if (req.type=="image") {
     console.log("Ooh, it's a picture!");
  }

  //console.log("length " + req.requestHeaders.length);

  // req also contains an array called requestHeaders containing the name and value of each header.
  // You can access the name and value of the i'th header as req.requestHeaders[i].name and req.requestHeaders[i].value ,
  // with i from 0 up to (but not including) req.requestHeaders.length .
for ( var i = 0; i < req.requestHeaders.length; i++){
    console.log("header: " + req.requestHeaders[i].name + " value: " + req.requestHeaders[i].value);
    if (req.requestHeaders[i].value.includes("Mozilla")) { //Masking my browser
      req.requestHeaders[i].value = "bananen"; //change my browser
      return {requestHeaders:req.requestHeaders};
    }
    var blacklist = get_blacklist();
    for (var j = 0; j < blacklist.length; j++) {
      if (req.requestHeaders[i].value.includes(blacklist[j])) {
        console.log("Blocked: " + "header: " + req.requestHeaders[i].name + " value: " + req.requestHeaders[i].value);
        return {cancel:true};
      }
    }
}

  return {};

}

function onError(error) {
  console.log(`Error: ${error}`);
}

init();
// no need to change the following, it just makes sure that the above function is called whenever the browser wants to fetch a file
browser.webRequest.onBeforeSendHeaders.addListener(
  onrequest,
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]
);

