/* eslint-disable require-jsdoc */
'use strict';

import React from 'react';
import '../styles/InlineEditor.scss';
import {connect} from 'react-redux';

let classNames = require('classnames');

class InlineEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagline: this.props.tagline,
      idInlineEditor: this.props.index,
      isEditMode: this.props.isEditMode
    }
  }

  handleChange = (e) => {
    this.setState({
      tagline: e.target.value
    });
  }

  handleCancel(index) {
    this.props.onChange(index);
  }

  handleSave(id, tagline) {
    this.props.dispatch({
      type: 'EDIT_TAGLINE', tagline, id
    });
    this.props.onChange(id);
  }

  moveCaretAtEnd(e) {
    let tempValue = e.target.value + ' ';
    e.target.value = '';
    e.target.value = tempValue;
  }

  render() {
    const {index} = this.props;
    return (
      <div className={classNames('inline-editor')}>
        <div className="editor">
          <input
            autoFocus
            onFocus={this.moveCaretAtEnd}
            onChange={this.handleChange}
            className="input-editor"
            defaultValue={this.state.tagline}
            type="text" />
        </div>
        <div className="control-edit">
          <div
            className="btn-control margin-left"
            onClick={() => this.handleCancel(index)}>
            Cancel
          </div>
          <div
            className="btn-control btn-save"
            onClick={() => this.handleSave(index, this.state.tagline)}>>
            Save
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        skills: state.skills,
    };
}
export default connect(mapStateToProps)(InlineEditor);

module.hot.accept();
