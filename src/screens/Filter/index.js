import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilterComponent from '../../components/filter';
import {
  setEvoVisibility,
  setCar2GoVisibility,
  setBusVisibility,
  setMobiVisibility,
  setModoVisibility
} from '../../store/car/actions';
import {
  getCar2GoVisibility,
  getEvoVisibility,
  getBusVisibility,
  getMobiVisibility,
  getModoVisibility,
  getModoHoursAvailable
} from '../../store/car/selectors';

class Filter extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.visible;
  }

  render() {
    return (
      <FilterComponent
        car2GoVisible={this.props.car2GoVisible}
        evoVisible={this.props.evoVisible}
        onEvoToggle={this.props.onEvoToggle}
        onCar2GoToggle={this.props.onCar2GoToggle}
        onBusToggle={this.props.onBusToggle}
        busVisible={this.props.busVisible}
        onMobiToggle={this.props.onMobiToggle}
        mobiVisible={this.props.mobiVisible}
        onModoToggle={this.props.onModoToggle}
        modoVisible={this.props.modoVisible}
        modoHoursAvailable={this.props.modoHoursAvailable}
        visible={this.props.visible}
        onClose={this.props.onClose}
      />
    );
  }
}

Filter.propTypes = {
  evoVisible: PropTypes.bool.isRequired,
  car2GoVisible: PropTypes.bool.isRequired,
  onEvoToggle: PropTypes.func.isRequired,
  onCar2GoToggle: PropTypes.func.isRequired,
  busVisible: PropTypes.bool.isRequired,
  onBusToggle: PropTypes.func.isRequired,
  mobiVisible: PropTypes.bool.isRequired,
  onMobiToggle: PropTypes.func.isRequired,
  modoVisible: PropTypes.bool.isRequired,
  modoHoursAvailable: PropTypes.number.isRequired,
  onModoToggle: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    evoVisible: getEvoVisibility(state),
    car2GoVisible: getCar2GoVisibility(state),
    busVisible: getBusVisibility(state),
    mobiVisible: getMobiVisibility(state),
    modoVisible: getModoVisibility(state),
    modoHoursAvailable: getModoHoursAvailable(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onEvoToggle: visible => {
      dispatch(setEvoVisibility(visible));
    },
    onCar2GoToggle: visible => {
      dispatch(setCar2GoVisibility(visible));
    },
    onBusToggle: visible => {
      dispatch(setBusVisibility(visible));
    },
    onMobiToggle: visible => {
      dispatch(setMobiVisibility(visible));
    },
    onModoToggle: visible => {
      dispatch(setModoVisibility(visible));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
