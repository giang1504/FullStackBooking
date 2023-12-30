import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

class About extends Component {

    render() {
        return (
         <div className='section-share section-about'>
            <div className='section-about-container'>
            <div className='section-about-header'>
                Truyền thông nói về BookingCare
            </div>
            <div className='section-about-content'>
                <div className='content-left'>
                <iframe width="750px" height="400px" src="https://www.youtube.com/embed/FyDQljKtWnI?si=HhLEZllu0w6LF5QU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div className='content-right'>
                    Giới thiệu về bookingCare
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
