import React, { Component } from './node_modules/react';
import PropTypes from './node_modules/prop-types';
import { View, Text } from 'react-native';
import styled from './node_modules/styled-components/native';
import { Slider } from './node_modules/react-native-elements';

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
  justifycontent: center;
  paddinghorizontal: 20;
  paddingvertical: 20;
`;

const StyledText = styled.Text`
  align-self: center;
  fontsize: 16;
`;

const StyledHours = styled.Text`
  color: #135589;
  fontsize: 16;
`;
