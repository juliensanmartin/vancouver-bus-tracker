import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapComponent from '../../components/map';
import { fetchVisibleCars, updateRegion, activateLoader } from '../../store/car/actions';
import { checkPositionInVancouver, resetDirection } from '../../store/distance/actions';
import { isLoaded, getRegionMarkers } from '../../store/car/selectors';

class Map extends Component {
  componentDidMount() {
    this.props.dispatch(fetchVisibleCars());
  }

  componentWillUnmount() {
    this.props.dispatch(resetDirection());
  }

  onRefreshMap() {
    this.props.dispatch(fetchVisibleCars());
    this.props.dispatch(activateLoader());
  }

  render() {
    return (
      <MapComponent
        markers={this.props.markers}
        loading={this.props.loading}
        navigation={this.props.navigation}
        direction={this.props.direction}
        onRegionChangeComplete={this.props.onRegionChangeComplete}
        onRegionChange={this.props.onRegionChange}
        onPositionFetched={this.props.onPositionFetched}
        positionInVancouver={this.props.positionInVancouver}
        errorApi={this.props.errorApi}
        refreshMap={() => this.onRefreshMap()}
      />
    );
  }
}

Map.propTypes = {
  markers: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  onRegionChangeComplete: PropTypes.func.isRequired,
  onRegionChange: PropTypes.func.isRequired,
  onPositionFetched: PropTypes.func.isRequired,
  positionInVancouver: PropTypes.bool.isRequired,
  errorApi: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    markers: getRegionMarkers(state),
    loading: !isLoaded(state),
    direction: state.distance.direction,
    positionInVancouver: state.distance.positionInVancouver,
    errorApi: state.errors.errorApi
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRegionChangeComplete: region => {
      dispatch(updateRegion(region));
    },
    onRegionChange: () => {
      dispatch(activateLoader());
    },
    onPositionFetched: coord => {
      dispatch(checkPositionInVancouver(coord));
    },

    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
