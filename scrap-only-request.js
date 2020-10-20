//limitation is mining year wise - if latest data year is odd it will be ignored

require("https").globalAgent.options.ca = require("ssl-root-cas/latest").create();
const express = require("express");
const app = express();
const fd = require("./modules/new_scrap");
("use strict");

const tabletojson = require("tabletojson").Tabletojson;

app.get("/", async (req, res) => {
  fd.fetchCountryWise(1997);

  // fd.fetchCountry(1997);
  //   fd.fetchCCnw(1997);
  // fd.fetchCommodity(1997);
  // test((response, body) => {
  //     // if (!fs.existsSync(dir)) {
  //     //     fs.mkdirSync(dir);
  //     // }
  //     // fs.writeFileSync("./data/111.csv", (tableToCsv('<table>' + fetchData(body) + '</table>')))
  //     // console.log("a" + tableToCsv('<table>' + fetchData(body) + '</table>'))
  //     // console.log(response.body)
  //     res.send(body)
  // })
  res.send();
});

app.get("/ss", (req, res) => {
  tabletojson.convertUrl(
    "https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes",
    { ignoreColumns: [0], useFirstColumnForHeadings: true },
    function (tablesAsJson) {
      res.send(tablesAsJson[1]);
    }
  );
});

app.listen(3000, () =>
  console.log(`Example app listening at http://localhost:${3000}`)
);
