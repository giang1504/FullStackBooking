import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";


import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleloginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
            username:'',
            password: '',
            errMessage: '',
            isShowPassword: false,
        }
    }
    handleOnChangeUserName = (event) =>{
        this.setState({
            username: event.target.value,
        })
        // console.log(event.target.value);
    }
    handleOnChangepassword= (event) =>{
        this.setState({
            password: event.target.value
        })
        // console.log(event.target.value);
    }
    handlelogin = async () =>{
        // console.log('email: ', this.state.username, 'password: ', this.state.password);
        // console.log(this.state)
        // Dung setstate de clear truoc khi chay lai vong render
        this.setState({
            errMessage: ''
        })

        try {
           let data = await handleloginApi(this.state.username, this.state.password);
            
           if(data && data.errCode !== 0){
            this.setState({
                errMessage: data.message
            })   
           }
           if(data && data.errCode === 0){
            console.log('Login Succes');
            this.props.userLoginSuccess(data.user)

           }
           

        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }
    handleShowHidePassword=() =>{
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    handleKeyDown = (event) =>{
        if (event.key === 'Enter' || event.keycode === 13) {
            this.handlelogin();
        }
    }
    
    render() {
 

        return (
           <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>UserName: </label>
                            <input type='text' 
                            value={this.state.username}
                            onChange={(event) => this.handleOnChangeUserName(event)}
                             className='form-control' placeholder='UserName'/>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password: </label>
                            <div className='custom-input-password'>
                            <input type={this.state.isShowPassword ? 'text' : 'password'} className='form-control'
                            value={this.state.password}
                            onChange={(event) => this.handleOnChangepassword(event)}
                            onKeyDown={(event) => this.handleKeyDown(event)}
                            placeholder='Password'/>
                            <span onClick={()=>{this.handleShowHidePassword()}}>  
                            <i className={this.state.isShowPassword ? "far fa-eye":"far fa-eye-slash"}></i>
                            </span>                            
                            </div>                       
                        </div>
                        <div className='col-12 ' style={{color:'red', fontSize: '13px'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 '>
                            <button className='btn-login' onClick={()=>{this.handlelogin()}}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className='text-other-login '> Or login With</span>
                        </div>  
                        <div className='col-12 social-login'>
                            <i className ="fab fa-google-plus-g google"></i>
                            <i className ="fab fa-twitter twitter"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                        
                    </div>
                </div>

           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
