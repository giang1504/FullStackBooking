import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

class HomeFooter extends Component {

    render() {
        return (
         <div className='home-footer-container'>
            <div className='home-footer'>
            <div className='footer-left'>
            <p>&Copy; 2023 BookingCare.vn</p>
            </div>
            <div className='footer-right'>
                <a target="_blank" href="https://www.youtube.com/?hl=vi"> <i className ="fab fa-youtube youtube"></i></a>
                <a target="_blank" href="https://www.facebook.com"> <i className="fab fa-facebook-f facebook"></i></a>
               
            </div>
         </div>
         </div>
                    
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
