import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SettingsComponent from '../../components/settings';
import { setModoHoursAvailable } from '../../store/car/actions';

function Settings() {
  return (
    <SettingsComponent
      currentNumberHours={this.props.currentNumberHours}
      setNumberHours={this.props.onHoursChange}
    />
  );
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentNumberHours: PropTypes.number.isRequired,
  onHoursChange: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    currentNumberHours: state.car.modo.hoursAvailable
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onHoursChange: hours => {
      dispatch(setModoHoursAvailable(hours));
    },
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
