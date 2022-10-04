const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Builder, Browser, By, until } = require('selenium-webdriver');

var template = require('./template.js');

const app = express();

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'client/build/index.html'));
})

app.post('/processing_timetable', async function (req, res) {
    var post = req.body;
    var urls = post.urls;
    var htmlbody;

    // console.log("최종 비는 시간");
    console.log(await template.chooseEntireEmpty(template.sumTimeTables(await template.exportEntireTimeTables(urls))));
    // console.log(await template.sumTimeTables(await template.exportEntireTimeTables(urls)));

    // htmlbody = "pageSource";
    res.send({ result: await template.chooseEntireEmpty(template.sumTimeTables(await template.exportEntireTimeTables(urls))) });

})

app.listen(8080, function () {
    console.log('listening on 8080');
})