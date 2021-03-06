import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export default class ToastComponent extends Component {
  state = {
    toastVisible: true
  };

  hideToast() {
    this.setState({ toastVisible: false });
  }

  render() {
    return (
      <View>
        {this.props.visible && this.state.toastVisible && (
          <TouchableOpacity
            onPress={() => {
              if (this.props.clickable) this.hideToast();
            }}
          >
            <StyledContainer>
              <StyledText>{this.props.message}</StyledText>
            </StyledContainer>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

ToastComponent.propTypes = {
  visible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  clickable: PropTypes.bool
};

ToastComponent.defaultProps = {
  clickable: true
};

const StyledContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-vertical: 30;
  margin-horizontal: 30;
  height: 50;
  width: 300;
  background-color: #2a93d5;
  opacity: 0.7;
`;

const StyledText = styled.Text`
  color: #edfafd;
  font-size: 14;
`;
