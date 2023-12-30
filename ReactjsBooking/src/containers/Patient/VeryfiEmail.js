import React, { Component } from "react";
import { connect } from "react-redux";
import { postVerifyBookAppoinment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import "./VeryfiEmail.scss";


class VeryfiEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0
    };
  }
  async componentDidMount() {
    if(this.props.location && this.props.location.search){
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get('token');
      let doctorId = urlParams.get('doctorId');
      let res = await postVerifyBookAppoinment({
        token: token,
        doctorId: doctorId
      });
      if(res && res.errCode === 0){
        this.setState({
          statusVerify: true, 
          errCode: res.errCode
        }) 
      } else{
        this.setState({
          statusVerify: true,
          errCode: res & res.errCode ? res.errCode : -1
        })
      }
    }
    
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {  
  }

  render() { 
    let {statusVerify, errCode} = this.state;
    console.log('statusVerify',this.state);
    return (
        <>
        <HomeHeader/>
        <div className="verify-email-container">
          { statusVerify === false ? 
          <div>Loading Data....</div>
            :
            <div>
              {+errCode === 0 ?
              <div className="infor-Booking">Xác nhận lịch hẹn thành công</div>:
              <div className="infor-Booking">Lịch hẹn không tồn tại hoặc đã được xác nhận</div>
              }
            </div>
          }
          </div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VeryfiEmail);
