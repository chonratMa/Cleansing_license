module.exports = (sequelize, DataTypes) => {
    const License = sequelize.define(
        "license",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            note_id: {
                type: DataTypes.STRING(50),
                unique: true
            },
            birth_village: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            birth_district: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            birth_province: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            cat: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            dateofbirth:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            district: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            division_no: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            editedby: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            entry_date: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            encoder:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            examdates: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            examdate_A: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            examdate_A1: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            examdate_A2: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            examdate_B: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            examdate_C: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            examdate_D: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            examdate_D1: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            examdate_E: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            examplace_A: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            examplace_A1: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            examplace_A2: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            examplace_B: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            examplace_C: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            examplace_D: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            examplace_D1: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            examplace_E: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            exam_A: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            exam_A1: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            exam_A2: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            exam_B: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            exam_C: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            exam_D: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            exam_D1: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            exam_E: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            examnumber: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            examtype: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            expire_date: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            id_t: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
            in1: {
                type: DataTypes.CHAR(3),
                allowNull: true,
            },
            issue_date: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            issue_place: {
                type: DataTypes.STRING(40),
                allowNull: true,
            },
            license_A: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            license_A1: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            license_A2: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            license_B: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            license_C: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            license_D: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            license_D1: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            license_E: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            license_place_A: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            license_place_A1: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            license_place_A2: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            license_place_B: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            license_place_C: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            license_place_D: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            license_place_D1: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            license_place_E: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            license_no: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            log: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            mistakeby: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            modify_date: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            name_inter: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            nationality_lao: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            nationality_inter: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            number:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            occupation: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            object_id: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            office:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            others:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            owner: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            parent_id: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            photofileno: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            photo: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            phone: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            print_count: {
                type: DataTypes.CHAR(2),
                allowNull: true,
            },
            printlog: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            province: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            province_abbr: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            province_no: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            remark: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            remark1: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            result_A:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            result_A1:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            result_A2:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            result_B:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            result_C:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            result_D:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            result_D1:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            result_E:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            root:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            school_A:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            school_A1:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            school_A2:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            school_B:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            school_C:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            school_D:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            school_D1:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            school_E:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            train_at:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            type: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            update_time: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            village:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            withdrawer: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            version: {
                type: DataTypes.CHAR(3),
                allowNull: true,
            },
            access: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            collection:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            counted: {
                type: DataTypes.CHAR(10),
                allowNull: true,
            },
            deleted: {
                type: DataTypes.CHAR(5),
                allowNull: true,
            },
            policenote: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            data_code: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            date_report: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            department: {
                type: DataTypes.STRING(5),
                allowNull: true,
            },
            employee_number:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            eye_color: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            fine9: {
                type: DataTypes.STRING(5),
                allowNull: true,
            },
            finedate: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            finelocation: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            finelog: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            made_out:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            olddata:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            paper: {
                type: DataTypes.STRING(5),
                allowNull: true,
            },
            province_code: {
                type: DataTypes.STRING(5),
                allowNull: true,
            },
            releasedate:{
                type: DataTypes.TEXT,
                allowNull: true,
            },
            resolution: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            row: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            save: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },
            work_phone: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            flag: DataTypes.INTEGER,
            created_at: { type: DataTypes.DATE, defaultValue: null },
            updated_at: { type: DataTypes.DATE, defaultValue: null },
        },
        {
            timestamps: false,
            tableName: 'license',
            engine: 'InnoDB',   // ใช้ InnoDB
            charset: 'utf8',  // กำหนด charset
            collate: 'utf8_unicode_ci',
            rowFormat: 'DYNAMIC',  // ปรับ row format เป็น DYNAMIC
        }
    );
    return License;
};
