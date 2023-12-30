import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import { getDetailInforDoctor } from "../../../services/userService";
import { CRUD_ACTIONS } from "../../../utils";

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown doctor
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctor: [],
      // save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],
      selectedPrice: "",
      selectedPayment: "",
      selectProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",

      // Lưu khi hasOlData là true đã có sẵn thông tin ,
      // Tạo khi hasOldata là fasle chưa có thông tin
      hasOldData: false,
    };
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = async () => {
    let hasOldData = this.state.hasOldData;
    this.props.createInforDoctorAction({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectProvince: this.state.selectProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      specialtyId: this.state.selectedSpecialty.value,
      clinicId: this.state.selectedClinic.value,
    });
  };
  handleChangeSelect = async (selectedDoctor) => {
    let { listPayment, listPrice, listProvince, listSpecialty, listClinic } =
      this.state;
    this.setState({ selectedDoctor });
    let res = await getDetailInforDoctor(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let nameClinic = "",
        addressClinic = "",
        note = "",
        priceId = "",
        paymentId = "",
        provinceId = "",
        specialtyId = "",
        clinicId = "",
        selectedPrice = "",
        selectedPayment = "",
        selectProvince = "",
        selectedSpecialty = "",
        selectedClinic = "";

      // Nếu không có giá trị thì nó trả về là null, tránh bị lỗi
      if (res.data.Doctor_Infor) {
        // Dữ liệu được server trả lên client
        nameClinic = res.data.Doctor_Infor.nameClinic;
        addressClinic = res.data.Doctor_Infor.addressClinic;
        note = res.data.Doctor_Infor.note;
        priceId = res.data.Doctor_Infor.priceId;
        paymentId = res.data.Doctor_Infor.paymentId;
        provinceId = res.data.Doctor_Infor.provinceId;
        specialtyId = res.data.Doctor_Infor.specialtyId;
        clinicId = res.data.Doctor_Infor.clinicId;
        // Vì Paymen, price, provind đang ở dạng mảng nên dùng hàm find để lấy ra đối tượng đầu tiên
        // đúng với điều kiện
        // Server trả lên đã có trị nhưng phía client chỉ nhận được 1 mảng array, và giá bằng rỗng
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinicId;
        });
      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        nameClinic: nameClinic,
        addressClinic: addressClinic,
        note: note,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectProvince: selectProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        nameClinic: "",
        addressClinic: "",
        note: "",
        selectedPrice: "",
        selectedPayment: "",
        selectProvince: "",
        selectedSpecialty: "",
        selectedClinic: "",
      });
    }
  };

  handleOnchangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  componentDidMount() {
    this.props.fetchAllDoctorRedux();
    this.props.fetchRequiredDoctorInfor();
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
  // Price/Payment/Province Doctor

  buildDataInputSelectRequiredData = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          object.label = `${item.value_vn} VNĐ`;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          object.label = `${item.value_vn}`;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };
  handleChangeSelectDoctorInfor = async (selectedDoctor, inputName) => {
    let stateCopy = { ...this.state };
    let startName = inputName.name;
    stateCopy[startName] = selectedDoctor;
    this.setState({
      ...stateCopy,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.allRequiredData !== this.props.allRequiredData) {
      let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredData;
      let dataSelectPayment = this.buildDataInputSelectRequiredData(
        resPayment,
        "PAYMENT"
      );
      let dataSelectPrice = this.buildDataInputSelectRequiredData(
        resPrice,
        "PRICE"
      );
      let dataSelectProvince = this.buildDataInputSelectRequiredData(
        resProvince,
        "PROVINCE"
      );
      let dataSelctSpecialty = this.buildDataInputSelectRequiredData(
        resSpecialty,
        "SPECIALTY"
      );
      let dataSelctClinic = this.buildDataInputSelectRequiredData(
        resClinic,
        "CLINIC"
      );

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelctSpecialty,
        listClinic: dataSelctClinic,
      });
    }
  }

  render() {
    let { hasOldData } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo Thông Tin Bác Sĩ</div>
        <div className="more-infor">
          <div className="content-left">
            <label>Chọn bác sĩ</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctor}
              placeholder={"Chọn bác sĩ"}
            />
          </div>
          <div className="content-right">
            <label>Thông tin giới thiệu: </label>
            <textarea
              className="form-control"
              value={this.state.description}
              onChange={(event) =>
                this.handleOnchangeText(event, "description")
              }
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra row mb-3">
          <div className="col-4 form-group ">
            <label> Giá khám</label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              placeholder={"Chọn giá"}
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label> Chọn phương thức thanh toán</label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayment}
              placeholder={"Chọn phương thức thanh toán"}
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label> Chọn tỉnh/Thành</label>
            <Select
              value={this.state.selectProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvince}
              placeholder={"Chọn tỉnh thành"}
              name="selectProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label> Tên phòng khám</label>
            <input
              className="form-control"
              value={this.state.nameClinic}
              onChange={(event) => this.handleOnchangeText(event, "nameClinic")}
            />
          </div>
          <div className="col-4 form-group">
            <label> Địa chỉ phòng khám</label>
            <input
              className="form-control"
              value={this.state.addressClinic}
              onChange={(event) =>
                this.handleOnchangeText(event, "addressClinic")
              }
            />
          </div>
          <div className="col-4 form-group">
            <label>Note</label>
            <input
              className="form-control"
              value={this.state.note}
              onChange={(event) => this.handleOnchangeText(event, "note")}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4 form-group">
            <label>Chọn chuyên khoa</label>
            <Select
              value={this.state.selectedSpecialty}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listSpecialty}
              placeholder={"Chọn chuyên khoa"}
              name="selectedSpecialty"
            />
          </div>
          <div className="col-4 form-group">
            <label>Chọn phòng khám</label>
            <Select
              value={this.state.selectedClinic}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listClinic}
              placeholder={"Chọn phòng khám"}
              name="selectedClinic"
            />
          </div>
        </div>
        <div className="manage-doctor-editor mt-3">
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>

        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className={
            hasOldData === true
              ? "save-content-doctor"
              : "create-content-doctor"
          }
        >
          {hasOldData === true ? (
            <span>Lưu thông tin</span>
          ) : (
            <span>Tạo thông tin</span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    allRequiredData: state.admin.allRequiredData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctors()),
    fetchRequiredDoctorInfor: () =>
      dispatch(actions.fetchRequiredDoctorInfor()),
    createInforDoctorAction: (data) =>
      dispatch(actions.createInforDoctorAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
