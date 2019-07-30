import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, Modal } from 'react-native';
import styled from 'styled-components/native';
import Interactable from 'react-native-interactable';

export default class FilterComponent extends Component {
  constructor(props) {
    super(props);
    this.deltaX = new Animated.Value(0);
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent
        visible={this.props.visible}
        onRequestClose={this.props.onClose}
      >
        <Interactable.View
          horizontalOnly
          snapPoints={[{ x: 360 }, { x: 0, damping: 1 - 1 - 0.7, tension: 300 }, { x: -360 }]}
          onSnap={this.props.onClose}
          animatedValueX={this.deltaX}
        >
          <Animated.View
            style={[
              styles.card,
              {
                opacity: this.deltaX.interpolate({
                  inputRange: [-300, 0, 300],
                  outputRange: [0, 1, 0],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp'
                })
              }
            ]}
          >
            <StyledView>
              <StyledLeftView>
                <StyledImage source={require('../assets/evo.png')} />
                <StyledText>EVO CARS</StyledText>
              </StyledLeftView>
              <StyledSwitch
                onValueChange={this.props.onEvoToggle}
                value={this.props.evoVisible}
                onTintColor="#135589"
              />
            </StyledView>
            <StyledView>
              <StyledLeftView>
                <StyledImage source={require('../assets/car2go.png')} />
                <StyledText>CAR2GO CARS</StyledText>
              </StyledLeftView>
              <StyledSwitch
                onValueChange={this.props.onCar2GoToggle}
                value={this.props.car2GoVisible}
                onTintColor="#135589"
              />
            </StyledView>
            <StyledView>
              <StyledLeftView>
                <StyledImage source={require('../assets/modo.png')} />
                <StyledTextView>
                  <StyledText>MODO CARS</StyledText>
                  <StyledTextSmall>
                    (Available the next {this.props.modoHoursAvailable} hours)
                  </StyledTextSmall>
                </StyledTextView>
              </StyledLeftView>
              <StyledSwitch
                onValueChange={this.props.onModoToggle}
                value={this.props.modoVisible}
                onTintColor="#135589"
              />
            </StyledView>
            <StyledView>
              <StyledLeftView>
                <StyledImage source={require('../assets/bus.png')} />
                <StyledText>BUS</StyledText>
              </StyledLeftView>
              <StyledSwitch
                onValueChange={this.props.onBusToggle}
                value={this.props.busVisible}
                onTintColor="#135589"
              />
            </StyledView>
            <StyledView>
              <StyledLeftView>
                <StyledImage source={require('../assets/bike.png')} />
                <StyledText>MOBI BIKES</StyledText>
              </StyledLeftView>
              <StyledSwitch
                onValueChange={this.props.onMobiToggle}
                value={this.props.mobiVisible}
                onTintColor="#135589"
              />
            </StyledView>
          </Animated.View>
        </Interactable.View>
      </Modal>
    );
  }
}

FilterComponent.propTypes = {
  evoVisible: PropTypes.bool.isRequired,
  car2GoVisible: PropTypes.bool.isRequired,
  busVisible: PropTypes.bool.isRequired,
  onEvoToggle: PropTypes.func.isRequired,
  onCar2GoToggle: PropTypes.func.isRequired,
  onBusToggle: PropTypes.func.isRequired,
  mobiVisible: PropTypes.bool.isRequired,
  onMobiToggle: PropTypes.func.isRequired,
  modoVisible: PropTypes.bool.isRequired,
  modoHoursAvailable: PropTypes.number.isRequired,
  onModoToggle: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 10,
    height: 200,
    backgroundColor: '#EDFAFD',
    borderRadius: 6,
    marginHorizontal: 10,
    marginVertical: 100,
    shadowColor: '#7f7f7f',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 4,
    zIndex: 4
  }
});

const StyledView = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
`;

const StyledTextView = styled.View`
  flexDirection: column;
  justifyContent: space-between;
  alignItems: flex-start;
`;

const StyledLeftView = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
`;

const StyledSwitch = styled.Switch`
  zindex: 10;
  elevation: 10;
`;

const StyledImage = styled.Image`
  height: 30;
  width: 30;
  marginHorizontal: 20;
`;

const StyledImageLong = styled.Image`
  height: 15;
  width: 30;
  marginleft: 20;
  marginright: 10;
`;

const StyledText = styled.Text`
  color: #135589;
`;

const StyledTextSmall = styled.Text`
  fontSize: 10;
  color: #135589;
`;
