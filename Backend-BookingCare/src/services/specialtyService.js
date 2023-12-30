import { reject } from "lodash";
import db from "../models/index";
require("dotenv").config();

let createNewSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.descriptionMarkdown ||
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML
      ) {
        resolve({
          errCode: 1,
          errMassage: "Missing required parameter",
        });
      } else {
        await db.Specialty.create({
          descriptionMarkdown: data.descriptionMarkdown,
          name: data.name,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
        });
      }
      resolve({
        data,
        errCode: 0,
        message: "Create Specialty Successed",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getTopSpecialtyHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({
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
let getDetailSpecialtyById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMassage: "Missing required parameter",
        });
      } else {
        let data = {};
        data = await db.Specialty.findOne({
          where: { id: inputId },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
        });
        if (data) {
          let doctorSpecialty = [];
          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId },
              attributes: ["doctorId", "provinceId"],
            });
          } else
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: {
                specialtyId: inputId,
                provinceId: location,
              },
              attributes: ["doctorId", "provinceId"],
            });
          data.doctorSpecialty = doctorSpecialty;
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
  createNewSpecialty: createNewSpecialty,
  getTopSpecialtyHome: getTopSpecialtyHome,
  getDetailSpecialtyById: getDetailSpecialtyById,
};
