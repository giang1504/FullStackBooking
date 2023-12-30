import clinicService from "../services/clinicService";

let createNewClinic = async (req, res) => {
  try {
    let infor = await clinicService.createNewClinic(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMassege: "Error from Server",
    });
  }
};
let getTopClinicHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let infor = await clinicService.getTopClinicHome(+limit);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Erorr From Server",
    });
  }
};
let getDetailClinicById = async (req, res) => {
  try {
    let infor = await clinicService.getDetailClinicById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Erorr From Server",
    });
  }
};

module.exports = {
  createNewClinic: createNewClinic,
  getTopClinicHome: getTopClinicHome,
  getDetailClinicById: getDetailClinicById,
};
