import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import ExpandableTextComponent from './use_components/Co-ExpandableText.js';
import '../../styles/dashboard/ExpandableText.scss';

type Props = {};

type States = {
  txtTextAreaToTest: string,
  height: string
};

class ExpandableText extends React.Component <Props, States>{
  constructor(props: Props) {
    super(props);
    this.state = {
      txtTextAreaToTest: '',
      height: 0
    }
  }

  handleChangeInputTextArea = e => {
    this.setState({
      txtTextAreaToTest: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <ExpandableTextComponent maxHeightDefault = {85}>
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
          VÌ CHÍNH EM THÔI, NGƯỜI MÀ ANH YÊU NHẤT ĐỜI
        </ExpandableTextComponent>
        <textarea
          className = "txtTest"
          autoFocus={true}
          rows = "15"
          name = "txtToTest"
          value = {this.state.txtTextAreaToTest}
          // onChange = {this.handleChangeInputTextArea}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogin: state.isLogin
  }
}

export default withRouter(connect(mapStateToProps)(ExpandableText));
