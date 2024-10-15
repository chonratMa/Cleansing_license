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

    // update
    async updateLicense(vehicle, cleansingData, id) {
        try {
            const data = await getCleansing(vehicle, cleansingData);

            const vhl = await License.findByPk(id);
            const result = await vhl.update(data.License);
            console.log(clc.green("Update License success!! :: note_Id: " + vehicle.note_id_t));

            /////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////
            // สร้าง changelogs_license พร้อมกับเช็คข้อผิดพลาด
            data.changelogs_license.license_id = result.id;
            let license_note_id = result.note_id;
            const old = await changelogs_license.findOne({ where: { note_id: license_note_id } });
            await old.update(data.changelogs_license)
                .then(() => {
                    console.log(clc.green("Update Changelogs-license success..."));
                })
                .catch((err) => {
                    console.error(clc.red("Failed to Update changelogs_license:"), err);
                    throw new Error("changelogs_license|" + err);
                });

            /////////////////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////////////////
            // สร้าง ChangelogOld พร้อมกับเช็คข้อผิดพลาด
            data.Changelog_Old.license_id = result.id;
            const logOld = await ChangelogOld.findOne({ where: { license_id: id } });
            await logOld.update(data.Changelog_Old)
                .then(() => {
                    console.log(clc.green("Update change log success"));
                })
                .catch((err) => {
                    console.error(clc.red("Failed to Update ChangelogOld:"), err);
                    throw new Error("ChangelogOld|" + err);
                });

            return result.id;
        } catch (err) {
            console.error(clc.red("Error creating new License:"), err);
            throw err; // ส่งข้อผิดพลาดออกไปเพื่อให้ caller รับทราบ
        }
    }
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
