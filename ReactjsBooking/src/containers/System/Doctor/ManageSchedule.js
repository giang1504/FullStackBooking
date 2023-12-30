import React, { Component } from "react";
import { connect } from "react-redux";
import './ManageSchedule.scss';
import Select from "react-select";
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';
import { dateFormat } from "../../../utils";
import {saveBulkScheduleDoctor} from "../../../services/userService";

class ManageSchedule extends Component {
  constructor(props){
    super(props);
    this.state = {
      listDoctor:[],
      selectedDoctor: {},
      currentDate: new Date(),
      rangeTime: []

    }
  }
  componentDidMount() {
    this.props.fetchAllDoctorRedux();
    this.props.fetchAllScheduleTime();
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = `${item.lastName} ${item.firstName}`;
        object.value = item.id;
        result.push(object);
      });
    }

    return result;
  };
  handleChangeSelect = async (selectedDoctor) =>{
    this.setState({selectedDoctor});
  }

  
  componentDidUpdate(prevProps, prevState, snapshot){
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      // Hàm check set time sẽ hủy thông tin time hoặc chọn time khám bệnh, isSelected làm trung gian 
      if (data && data.length >0 ) {
        // data = data.map(item =>({...item, isSelected:"false"})) Cách viết 2
        data.map(item =>{
          item.isSelected = false;
          return item;
        })
      }
      this.setState({
        rangeTime:  this.props.allScheduleTime
      })
    }
  }
  handleOnchageDatePicker = (date) =>{
    this.setState({
      currentDate: date[0]
    })
  }
  handleClickBtnTime = (time) =>{
    let {rangeTime} = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map(item =>{
        if(item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      })
      this.setState({
        rangeTime:rangeTime
      })
    }
  }
  handleSaveSchedule = async () =>{
    let {selectedDoctor, currentDate,rangeTime } = this.state;
    let result = [];
    // check valid 
    if(!currentDate){
      toast.error("Check valid date");
      return;
    }
    // check danh sach bac si rỗng thi tra ra error
    if(selectedDoctor && _.isEmpty(selectedDoctor)){
      toast.error("Check valid Doctor");
      return;
    }

    let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    // Convert the formatted date back to a JavaScript Date object
    let dateObject = moment(formattedDate, dateFormat.SEND_TO_SERVER).toDate();
    let formateDate = dateObject.getTime();

    if (rangeTime && rangeTime.length > 0 ) {
      let selectedTime = rangeTime.filter(item => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formateDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        })
      } else {
        toast.error("Check selected doctor! ");
        return;
      }
    }
    // console.log('check result', result);
    let res =  await saveBulkScheduleDoctor({
      arrSchedule : result, 
      doctorId: selectedDoctor.value,
      formateDate: formateDate,
    })
    if(res && res.errCode === 0){
      toast.success("Save information Schedule ");
    }else{
      toast.error("Check error information Schedule ");
      console.log("Check error information Schedule", res );
    }
  }


  render() {
    let {rangeTime} = this.state;
    return (
      <div className="manage-schedule-container">
            <div className="m-s-title">
              Quản lý kế hoạch khám bệnh của bác sĩ
            </div>
            <div className="container">
              <div className="row">
                <div className="col-6 form-group">
                  <label>Chọn Bác Sĩ</label>
                  <Select
                    value={this.state.selectedDoctor}
                    onChange={this.handleChangeSelect}
                    options={this.state.listDoctor}
                    placeholder={'Chọn bác sĩ'}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Chọn ngày</label>
                  <DatePicker
                    onChange = {this.handleOnchageDatePicker}
                    className="form-control"
                    minDate = {new Date().setHours(0,0,0,0)}
                    value= {this.state.currentDate}
                  />            
                </div>
                <div className="col-12 pick-hour-container mt-4">
                  {
                    rangeTime && rangeTime.length > 0 
                    && rangeTime.map((item, index) =>{
                      return(
                        <button className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule" }
                        onClick={() => this.handleClickBtnTime(item)}
                        key={index}>{item.value_vn}</button>
                      )
                    })
                  }
                </div>
              </div>
              <button className="btn btn-primary mt-3 btn-save-schedule"
              onClick={() => this.handleSaveSchedule()}
              > Lưu thông tin</button>
            </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
