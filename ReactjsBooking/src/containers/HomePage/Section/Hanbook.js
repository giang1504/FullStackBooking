import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

class OutStandingDoctor extends Component {

    render() {
        return (
            <div className='section-share'>
            <div className='section-container'>
                <div className='section-header'>
                    <span className='title-section'>Cẩm Nang</span>
                    <button className='btn-section'>Xem thêm</button>
                </div>
                <div className='section-body'>
                    <Slider {...this.props.settings}>
                        <div className='section-customize'>
                            <div className='bg-image section-hanbook'/>
                            <div className='title-image'>
                                <div>1 khác biệt khi tầm soát bệnh, khám tổng quát tại Doctor Check</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image section-hanbook'/>
                            <div className='title-image'>
                                <div>2 khác biệt khi tầm soát bệnh, khám tổng quát tại Doctor Check</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image section-hanbook'/>
                            <div className='title-image'>
                                <div>3 khác biệt khi tầm soát bệnh, khám tổng quát tại Doctor Check</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image section-hanbook'/>
                            <div className='title-image'>
                                <div>4 khác biệt khi tầm soát bệnh, khám tổng quát tại Doctor Check</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image section-hanbook'/>
                            <div className='title-image'>
                                <div>5 khác biệt khi tầm soát bệnh, khám tổng quát tại Doctor Check</div>
                            </div>
                        </div>
                        <div className='section-customize'>
                            <div className='bg-image section-hanbook'/>
                            <div className='title-image'>
                                <div>6 khác biệt khi tầm soát bệnh, khám tổng quát tại Doctor Check</div>
                            </div>
                        </div>


                    </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
