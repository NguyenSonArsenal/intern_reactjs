import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import '../../styles/helpers/Header.scss';

type Props = {};

type States = {
  redirectToLoginPage: boolean,
  redirectToHomePage: boolean,
  isLogin: boolean
};

class Header extends React.Component <Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      redirectToLoginPage: false,
      redirectToHomePage: false
    }
  }

  redirectToLoginPage = () => {
    this.setState({redirectToLoginPage: true})
  };

  redirectToLoginPage = () => {
    this.setState({redirectToHomePage: true})
  };

  render() {
    const {t, i18n} = this.props.i18next;
    const changeLanguage = lng => {
      i18n.changeLanguage(lng);
      window.location.reload();
    };
    console.log('isLogin: ', this.props.isLogin);

    if (this.state.redirectToLoginPage) {
      // return <Redirect to="/login"/>;
    }

    if (this.state.redirectToHomePage) {
      return <Redirect to={{
        pathname: '/dashboard',
      }}/>;
    }


    return (
      <div className="header-component">
        <div className="header">
          <div className="title">{t('course')}</div>
          <div className="loginlogout">
            {this.props.isLogin
              ?
              <div className="btn-login btn-log" onClick={this.redirectToHomePage}>Logout</div>
              :
              <div className="btn-logout btn-log" onClick={this.redirectToLoginPage}>Login</div>
            }
          </div>
          <div className="multi-language">
            <img
              src={'/images/vn.png'}
              alt="vietnam language"
              title="click to change language to vietnam"
              height="20"
              width="30"
              className="icon_language icon_vn_language"
              onClick={() => changeLanguage('vn')}
            />
            <img
              src={'/images/eng-flag.png'}
              alt="english language"
              title="click to change language to england"
              height="20"
              width="30"
              className="icon_language icon_en_language"
              onClick={() => changeLanguage('en')}
            />
          </div>
        </div>
        <hr className="hr-tag"></hr>

      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    isLogin: state.isLogin
  }
}

export default withRouter(connect(mapStateToProps)(Header));


