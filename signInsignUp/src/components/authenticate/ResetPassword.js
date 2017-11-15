import React from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import '../../styles/authenticate/ResetPassword.scss';

const helper = require('../../../helpers/helper');

type Props = {};

type States = {
  redirectToLogin: boolean,
  isShowFormInputPassword: boolean,
  valueInputEmail: string,
  valueInputPassword: string,
  isNoEmail: boolean,
  isResetError: boolean
};

class ResetPassword extends React.Component <Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      redirectToLogin: false,
      valueInputEmail: '',
      valueInputPassword: '',
      isShowFormInputPassword: false,
      isNoEmail: false,
      isResetError: false
    }
  }

  handleChangeEmailResetInput = (e) => {
    const email = e.target.value;
    this.setState({
      valueInputEmail: email
    })
  };

  handleChangePasswordResetInput = (e) => {
    this.setState({
      valueInputPassword: e.target.value
    })
  };

  handleCancelResetPassword = () => {
    this.setState({redirectToLogin: true});
  };

  handleResetPassword = (e) => {
    const email = this.state.valueInputEmail;
    const isEmail = helper.validateEmail(email);
    const isEmailInDb = helper.checkExitEmail(this.props.initLogs, email);

    if (!isEmail) {
      this.setState({isNoEmail: true});
      return;
    }

    if (isEmail && !isEmailInDb) {
      this.setState({isNoEmail: true});
    }

    if (isEmail && isEmailInDb) {
      const password = this.state.valueInputPassword;

      this.setState({
        isShowFormInputPassword: true,
      });

      if (password) {
        this.props.dispatch({
          type: 'RESET_PASSWORD', email, password
        });
        this.setState({
          redirectToLogin: true
        });
      } else {
        this.setState({
          isResetError: true,
        });
      }
    }
  };

  onFocus = () => {
    this.setState({isNoEmail: false});
  };

  render() {
    const { t, i18n } = this.props.i18next;
    const { redirectToLogin, isShowFormInputPassword, valueInputEmail, valueInputPassword } = this.state;

    if (redirectToLogin) {
      return <Redirect to='/login'/>;
    }

    return (
      <div className="reset-password-component">
        <div className="centered label-email">
          <div className="title">{t('reset_password')}</div>
          <div className="some-txt">
            {t('some_text_reset')}
          </div>
          <div className="lbl-email-password">{t('email')}</div>
          <input
            autoComplete="off"
            className="txt-input"
            type="email"
            onChange={this.handleChangeEmailResetInput}
            onFocus={ this.onFocus }
            placeholder="vanson297.nguyen@gmail.com"
            value={valueInputEmail}
          />
        </div>
        {this.state.isNoEmail
          ?
            <div className="centered">
              <div className="infor-err">
                *{t('no_email')}
              </div>
            </div>
          :
            ''
        }
        {isShowFormInputPassword
          ?
            <div className="centered label-password">
              <p className="lbl-email-password">{t('password')}</p>
              <input
                className="txt-input"
                type="password"
                onChange={this.handleChangePasswordResetInput}
                ref={inputPassword => this.textInputPassword = inputPassword}
                placeholder="********"
                value={valueInputPassword}
              />
            </div>
          :
            ''
        }
        {this.state.isResetError
          ?
          <div className="centered">
            <div className="infor-err">
              *{t('enter_password')}
            </div>
          </div>
          :
          ''
        }
        <div className="centered btn-control">
          <div
            className="btn-cancel-login btn-cancel"
            onClick={ this.handleCancelResetPassword }
          >
            {t('cancel')}
          </div>
          <div
            className="btn-cancel-login btn-reset"
            onClick={ this.handleResetPassword }
          >
            {t('reset')}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    initLogs: state.initLogs
  }
}

export default withRouter(connect(mapStateToProps)(ResetPassword));
