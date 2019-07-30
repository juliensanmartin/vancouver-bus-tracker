import React, { Component } from './node_modules/react';
import PropTypes from './node_modules/prop-types';
import { View } from 'react-native';
import Animation from 'lottie-react-native';

export default class LoaderComponent extends Component {
  componentDidMount() {
    this.animation.play();
  }

  componentDidUpdate() {
    if (this.animation) this.animation.play();
  }

  render() {
    return (
      <View>
        {this.props.animating && (
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 150,
              height: 150
            }}
            loop
            source={require('./assets/loader_ring.json.js')}
          />
        )}
      </View>
    );
  }
}

LoaderComponent.propTypes = {
  animating: PropTypes.bool.isRequired
};
