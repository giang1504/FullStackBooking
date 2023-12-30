import db from "../models/index";
require("dotenv").config();
import _, { reject } from "lodash";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
  // Khi truyền doctorId nó đã có sẵn nên không cần thời gian chờ await
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;

  return result;
};
let patientBookAppoinment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.date ||
        !data.doctorId ||
        !data.timeType ||
        !data.fullName ||
        !data.selectedGenders ||
        !data.address ||
        !data.phoneNumber
      ) {
        resolve({
          errCode: 1,
          errMassage: "Missing required parameter",
        });
      } else {
        let token = uuidv4();
        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            gender: data.selectedGenders,
            address: data.address,
            firstName: data.fullName,
            phonenumber: data.phoneNumber,
          },
        });
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              patientId: user[0].id,
              statusId: "S1",
              doctorId: data.doctorId,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }
      }
      resolve({
        errCode: 0,
        message: "Save Infor patient Successed",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let postVerifyBookAppoinment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMassage: "Missing required parameter",
        });
      } else {
        let appoinment = await db.Booking.findOne({
          where: { doctorId: data.doctorId, token: data.token, statusId: "S1" },
          raw: false,
        });
        console.log(appoinment);
        if (appoinment) {
          appoinment.statusId = "S2";
          await appoinment.save();
          resolve({
            errCode: 0,
            errMassage: "Update the appoinment succeed",
          });
        } else {
          resolve({
            errCode: 2,
            errMassage:
              "Appointment schedule has been activated or does not exist",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  patientBookAppoinment: patientBookAppoinment,
  postVerifyBookAppoinment: postVerifyBookAppoinment,
};
