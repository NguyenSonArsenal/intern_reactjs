// @flow
'use strict';

import React from 'react';
import FaAngleDoubleUp from 'react-icons/lib/fa/angle-double-up';
import FaAngleDoubleDown from 'react-icons/lib/fa/angle-double-down';
import classNames from 'classnames';

import '../styles/ExpandableText.scss';

type Props = {
  children: any,
  maxHeight: number
};

type States = {
  status: number,
  clientHeight: number,
  maxHeight: number,
  isFading: boolean,
  isShowMore: boolean
};

// es6
class ExpandableText extends React.Component <Props, States> {
  divContent: ?HTMLDivElement;
  constructor(props: Props) {
    super(props);
    this.state = {
      status: 0,
      clientHeight: 0,
      maxHeight: 80,
      isFading: false,
      isShowMore: true
    }
  }

  // render() xong thi chay luon ham nay // Chi chay 1 lan duy nhat sau khi render lan dau tien
  componentDidMount() {
    const clientHeight = this.divContent && this.divContent.scrollHeight;
    if (clientHeight) {
      this.setState({ clientHeight });
    }
  }

  componentDidUpdate() {
    this.updateHeight();
  }

  updateHeight(){
    const clientHeight = this.divContent ? this.divContent.scrollHeight : 0;
    console.log(typeof(clientHeight));
    if (this.state.clientHeight != clientHeight) {
      this.setState({clientHeight});
    }
    // this.setState({ clientHeight });
  }

  handleShowMore() {
    const clientHeight = this.divContent ? this.divContent.scrollHeight : 0;
    console.log('clientHeight show more: ' + this.state.clientHeight);
    this.setState({
      maxHeight: this.state.clientHeight,
      isFading: !this.state.isFading
    });
    setTimeout(() => this.setState({isShowMore: !this.state.isShowMore}), 2000);
  }

  handleShowLess() {
    this.setState({
      maxHeight: 80,
      isFading: !this.state.isFading
    });
    setTimeout(() => this.setState({isShowMore: !this.state.isShowMore}), 3500);
  }

  renderContent(check: boolean) {
    if (check) {
      if (this.state.isShowMore) {
        return <a
          className="showmore"
          href="#"
          onClick={this.handleShowMore.bind(this)}
          title="See all"
        >
          <FaAngleDoubleDown />
            <span className="titleMoreLess">More</span>
        </a>
      } else {
        return <a
          className="showless"
          href="#"
          onClick={this.handleShowLess.bind(this)}
          title="Collapse"
        >
          <FaAngleDoubleUp />
          <span className="titleMoreLess">Less</span>
        </a>
      }
    } else {
      console.log('No appear button More and Less => No gradient');
    }
  }

  render() {
    console.log('Client height init: '+this.state.clientHeight);
    console.log('maxHeight: '+this.state.maxHeight);
    console.log('maxHeight props: '+this.props.maxHeight);
    let check = this.state.clientHeight >= this.props.maxHeight;
    let divContentStyleShowMoreLess = {
      maxHeight: this.state.maxHeight
    };
    let txtClasses = classNames({
      'content': true,
      'fading': this.state.isFading,
      'gradient': !check
    });
    return (
      <div className="show_hide_text">
        <div
          className={txtClasses}
          style={divContentStyleShowMoreLess}
          ref={(divContent) => {this.divContent = divContent}}>
          <div>{this.props.children}</div>
        </div>
        <br/>
        {this.renderContent(check)}
      </div>
    );
  }
}

export default ExpandableText;
