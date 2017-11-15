/* eslint-disable require-jsdoc */
'use strict';

import React from 'react';
import {Field, reduxForm} from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '../styles/react-datepicker.css';
import _ from 'lodash';

import '../styles/FormAddSkill.scss';

class FormAddSkill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: this.props.skills
    }
  }

  addMessage = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('You press enter');
      return false;
    }
  };

  handleCancelSubmit = (e) => {
    e.preventDefault();
    let isShowFormAddSkill = -1;
    this.props.handleShowForm(isShowFormAddSkill);
  };

  renderField = ({label, type, input, meta: {touched, error}}) => (
    <div className="input-row">
      <label className="lbl">{label}</label>
      <input {...input} type={type} placeholder={'Enter ' + label}
      onKeyPress={this.addMessage} />
      {touched && error && <div className="show-error">{error}</div>}
    </div>
  );

  renderDatePicker = ({label, type, input, meta: {touched, error}}) => (
    <div className="input-row">
      <label className="lbl">{label}</label>
      <div className="inputDateAdded">
        <DatePicker
          selected={input.value}
          onChange={input.onChange}
          showTimeSelect
          timeIntervals={15}
          dateFormat="LLL"
         />
      </div>
      {touched && error && <div className="show-error">{error}</div>}
    </div>
  );

  render() {
    return (
      <form action="" onSubmit={this.props.handleSubmit} className="form-add-skill">
         <Field name="name" label="Skill_name"
                type="text" component={this.renderField}
         />
         <Field name="tagline" label="Tag_line"
                type="text" component={this.renderField}
         />
         <Field name="date_added" label="Date_added"
                type="text"
                component={this.renderDatePicker}
         />
         <button className="btnCancel" type="submit"
                 onClick={this.handleCancelSubmit}
         >
           Cancel
         </button>
         <button className="btnSubmit" type="submit"
         >
           Submit
         </button>
      </form>
    );
  }
}

const validate = (values, props) => {
  const errors = {};
  const skills = props.skills; // Obj
  if (!values.name) {
    errors.name = 'Required*';
  }
  if (!values.tagline) {
    errors.tagline = 'Required*';
  }
  if (!values.date_added) {
    errors.date_added = 'Required*';
  }
  // skills.map(function(skill, index) {
  //   if (values.name && values.name === skill.name) {
  //     errors.name = 'SkillName is unique';
  //   }
  // });

  let i;
  let skillsLength = skills.length;
  for (i=0; i<skillsLength; i++) {
    if (values.name && values.name === skills[i].name) {
      errors.name = 'SkillName is unique';
      break;
    }
  }

  return errors
};

export default reduxForm({
  form: 'add_skill', // a unique identifier for this form
  validate: validate // <--- validation function given to redux-form
})(FormAddSkill);

module.hot.accept();

