const { DATETIME } = require('mysql/lib/protocol/constants/types');
const compare = require('./Compare');
const { getAdjustedTime } = require('./set_time.js');

async function cleansingData(car, cleansingData) {
    // console.log(car);
    // console.log("------- car ------");
    // console.log(cleansingData);
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
                    changelog: await replaceSingleQuotes(await checkNull(car.changelog_t)),
                    dateofbirth: cutData(50, await checkNull(car.dateofbirth_t)),
                    district: cutData(50, await checkNull(car.district_t)),
                    division_no: cutData(20, await checkNull(car.division_no_t)),
                    editedby: cutData(50, await checkNull(car.editedby_t)),

                    entry_date: xxx.data,
                    encoder: xxx.data,
                    examdates: cutData(150, await checkNull(car.examdates_t)),
                    examdate_A: cutData(50, await checkNull(car.examdate_A_t)),
                    examdate_A1: xxx.data,
                    examdate_A2: xxx.data,
                    examdate_B: cutData(50, await checkNull(car.examdate_B_t)),
                    examdate_C: cutData(50, await checkNull(car.examdate_C_t)),
                    examdate_D: xxx.data,
                    examdate_D1: xx,

                    examdate_E: xxx.data,
                    examplace_A: xxx.data,
                    examplace_A1: xxx.data,
                    examplace_A2: xx,
                    examplace_B: xxx.data,
                    examplace_C: xxx.data,
                    examplace_D: xxx.data,
                    examplace_D1: xx,
                    examplace_E: xxx.data,
                    exam_A: xxx.data,

                    exam_A1: xxx.data,
                    exam_A2: xxx.data,
                    exam_B: xxx.data,
                    exam_C: xxx.data,
                    exam_D: xxx.data,
                    exam_D1: xxx.data,
                    exam_E: xxx.data,
                    examnumber: xxx.data,
                    examtype: cutData(50, await checkNull(car.examtypes_t)),
                    expire_date: cutData(50, await checkNull(car.expire_date_t)),

                    id_t: cutData(50, await checkNull(car.id_t)),
                    in1: xx,
                    issue_date: cutData(25, await formatDataYYYYMMDD(result[10])),
                    issue_place:cutData(100, await checkNull(car.issue_place_t)),
                    license_A: xxx.data,
                    license_A1: xx,
                    license_A2: xx,
                    license_B: xxx.data,
                    license_C: xxx.data,
                    license_D: xx,

                    license_D1: xx,
                    license_E: xx,
                    license_place_A: xxx.data,
                    license_place_A1: xx,
                    license_place_A2: xx,
                    license_place_B: xxx.data,
                    license_place_C: xxx.data,
                    license_place_D: xxx.data,
                    license_place_D1: xx,
                    license_place_E: xx,

                    license_no: cutData(50, await checkNull(car.license_no_t)),
                    log: await replaceSingleQuotes(await checkNull(car.log_t)),
                    mistakeby: xxx.data,
                    modify_date: cutData(50, await checkNull(car.modify_date)),
                    name: cutData(50, await checkNull(car.name_t)),
                    name_inter:xxx.data,
                    nationality_lao: cutData(50, await checkNull(car.nationality_lao_t)),
                    nationality_inter: cutData(50, await checkNull(car.nationality_inter_t)),
                    number: xxx.data,
                    occupation: cutData(50, await checkNull(car.occupation_t)),

                    object_id: cutData(50, await checkNull(car.object_id_t)),
                    office: xxx.data,
                    others: xxx.data,
                    owner: cutData(50, await checkNull(car.owner_t)),
                    parent_id: cutData(50, await checkNull(car.parent_id_t)),
                    photofileno: xxx.data,
                    photo: cutData(50, await checkNull(car.photo_t)),
                    phone: xxx.data,
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
                    result_B: xxx.data,
                    result_C: xxx.data,

                    result_D: xx,
                    result_D1: xx,
                    result_E: xx,
                    root: cutData(50, await checkNull(car.root_t)),
                    school_A: xxx.data,
                    school_A1: xxx.data,
                    school_A2: xxx.data,
                    school_B: xxx.data,
                    school_C: xxx.data,
                    school_D: xxx.data,

                    school_D1: xx,
                    school_E: xxx.data,
                    train_at: xxx.data,
                    type: cutData(50, await checkNull(car.type_t)),
                    update_time: cutData(50, await checkNull(car.update_time)),
                    village: cutData(50, await checkNull(car.village_t)),
                    withdrawer: xxx.data,
                    version: cutData(50, await checkNull(car._ver_t)),
                    access: cutData(50, await checkNull(car.access_t)),
                    collection: xx,
                    // 
                    // 
                    counted: DataTypes.CHAR(10),
                    deleted: DataTypes.CHAR(5),
                    policenote: DataTypes.TEXT,
                    data_code: cutData(50, await checkNull(car.birth_province_t)),
                    date_report: DataTypes.STRING(20),

                    department: DataTypes.STRING(5),
                    employee_number: DataTypes.STRING(50),
                    eye_color: DataTypes.STRING(20),
                    fine9: DataTypes.STRING(5),
                    finedate: DataTypes.STRING(20),

                    finelocation: cutData(50, await checkNull(car.birth_province_t)),
                    finelog: DataTypes.TEXT,
                    made_out: DataTypes.STRING(50),
                    olddata: DataTypes.STRING(50),
                    paper: DataTypes.STRING(5),

                    province_code: DataTypes.STRING(5),
                    releasedate: DataTypes.STRING(50),
                    resolution: cutData(50, await checkNull(car.birth_province_t)),
                    row: cutData(50, await checkNull(car.birth_province_t)),
                    save: DataTypes.STRING(20),

                    work_phone: cutData(50, await checkNull(car.birth_province_t)),
                    flag: DataTypes.INTEGER,
                    created_at: getAdjustedTime().currentTime,
                    updated_at: getAdjustedTime().currentTime
                },
                changelogs_license: {
                    date: xx,
                    time: xx,
                    note_id: xx,
                    user: xx,
                    item: xx,
                    old_data: xx,
                    new_data: xx,
                    add_date: xx,
                    add_emp: xxx,
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
async function checkNaN(value) {
    return isNaN(parseInt(value)) ? null : parseInt(value);
}

async function checkNull(value) {
    return value == "" || value == undefined ? null : value;
}
async function checkNull_and_typeIng(data) {
    if (data !== null && data !== undefined && data !== "") {
        const intValue = parseInt(data);
        return isNaN(intValue) ? null : intValue;
    } else {
        return null;
    }
}

async function checkNull_tax_receipt(value) {
    // ตรวจสอบค่าที่เป็น 0
    if (typeof value === 'undefined' || (typeof value === 'string' && value !== '1')) {
        return 0;
    }
    // ตรวจสอบค่าที่เป็น 1
    if ((typeof value === 'string' && value === '1') || typeof value === 'number') {
        return 1;
    }
}

async function checkId(id, value) {
    return id == undefined || id == null ? null : value;
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
function formatDateString_inTyprDate(dateString) {
    if (dateString === "" || dateString === undefined || dateString === null) {
        return null;
    }

    // ลบเครื่องหมาย / ที่ซ้ำกัน
    dateString = dateString.replace(/\/\//g, '/');
    const dateFormats = [
        /\d{2}\/\d{2}\/\d{4}/, // DD/MM/YYYY
        /\d{2}-\d{2}-\d{4}/,     // DD-MM-YYYY
        /\d{4}\/\d{2}\/\d{2}/,   // YYYY/MM/DD
        /\d{4}-\d{2}-\d{2}/      // YYYY-MM-DD
    ];
    for (const format of dateFormats) {
        if (format.test(dateString)) {
            // แปลงรูปแบบวันที่เป็น "YYYY-MM-DD"
            const formattedDate = dateString.replace(/(\d{2})[\/-](\d{2})[\/-](\d{4})/, '$3-$2-$1');

            // เช็คว่า formattedDate 
            if (/^\d{4}-\d{2}-\d{2}$/.test(formattedDate)) {
                return formattedDate;
            }
        }
    }
    return null;
}
function checkData_province(number_province_t, car_province_t) {
    if (number_province_t === '01') {
        let text_card_province_old = 0;
        if (car_province_t.length > 12) {
            text_card_province_old = 0;
        } else {
            text_card_province_old = 1;
        }
        return text_card_province_old;
    } else {
        return 0;
    }
}

function checkTechnicalStatus(technicalcheck_t) {
    if (technicalcheck_t === "" || technicalcheck_t === undefined || technicalcheck_t === null) {
        return "none";
    } else if (technicalcheck_t === "ຜ່ານ") {
        return "pass";
    } else if (technicalcheck_t === "ບໍ່ຜ່ານ") {
        return "not_pass";
    } else {
        return "none";
    }
}

async function formatDataYYYYMMDD(issueDate) {
    if (!issueDate) {
        return null; // ส่งค่า null กลับเมื่อไม่มีข้อมูลหรือข้อมูลไม่ถูกต้อง
    }

    const formattedDate = issueDate.split(' ')[0]; // ตัดเฉพาะส่วนของวันที่ออกมา
    return formattedDate;
}

async function convertDate_print_log_datetime(dateString) {
    // กำหนดรูปแบบของวันที่ด้วย Regular Expression
    const dateFormats = [
        /\d{2}\/\d{2}\/\d{4}/,   // DD/MM/YYYY
        /\d{2}-\d{2}-\d{4}/,     // DD-MM-YYYY
        /\d{4}\/\d{2}\/\d{2}/,   // YYYY/MM/DD
        /\d{4}-\d{2}-\d{2}/      // YYYY-MM-DD
    ];
    // เช็คว่ารูปแบบของวันที่ตรงกับที่กำหนดหรือไม่
    const isValidFormat = dateFormats.some(format => format.test(dateString));
    // ถ้ารูปแบบไม่ถูกต้องให้โยนข้อผิดพลาด
    if (!isValidFormat) {
        return null;
    }

    // แยกวันที่ออกมาจากสตริง
    let datePart = dateString.split(' ')[0]; // เอาแค่ส่วนของวันที่
    // แยกปี เดือน วัน ออกจากกัน
    const [day, month, year] = datePart.split(/[-\/]/); // แยกปี เดือน วัน
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    return formattedDate;
}

async function replaceSingleQuotes(log_activity) {
    if (log_activity === null) {
        return null;
    }
    return log_activity.replace(/'/g, "");
}

async function checkAndGenerateQuickId(license_no_t, result12, province) {
    // Function to check for null or undefined values
    function checkNull(value) {
        return value !== null && value !== undefined ? value : null;
    }

    // Function to cut the data to a specified length
    function cutData(length, data) {
        return data ? data.substring(0, length) : '';
    }

    // Check if any of the three inputs are null or undefined
    const checkedLicenseNo = checkNull(license_no_t);
    const checkedResult12 = checkNull(result12);
    const checkedProvince = checkNull(province);

    if (checkedLicenseNo && checkedResult12 && checkedProvince) {
        // Remove whitespace from the license number
        const processedLicenseNo = cutData(20, checkedLicenseNo).replace(/\s/g, '');
        const processedResult12 = cutData(5, checkedResult12);
        const processedProvince = cutData(10, checkedProvince);

        // Concatenate the processed values
        return processedLicenseNo + processedResult12 + processedProvince;
    } else {
        // Return null if any value is missing
        return null;
    }
}
module.exports = {
    cleansingData,
}