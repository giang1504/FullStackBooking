import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { withRouter } from "react-router";

class HomeHeader extends Component {
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => this.returnToHome()}
              />
            </div>
            <div className="center-content">
              <div className="center-left-content">
                <div className="child-content">
                  <a href="#">
                    <span>Tại Nhà</span>
                  </a>
                </div>
                <div className="child-content">
                  <a href="#">
                    <span>Tại Viện</span>
                  </a>
                </div>
                <div className="child-content">
                  <a href="#">
                    <span>Sống Khỏe</span>
                  </a>
                </div>
              </div>
              <div className="center-right-content">
                <div className="search">
                  <i className="fas fa-search"></i>
                  <input type="text" placeholder="Tìm Kiếm" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <a className="flag">VN</a>
              <a className="icon">
                <i className="fas fa-clock"></i>
                <div className="schedule">Lịch Hẹn</div>
              </a>
              <a className="icon">
                <i className="fas fa-question-circle"></i>
                <div className="support">Hỗ Trợ</div>
              </a>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div>
            <div className="home-header-banner">
              <div className="image-container"></div>
            </div>
            <div className="option">
              <div className="option-text">Dịch vụ toàn diện</div>
              <div className="option-center">
                <div className="option-child">
                  <div className="icon-child">
                    <i class="far fa-hospital"></i>
                  </div>
                  <div className="text-child">Khám Chuyên Khoa</div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i class="far fa-hospital"></i>
                  </div>
                  <div className="text-child">Khám tổng quát</div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i class="far fa-hospital"></i>
                  </div>
                  <div className="text-child">Sức khỏe tinh thần</div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i class="far fa-hospital"></i>
                  </div>
                  <div className="text-child">Khám từ xa</div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i class="far fa-hospital"></i>
                  </div>
                  <div className="text-child">Xét nghiệm y học</div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i class="far fa-hospital"></i>
                  </div>
                  <div className="text-child">Khám nha khoa</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
