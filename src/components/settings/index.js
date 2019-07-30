import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import { Slider } from 'react-native-elements';

export default class SettingsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1
    };
  }

  componentWillMount() {
    this.setState({ value: this.props.currentNumberHours });
  }

  render() {
    const { currentNumberHours, setNumberHours } = this.props;

    return (
      <StyledView>
        <StyledText>
          MODO Hours Requested : <StyledHours>{this.state.value}</StyledHours>
        </StyledText>
        <Slider
          value={currentNumberHours}
          onValueChange={value => this.setState({ value })}
          onSlidingComplete={setNumberHours}
          minimumValue={1}
          maximumValue={24}
          step={1}
        />
      </StyledView>
    );
  }
}

SettingsComponent.propTypes = {
  currentNumberHours: PropTypes.number.isRequired,
  setNumberHours: PropTypes.func.isRequired
};

const StyledView = styled.View`
  justify-content: center;
  padding-horizontal: 20;
  padding-vertical: 20;
`;

const StyledText = styled.Text`
  align-self: center;
  font-size: 16;
`;

const StyledHours = styled.Text`
  color: #135589;
  font-size: 16;
`;
