// const fs = require("fs");
// const request = require("request");
// const htmlparser2 = require("htmlparser2");
// const cheerio = require("cheerio");
// const rp = require("request-promise");
// const tableToCsv = require("node-table-to-csv");
// const { callbackify } = require("util");

// function fetchTable(incoming) {
//   const dom = htmlparser2.parseDOM(incoming);
//   const $ = cheerio.load(dom);
//   let dataTable = "";
//   $("body")
//     .find("table")
//     .each((i, e) => {
//       dataTable = dataTable + cheerio.html(e);
//     });
//   return dataTable;
// }

// exports.fetchCommodity = async (year) => {
//   const units = {
//     radioval: "Rupee",
//     radioDAll: "Dollar",
//     radioqty: "Quantity",
//   };
//   while (year <= 2019) {
//     if (!fs.existsSync("./data/commodity/")) {
//       fs.mkdirSync("./data/commodity/");
//     }
//     if (!fs.existsSync("./data/commodity/" + year)) {
//       fs.mkdirSync("./data/commodity/" + year);
//     }
//     for (var unit in units) {
//       await new Promise((resolve) => {
//         request(
//           {
//             rejectUnauthorized: false,
//             uri: "https://commerce-app.gov.in/eidb/ecom.asp",
//             method: "POST",
//             headers: {
//               Host: "commerce-app.gov.in",
//               Connection: "keep-alive",
//               "Cache-Control": "max-age=0",
//               "Upgrade-Insecure-Requests": "1",
//               Origin: "https//commerce-app.gov.in",
//               "Content-Type": "application/x-www-form-urlencoded",
//               "User-Agent":
//                 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
//               Accept:
//                 "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//               "Sec-Fetch-Site": "same-origin",
//               "Sec-Fetch-Mode": "navigate",
//               "Sec-Fetch-User": "?1",
//               "Sec-Fetch-Dest": "document",
//               Referer: "http://commerce-app.gov.in/eidb/ecomq.asp",
//               "Accept-Encoding": "gzip, deflate, br",
//               "Accept-Language": "en-US,en;q=0.9",
//               Cookie: "ASPSESSIONIDAWSSSRQC=NLLFKAEDDNJCILPGMEDDCLDI",
//             },
//             form: {
//               // Like <input type="text" name="name">
//               yy1: year,
//               hscode: "",
//               radio2: 1,
//               hslevel: 2,
//               sort: 0,
//               radioDAll: 1,
//               [unit]: 1,
//             },
//           },
//           function (error, response, body) {
//             fs.writeFileSync(
//               "./data/commodity/" + year + "/" + units[unit] + ".csv",
//               tableToCsv("<table>" + fetchTable(body) + "</table>")
//             );
//             resolve();
//           }
//         );
//       });
//     }
//     year += 2;
//   }
// };

// //fetch top 10 commodities country wise
// exports.fetchCCnw = async (year) => {
//   const hscodes = {
//     27: "MINERAL FUELS, MINERAL OILS AND PRODUCTS OF THEIR DISTILLATION; BITUMINOUS SUBSTANCES; MINERAL WAXES",
//     // 71: "NATURAL OR CULTURED PEARLS,PRECIOUS OR SEMIPRECIOUS STONES,PRE.METALS,CLAD WITH PRE.METAL AND ARTCLS THEREOF;IMIT.JEWLRY;COIN",
//     // 84: "NUCLEAR REACTORS, BOILERS, MACHINERY AND MECHANICAL APPLIANCES; PARTS THEREOF",
//     // 29: "ORGANIC CHEMICALS",
//     // 87: "VEHICLES OTHER THAN RAILWAY OR TRAMWAY ROLLING STOCK, AND PARTS AND ACCESSORIES THEREOF",
//     // 30: "PHARMACEUTICAL PRODUCTS",
//     // 85: "ELECTRICAL MACHINERY AND EQUIPMENT AND PARTS THEREOF; SOUND RECORDERS AND REPRODUCERS, TELEVISION IMAGE AND SOUND RECORDERS AND REPRODUCERS,AND PARTS",
//     // 72: "IRON AND STEEL",
//     // 62: "ARTICLES OF APPAREL AND CLOTHING ACCESSORIES, NOT KNITTED OR CROCHETED",
//     // 10: "CERALS",
//   };
//   while (year <= 1999) {
//     if (!fs.existsSync("./data/commodityCountryWise/")) {
//       fs.mkdirSync("./data/commodityCountryWise/");
//     }
//     if (!fs.existsSync("./data/commodityCountryWise/" + year)) {
//       fs.mkdirSync("./data/commodityCountryWise/" + year);
//     }
//     for (var hscode in hscodes) {
//       await new Promise((resolve) => {
//         request(
//           {
//             rejectUnauthorized: false,
//             uri: "https://commerce-app.gov.in/eidb/ecomcnt.asp",
//             method: "POST",
//             headers: {
//               Host: "commerce-app.gov.in",
//               Connection: "keep-alive",
//               "Cache-Control": "max-age=0",
//               "Upgrade-Insecure-Requests": "1",
//               Origin: "https//commerce-app.gov.in",
//               "Content-Type": "application/x-www-form-urlencoded",
//               "User-Agent":
//                 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
//               Accept:
//                 "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//               "Sec-Fetch-Site": "same-origin",
//               "Sec-Fetch-Mode": "navigate",
//               "Sec-Fetch-User": "?1",
//               "Sec-Fetch-Dest": "document",
//               Referer: "http://commerce-app.gov.in/eidb/ecomcntq.asp",
//               "Accept-Encoding": "gzip, deflate, br",
//               "Accept-Language": "en-US,en;q=0.9",
//               Cookie: "ASPSESSIONIDAWSSSRQC=NLLFKAEDDNJCILPGMEDDCLDI",
//             },
//             form: {
//               // Like <input type="text" name="name">
//               yy1: year,
//               hscode: "27",
//               sort: 2,
//               radioval: 1,
//             },
//           },
//           function (error, response, body) {
//             // console.log(body);
//             fs.writeFileSync(
//               "./data/commodityCountryWise/" +
//                 year +
//                 "/" +
//                 hscodes[hscode] +
//                 ".csv",
//               tableToCsv("<table>" + fetchTable(body) + "</table>")
//             );
//             // console.log(fetchTable(body));
//             // fs.writeFileSync(
//             //   "aaa.txt",
//             //   "<table>" + fetchTable(body) + "</table>"
//             // );
//             resolve();
//           }
//         );
//       });
//     }
//     year += 2;
//   }
// };

// exports.fetchCountry = async (year) => {
//   const units = {
//     radioval: "Rupee",
//     radiousd: "Dollar",
//   };
//   while (year <= 2019) {
//     if (!fs.existsSync("./data/country/")) {
//       fs.mkdirSync("./data/country/");
//     }
//     if (!fs.existsSync("./data/country/" + year)) {
//       fs.mkdirSync("./data/country/" + year);
//     }
//     for (var unit in units) {
//       await new Promise((resolve) => {
//         request(
//           {
//             rejectUnauthorized: false,
//             uri: "https://commerce-app.gov.in/eidb/ecnt.asp",
//             method: "POST",
//             headers: {
//               Host: "commerce-app.gov.in",
//               Connection: "keep-alive",
//               "Cache-Control": "max-age=0",
//               "Upgrade-Insecure-Requests": "1",
//               Origin: "https//commerce-app.gov.in",
//               "Content-Type": "application/x-www-form-urlencoded",
//               "User-Agent":
//                 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
//               Accept:
//                 "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//               "Sec-Fetch-Site": "same-origin",
//               "Sec-Fetch-Mode": "navigate",
//               "Sec-Fetch-User": "?1",
//               "Sec-Fetch-Dest": "document",
//               Referer: "http://commerce-app.gov.in/eidb/ecntq.asp",
//               "Accept-Encoding": "gzip, deflate, br",
//               "Accept-Language": "en-US,en;q=0.9",
//               Cookie: "ASPSESSIONIDAWSSSRQC=NLLFKAEDDNJCILPGMEDDCLDI",
//             },
//             form: {
//               // Like <input type="text" name="name">
//               yy1: year,
//               cntcode: "",
//               sort: 2,
//               [unit]: 1,
//             },
//           },
//           function (error, response, body) {
//             fs.writeFileSync(
//               "./data/country/" + year + "/" + units[unit] + ".csv",
//               tableToCsv("<table>" + fetchTable(body) + "</table>")
//             );
//             resolve();
//           }
//         );
//       });
//     }
//     year += 2;
//   }
// };
