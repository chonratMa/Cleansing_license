const cleansing = require('../CleanData/Cleansing_license');
const clc = require('cli-color');
const { License, changelogs_license, license_daily_log, ChangelogOld } = require('../models');
const { connection } = require('../config/config_mysql2');

module.exports = {
    async findVehicle(noteId) {
        return new Promise((resolve, reject) => {
            connection.execute(
                `SELECT id,note_id FROM license WHERE binary note_id = "${noteId}" `,
                (err, result) => {
                    if (err) console.log(err);
                    if (result.length == 0) {
                        resolve(false);
                    } else {
                        resolve(result[0].id);
                    }
                    reject(err);
                }
            );
        });
    },

    // create
    // create
    async createNewLicense(vehicle, cleansingData) {
        try {
            const data = await getCleansing(vehicle, cleansingData);

            const result = await License.create(data.License);
            console.log(clc.green("Create new License success!! :: note_Id: " + vehicle.note_id_t));

            // สร้าง changelogs_license พร้อมกับเช็คข้อผิดพลาด
            data.changelogs_license.license_id = result.id;
            await changelogs_license.create(data.changelogs_license)
                .then(() => {
                    console.log(clc.green("Create Changelogs-license success..."));
                })
                .catch((err) => {
                    console.error(clc.red("Failed to create changelogs_license:"), err);
                    throw new Error("changelogs_license|" + err);
                });

            
            // สร้าง ChangelogOld พร้อมกับเช็คข้อผิดพลาด
            data.Changelog_Old.license_id = result.id;
            await ChangelogOld.create(data.Changelog_Old)
                .then(() => {
                    console.log(clc.green("Create change log success"));
                })
                .catch((err) => {
                    console.error(clc.red("Failed to create ChangelogOld:"), err);
                    throw new Error("ChangelogOld|" + err);
                });

            return result.id;
        } catch (err) {
            console.error(clc.red("Error creating new License:"), err);
            throw err; // ส่งข้อผิดพลาดออกไปเพื่อให้ caller รับทราบ
        }
    },
    // async createNewLicense(vehicle, cleansingData) {
    //     return await getCleansing(vehicle, cleansingData).then(async (data) => {
    //         return await License.create(data.License)
    //             .then(async (result) => {
    //                 // console.log(
    //                 //     clc.green(
    //                 //         "Create new License success!! :: note_Id: " + vehicle.note_id_t
    //                 //     )
    //                 // );

    //                 //// change-log
    //                 data.log.vehicle_id = result.id;
    //                 await changelogs_license.create(data.changelogs_license).then(() => {
    //                     console.log(clc.green("Create Changelogs-license success..."))
    //                 });

    //                 // ChangelogOld
    //                 data.Changelog_Old.vehicle_id = result.id;
    //                 await ChangelogOld.create(data.Changelog_Old).then(() => {
    //                     console.log(clc.green("Create change log success"))
    //                 })

    //                 return result.id;
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 throw "Vehicle|" + err;
    //                 // process.exit(0);
    //             });
    //     })
    //         .catch((err) => {
    //             console.log(err);
    //             throw err; // รีเธิร์นข้อผิดพลาดออกไปเพื่อให้ caller รับทราบ
    //             // process.exit(0);
    //         });
    // },


    // update
    async updateLicense(vehicle, cleansingData, id) {

    },
};

async function getCleansing(vehicle, cleansingData) {
    return await cleansing
        .cleansingData(vehicle, cleansingData)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            throw "function cleansingData|" + err;
        });
}
