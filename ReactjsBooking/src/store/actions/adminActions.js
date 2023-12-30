import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHome,
  getAllDoctors,
  createInforDoctor,
  getTopSpecialtyHome,
  getTopClinicHome,
} from "../../services/userService";
import { toast } from "react-toastify";

// Chuẩn redux action
// start doing end
// Cách viết 1
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });

      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart error", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  database: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

// Positon
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionFailed error", e);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  database: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

// Role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleFailed error", e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  database: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

// Create Data
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("CREATE A NEW SUCCESS");
        dispatch(createUserSuccess());
        // reset và trả về các giá trị bằng rỗng sau khi tạo thành công
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(createUserFailed());
        alert(res.errMessage);
      }
    } catch (e) {
      dispatch(createUserFailed());
      console.log("createUserFailed error", e);
    }
  };
};

export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

// GetAllUser
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      dispatch(fetchAllUsersFailed());
      console.log("fetchAllUsersFailed error", e);
    }
  };
};
export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_USER_ALL_SUCCESS,
  // data lấy từ api của ALL
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_USER_ALL_FAILED,
});

// delete users
export const fetchDeleteUsersStart = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("DELETE A NEW SUCCESS");
        dispatch(fetchDeleteUsersSuccess());
        // Cập nhật lại trang thái sau khi xóa 1 user
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(fetchDeleteUsersFailed());
      }
    } catch (e) {
      dispatch(fetchDeleteUsersFailed());
      console.log("fetchDeleteUsersFailed error", e);
    }
  };
};
export const fetchDeleteUsersSuccess = (data) => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const fetchDeleteUsersFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

// Edit users
export const fetchEditUsersStart = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      console.log("cheuch", res);
      if (res && res.errCode === 0) {
        toast.success("EDIT A USER SUCCESS");
        dispatch(fetchEditUsersSuccess());
        // Cập nhật lại trang thái sau khi edit 1 user
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(fetchDeleteUsersFailed());
      }
    } catch (e) {
      dispatch(fetchEditUsersFailed());
      console.log("fetchEditUsersFailed error", e);
    }
  };
};
export const fetchEditUsersSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const fetchEditUsersFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});
// get Doctors homepage
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHome("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_TOP_DOCTORS_FAILED", e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};

// get doctor
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_DOCTORS_FAILED", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};

// POST INFOR DOCTOR
export const createInforDoctorAction = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createInforDoctor(data);
      if (res && res.errCode === 0) {
        toast.success("CREATE INFOR SUCCESS");
        dispatch({
          type: actionTypes.CREATE_INFOR_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("CREATE INFOR ERROR");
        dispatch({
          type: actionTypes.CREATE_INFOR_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      console.log("CREATE_INFOR_DOCTOR_FAILED", e);
      toast.error("CREATE INFOR ERROR");
      dispatch({
        type: actionTypes.CREATE_INFOR_DOCTOR_FAILED,
      });
    }
  };
};
// All Time Chedule
export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS,
          time: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_SCHEDULE_TIME_FAILED", e);
      dispatch({
        type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

export const fetchRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getTopSpecialtyHome("");
      let resClinic = await getTopClinicHome("");
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch({
          type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
          dataRequired: data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_REQUIRED_DOCTOR_INFOR_FAILED", e);
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
      });
    }
  };
};
