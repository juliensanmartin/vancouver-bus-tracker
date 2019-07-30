import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SettingsComponent from '../../components/settings';
import { setModoHoursAvailable } from '../../store/car/actions';

function Settings({ currentNumberHours, onHoursChange }) {
  return (
    <SettingsComponent currentNumberHours={currentNumberHours} setNumberHours={onHoursChange} />
  );
}

Settings.propTypes = {
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
