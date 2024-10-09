const express = require("express");
const app = express();
const port = process.env.PORT || 3100;
const clc = require('cli-color');
const { Import_jsondata } = require('./config/config_json');
const { readExcel } = require('./config/readfile');
const { sequelize } = require("./models");


//  findVihicle_Info();
async function findVihicle_Info() {
    await Vehicles.Vehicle_Info().then(result => {
        console.log(result);
    })
}
function formatDateString(updated_at) {
    var data1 = new Date(updated_at);

    var year = data1.getFullYear();
    var month = ('0' + (data1.getMonth() + 1)).slice(-2); // เพิ่ม 1 เพราะเดือนเริ่มที่ 0
    var day = ('0' + data1.getDate()).slice(-2);
    var hours = ('0' + data1.getHours()).slice(-2);
    var minutes = ('0' + data1.getMinutes()).slice(-2);
    var seconds = ('0' + data1.getSeconds()).slice(-2);

    // สร้างรูปแบบใหม่
    var formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

    return formattedDate;
}

////////// รันลำดับที่หนึ่ง ด้วยคำสั่ง "node index.js"
////////// สร้างตารางให้กับก้อน-DB:: license_daily
sequelize.sync({ force: true }).then(() => {
    app.listen(port, () => {
        console.log(`Server Running ${(port)}`);
    });
});



////////// run Cleansing
