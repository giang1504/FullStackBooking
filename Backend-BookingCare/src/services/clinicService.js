import { reject } from "lodash";
import db from "../models/index";
require("dotenv").config();

let createNewClinic = (data) => {
  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.descriptionMarkdown ||
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.address
      ) {
        resovle({
          errCode: 1,
          errMassage: "Missing required parameter",
        });
      } else {
        await db.Clinic.create({
          descriptionMarkdown: data.descriptionMarkdown,
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          address: data.address,
        });
      }
      resovle({
        errCode: 0,
        errMassage: "OK",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getTopClinicHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll({
        limit: limitInput,
        raw: true,
      });
      resolve({
        errCode: 0,
        data: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMassage: "Missing required parameter",
        });
      } else {
        let data = {};
        data = await db.Clinic.findOne({
          where: { id: inputId },
          attributes: [
            "descriptionHTML",
            "descriptionMarkdown",
            "name",
            "address",
          ],
        });
        if (data) {
          let doctorClinic = [];
          doctorClinic = await db.Doctor_Infor.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
          });
          data.doctorClinic = doctorClinic;
        } else data = {};
        resolve({
          errMassage: "ok",
          errCode: 0,
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewClinic: createNewClinic,
  getTopClinicHome: getTopClinicHome,
  getDetailClinicById: getDetailClinicById,
};
