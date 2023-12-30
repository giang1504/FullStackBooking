import patientService from "../services/patientService";


let postPatientBookAppoinment = async (req, res) =>{
    try {
        let infor = await patientService.patientBookAppoinment(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).jsonm({
            errCode: -1,
            errMessage: "Error From Server"
        })
    }
}

let postVerifyBookAppoinment = async (req, res) =>{
    try {
        let infor = await patientService.postVerifyBookAppoinment(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).jsonm({
            errCode: -1,
            errMessage: "Error From Server"
        })
    }
}

module.exports={
    postPatientBookAppoinment: postPatientBookAppoinment,
    postVerifyBookAppoinment:postVerifyBookAppoinment

}