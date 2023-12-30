import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { ModalHeader, Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    console.log("didmount edit modal", this.props.currentUser);
    let user = this.props.currentUser;
    // Cách viết khác: let {currentUser} = this.props;
    // Nếu user đúng và isEmpty không rỗng thì câu lệnh if sẽ được thực thi
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "111",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }
  toggle = () => {
    this.props.toggleFormParent();
  };
  // Dùng hàm để gọi thay đổi trong input, và cách viết rút gọn khi gọi hàm Onchane cho all Input
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      // Nếu giá trị không đúng hoặc nó sai thì trả về false, đúng thì trả về true
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      // call API edit User Modal
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        size="lg"
        className={"modal-user-container"}
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Edit a new user
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                value={this.state.email}
                disabled
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                value={this.state.password}
                disabled
                type="password"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "password");
                }}
              />
            </div>
            <div className="input-container">
              <label>FirstName</label>
              <input
                value={this.state.firstName}
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "firstName");
                }}
              />
            </div>
            <div className="input-container">
              <label>LastName</label>
              <input
                value={this.state.lastName}
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "lastName");
                }}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                value={this.state.address}
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "address");
                }}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            {" "}
            Edit{" "}
          </Button>
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
