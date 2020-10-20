var DataFrame = require("pandas-js").DataFrame;
var fs = require("fs");
var parse = require("csv-parse");

dfArray = [];

// var converter = csv()
//   .fromFile("./data/country/1997/Dollar.csv")
//   .then((json) => {
//     dfArray.push(json);
//   })
//   .then(() => {
//     csv()
//       .fromFile("./data/country/1999/Dollar.csv")
//       .then((json) => {
//         dfArray.push(json);
//       })
//       .then(async () => {
//         const df1 = new DataFrame(dfArray[0]);
//         const df2 = new DataFrame(dfArray[1]);
//         console.log(df1.append(df2).to_csv());
//       });
//   });

fs.readFile("./data/country/1997/Dollar.csv", function (err, fileData) {
  parse(fileData, { columns: false, trim: true }, function (err, rows) {
    // console.log(rows);
  });
});

function csvJSON(csv) {
  var lines = csv.split("\n");

  var result = [];

  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  //return result; //JavaScript object
  return JSON.stringify(result);
} //JSON
