const Sequelize = require("sequelize");
const config_db = require("../config/config_db");
const db = {};

const sequelize = new Sequelize(
  config_db.DB,
  config_db.USER,
  config_db.PASSWORD,
  {
    host: config_db.HOST,
    port: config_db.PORT,
    dialect: config_db.dialect,
    logging: config_db.logging,
    operatorAliases: false,
    pool: {
      max: config_db.pool.max,
      min: config_db.pool.min,
      acquire: config_db.pool.acquire,
      idle: config_db.pool.idle,
    },
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// กำหนดโมเดลต่างๆ
db.License = require("./license")(sequelize, Sequelize);
db.changelogs_license = require("./changelogs_license")(sequelize, Sequelize);
db.License_daily_log = require("./license_daily_log")(sequelize, Sequelize);

// สร้างความสัมพันธ์
db.License.hasMany(db.changelogs_license, { foreignKey: "note_id" });
db.changelogs_license.belongsTo(db.License, { foreignKey: "note_id" });

db.License.hasMany(db.License_daily_log, { foreignKey: "note_id", sourceKey: "note_id" });
db.License_daily_log.belongsTo(db.License, { foreignKey: "note_id", targetKey: "note_id" });

module.exports = db;