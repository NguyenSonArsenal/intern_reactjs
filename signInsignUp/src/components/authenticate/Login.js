import React from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { I18n, translate, Trans } from 'react-i18next';

import '../../styles/authenticate/Login.scss';
import SelectLanguage from '../../components/SelectLanguage.js';

const helper = require('../../../helpers/helper');

type Props = {
};

type States = {
  redirectToDashboardPage: boolean,
  isLoginError: boolean
};

class Login extends React.Component <Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      redirectToDashboardPage: false,
      isLoginError: false
    }
  }

  checkInput = (email, password) => {
    const users = this.props.initLogs;
    const length = users.length;
    if (length > 0) {
      for (let i=0; i<length; i++) {
        if (users[i].email === email) {
          if (users[i].password === password) {
            return true;
          }
        }
      }
    }
    return false;
  };

  onFocus = () => {
    this.setState({isLoginError: false});
  };

  handleLogin = e => {
    const email = this.textInputEmail.value;
    const password = this.textInputPassword.value;

    if (!email || !password) {
      this.setState({isLoginError: true});
    }

    if ( helper.validateEmail(email) && password ) {
      if (this.checkInput(email, password)) {
        this.setState({redirectToDashboardPage: true});
        this.props.dispatch({
          type: 'LOGIN'
        })
      } else {
        this.setState({isLoginError: true});
      }
    }
  };

  render() {
    if (this.state.redirectToDashboardPage) {
      return <Redirect to={{
        pathname: '/dashboard'
      }}/>;
    }
    const { t } = this.props.i18next;

    return (
      <div className="login-component">
        <div className="title">{t('login')}</div>
        <div className="centered label-email">
          <label className="lbl-email-password lbl-email">{t('email')}</label>
          <input
            className="input-label input-email"
            type="email"
            placeholder="vanson297.nguyen@gmail.com"
            onChange={ this.updateInputValue }
            onFocus={ this.onFocus }
            ref={inputEmail => this.textInputEmail = inputEmail}
          />
        </div>
        <div className="centered label-password">
          <label className="lbl-email-password lbl-password">{t('password')}</label>
          <input
            className="input-label input-password"
            type="password"
            ref={inputPassword => this.textInputPassword = inputPassword}
            onFocus={ this.onFocus }
            placeholder="********"
          />
        </div>
        {this.state.isLoginError
          ?
            <div className="centered">
              <div className=" infor-err">*{t('infor-login-wrong')}</div>
            </div>
          :
            ''
        }
        <div className="centered">
          <div className="btn-login" onClick={ this.handleLogin }>
            {t('login')}
          </div>
        </div>
        <div className="reset-password">
          <Link
            to="/reset"
            className="link-to-reset-password"
          >
            {t('forgot_password')} ?
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    initLogs: state.initLogs,
    isLogin: state.isLogin
  }
}

export default withRouter(connect(mapStateToProps)(Login));
