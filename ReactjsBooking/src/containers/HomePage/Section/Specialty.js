import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from "react-slick";
import { getTopSpecialtyHome } from '../../../services/userService';
import { withRouter } from "react-router";



class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataspecialty: [],
        };
      }
      async componentDidMount() {
        let res = await getTopSpecialtyHome("");
        if (res && res.errCode === 0) {
            this.setState({
                dataspecialty: res.data
            })
        }
      }

      componentDidUpdate(prevProps, prevState, snapshot) { 
      }
      handleViewDetailSpecialty = (specialty) =>{
        this.props.history.push(`/detail-specialty/${specialty.id}`);
      }
    render() {
        let {dataspecialty} =  this.state;
        return ( 
            <div className='section-share'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên Khoa</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataspecialty && dataspecialty.length > 0 &&
                            dataspecialty.map((item, index) =>{
                                let imageBase64 = "";
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, "base64").toString(
                                      "binary"
                                    );
                                  }
                                  return (
                                    <div className='section-customize'
                                    key={index}
                                    onClick={() => this.handleViewDetailSpecialty(item)}
                                    >
                                        <div className='bg-image section-specialty' 
                                        style={{
                                            backgroundImage: `url(${imageBase64})`,
                                          }}
                                          />
                                        <div className='title-image'>
                                        <div>{`${item.name}`}</div>
                                        </div>
                                    </div>
                                  )
                            })
                                
                            }
                           
                            
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
