import specialtyService from "../services/specialtyService";

let createNewSpecialty = async (req, res) => {
  try {
    let infor = await specialtyService.createNewSpecialty(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Erorr From Server",
    });
  }
};

let getTopSpecialtyHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let infor = await specialtyService.getTopSpecialtyHome(+limit);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Erorr From Server",
    });
  }
};
let getDetailSpecialtyById = async (req, res) => {
  try {
    let infor = await specialtyService.getDetailSpecialtyById(
      req.query.id,
      req.query.location
    );
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
  createNewSpecialty: createNewSpecialty,
  getTopSpecialtyHome: getTopSpecialtyHome,
  getDetailSpecialtyById: getDetailSpecialtyById,
};
