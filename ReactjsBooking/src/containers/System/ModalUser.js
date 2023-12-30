import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { ModalHeader, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            
        }
        // state không đổi(listenToEmitter) => render xong => Didmount (listenToEmitter)
        this.listenToEmitter();
    }
    // Bắt sự kiện từ thằng cha sang
    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', () =>{
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }
    componentDidMount() {

    }
    toggle =() =>{
        this.props.toggleFormParent();
    }
    // Dùng hàm để gọi thay đổi trong input, và cách viết rút gọn khi gọi hàm Onchane cho all Input
    handleOnChangeInput = (event, id) =>{
        // Cach 1
        // this.state[id] = event.target.value;
        // this.setState({
        //     ...this.state
        // }, () => {
        //     console.log('check bad state: ', this.state);
        // })
        // Cach 2: ...this.state(Lưu giá trị của biến state từ contructor)
        let copyState = {...this.state}
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

     checkValidateInput = () =>{
        // Cách 1: Check thổ dân với từng biến được lưu trữ, 
        // không nhập 1 trường sẽ báo lỗi 
        // if(!this.state.email){
        //     return false,
        //     console.log('Missing email');
        // }
        // console.log(this.state.email);

        // Cách 2: Check bằng vòng lặp for khi nhập thiếu sẽ báo lỗi và break ra khỏi vòng for
        let isValid = true;
        let arrInput = ['email', 'password','firstName','lastName','address'];
        for (let i = 0; i < arrInput.length; i++) {
            // Nếu giá trị không đúng hoặc nó sai thì trả về false, đúng thì trả về true
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
  
    }
    handleAddNewUser = () =>{

        let isValid = this.checkValidateInput();
        if (isValid === true) {
            // call API creat Modal
            this.props.createNewUser(this.state);
            // console.log('modal :', this.state);

        }
    }

    render() {
        // console.log('check child props',this.props);
        // console.log('Check Open Modal', this.props.isOpen);
        return (
            <Modal isOpen={this.props.isOpen}
             toggle={() => {this.toggle()}}
             size='lg'
              className={'modal-user-container'}>
                <ModalHeader toggle={() => {this.toggle()}}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                    <div className='input-container'>
                            <label>Email</label>
                            <input value={this.state.email}
                            type='text' onChange={(event) =>{this.handleOnChangeInput(event , "email")}}/>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input value={this.state.password}
                            type='password' onChange={(event) =>{this.handleOnChangeInput(event , "password")}}/>
                        </div>
                        <div className='input-container'>
                            <label>FirstName</label>
                            <input value={this.state.firstName}
                            type='text' onChange={(event) =>{this.handleOnChangeInput(event , "firstName")}}/>
                        </div>
                        <div className='input-container'>
                            <label>LastName</label>
                            <input value={this.state.lastName}
                            type='text' onChange={(event) =>{this.handleOnChangeInput(event , "lastName")}}/>
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input value={this.state.address}
                            type='text' onChange={(event) =>{this.handleOnChangeInput(event , "address")}} />
                        </div>
                    </div>
                        

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3'
                     onClick={() =>{this.handleAddNewUser()}}
                     > Add New </Button>
                    <Button color="secondary" className='px-3' 
                    onClick={() =>{this.toggle()}}
                    >Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
