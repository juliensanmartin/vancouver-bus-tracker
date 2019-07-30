import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-native-elements';
import { View, Image } from 'react-native';

export default class IconMarkerComponent extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.marker) {
      const currentLat = this.props.marker.latlng.latitude;
      const currentLng = this.props.marker.latlng.longitude;
      const nextLat = nextProps.marker.latlng.latitude;
      const nextLng = nextProps.marker.latlng.longitude;
      return currentLat != nextLat || currentLng != nextLng;
    }
    return true;
  }

  render() {
    const { type, name, avlBikes } = this.props.marker;

    // let icon = {
    //   color: 'black',
    //   name: 'ios-car'
    // }
    // if (type === 'evoPin') {
    //   icon.color='black'
    //   icon.name='ios-car'
    // }
    // if (type==='car2GoPin') {
    //   icon.color='#00BCE2'
    //   icon.name='ios-car'
    // }

    let marker = null;
    if (type === 'Bus') {
      marker = (
        <Badge
          value={name}
          containerStyle={{ background-color: '#104f86' }}
          textStyle={{ color: '#FFDD33' }}
        />
      );
    } else if (type === 'Evo') {
      marker = <Image source={require('../assets/evo.png')} style={{ width: 40, height: 40 }} />;
    } else if (type === 'Mobi Bike') {
      marker = (
        <Badge
          value={avlBikes}
          containerStyle={{ background-color: '#008ABF' }}
          textStyle={{ color: '#ffffff' }}
        />
      );
    } else if (type === 'Modo') {
      marker = <Image source={require('../assets/modo.png')} style={{ width: 40, height: 40 }} />;
    } else {
      marker = <Image source={require('../assets/car2go.png')} style={{ width: 30, height: 30 }} />;
      // marker = <Icon type='ionicon' size={ 30 } name={icon.name} color={icon.color}/>
    }

    return <View>{marker}</View>;
  }
}

IconMarkerComponent.propTypes = {
  marker: PropTypes.object.isRequired
};
