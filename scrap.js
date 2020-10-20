'use strict';

var rp = require('request-promise');
const express = require('express')
const app = express()
const port = 3000

var rootCas = require('ssl-root-cas/latest').create();

rootCas
    .addFile(__dirname + '/ssl/01-cheap-ssl-intermediary-a.pem')
    .addFile(__dirname + '/ssl/02-cheap-ssl-intermediary-b.pem')
    ;

// will work with all https requests will all libraries (i.e. request.js)
require('https').globalAgent.options.ca = rootCas;

app.get('/', (req, res) => {
    x = test()
    res.send('Hello World!' + x)
})

function test() {
    var options = {
        uri: 'https://commerce-app.gov.in/eidb/',
    };

    rp(options)
        .then(function (response) {
            console.log(response + " ok")
        })
        .catch(function (err) {
            console.log(err + " no")
        });
}

app.listen(3000, () => console.log(`Example app listening at http://localhost:${3000}`))