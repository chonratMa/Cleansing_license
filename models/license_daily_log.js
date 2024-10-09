module.exports = (sequelize, DataTypes) => {
    const license_daily_log = sequelize.define('license_daily_log', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        license_id: {
            type: DataTypes.STRING(25),
            allowNull: true,
        },
        note_id: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        step: { type: DataTypes.TEXT, defaultValue: null },
        error_message: { type: DataTypes.TEXT, defaultValue: null },
        status: { type: DataTypes.INTEGER(1), defaultValue: 0 },
        // created_at: { type: DataTypes.STRING(25), defaultValue: null },
        // updated_at: { type: DataTypes.STRING(25), defaultValue: null },
        created_at: { type: DataTypes.DATE, defaultValue: null },
        updated_at: { type: DataTypes.DATE, defaultValue: null },
    },
    {
        timestamps: false,
        tableName: 'license_daily_log', // Correct table name here
    });

    license_daily_log.associate = (models) => {
        license_daily_log.belongsTo(models.License, {
            foreignKey: 'note_id',
            targetKey: 'note_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            allowNull: true, // กรณีไม่มี note_id ก็ยังสามารถเก็บข้อมูลได้
        });
    };
    return license_daily_log
}