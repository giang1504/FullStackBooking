import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { getScheduleByDate } from "../../../services/userService";
import * as actions from "../../../store/actions";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalableTime: [],
      rangeTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }
  async componentDidMount() {
    this.props.fetchAllScheduleTime();
    let arrDays = this.getArrDays();
    if (this.props.doctorIdFromParent) {
      let res = await getScheduleByDate(
        this.props.doctorIdFromParent,
        arrDays[0].value
      );
      this.setState({
        allAvalableTime: res.data ? res.data : [],
      });
    }

    this.setState({
      allDays: arrDays,
    });
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let arrDays = this.getArrDays();
      let res = await getScheduleByDate(
        this.props.doctorIdFromParent,
        arrDays[0].value
      );
      this.setState({
        allAvalableTime: res.data ? res.data : [],
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      this.setState({
        rangeTime: this.props.allScheduleTime,
      });
    }
  }

  getArrDays = () => {
    let arrDays = [];
    // Vòng lặp 7 ngày, tạo 7 ngày theo ngày tháng
    for (let i = 0; i < 7; i++) {
      let object = {};
      // moment(new Date) khởi tạo với ngày và giờ hiện tại. add thêm một số ngày được chỉ định
      // let dayName = moment(new Date()).add(i, 'days').format('dddd-DD/MM');
      let currentDate = moment(new Date()).add(i, "days");
      let dayName = currentDate.format("dddd - DD/MM");
      let dayTime = currentDate.format("DD/MM");

      dayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
      object.label = i === 0 ? "Hôm nay" + " - " + dayTime : dayName;
      //startOf('day') thiết lập thành 12:00 am hôm nay  đặt thời gian bắt đầu trong ngày
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDays.push(object);
    }
    return arrDays;
  };

  handleOnchangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleByDate(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvalableTime: res.data ? res.data : [],
        });
      }
    }
  };
  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      // truyền dữ liệu sang cho component con
      dataScheduleTimeModal: time,
    });
  };
  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let {
      allDays,
      allAvalableTime,
      rangeTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
    } = this.state;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select
              onChange={(event) => {
                this.handleOnchangeSelect(event);
              }}
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>Lịch Khám</span>
              </i>
            </div>
            <div className="time-content">
              {allAvalableTime && allAvalableTime.length > 0 ? (
                <>
                  <div className="time-content-btn">
                    {allAvalableTime.map((item, index) => {
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            this.handleClickScheduleTime(item);
                          }}
                        >
                          {item.timeTypeData.value_vn}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="time-content">
                  <div className="time-content-btn">
                    {rangeTime &&
                      rangeTime.length > 0 &&
                      rangeTime.map((item, index) => {
                        return (
                          <button
                            // onClick={() =>{this.handleClickSchedule(item)}}
                            className="none-scheduled"
                            key={index}
                          >
                            {item.value_vn}
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}
              <div className="book-free">
                <span>
                  Chọn <i className="far fa-hand-point-up"></i> và đặt (Phí đặt
                  lịch 0đ)
                </span>
              </div>
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModalBooking={isOpenModalBooking}
          closeModalBooking={this.closeBookingModal}
          dataTime={dataScheduleTimeModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
