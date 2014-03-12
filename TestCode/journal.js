var fs = require('fs');
xml2js = require('xml2js');
var parser = new xml2js.Parser();

var filename = 'journal_catalyst2.html';
fs.readFile(filename, 'utf8', function(err, data) {
if (err) throw err;

//var parseString = require('xml2js').parseString;
//var xml = "<root>Hello xml2js!</root>"
//parseString(xml, function (err, result) {
//    console.dir(result);
//});



  var cleanedData = data.replace(/&w=/g,'').replace(/&h=/,'').replace(/<\/a><\/em>/g,'</em></a>');
  //console.log(i + '  [[[[[[[[[[cleanedRow]]]]]]]]]]]]]]]');
  //console.log(cleanedRow);
  try {
     parser.parseString(cleanedData, function (err, result) {
        console.dir(result);
     });   
  }
  catch(err)
    {
    console.log(err);
    console.log(cleanedRow);
    //break;
    }






var start = 0;
var search = "<div class=\"journalrow\"";
var locations = [];
while (true)
{
  var row = '';
  pos = data.indexOf(search, start);
  locations.push(pos);
  console.log(pos);
  if(pos < 0) break;
  start = pos + search.length;
}

console.log('locations.length ' + locations.length);

for (var i = 0; i < locations.length; i++) {
  var row;
  if(locations[i] == -1) { 
    break;
  } else if(locations[i + 1] == -1) {
    row = data.substr(locations[i]);
  }  else {
    row = data.substr(locations[i], locations[i+1]);
  }
  var cleanedRow = row.replace(/&w=/g,'').replace(/&h=/,'').replace(/<\/a><\/em>/g,'</em></a>');
  console.log(i + '  [[[[[[[[[[cleanedRow]]]]]]]]]]]]]]]');
  //console.log(cleanedRow);
  try {
     parser.parseString(cleanedRow, function (err, result) {
        console.dir(result);
     });   
  }
  catch(err)
    {
    console.log(err);
    //console.log(cleanedRow);
    break;
    }

  /*
  parser.parseString(cleanedRow, function (err, result) {
    console.dir(result);
  });
*/
}

  //console.log(data.length);
  //console.log(pos1);
  //console.log(pos2);
/*
  var options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST'
};

var http = require('http');

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');
req.write('data\n');
req.end();
*/

});

//console.log(squareNumber(5));