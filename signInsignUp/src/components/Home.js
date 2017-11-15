import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import '../styles/Home.scss';

type Props = {};

type States = {
  isLogin: boolean
};

class Home extends React.Component <Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLogin: false
    }
  }

  render() {
    const { t, i18n } = this.props.i18next;
    return (
      <div className="home-component">
        <div className="title-content">{t('about_us')}</div>
        <div className="content-about-us">
          This is react training course. This course is guided by Mr.Dung who has more 3 year expericene with reactjs.
          And now, he is co-founder of Gemsoft software company, located at 110 Ba Trieu street, Hai Ba trung, Ha Noi.
          Below is content of course:
        </div>
        <div className="detail-lession">
          <div className="lession">{t('lesstion1')}: Basic reactjs</div>
          <div className="lession">{t('lesstion2')}: Redux</div>
          <div className="lession">{t('lesstion3')}: Expandable Text</div>
          <div className="lession">{t('lesstion4')}: Redux Form</div>
          <div className="lession">{t('lesstion5')}: Google Map</div>
          <div className="lession">{t('lesstion6')}: Input Mask</div>
          <div className="lession">{t('lesstion7')}: Input Mask Advanced</div>
          <div className="lession">{t('lesstion8')}: Signin-Signup</div>
        </div>
        <div className="content-about-us">
          {t('login_now')} &nbsp;&nbsp;&nbsp;
          <Link to="/login" className="btn-login-in-content">{t('login')}</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogin: state.isLogin
  }
}

export default withRouter(connect(mapStateToProps)(Home));
