function squareNumber(x) {
    return x * x;
}

var fs = require('fs');
var filename = 'login.html';
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  //console.log('OK: ' + filename);
  //console.log(data)
  var search = 'id=\"__VIEWSTATE" value=\"';
  var pos1 = data.indexOf(search);
  var pos2 = data.indexOf('"', pos1 + search.length);
  var viewState = data.substr(pos1, pos2-pos1);

  search = "id=\"__EVENTVALIDATION\" value=\"";
  pos1 = data.indexOf(search);
  pos2 = data.indexOf('"', pos1 + search.length);
  var eventValidation = data.substr(pos1, pos2-pos1);

  var userNameField = data.match("name=\"(.+?\\$txtUsername)\"")[1];
  var passwordField = data.match("name=\"(.+?\\$txtPassword)\"")[1];
  //var scriptManagerField = data.match("'ScriptManager', 'Form', \\['(.+?)'")[1];
  var webFormField = data.match("WebForm_PostBackOptions\\(&quot;(.+?\\$cmdLogin)&quot;")[1];
  //var loginField = data.match("id=\"(.+?_Login_UP)\"")[1];



  console.log(viewState);
  console.log(eventValidation);
  console.log(userNameField);
  console.log(passwordField);
  //console.log(scriptManagerField);
  console.log(webFormField);
  //console.log(loginField);

  console.log(data.length);
  console.log(pos1);
  console.log(pos2);
});

console.log(squareNumber(5));