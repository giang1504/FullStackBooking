import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }
  // this.setState

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  // Hàm cập nhật trạng thái khi thêm users vào backend, nó sẽ cập nhật luôn vào bảng react
  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        // nếu đúng thì user cập nhật vào arrUser
        arrUsers: response.users,
      });
      // console.log('check la ci gi: ',this.state.arrUsers);
    }
  };
  // Set bảng create user hiển thị bằng true khi state của nó là fasle
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  //
  toggleUserModal = () => {
    this.setState({
      // Khi tab create mở ấn vào sẽ chuyển thành đóng (true: (!true=> false))
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  toggleUserEditModal = () => {
    this.setState({
      // Khi tab create mở ấn vào sẽ chuyển thành đóng (true: (!true=> false))
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };
  createNewUser = async (data) => {
    try {
      // console.log('Data create new:', data);
      let response = await createNewUserService(data);
      // console.log('response create new:', response);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        // Xuất sự kiện clear modal data, (Xóa dữ liệu đã nhập từ bảng tạo người dùng isOpenModalUser)
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleDeleteUser = async (userId) => {
    try {
      let res = await deleteUserService(userId.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
        console.log(res.message);
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleEditUser = (user) => {
    console.log("check edit userId", user);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };
  doEditUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
        await this.getAllUsersFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          // set parent thành toggle của component con
          toggleFormParent={this.toggleUserModal}
          // Truyền giá trị createNewUser từ cha sang cho component Con
          // this.createNewUser là từ thằng cha sang
          createNewUser={this.createNewUser}
        />

        {
          // Đặt điều kiện khi modal true thì sẽ hiển thị form
          this.state.isOpenModalEditUser && (
            <ModalEditUser
              isOpen={this.state.isOpenModalEditUser}
              // set parent thành toggle của component con
              toggleFormParent={this.toggleUserEditModal}
              currentUser={this.state.userEdit}
              editUser={this.doEditUser}
            />
          )
        }
        <div className="title text-center"> Create a new users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Add new user
          </button>
        </div>
        <div className="users-table mt-4 mx-4">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            this.handleDeleteUser(item);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
