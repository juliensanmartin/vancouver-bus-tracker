import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CarDetailsComponent from '../../components/CarDetails/car-details'
import { fetchDistance, fetchDirection } from '../../store/Distance/actions'
import { propagateErrorLinking } from '../../store/Error/actions'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

class CarDetails extends Component {
  componentWillMount() {
    const {currentPosition, marker, positionInVancouver, dispatch} = this.props
    if (positionInVancouver) {
      Promise.all([
        dispatch(fetchDistance(currentPosition, marker.latlng)),
        dispatch(fetchDirection(currentPosition, marker.latlng))
      ])
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.visible
  }

  render() {
    return (
      <CarDetailsComponent
        marker={this.props.marker}
        distance={this.props.distance}
        positionInVancouver={this.props.positionInVancouver}
        onLinkingError={this.props.onLinkingError}
        errorLinking={this.props.errorLinking}
        visible={this.props.visible}
        onClose={this.props.onClose}/>
    )
  }
}

CarDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  positionInVancouver: PropTypes.bool.isRequired,
  onLinkingError: PropTypes.func.isRequired,
  errorLinking: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  marker: PropTypes.object.isRequired,
  currentPosition: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    distance: state.distance.distance,
    positionInVancouver: state.distance.positionInVancouver,
    errorLinking: state.errors.errorLinking
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onLinkingError: (message) => {
      dispatch(propagateErrorLinking(message))
    },
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarDetails)
