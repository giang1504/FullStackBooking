import React, { Component } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import Select from "react-select";
import * as actions from "../../../../store/actions";
import { toast } from "react-toastify";
import { postPatientBookAppoinment } from "../../../../services/userService";
import { emitter } from "../../../../utils/emitter";
import moment from "moment";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: "",
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthDay: "",
      genders: "",
      selectedGenders: "",
      timeType: "",
    };
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        doctorId: "",
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        reason: "",
        birthDay: "",
        genders: "",
        selectedGenders: "",
        timeType: "",
      });
    });
  }
  buildDataGenders = (genderData) => {
    let result = [];
    if (genderData && genderData.length > 0) {
      genderData.map((item, index) => {
        let object = {};
        object.label = item.value_vn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  componentDidMount() {
    this.props.fetchGenders();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.genders !== prevProps.genders) {
      let dataSelect = this.buildDataGenders(this.props.genders);
      this.setState({
        genders: dataSelect,
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      console.log(this.props.dataTime);
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }
  onChangeHandleInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnchageDatePicker = (date) => {
    this.setState({
      birthDay: date[0],
    });
  };
  handleChangeSelect = async (selectedGenders) => {
    this.setState({ selectedGenders });
  };
  handleConfirmBooking = async () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let date = new Date(this.state.birthDay).getTime();

    // Truyền dữ liệu từ thằng cha sang con rồi truyền sang server
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);
    let res = await postPatientBookAppoinment({
      doctorId: this.state.doctorId,
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      timeType: this.state.timeType,
      selectedGenders: this.state.selectedGenders.value,
      date: this.props.dataTime.date,
      birthDay: date,
      timeString: timeString,
      doctorName: doctorName,
    });
    if (res && res.errCode === 0) {
      toast.success("Save information Appointment ");
      this.props.closeModalBooking();
    } else {
      toast.error("Check error information Appointment ");
      console.log("Check error information Appointment", res);
    }
    emitter.emit("EVENT_CLEAR_MODAL_DATA");
  };
  // Check validate
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "fullName",
      "phoneNumber",
      "email",
      "address",
      "reason",
      "birthDay",
      "selectedGenders",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("Missing " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  buildTimeBooking = (dataTime) => {
    let dateTime = moment
      .unix(dataTime.date / 1000)
      .format("dddd - DD/MM/YYYY");
    let date = dateTime.charAt(0).toUpperCase() + dateTime.slice(1);
    let time = dataTime.timeTypeData.value_vn;
    if (dataTime && !_.isEmpty(dataTime)) {
      return `${time} - ${date}`;
    }
    return ``;
  };
  buildDoctorName = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let name = `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;
      return `${name}`;
    }
    return ``;
  };

  render() {
    let { isOpenModalBooking, closeModalBooking, dataTime } = this.props;
    // let doctorId = dataTime.doctorId;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    return (
      <Modal
        isOpen={isOpenModalBooking}
        className="booking-modal-container"
        centered
        size="lg"
        //    backdrop={true}
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">Thông tin đặt lịch khám</span>
            <span className="right" onClick={closeModalBooking}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body">
            {/* {JSON.stringify(dataTime)} */}
            <div className="doctor-infor">
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescriptionDoctor={false}
                dataTime={dataTime}
                isShowLinkDetail={false}
                isShowPrice={true}
              />
            </div>
            <div className="row">
              <div className="col-6 form-group">
                <label>Họ Tên</label>
                <input
                  className="form-control"
                  value={this.state.fullName}
                  onChange={(event) => {
                    this.onChangeHandleInput(event, "fullName");
                  }}
                />
              </div>
              <div className="col-6 form-group">
                <label> Số điện thoại</label>
                <input
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(event) => {
                    this.onChangeHandleInput(event, "phoneNumber");
                  }}
                />
              </div>
              <div className="col-6 form-group">
                <label>Địa chỉ Email</label>
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => {
                    this.onChangeHandleInput(event, "email");
                  }}
                />
              </div>
              <div className="col-6 form-group">
                <label> Địa chỉ liên hẹ</label>
                <input
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) => {
                    this.onChangeHandleInput(event, "address");
                  }}
                />
              </div>
              <div className="col-12 form-group">
                <label> Lý do khám</label>
                <input
                  className="form-control"
                  value={this.state.reason}
                  onChange={(event) => {
                    this.onChangeHandleInput(event, "reason");
                  }}
                />
              </div>
              <div className="col-6 form-group">
                <label>Ngày Sinh</label>
                <DatePicker
                  onChange={this.handleOnchageDatePicker}
                  className="form-control"
                  value={this.state.birthDay}
                />
              </div>
              <div className="col-6 form-group">
                <label>Giới tính</label>
                <Select
                  value={this.state.selectedGenders}
                  onChange={this.handleChangeSelect}
                  options={this.state.genders}
                  placeholder="Chọn giới tính"
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn-booking-confirm"
              onClick={() => this.handleConfirmBooking()}
            >
              Xác nhận
            </button>
            <button className="btn-booking-cancel" onClick={closeModalBooking}>
              Hủy
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
