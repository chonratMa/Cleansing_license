module.exports = (sequelize, DataTypes) => {
    const ChangelogOld = sequelize.define('changelog_old', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        license_id: {
            type: DataTypes.BIGINT,
            allowNull: false, // ไม่ควรเป็น null เพราะต้องผูกกับ license.id
        },
        note_id: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        log_activity: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        // created_at: {
        //     type: DataTypes.DATE,
        //     defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        // },
        // updated_at: {
        //     type: DataTypes.DATE,
        //     defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        // },
        created_at: { type: DataTypes.DATE, defaultValue: null },
        updated_at: { type: DataTypes.DATE, defaultValue: null },
    }, {
        timestamps: false, // ปิดการสร้าง timestamps อัตโนมัติ
        tableName: 'changelog_old', // ชื่อของตารางในฐานข้อมูล
    });

    // ความสัมพันธ์ระหว่าง ChangelogOld กับ License
    ChangelogOld.associate = (models) => {
        ChangelogOld.belongsTo(models.license, {
            foreignKey: 'license_id',
            targetKey: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    };

    return ChangelogOld;
};
