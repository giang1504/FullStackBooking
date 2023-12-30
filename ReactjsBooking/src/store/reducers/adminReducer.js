import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  role: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  allMarkdown: [],
  allScheduleTime: [],
  allRequiredData: []
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      // console.log('FETCH_GENDER_START',action);
      return {
        ...state,
        isLoadingGender: true,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      return {
        ...state,
        genders: action.database,
        isLoadingGender: false,
      };

    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
        isLoadingGender: false, 
        genders: [],
      };

    // position
    case actionTypes.FETCH_POSITION_START:
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      return {
        ...state,
        positions: action.database,
      };

    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
        positions: [],
      };

    // Role

    case actionTypes.FETCH_ROLE_SUCCESS:
      return {
        ...state,
        role: action.database,
      };

    case actionTypes.FETCH_ROLE_FAILED:
      return {
        ...state,
        role: [],
      };

    // GetAllUSers

    case actionTypes.FETCH_USER_ALL_SUCCESS:
      return {
        ...state,
        // action.users(users được gắn bên adminaction) Nó truyền từ bên api sang,
        users: action.users,
      };
    case actionTypes.FETCH_USER_ALL_FAILED:
      return {
        ...state,
        users: [],
      };

    // GetDoctor HomePage

    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      return {
        ...state,
        // action.users(users được gắn bên adminaction) Nó truyền từ bên api sang,
        topDoctors: action.dataDoctors,
      };
    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      return {
        ...state,
        topDoctors: [],
      };

    // GetDoctor

    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      return {
        ...state,
        // action.users(users được gắn bên adminaction) Nó truyền từ bên api sang,
        allDoctors: action.dataDr,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      return {
        ...state,
        allDoctors: [],
      };
    // Get All Time Schedule
    case actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS:
      return {
        ...state,
        allScheduleTime: action.time,
      };
    case actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED:
      return {
        ...state,
        allScheduleTime: [],
      };
      // Get AllCode Price, Paymemt, Province
      case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
        return {
          ...state,
          allRequiredData: action.dataRequired,
        };
  
      case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
        return {
          ...state,
          allRequiredData: [],
        };
  



    default:
      return state;
  }
};

export default adminReducer;
