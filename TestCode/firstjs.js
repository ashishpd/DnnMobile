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

  console.log(viewState);

  console.log(data.length);
  console.log(pos1);
  console.log(pos2);
});

console.log(squareNumber(5));