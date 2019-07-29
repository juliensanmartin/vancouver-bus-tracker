import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import styled from 'styled-components/native';
import LoaderComponent from '../Loader/loader';
import ToastComponent from '../Toast/index';
import IconMarkerComponent from '../../components/IconMarker/icon-marker';
import CarDetailsScreen from '../../screens/CarDetails/index';
import FilterScreen from '../../screens/Filter/index';
import { debounce } from 'lodash';

const initialRegion = {
  latitude: 49.2800565,
  longitude: -123.1212937,
  latitudeDelta: 0.00461,
  longitudeDelta: 0.002105
};

const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

export default class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPosition: null,
      errorGPS: false,
      locationFetched: false,
      showCarDetailsModal: false,
      marker: null,
      showFilterModal: false,
      canRefresh: false
    };

    this.onHideCarDetailsScreen = this.onHideCarDetailsScreen.bind(this);
    this.onHideFilterScreen = this.onHideFilterScreen.bind(this);

    this.debouncedOnRegionChangeComplete = debounce(
      this.props.onRegionChangeComplete,
      1000
    );
    this.debouncedOnRegionChange = debounce(this.props.onRegionChange, 950);
  }

  startTimerRefresh() {
    this.setState({ canRefresh: false });
    setTimeout(() => {
      this.setState({ canRefresh: true });
    }, 60000);
  }

  componentDidMount() {
    this.startTimerRefresh();
    navigator.geolocation.getCurrentPosition(
      position => {
        this.props.onPositionFetched(position.coords);
        if (this.props.positionInVancouver) {
          this.setState({
            currentPosition: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            locationFetched: true
          });
        } else {
          this.setState({
            currentPosition: {
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude
            },
            locationFetched: true
          });
        }
        this.onCurrentPositionFetch();
      },
      error => {
        this.setState({
          errorGPS: true,
          locationFetched: true,
          currentPosition: {
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude
          }
        });
        this.onCurrentPositionFetch();
      },
      {
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  onCurrentPositionFetch() {
    const currentRegion = {
      latitude: this.state.currentPosition.latitude,
      longitude: this.state.currentPosition.longitude,
      latitudeDelta: initialRegion.latitudeDelta,
      longitudeDelta: initialRegion.longitudeDelta
    };
    this.map.animateToRegion(currentRegion);
  }

  onMarkerPress(marker) {
    this.map.fitToCoordinates([marker.latlng, this.state.currentPosition], {
      edgePadding: DEFAULT_PADDING,
      animated: true
    });
    this.setState({ showCarDetailsModal: true, marker });
  }

  onHideCarDetailsScreen() {
    this.setState({ showCarDetailsModal: false });
  }

  onFilterPress() {
    this.setState({ showFilterModal: true });
  }

  onHideFilterScreen() {
    this.setState({ showFilterModal: false });
  }

  onRefreshPress() {
    this.startTimerRefresh();
    this.props.refreshMap();
  }

  render() {
    return (
      <MapContainer>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          showsUserLocation={this.props.positionInVancouver}
          followsUserLocation={this.props.positionInVancouver}
          showsMyLocationButton={this.props.positionInVancouver}
          showsPointsOfInterest={false}
          showsBuildings={false}
          showsIndoors={false}
          toolbarEnabled={false}
          style={styles.map}
          onRegionChangeComplete={this.debouncedOnRegionChangeComplete}
          onRegionChange={this.debouncedOnRegionChange}
          initialRegion={initialRegion}
        >
          {this.props.markers.map(marker => (
            <MapView.Marker
              key={marker.id}
              coordinate={marker.latlng}
              onPress={() => this.onMarkerPress(marker)}
            >
              <IconMarkerComponent marker={marker} />
            </MapView.Marker>
          ))}
          {this.props.direction && (
            <MapView.Polyline
              coordinates={this.props.direction}
              strokeWidth={4}
              strokeColor="#6699ff"
            />
          )}
        </MapView>
        {this.state.showCarDetailsModal && (
          <CarDetailsScreen
            visible={this.state.showCarDetailsModal}
            marker={this.state.marker}
            currentPosition={this.state.currentPosition}
            onClose={this.onHideCarDetailsScreen}
          />
        )}
        <TouchableOpacityStyle>
          <Icon
            type="font-awesome"
            size={20}
            name="sliders"
            onPress={() => this.onFilterPress()}
            color="#135589"
            reverse
            raised
          />
          {this.state.canRefresh && (
            <Icon
              type="font-awesome"
              size={20}
              name="refresh"
              onPress={() => this.onRefreshPress()}
              color="#135589"
              reverse
              raised
            />
          )}
        </TouchableOpacityStyle>
        {this.state.showFilterModal && (
          <FilterScreen
            visible={this.state.showFilterModal}
            onClose={this.onHideFilterScreen}
          />
        )}
        <LoaderContainer>
          <LoaderComponent animating={this.props.loading} />
        </LoaderContainer>
        <View>
          <ToastComponent
            message="Problems to locate your position"
            visible={this.state.errorGPS}
          />
          <ToastComponent
            message="Problems to retrieve vehicles"
            visible={this.props.errorApi !== ''}
          />
          <ToastComponent
            message="You are not in Vancouver area"
            visible={
              !this.props.positionInVancouver && this.state.locationFetched
            }
          />
          <ToastComponent
            message="There is no vehicle around you"
            visible={
              this.props.markers.length === 0 &&
              this.props.positionInVancouver &&
              !this.props.loading &&
              this.props.errorApi === ''
            }
            clickable={false}
          />
        </View>
      </MapContainer>
    );
  }
}

MapComponent.propTypes = {
  markers: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
  direction: PropTypes.array,
  onRegionChangeComplete: PropTypes.func.isRequired,
  onRegionChange: PropTypes.func.isRequired,
  onPositionFetched: PropTypes.func.isRequired,
  positionInVancouver: PropTypes.bool.isRequired,
  errorApi: PropTypes.string.isRequired,
  refreshMap: PropTypes.func.isRequired
};

const MapContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  alignitems: center;
  backgroundcolor: #f5fcff;
`;

const TouchableOpacityStyle = styled.TouchableOpacity`
  align-self: flex-start;
  flex: 1;
`;

const LoaderContainer = styled.View`
  align-self: center;
  flex: 1;
`;

// But need to styled-components this one!!
const styles = StyleSheet.create({
  map: {
    // width: Screen.width,
    // height: Screen.height
    ...StyleSheet.absoluteFillObject
  }
});
