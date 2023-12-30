import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getExtraInforDoctorById } from "../../../services/userService";
import * as actions from "../../../store/actions";
import "./DoctorExtraInfor.scss";
import { NumericFormat } from 'react-number-format';


class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
       isShowDetailInfor: false,
       isShowDetailInforInsurance: false,
       extraInfor: {}
    };
  }
   async componentDidMount() {
    if (this.props.doctorIdFromParent) {
        let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
        if (res && res.errCode === 0) {
            this.setState({
                extraInfor: res.data ? res.data : []
            })
        } 
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
        let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
        if (res && res.errCode === 0) {
            this.setState({
                extraInfor: res.data ? res.data : []
            })
        }
    }
       
  }
  showHideDetailInfor = (status) =>{
    this.setState({
        isShowDetailInfor: status,
    })
  }
  showHideDetailInforInsurance = (status) =>{
    this.setState({
        isShowDetailInforInsurance: status
    })
  }



  render() { 
    let {isShowDetailInfor, isShowDetailInforInsurance, extraInfor} = this.state;
    return (
        <div className="doctor-extra-infor-container"> 
            <div className="content-up">
                <div className="text-address">ĐỊA CHỈ KHÁM</div>
                <div className="name-clinic">{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic: ''}</div>
                <div className="detail-address">{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic: ''}</div>
            </div>
            <div className="content-down">                  
                {isShowDetailInfor === false && 
                    <div className="short-infor">
                     <span className="text-content-down">GIÁ KHÁM: </span>
                     {extraInfor && extraInfor.priceIdData && 
                     <NumericFormat
                     className="currency"
                     value={extraInfor.priceIdData.value_vn}
                     thousandSeparator={true}
                     displayType="text"
                     suffix={"VNĐ"}
                     />
                     }
                     <span onClick={() => this.showHideDetailInfor(true)}>Xem chi tiết</span>
                    </div>
                } 
                {isShowDetailInfor === true && 
                    <>
                        <div className="title-price">Giá Khám:</div>
                        <div className="detail-infor">
                           <div className="price">
                                <span className="left">Giá Khám</span>
                                <span className="right">
                                {extraInfor && extraInfor.priceIdData && 
                                    <NumericFormat
                                    className="currency"
                                    value={extraInfor.priceIdData.value_vn}
                                    thousandSeparator={true}
                                    displayType="text"
                                    suffix={"VNĐ"}
                                    />
                                }
                                </span>
                           </div>
                           <div className="note">
                            Đươc ưu tiên khám trước khi đặt khám qua BookingCare
                            </div>
                        </div>
                        <div className="payment">Phòng khám có thanh toán bằng hình thức {extraInfor && extraInfor.paymentIdData ? extraInfor.paymentIdData.value_vn : ''}</div>
                        <div className="hide-price"><span onClick={() => this.showHideDetailInfor(false)}>Ẩn bảng giá</span></div>
                    </>
                } 
            </div>
            <div className="content-down">                  
                {isShowDetailInforInsurance === false && 
                    <div className="short-infor">
                        <span className="text-content-down">LOẠI BẢO HIỂM ÁP DỤNG: </span>
                        <span onClick={() => this.showHideDetailInforInsurance(true)}>Xem chi tiết</span>
                    </div>
                } 
                {isShowDetailInforInsurance === true && 
                    <>
                        <div className="detail-infor">
                           <div className="note">
                            <div>Bảo Hiểm y tế nhà nước.</div>
                           Hiện chưa áp dụng bảo hiểm y tế nhà nước cho dịch vụ khám chuyên gia.
                            </div>
                        </div>
                        <div className="payment">Phòng khám có thanh toán bằng hình thức  {extraInfor && extraInfor.paymentIdData ? extraInfor.paymentIdData.value_vn : ''}</div>
                        <div className="hide-price"><span onClick={() => this.showHideDetailInforInsurance(false)}>Thu gọn</span></div>
                    </>
                } 
            </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
