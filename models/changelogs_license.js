module.exports = (sequelize, DataTypes) => {
    const changelogs_license = sequelize.define(
        "changelogs_license", // ชื่อโมเดลเป็นพิมพ์เล็ก
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            date: {
                type: DataTypes.CHAR(8),
                allowNull: false,
                defaultValue: ' ',
            },
            time: {
                type: DataTypes.CHAR(6),
                allowNull: false,
                defaultValue: ' ',
            },
            note_id: {
                type: DataTypes.STRING(50),
                allowNull: false,
                defaultValue: ' ',
                references: {
                    model: 'license',
                    key: 'note_id', 
                }
            },
            user: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: ' ',
            },
            item: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: ' ',
            },
            old_data: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: ' ',
            },
            new_data: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: ' ',
            },
            add_date: {
                type: DataTypes.CHAR(8),
                allowNull: false,
                defaultValue: ' ',
            },
            add_emp: {
                type: DataTypes.STRING(25),
                allowNull: false,
                defaultValue: ' ',
            },
            created_at: { type: DataTypes.DATE, defaultValue: null },
            updated_at: { type: DataTypes.DATE, defaultValue: null },
        },
        {
            timestamps: false,
            tableName: 'changelogs_license',
        }
    );

    // กำหนดการเชื่อมโยง FK กับตาราง license
    changelogs_license.associate = (models) => {
        changelogs_license.belongsTo(models.license, {
            foreignKey: 'note_id',
            targetKey: 'note_id'
        });
    };

    return changelogs_license;
};
