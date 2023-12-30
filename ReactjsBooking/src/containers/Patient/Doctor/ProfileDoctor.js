import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import { NumericFormat } from "react-number-format";
import _ from "lodash";
import moment from "moment";
import localization from "moment/locale/vi";
import { Link } from "react-router-dom";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    // Muốn lấy thông tin thì phải truyền xem lấy dữ liệu của ai, cho nên cần id của bác sĩ (BookingModal)
    let id = this.props.doctorId;
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        this.setState({
          dataProfile: res.data,
        });
      }
    }
    // let data = await this.getInforDoctor(this.props.doctorId);
    // this.setState({
    //     dataProfile: data
    // })
  }
  //   getInforDoctor = async (id) =>{
  //     let result = {};
  //     if(id){
  //         let res = await getProfileDoctorById(id);
  //         if(res && res.errCode === 0){
  //             result = res.data;
  //         }
  //     }
  //     return result;
  //   }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorId !== prevProps.doctorId) {
      let res = await getProfileDoctorById(this.props.doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          dataProfile: res.data,
        });
      }
    }
  }
  inforScheduleTime = (dataTime) => {
    let dateTime = moment
      .unix(+dataTime.date / 1000)
      .format("dddd - DD/MM/YYYY");
    let date = dateTime.charAt(0).toUpperCase() + dateTime.slice(1);

    if (dataTime && !_.isEmpty(dataTime)) {
      return (
        <>
          <div>
            {dataTime.timeTypeData.value_vn} - {date}
          </div>
          <div>Đặt lịch miễn phí</div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let { dataProfile } = this.state;
    let {
      isShowDescriptionDoctor,
      dataTime,
      isShowLinkDetail,
      isShowPrice,
      doctorId,
    } = this.props;
    return (
      <>
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${dataProfile.image})`,
            }}
          ></div>

          <div className="content-right">
            <div className="up">{`${
              dataProfile.positionData && dataProfile.positionData.value_vn
            },  ${dataProfile.lastName} ${dataProfile.firstName} `}</div>
            <div className="down">
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.inforScheduleTime(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        {isShowLinkDetail === true && (
          <div className="view-detail-doctor">
            <Link to={`/detail-doctor/${doctorId}`}>Xem Thêm</Link>
          </div>
        )}
        {isShowPrice === true && (
          <div className="price">
            Giá khám{" "}
            {dataProfile &&
              dataProfile.Doctor_Infor &&
              dataProfile.Doctor_Infor.priceIdData && (
                <NumericFormat
                  className="currency"
                  value={dataProfile.Doctor_Infor.priceIdData.value_vn}
                  thousandSeparator={true}
                  displayType="text"
                  suffix={"VNĐ"}
                />
              )}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
