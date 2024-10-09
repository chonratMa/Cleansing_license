const connection = require('../config/connection_8t.js');


// ฟังก์ชันสำหรับแทรกข้อมูลลงในฐานข้อมูล
async function insertDataIntoDatabase(tableName, dataToInsert) {
    // สร้างคำสั่ง SQL INSERT
    const sqlInsert = `INSERT INTO ${tableName} (${Object.keys(dataToInsert).join(', ')}) VALUES (${Object.values(dataToInsert).map(value => typeof value === 'string' ? `'${value}'` : value).join(', ')})`;

    await new Promise((resolve, reject) => {
        connection.query(sqlInsert, (error, results, fields) => {
            if (error) {
                console.error('Error inserting data:', error);
                reject(error);
            } else {
                console.log('Data inserted successfully');
                resolve();
            }
        });
    });


    // ในกรณีทดสอบ คุณอาจต้องแสดงคำสั่ง SQL ที่สร้างไว้ก่อน
    console.log('SQL Insert Command:', sqlInsert);
}


module.exports = { insertDataIntoDatabase }