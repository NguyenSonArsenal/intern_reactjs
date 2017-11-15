/* eslint-disable require-jsdoc */
'use strict';

import React from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment-timezone';
import _ from 'lodash';

import '../styles/AvatarBlurbSkill.scss';
import InlineEditor from './InlineEditor';

// es6
class AvatarBlurbSkill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      idActiveMode: -1,
      sortOrder: -1
    }
  }

  handleEdit(index) {
    this.setState({
      isEditMode: true,
      idActiveMode: index
    });
  }

  handleSort(e) {
    this.setState({sortOrder: e.target.id});
  }

  sortTimezoneArea(area) {
    let clone = [...this.props.skills];
    let timeArea = [];
    clone.map(function(value, index) {
      timeArea[index] = moment.tz(value.date_added, area);
      clone[index] = {...value, date_added: timeArea[index]};
    });
    return clone;
  }

  sort(sortby) {
    let clone = [...this.props.skills];
    if (sortby == 'asc') {
      clone = _.orderBy(clone, 'date_added');
    } else if (sortby == 'desc') {
      clone = _.orderBy(clone, 'date_added').reverse();
    } else if (sortby == 'Asia/Tokyo' || sortby == 'Asia/Bangkok' || sortby == 'Europe/London' ) {
      clone = this.sortTimezoneArea(sortby);
    }
    return clone;
  }

  handChangeStatusEditLink() {
    this.setState({isEditMode: !this.state.isEditMode});
  }

  render() {
    let clone = [...this.props.skills];
    let sortby = this.state.sortOrder;
    clone = this.sort(sortby);
    return (
      <div>
        <div className="choose-timezone">
          <span>TimeZone: </span>
          <input
            type="radio"
            name="timezone"
            value=""
            id="Asia/Tokyo"
            onClick={this.handleSort.bind(this)} />
          <label>Tokio</label>
          <input
            type="radio"
            name="timezone"
            value=""
            defaultChecked={true}
            id="Asia/Bangkok"
            onClick={this.handleSort.bind(this)} />
          <label>HaNoi</label>
          <input
            type="radio"
            name="timezone"
            value=""
            id="Europe/London"
            onClick={this.handleSort.bind(this)} />
          <label>London</label>
        </div>
        {clone.map((skill, index, skills) => (
          <div className="control" key={index}>
            <div className="thumb-avatar">
              <img
                src={skill.avatar}
                alt="image name"
                height="42"
                width="42" />
            </div>
            <div className="extends">
              <div className="bold-txt">{skill.name}</div>
              <div className="title">
                <span
                  className="max-character-length">
                  {skill.tagline} &nbsp;
                </span>
                <a
                  className="edit"
                  href="#"
                  onClick={this.handleEdit.bind(this, skill.id)} >
                  Edit
                </a>
              </div>
              <div>
                <Moment
                  format="MMMM DD, YYYY hh:mm A">
                  {skill.date_added}
                </Moment>
              </div>
            </div>
            <div className="clear"></div>
            {(this.state.isEditMode == true && this.state.idActiveMode == skill.id)
              ? <InlineEditor
                tagline = {skill.tagline}
                index = {skill.id}
                isEditMode = {this.state.isEditMode}
                onChange = {this.handChangeStatusEditLink.bind(this)}
              />
              :null}
          </div>
        ))}
        <div className="control-arrange">
          <div
            className="btn-arrange"
            id="asc"
            onClick={this.handleSort.bind(this)} >
            Ascending Time
          </div>
          <div
            className="btn-arrange"
            id="desc"
            onClick={this.handleSort.bind(this)} >
            Descending Time
          </div>
        </div>
      </div>
    );
  }
}

// nodejs
export default connect(function(state) {
  return {skills: state.skills}
})(AvatarBlurbSkill);

// apply hot reloading, if no, the page will reload when change somthing
module.hot.accept();
