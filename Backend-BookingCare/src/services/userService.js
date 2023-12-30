import { raw } from "body-parser";
import db from "../models/index";
import bcrypt from "bcrypt";
var salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      // Đã check Email tồn tại sẽ trả true
      let isExit = await checkUserEmail(email);
      if (isExit) {
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
          ],
          // where: {database : inputEmail}
          where: { email: email },
          raw: true,
        });
        //    if(user) khi accout bị xóa nó sẽ hiển thị không tồn tại
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong Password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `user not found`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's email exits in your system`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};
//  userEmail truyền từ data xuống
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllUsers = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      if (id === "ALL") {
        user = await db.User.findAll({
          //attributes Có thêm exclude thì nó sẽ bỏ trường đó đi
          attributes: { exclude: ["password"] },
        });
      }
      // Dùng else id input không tồn tại, nên phải dùng 2 if để lấy giá trị
      if (id && id !== "ALL") {
        user = await db.User.findOne({
          where: { id: id },
          attributes: { exclude: ["password"] },
        });
      }
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};
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

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Email của bạn đã được sử dụng.",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          // database: inputData
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.avatar,
        });
      }

      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let foundUser = await db.User.findOne({
      where: { id: userId },
    });
    if (!foundUser) {
      resolve({
        errcode: 2,
        errMessage: `User isn't exitst`,
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      message: ` The user is deleted`,
    });
  });
};

let upDateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // gender,roleId,positionId check nếu không tồn tại, rỗng thì trả về lỗi 2
      if (!data.id || !data.gender || !data.roleId || !data.positionId) {
        resolve({
          errCode: 2,
          message: "Missing required parameterssssss",
        });
      }

      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        // Nếu id trùng thì lấy ra dữ liệu
        // database = req.body (input)
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phonenumber = data.phonenumber;
        user.gender = data.gender;
        user.roleId = data.roleId;
        user.positionId = data.positionId;
        // Nếu có avatar thì hàm mới được chạy ảnh ở data sẽ hiển thị ở image inputData react
        if (data.avatar) {
          user.image = data.avatar;
        }

        await user.save();

        // await db.User.save({
        //     firstName: data.firstName,
        //     lastName: data.lastName,
        //     address: data.address,
        // })
        resolve({
          errCode: 0,
          message: "Update the user succsed",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "user not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllcodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeInput) {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      } else {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  upDateUserData: upDateUserData,
  getAllcodeService: getAllcodeService,
};
