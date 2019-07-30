import React, { Component } from './node_modules/react';
import PropTypes from './node_modules/prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from './node_modules/styled-components/native';

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
  flexdirection: column;
  justifycontent: center;
  alignitems: center;
  marginvertical: 30;
  marginhorizontal: 30;
  height: 50;
  width: 300;
  backgroundcolor: #2a93d5;
  opacity: 0.7;
`;

const StyledText = styled.Text`
  color: #edfafd;
  fontsize: 14;
`;
