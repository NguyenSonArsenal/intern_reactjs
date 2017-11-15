import React from 'react';
import Modal from 'react-modal';
import update from 'immutability-helper';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import GoogleMapComponent from './use_components/GoogleMapPlace.js';
import '../../styles/dashboard/index.scss';

type Props = {};

type States = {
  modalIsOpen: boolean,
  location: ?Array<any>
};

class ReactModal extends React.Component <Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      location: []
    }
  }

  openModal = () => this.setState({modalIsOpen: true});

  closeModal = () => this.setState({modalIsOpen: false});

  handleCloseModal = value => this.setState({modalIsOpen: value});

  handleAddLocation = location => {
    if (this.state.location) {
      let clone = [...this.state.location];
      let addLocation = update(clone, {$push: [location]});
      this.setState({location: addLocation});
    }
  };

  handleLogout = () => {
    this.props.dispatch({
      type: 'LOGOUT'
    })
  };

  render() {
    const { t } = this.props.i18next;
    let node = null;
    if (this.state.location) {
      let cloneLocation = [...this.state.location];
      node = (
        <div className="list_location" >
          {cloneLocation.map((location, index, locations) => (
            <div className="thumb_avatar" key={index}>
              <img
                src={'/images/maps-pin.png'}
                alt=" "
                height="22"
                width="22"
                className="icon_for_location"
              />
              <span className="location">{location}</span>
            </div>
          ))}
        </div>
      )
    }
    return (
      <div className="dashboard-component">
        <div className="main">
          <Link
            to="/"
            className="link_logout"
            onClick={this.handleLogout}
          >
            {t('logout')}
          </Link>
          {node}
          <div
            onClick={this.openModal}
            className="btn_add_location"
            title="click to add location"
          >
            {t('add_location')}
          </div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          className="modal_overlay_content"
          shouldCloseOnOverlayClick={false}
          closeTimeoutMS={2000}
        >
          <GoogleMapComponent
            isOpenModal={this.state.modalIsOpen}
            handleCloseModal={this.handleCloseModal}
            handleAddLocation={this.handleAddLocation}
          />
        </Modal>
        <div className="detail-lession">
          <div className="title">This is all lession of the course</div>
          <div className="lession">
            <Link to="/dashboard/lession1" className="link_lessions">
              {t('lesstion1')}: Basic reactjs
            </Link>
          </div>
          <div className="lession">
            <Link to="/dashboard/lession2" className="link_lessions" >
              {t('lesstion2')}: Redux
            </Link>
          </div>
          <div className="lession">
            <Link to="/dashboard/lession3" className="link_lessions" >
              {t('lesstion3')}: Expandable
            </Link>
          </div>
          <div className="lession">{t('lesstion4')}: Redux Form</div>
          <div className="lession">
            <Link to="/dashboard/lession5" className="link_lessions" >
              {t('lesstion5')}: Google Map
            </Link>
          </div>
          <div className="lession">
            <Link to="/dashboard/lession6" className="link_lessions" >
              {t('lesstion6')}: Input Mask
            </Link>
          </div>
          <div className="lession">{t('lesstion7')}: Signin-Signup</div>
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

export default withRouter(connect(mapStateToProps)(ReactModal));
