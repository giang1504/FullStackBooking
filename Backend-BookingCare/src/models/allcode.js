"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here(Xác định liên kết ở đây)
      // 1 all code có thể dùng cho nhiều người quan hệ 1 nhiều, 1 admin có thể có nhiều người
      Allcode.hasMany(models.User, {
        foreignKey: "positionId",
        as: "positionData",
      });

      Allcode.hasMany(models.User, { foreignKey: "gender", as: "genderData" });

      Allcode.hasMany(models.Schedule, {
        foreignKey: "timeType",
        as: "timeTypeData",
      });

      Allcode.hasMany(models.Doctor_Infor, {
        foreignKey: "priceId",
        as: "priceIdData",
      });
      Allcode.hasMany(models.Doctor_Infor, {
        foreignKey: "provinceId",
        as: "provinceIdData",
      });
      Allcode.hasMany(models.Doctor_Infor, {
        foreignKey: "paymentId",
        as: "paymentIdData",
      });
      Allcode.hasMany(models.Booking, {
        foreignKey: "timeType",
        as: "timeTypeDataPatient",
      });
    }
  }
  Allcode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      value_en: DataTypes.STRING,
      value_vn: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
