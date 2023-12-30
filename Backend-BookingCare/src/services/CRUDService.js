import bcrypt from "bcrypt";
import db from "../models/index";
import { where } from "sequelize";
var salt = bcrypt.genSaltSync(10);

//  // Tạo bảng database
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phonenumber: data.phonenumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
        positionId: data.positionId,
      });
      resolve("Oke create database succeed");
    } catch (e) {
      reject(e);
    }
  });
};
// Sử dụng bcrypt để mã hóa password
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};
// Hiển thị người dùng lên form
let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        // raw: true nó trả kết quả của database, k có ngoài lề các thứ khác
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });

      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};

let upDateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Mongoose sẽ có cách khởi tạo có sẵn id
      // sequelize mình sẽ khởi tạo 1 bên Html biến id rồi truyền cho hàm where
      // where: {database: data.name}
      // data: Được truyền từ dữ liệu qua hàm req.body, còn name là trở đến name ta đặt trong html
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();

        // Khi lưu xong dữ liệu nó sẽ trả về tất cả dữ liệu trên database
        let allUser = await db.User.findAll();
        resolve(allUser);
      } else {
        resolve();
      }
    } catch (e) {
      console.log(e);
    }
  });
};

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        // userId trong input gắn lại cho id trong database
        // TypeError: user.destroy is not a function (Đặt true thành fasle)
        where: { id: userId },
        raw: false,
      });

      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  upDateUserData: upDateUserData,
  deleteUserById: deleteUserById,
};
