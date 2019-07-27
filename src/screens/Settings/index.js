import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SettingsComponent from '../../components/Settings/settings'
import { setModoHoursAvailable } from '../../store/Car/actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

class Settings extends Component {
  render() {
    return (
      <SettingsComponent
        currentNumberHours={this.props.currentNumberHours}
        setNumberHours={this.props.onHoursChange}/>
    )
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentNumberHours: PropTypes.number.isRequired,
  onHoursChange: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    currentNumberHours: state.car.modo.hoursAvailable
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onHoursChange: (hours) => {
      dispatch(setModoHoursAvailable(hours))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
