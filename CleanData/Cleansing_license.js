const { DATETIME } = require('mysql/lib/protocol/constants/types');
const compare = require('./Compare');
const { getAdjustedTime } = require('./set_time.js');

async function cleansingData(car, cleansingData) {
    // console.log(car);
    // console.log("------- car ------");
    // console.log(car.data);
    // process.exit(0);

    const color = compare.compareColor(car.color_t, cleansingData); // 0
    const provDistrict = compare.compareProvinceAndDistrictandVillage(
        car.province_t,
        car.district_t,
        car.village_t,
        cleansingData
    ); // 1
    const steering = compare.compareValue(
        car.driverseat_t,
        cleansingData.steering
    ); // 2
    const gas = compare.compareValue(car.energy_t, cleansingData.energy); // 3
    const brandModel = compare.compareBrandAndModel(
        car.make_t,
        car.model_t,
        cleansingData
    ); // 4
    const engine_brand = compare.compareEngineBrand(
        car.motor_make_t,
        cleansingData
    ); // 5
    const commercePermitDate = cutData(25, await checkNull(car.commerce_permit_date_t)); // 6
    const expireDate = compare.checkDate(car.expire_date_t, true); // 7
    const importPermitDate = cutData(25, await checkNull(car.import_permit_date_t)); // 8
    const industrialDocDate = cutData(25, await checkNull(car.industrial_doc_date_t)); // 9
    const issueDate = compare.checkDate(car.issue_date_t); // 10
    // 
    const policeDocDate = cutData(25, await checkNull(car.police_doc_date_t)); // 11
    const purpose = compare.compareValue(car.purpose_t, cleansingData.purpose); // 12
    const specialDate = compare.checkDate(car.special_date_t); // 13
    const taxDate = cutData(25, await checkNull(car.tax_date_t)); // 14
    const taxPaymentDate = cutData(25, await checkNull(car.tax_payment_date_t)); // 15
    const technicalDocDate = cutData(25, await checkNull(car.technical_doc_date_t)); // 16
    const dateTimeUpdate = compare.checkDate(car.update_time.toString()); // 17
    const vehicleType = compare.compareValue(
        car.vehicletype_t,
        cleansingData.vehicletype
    ); // 18
    const cancel_date = compare.checkDate(car.cancel_date_t); // 19
    const cancel_transport_date = compare.checkDate(car.cancel_transport_date_t); // 20
    const lost_date = compare.checkDate(car.lost_date_t); // 21
    const lost_date_custom = compare.checkDate(car.lost_date_custom_t); // 22
    let time_t = null;
    if (car.update_time_t != null) {
        time_t = car.update_time_t;
    }
    // 
    // Set val by.Tonoiy
    // let xxx_data = null;
    let xx = null;
    //////////////////////////////////////////////////
    //////////////// Return-Function ////////////////
    /////////////////////////////////////////////////
    return Promise.all([
        color,
        provDistrict,
        steering,
        gas,
        brandModel,
        engine_brand,
        commercePermitDate,
        expireDate,
        importPermitDate,
        industrialDocDate,
        issueDate,
        policeDocDate,
        purpose,
        specialDate,
        taxDate,
        taxPaymentDate,
        technicalDocDate,
        dateTimeUpdate,
        vehicleType,
        cancel_date,
        cancel_transport_date,
        lost_date,
        lost_date_custom
    ])
        .then(async (result) => {
            return {
                License: {
                    note_id: cutData(50, await checkNull(car.note_id_t)),
                    birth_village: cutData(100, await checkNull(car.birth_village_t)),
                    birth_district: cutData(50, await checkNull(car.birth_district_t)),
                    birth_province: cutData(50, await checkNull(car.birth_province_t)),
                    cat: cutData(50, await checkNull(car.cat_t)),
                    dateofbirth: cutData(50, await checkNull(car.dateofbirth_t)),
                    district: cutData(50, await checkNull(car.district_t)),
                    division_no: cutData(20, await checkNull(car.division_no_t)),
                    editedby: cutData(50, await checkNull(car.editedby_t)),

                    entry_date: await getValueByName(car.data, 'entry_dateZQ'),
                    encoder: await getValueByName(car.data, 'encoderZQ'),
                    examdates: cutData(150, await checkNull(car.examdates_t)),
                    examdate_A: cutData(50, await checkNull(car.examdate_A_t)),
                    examdate_A1: await getValueByName(car.data, 'examdate_A1ZQ'),
                    examdate_A2: await getValueByName(car.data, 'examdate_A2ZQ'),
                    examdate_B: cutData(50, await checkNull(car.examdate_B_t)),
                    examdate_C: cutData(50, await checkNull(car.examdate_C_t)),
                    examdate_D: await getValueByName(car.data, 'examdate_DZQ'),
                    examdate_D1: xx,

                    examdate_E: await getValueByName(car.data, 'examdate_EZQ'),
                    examplace_A: await getValueByName(car.data, 'examplace_AZQ'),
                    examplace_A1: await getValueByName(car.data, 'examplace_A1ZQ'),
                    examplace_A2: xx,
                    examplace_B: cutData(50, await checkNull(car.examplace_B_t)),
                    examplace_C: cutData(50, await checkNull(car.examplace_C_t)),
                    examplace_D: await getValueByName(car.data, 'examplace_DZQ'),
                    examplace_D1: xx,
                    examplace_E: await getValueByName(car.data, 'examplace_EZQ'),
                    exam_A: await getValueByName(car.data, 'exam_AZQ'),

                    exam_A1: await getValueByName(car.data, 'exam_A1ZQ'),
                    exam_A2: await getValueByName(car.data, 'exam_A2ZQ'),
                    exam_B: await getValueByName(car.data, 'exam_BZQ'),
                    exam_C: await getValueByName(car.data, 'exam_CZQ'),
                    exam_D: await getValueByName(car.data, 'exam_DZQ'),
                    exam_D1: await getValueByName(car.data, 'exam_D1ZQ'),
                    exam_E: await getValueByName(car.data, 'exam_EZQ'),
                    examnumber: cutData(50, await checkNull(car.examnumber_t)),
                    examtype: cutData(50, await checkNull(car.examtypes_t)),
                    expire_date: cutData(50, await checkNull(car.expire_date_t)),

                    id_t: cutData(50, await checkNull(car.id_t)),
                    in1: xx,
                    issue_date: cutData(25, await formatDataYYYYMMDD(result[10])),
                    issue_place:cutData(100, await checkNull(car.issue_place_t)),
                    license_A: cutData(50, await checkNull(car.license_A_t)),
                    license_A1: xx,
                    license_A2: xx,
                    license_B: cutData(50, await checkNull(car.license_B_t)),
                    license_C: cutData(50, await checkNull(car.license_C_t)),
                    license_D: xx,

                    license_D1: xx,
                    license_E: xx,
                    license_place_A: cutData(50, await checkNull(car.license_place_A_t)),
                    license_place_A1: xx,
                    license_place_A2: xx,
                    license_place_B: cutData(50, await checkNull(car.license_place_B_t)),
                    license_place_C: cutData(50, await checkNull(car.license_place_C_t)),
                    license_place_D: await getValueByName(car.data, 'license_place_DZQ'),
                    license_place_D1: xx,
                    license_place_E: xx,

                    license_no: cutData(50, await checkNull(car.license_no_t)),
                    log: await replaceSingleQuotes(await checkNull(car.log_t)),
                    mistakeby: await getValueByName(car.data, 'mistakebyZQ'),
                    modify_date: cutData(50, await checkNull(car.modify_date)),
                    name: cutData(50, await checkNull(car.name_t)),
                    name_inter:cutData(50, await checkNull(car.name_inter_t)),
                    nationality_lao: cutData(50, await checkNull(car.nationality_lao_t)),
                    nationality_inter: cutData(50, await checkNull(car.nationality_inter_t)),
                    number: cutData(50, await checkNull(car.number_t)),
                    occupation: cutData(50, await checkNull(car.occupation_t)),

                    object_id: cutData(50, await checkNull(car.object_id_t)),
                    office: await getValueByName(car.data, 'officeZQ'),
                    others: await getValueByName(car.data, 'othersZQ'),
                    owner: cutData(50, await checkNull(car.owner_t)),
                    parent_id: cutData(50, await checkNull(car.parent_id_t)),
                    photofileno: xx,
                    photo: cutData(50, await checkNull(car.photo_t)),
                    phone: await getValueByName(car.data, 'phoneZQ'),
                    print_count: cutData(50, await checkNull(car.print_count_t)),
                    printlog: cutData(50, await checkNull(car.printlog_t)),

                    province: cutData(50, await checkNull(car.province_t)),
                    province_abbr: cutData(50, await checkNull(car.province_abbr_t)),
                    province_no: cutData(50, await checkNull(car.province_no_t)),
                    remark: cutData(50, await checkNull(car.remark_t)),
                    remark1: cutData(50, await checkNull(car.remark1_t)),
                    result_A: xx,
                    result_A1: xx,
                    result_A2: xx,
                    result_B: xx,
                    result_C: xx,

                    result_D: xx,
                    result_D1: xx,
                    result_E: xx,
                    root: cutData(50, await checkNull(car.root_t)),
                    school_A: await getValueByName(car.data, 'school_AZQ'),
                    school_A1: await getValueByName(car.data, 'school_A1ZQ'),
                    school_A2: await getValueByName(car.data, 'school_A2ZQ'),
                    school_B: await getValueByName(car.data, 'school_BZQ'),
                    school_C: await getValueByName(car.data, 'school_CZQ'),
                    school_D: await getValueByName(car.data, 'school_DZQ'),

                    school_D1: xx,
                    school_E: await getValueByName(car.data, 'school_EZQ'),
                    train_at: cutData(50, await checkNull(car.train_at_t)),
                    type: cutData(50, await checkNull(car.type_t)),
                    update_time: cutData(50, await checkNull(car.update_time)),
                    village: cutData(50, await checkNull(car.village_t)),
                    withdrawer: cutData(50, await checkNull(car.withdrawer_t)),
                    version: cutData(50, await checkNull(car._ver_t)),
                    access: cutData(50, await checkNull(car.access_t)),
                    collection: xx,
                    
                    counted: cutData(50, await checkNull(car.counted_t)),
                    deleted: cutData(50, await checkNull(car.deleted_t)),
                    policenote:  xx,
                    data_code: xx,
                    date_report: xx,
                    department: xx,
                    employee_number: xx,
                    eye_color: xx,
                    fine9: xx,
                    finedate: xx,

                    finelocation: xx,
                    finelog: xx,
                    made_out: xx,
                    olddata: xx,
                    paper: xx,
                    province_code: cutData(50, await checkNull(car.province_code_t)),
                    releasedate: xx,
                    resolution: xx,
                    row: xx,
                    save: xx,

                    work_phone: xx,
                    flag: xx,
                    created_at: getAdjustedTime().currentTime,
                    updated_at: getAdjustedTime().currentTime
                },
                changelogs_license: {
                    date: xx,
                    time: xx,
                    note_id: cutData(50, await checkNull(car.note_id_t)),
                    user: cutData(50, await checkNull(car.print_user_1_t)),
                    item: xx,
                    old_data: xx,
                    new_data: xx,
                    add_date: xx,
                    add_emp: xx,
                    created_at: getAdjustedTime().currentTime,
                    updated_at: getAdjustedTime().currentTime
                },
                Changelog_Old: {
                    license_id: 0,
                    note_id: cutData(50, await checkNull(car.note_id_t)),
                    log_activity: await replaceSingleQuotes(await checkNull(car.changelog_t)),
                    created_at: getAdjustedTime().currentTime,
                    updated_at: getAdjustedTime().currentTime
                }
            }
        })
        .catch((err) => {
            console.error(err);
            process.exit(0);
        });
    // ### End ###
}


//////////////////////////////////////////////////
//////////////////// Function ////////////////////
//////////////////////////////////////////////////
// async function getValueByName(data, name) {
//     console.log('--- getValueByName ---')
//     const regex = new RegExp(`${name}\\s*=\\s*([^\\n]+)`, 'i'); // สร้าง regex สำหรับหา entry_dateZQ
//     const match = data.match(regex); // ค้นหาด้วย regex
//     console.log(match)

//     if (match && match[1]) {
//         console.log('match=> ', match[1].trim())
//         return match[1].trim(); // ตัดช่องว่างออกแล้วคืนค่าที่หาเจอ
//     } else {
//         console.log('match==> null')
//         return null; // ถ้าไม่พบให้คืนค่า null
//     }
// }
async function getValueByName(data, name) {
    console.log('--- getValueByName ---');
    const regex = new RegExp(`${name}\\s+([^\\n]+)`, 'i'); // ปรับ RegEx ให้รองรับช่องว่าง
    const match = data.match(regex); // ค้นหาด้วย regex
    console.log('match:', match);

    if (match && match[1]) {
        console.log('match=>', match[1].trim());
        return match[1].trim(); // ตัดช่องว่างออกแล้วคืนค่าที่หาเจอ
    } else {
        console.log('match==> null');
        return null; // ถ้าไม่พบให้คืนค่า null
    }
}

async function checkNull(value) {
    return value == "" || value == undefined ? null : value;
}

function cutData(number, item) {
    let val = "";
    if (item != null && item != "") {
        val = item.toString().trim().substr(0, number)
    } else {
        val = null;
    }
    return val;
}

async function formatDataYYYYMMDD(issueDate) {
    if (!issueDate) {
        return null; // ส่งค่า null กลับเมื่อไม่มีข้อมูลหรือข้อมูลไม่ถูกต้อง
    }

    const formattedDate = issueDate.split(' ')[0]; // ตัดเฉพาะส่วนของวันที่ออกมา
    return formattedDate;
}

async function replaceSingleQuotes(log_activity) {
    if (log_activity === null) {
        return null;
    }
    return log_activity.replace(/'/g, "");
}

module.exports = {
    cleansingData,
}