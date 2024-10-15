const express = require("express");
const app = express();
const port = process.env.PORT || 3100;
const clc = require('cli-color');
const { Import_jsondata } = require('./config/config_json');
const { readExcel } = require('./config/readfile');
const { sequelize } = require("./models");
const License = require('./controller/License');


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
// readdir_jsondata();  //// รันลำดับที่สอง ////

async function readdir_jsondata() {
    const fs = require('fs').promises;
    const path = require('path');
    const folderPath = 'C:/files_license';
    //// เปลี่ยนเส้นทางไปยังโฟลเดอร์ต้นทาง

    let firstFileName = null;
    try {
        const files = await fs.readdir(folderPath);

        let fileCount = 0;
        // console.log("time:  ", getAdjustedTime().currentTime)
        // console.log('-------- fileCount:', fileCount, '--------');

        for (let file of files) {

            let filePath = path.join(folderPath, file);
            let stat = await fs.stat(filePath);

            firstFileName = file; //Get ชื่อไฟล์

            if (firstFileName) {
                console.log('-------- First filename found:', firstFileName, '--------');
                //// สั่งทำงาน
                await countFilesInFolder(fs, path, firstFileName, folderPath);
            } else {
                console.log('There are no files in the folder.');
            }
            // 
        }


        process.exit(0); //ออกจากต่างๆ
        // ...
    } catch (err) {
        console.error('Error:', err);
    }

}
// 
async function done_firstFileName(fs, path, firstFileName, folderPath) {
    console.log('--status: done--');

    const destinationFolderPath = 'C:/done_files_license';
    //// เปลี่ยนเส้นทางไปยังโฟลเดอร์ปลายทาง
    const fileNameToMove = firstFileName; // ชื่อไฟล์ที่ต้องการย้าย
    const sourceFilePath = path.join(folderPath, fileNameToMove);
    const destinationFilePath = path.join(destinationFolderPath, fileNameToMove);

    fs.rename(sourceFilePath, destinationFilePath, (err) => {
        if (err) {
            console.error('error moved File:', err);
        } else {
            console.log('####File moved successfully.###');
        }
    });
    // 
}
async function countFilesInFolder(fs, path, firstFileName, folderPath) {
    const text_run_number = firstFileName;
    const filePath = path.join(folderPath, text_run_number);

    const data = await fs.readFile(filePath, 'utf8');
    const dataJson = JSON.parse(data);


    // สั่ง insert โดย await StarPM
    console.log(clc.blue(" ทำงานโดย ==>> StarPM "));
    await StarPM(dataJson);

    // สั่งย้ายโฟรเดอร์
    await done_firstFileName(fs, path, firstFileName, folderPath);

    console.log('### END ###');

}

async function StarPM(dataJson) {
    let json = await Import_jsondata(dataJson);
    let excel = await readExcel();
    // เริ่มจับเวลา
    const startTime = Date.now();

    console.log(clc.red("Data have:", json.length, "records."));

    if (json.length != 0) {
        let num = 0;
        // for (let i = 38100; i < json.length && i < 38500; i++) {
        for (let i = 0; i < json.length; i++) {
            let now_Date_created = formatDateString(new Date());
            const vehicle = json[i];
            let vehicle_Id = 0;

            console.log(clc.red(" for ~"));
            // console.log(excel);
            // console.log(vehicle);

            try {
                vehicle_Id = await License.createNewLicense(vehicle, excel);
                console.log('Success create vehicle_Id:  ', vehicle_Id);
            
            } catch (err) {
                // console.error('Error:  ', err.message || err);
                // ตัด Error message ด้วย | และนำไปใช้ใน parameterized query
                const originalText = err.message || err;
                const [text1, text2] = originalText.split('|');
                let tableName_in = 'license_daily_log';
                let dataToInsert_in = {
                    license_id: '',
                    note_id: vehicle.note_id_t,
                    step: text1,
                    error_message: text2.replace(/'/g, ''),
                    status: 0,
                    created_at: now_Date_created,
                    updated_at: now_Date_created
                };

                await insertDataIntoDatabase(tableName_in, dataToInsert_in);
            }


            console.log(clc.blue(`---------------------------------------------------------- Counts: ${++num}`));

        }
        console.log("End: count:" + json.length);

        // // คำสั่งเสร็จสมบูรณ์ และแสดงเวลาที่ใช้
        const endTime = Date.now();
        const executionTime = endTime - startTime;
        const executionTimeInMinutes = executionTime / 60000; // 1 นาที = 60,000 มิลลิวินาที
        console.log('Order completed on time..:', executionTimeInMinutes + ' Minutes');
        // process.exit(0);
    }
}
