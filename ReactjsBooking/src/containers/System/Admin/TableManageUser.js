import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";



class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersArr: [],
    };
  }
  componentDidMount() {
    this.props.fetchUserRedux();
  }
  // usersRedux
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUser !== this.props.listUser) {
      this.setState({
        usersArr: this.props.listUser,
      });
    }
  }
  handleDeleteUser(item) {
    this.props.fetchDeleteUserRedux(item.id);
  }
  handleEditUser(item) {
    this.props.handleEditUserFromKey(item);
  }
  render() {
 
    let arrUsers = this.state.usersArr;

    return (
      <React.Fragment>
              <table id="TableManageUser">
        <tbody>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
          {arrUsers &&
            arrUsers.length > 0 &&
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
                      onClick={() => {
                        this.handleEditUser(item);
                      }}
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
      </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUser: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    fetchDeleteUserRedux: (id) => dispatch(actions.fetchDeleteUsersStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
