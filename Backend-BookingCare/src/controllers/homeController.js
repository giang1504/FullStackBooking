import { render } from "ejs";
import db from "../models/index";
import CRUDService from "../services/CRUDService";

// Render dữ liệu User lên Homepage
let getHomePage = async (req, res) => {
    try {
        // Gọi data và lấy tất cả dữ liệu trong users mà user đã được gọi từ trước
        // modelName= User
        // db đã được gọi ở bên index
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            // Lấy dữ liệu dưới dạn string
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }    
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
// /post-crud
let postCrud = async (req, res,next) => { 
    try {
        let message = await CRUDService.createNewUser(req.body);
        // console.log(message);
        // res.send('post crud from')
        return res.redirect('/get-crud');

    } catch (e) {
        console.log(e);
    }

}
// /get-crud
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    // console.log(data);
    // console.log('-----------------');
    return res.render('displayCRUD', {
        dataTable: data 
    });
}
// /edit-crud
let getEditCRUD = async (req, res) => {
    // query params
    let userId = req.query.id;
    // Dùng if else để kiểm tra đã truyền đúng URL Id hay chưa
    if(userId){
        // userData bây giờ nó đã tìm tất cả các dữ liệu của User, Cho user sử dụng dữ liệu bên trong userData
        let userData = await CRUDService.getUserInfoById(userId);
        res.render('editCRUD',{
            // x <- y userData gắn lại cho user
            user: userData
        })
    } else{
        res.send('Users not found!');
    }
}
// /get-crud
let putCRUD = async (req, res) => {
    let data = req.body;
   let allUser =  await CRUDService.upDateUserData(data);
   return res.render('displayCRUD', {
    dataTable: allUser 
});
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if(userId){
        await CRUDService.deleteUserById(userId);
        return res.send('Delete the user Succeed');
    }
    else{
        return res.send('No Delete the user');
    }
}


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCrud: postCrud,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,


}
