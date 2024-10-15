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
                allowNull: true,  // อนุญาตให้เป็น null
                defaultValue: null,  // ค่าเริ่มต้นเป็น null
            },
            time: {
                type: DataTypes.CHAR(6),
                allowNull: true,  
                defaultValue: null,  
            },
            note_id: {
                type: DataTypes.STRING(50),
                allowNull: true,  
                defaultValue: null,  
                references: {
                    model: 'license',
                    key: 'note_id', 
                }
            },
            user: {
                type: DataTypes.STRING(255),
                allowNull: true,  
                defaultValue: null,  
            },
            item: {
                type: DataTypes.STRING(255),
                allowNull: true,  
                defaultValue: null,  
            },
            old_data: {
                type: DataTypes.STRING(255),
                allowNull: true,  
                defaultValue: null,  
            },
            new_data: {
                type: DataTypes.STRING(255),
                allowNull: true,  
                defaultValue: null,  
            },
            add_date: {
                type: DataTypes.CHAR(8),
                allowNull: true,  
                defaultValue: null,  
            },
            add_emp: {
                type: DataTypes.STRING(25),
                allowNull: true,  
                defaultValue: null,  
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
