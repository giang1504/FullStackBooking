import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import _ from "lodash";
import { USER_ROLE } from "../../utils";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  // Phân quyền tài khoản
  componentDidMount() {
    let userInfo = this.props.userInfo;
    let menu = [];
    // isEmty là check khong rong
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      // USER_ROLE.ADMIN được gọi bên hàm constant khởi tạo biến bằng R1 tương ứng với Role: R1 bên database
      if (role === USER_ROLE.ADMIN) {
        // Nếu role bằng R1 nó chuyển đến tab quản lý, adminMenu ở menuApp
        menu = adminMenu;
      }
      // Nếu role bằng R2 nó chuyển đến tab Bác sĩ, adminMenu ở menuApp
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }

  render() {
    const { processLogout, userInfo } = this.props;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        {/* Kiểm tra điều kiện nếu firstName tồn tại thì trả về firstName, nếu không tồn tại trả về rỗng */}
        <div className="welcome">
          {" "}
          Xin Chào,{" "}
          {userInfo && userInfo.firstName
            ? userInfo.firstName + " " + userInfo.lastName
            : ""}{" "}
          !!!{" "}
        </div>
        {/* nút logout */}
        <div className="btn btn-logout" onClick={processLogout}>
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
