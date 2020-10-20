const fs = require("fs");
const request = require("request");
const htmlparser2 = require("htmlparser2");
const cheerio = require("cheerio");
const rp = require("request-promise");
const tableToCsv = require("node-table-to-csv");
const { callbackify } = require("util");

function fetchTable(incoming) {
  const dom = htmlparser2.parseDOM(incoming);
  const $ = cheerio.load(dom);
  let dataTable = "";
  $("body")
    .find("table")
    .each((i, e) => {
      dataTable = dataTable + cheerio.html(e);
    });
  return dataTable;
}

exports.fetchCountryWise = async (year) => {
  const units = {
    radioval: "Rupee",
    radiousd: "Dollar",
  };
  while (year <= 2019) {
    if (!fs.existsSync("./data/countrywise/")) {
      fs.mkdirSync("./data/countrywise/");
    }
    if (!fs.existsSync("./data/countrywise/" + year)) {
      fs.mkdirSync("./data/countrywise/" + year);
    }
    for (var unit in units) {
      await new Promise((resolve) => {
        request(
          {
            rejectUnauthorized: false,
            uri: "https://commerce-app.gov.in/eidb/iecnttopn.asp",
            method: "POST",
            headers: {
              Host: "commerce-app.gov.in",
              Connection: "keep-alive",
              "Cache-Control": "max-age=0",
              "Upgrade-Insecure-Requests": "1",
              Origin: "https//commerce-app.gov.in",
              "Content-Type": "application/x-www-form-urlencoded",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
              Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
              "Sec-Fetch-Site": "same-origin",
              "Sec-Fetch-Mode": "navigate",
              "Sec-Fetch-User": "?1",
              "Sec-Fetch-Dest": "document",
              Referer: "https://commerce-app.gov.in/eidb/iecnttopnq.asp",
              "Accept-Encoding": "gzip, deflate, br",
              "Accept-Language": "en-US,en;q=0.9",
              Cookie: "ASPSESSIONIDAWSSSRQC=NLLFKAEDDNJCILPGMEDDCLDI",
            },
            form: {
              // Like <input type="text" name="name">
              yy1: year,
              topn: 300,
              [unit]: 1,
            },
          },
          function (error, response, body) {
            fs.writeFileSync(
              "./data/countrywise/" + year + "/" + units[unit] + ".csv",
              tableToCsv("<table>" + fetchTable(body) + "</table>")
            );
            resolve();
          }
        );
      });
    }
    year += 1;
  }
};
