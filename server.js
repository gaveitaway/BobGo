const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Builder, Browser, By, until } = require('selenium-webdriver');


const app = express();

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'client/build/index.html'));
})

async function exportTimeTable(driver, url) {
    var colsIndex = 0;
    var hIndex = 0;
    var tIndex = 0;
    var gridIndex = 0;

    var temp = 0;

    var height = 0;
    var top = 0;

    var cols_array = [];
    var girds_array = [];
    var height_array = [];
    var top_array = [];
    var height_index_array = [];
    var top_index_array = [];

    await driver.get(url);
    const pageSource = await driver.wait(until.elementLocated(By.css('body')), 1000).getAttribute('innerHTML');

    // 구역에 따라 요일 나눠주기.

    // className 이 cols와 grids 인 tag의 index 구해서 array에 저장
    while (1) {
        colsIndex = pageSource.indexOf("class=\"cols\"", (colsIndex + 1));
        if (colsIndex == -1) break;
        cols_array.push(colsIndex);
        gridIndex = pageSource.indexOf("class=\"grids\"", (colsIndex + 1));
        girds_array.push(gridIndex);
    }
    // 'height:' 인 index 찾고, value도 저장
    while (1) {
        hIndex = pageSource.indexOf("height:", (hIndex + 1));
        if (hIndex == -1) break;
        height_index_array.push(hIndex);
        if (hIndex < cols_array[0]) continue;
        else {
            temp = pageSource.indexOf(';', (hIndex + 1));
            height = pageSource.slice(hIndex + 7, temp - 2);
            height_array.push(height);
            // console.log(height);
        }
    }
    // 'top:' 인 index 찾고, value도 저장
    while (1) {
        tIndex = pageSource.indexOf("top:", (tIndex + 1));
        if (tIndex == -1) break;
        top_index_array.push(tIndex);
        if (tIndex < cols_array[0]) continue;
        else {
            temp = pageSource.indexOf(';', (tIndex + 1));
            top = pageSource.slice(tIndex + 4, temp - 2);
            top_array.push(top);
            // console.log(top);
        }
    }

    // console.log(cols_array);
    // console.log(girds_array);
    // console.log(height_index_array);
    // console.log(top_index_array);

    for (var i = 1; i < height_index_array.length; i++) {
        if ((height_index_array[i] > cols_array[0]) && (height_index_array[i] < girds_array[0])) {
            console.log("Mon");
        }
        else if ((height_index_array[i] > cols_array[1]) && (height_index_array[i] < girds_array[1])) {
            console.log("Tues");
        }
        else if ((height_index_array[i] > cols_array[2]) && (height_index_array[i] < girds_array[2])) {
            console.log("Wed");
        }
        else if ((height_index_array[i] > cols_array[3]) && (height_index_array[i] < girds_array[3])) {
            console.log("Thu");
        }
        else if ((height_index_array[i] > cols_array[4]) && (height_index_array[i] < girds_array[4])) {
            console.log("Fri");
        }
        console.log(height_array[i - 1], top_array[i - 1]);
    }

    for (var i = 1; i < height_index_array.length; i++) {
        if ((height_index_array[i] > cols_array[0]) && (height_index_array[i] < girds_array[0])) {
            console.log("Mon");
        }
        else if ((height_index_array[i] > cols_array[1]) && (height_index_array[i] < girds_array[1])) {
            console.log("Tues");
        }
        else if ((height_index_array[i] > cols_array[2]) && (height_index_array[i] < girds_array[2])) {
            console.log("Wed");
        }
        else if ((height_index_array[i] > cols_array[3]) && (height_index_array[i] < girds_array[3])) {
            console.log("Thu");
        }
        else if ((height_index_array[i] > cols_array[4]) && (height_index_array[i] < girds_array[4])) {
            console.log("Fri");
        }
        
        console.log(height_array[i - 1], top_array[i - 1]);
   
        // 
        if ( top_array[i-1] == 425 ){
            console.log("1교시 X")
        }
        else if ( top_array[i-1] == 575){
            console.log("3교시 X")
        }
        else if ( top_array[i-1] == 650 ){
            console.log("4교시 X")
        }
        else if ( top_array[i-1] == 800 ){
            console.log("6교시 X")
        }
        else if ( top_array[i-1] == 950 ){
            console.log("8교시 X")
        }
        console.log("----------------");
    }
}

app.post('/processing_timetable', async function (req, res) {
    var post = req.body;
    var urls = post.urls;
    var htmlbody;

    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {

        for (var i = 0; i < urls.length; i++) {
            // console.log(urls[i]);
            console.log(i + 1, "Person");
            await exportTimeTable(driver, urls[i])
        }
        htmlbody = "pageSource";
        res.send({ result: htmlbody });
    } finally {
        await driver.quit();
    }

})

app.listen(8080, function () {
    console.log('listening on 8080');
})
