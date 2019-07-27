import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Platform, Linking, Animated, StyleSheet, Modal } from 'react-native'
import styled from 'styled-components/native'
import { Badge, Icon } from 'react-native-elements'
import ToastComponent from '../Toast/index'
import Interactable from 'react-native-interactable'

export default class CarDetailsComponent extends Component {
  constructor(props) {
    super(props)
    this.deltaX = new Animated.Value(0)
    this.state = {
      canOpenURL: false,
      link: ''
    }
  }

  componentWillMount() {
    let linking
    this.state.link = ''

    if (this.props.marker.type==='Car 2 Go') {
      if (Platform.OS === 'ios') {
        linking = 'car2go://'
      } else {
        linking = 'https://car2go.com/'
      }
      this.state.link = linking.concat(`vehicle/${this.props.marker.id}?latlng=${this.props.marker.latlng.latitude},${this.props.marker.latlng.longitude}`)
      // Android: https://car2go.com/vehicle/WME4513341K828695?latlng=53.58775,10.12023
      // iOS: car2go://vehicle/WME4513341K828695?latlng=53.58775,10.12023
    }

    if (this.props.marker.type==='Evo') {
      if (Platform.OS === 'ios') {
        linking = 'https://fo.evo.vulog.com/bcaa-front/Account/FindCars'
      } else {
        linking = 'https://fo.evo.vulog.com/bcaa-front/Account/FindCars'
      }
      this.state.link = linking//.concat(`vehicle/${this.props.marker.id}?latlng=${this.props.marker.latlng.latitude},${this.props.marker.latlng.longitude}`)
    }

    if (this.props.marker.type==='Modo') {
      if (Platform.OS === 'ios') {
        linking = 'https://bookit.modo.coop/'
      } else {
        linking = 'https://bookit.modo.coop/'
      }
      this.state.link = linking//.concat(`vehicles/${this.props.marker.id}?latlng=${this.props.marker.latlng.latitude},${this.props.marker.latlng.longitude}`)
    }

    if (this.state.link !== '') {
      Linking.canOpenURL(this.state.link)
        .then(supported => {
          console.log(this.state.link, ' SUPPORTED ? ',supported)
          this.state.canOpenURL = supported
        })
    }
  }

  onClickLinkApp(linking) {
    return Linking.openURL(linking)
     .catch(err => this.props.onLinkingError(err.message))
  }

  render() {
    const { type, address, fuel, name, direction } = this.props.marker
    const { distance, duration } = this.props.distance
    let { avlBikes, freeSlots } = this.props.marker
    let logo
    let long = false
    if (type==='Evo') {
      logo=require('../assets/evo.png')
      long=true
    }
    if (type==='Car 2 Go') {
      logo=require('../assets/car2go.png')
    }
    if (type==='Modo') logo=require('../assets/modo.png')
    if (type==='Bus') {
      logo=require('../assets/bus.png')
      long=true
    }
    if (type==='Mobi Bike') logo=require('../assets/bike.png')
    if (avlBikes === 0) avlBikes = 'No'
    if (freeSlots === 0) freeSlots = 'No'
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onClose}>
        <Interactable.View
          horizontalOnly={true}
          snapPoints={[
            {x: 360},
            {x: 0, damping: 1-1-0.7, tension: 300},
            {x: -360}
          ]}
          onSnap={this.props.onClose}
          animatedValueX={this.deltaX}>
          <Animated.View style={[styles.card, {
            opacity: this.deltaX.interpolate({
              inputRange: [-300, 0, 300],
              outputRange: [0, 1, 0],
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp'
            })
          }]}>
              <TitleContainer>
                <StyledTitle>{type}</StyledTitle>
              </TitleContainer>
              <ImageContainer>
                {long &&
                  <StyledImageLong source={logo}/>
                }
                {!long &&
                  <StyledImage source={logo}/>
                }
              </ImageContainer>
              <ViewMainDetails>
                <ViewName>
                  { avlBikes &&
                    <StyledText>{avlBikes} bikes availables</StyledText>
                  }
                  { freeSlots &&
                    <StyledText>{freeSlots} free slots availables</StyledText>
                  }
                  <StyledText>{name}</StyledText>
                  <StyledTextSmall>{address}</StyledTextSmall>
                </ViewName>
              </ViewMainDetails>
              <ViewSecondaryDetails>
                { fuel &&
                  <ViewItem>
                    <Icon type='ionicon' size={ 50 } name='ios-speedometer' color='#3DDAD7'/>
                    <ViewName>
                      <StyledText>{fuel}%</StyledText>
                      <StyledTextSmall>Fuel level</StyledTextSmall>
                    </ViewName>
                  </ViewItem>
                }
                { direction &&
                  <ViewItem>
                    <Icon type='ionicon' size={ 50 } name='ios-compass' color='#3DDAD7'/>
                    <ViewName>
                      <StyledText>{direction}</StyledText>
                      <StyledTextSmall>Direction</StyledTextSmall>
                    </ViewName>
                  </ViewItem>
                }
                { this.props.marker.duration &&
                  <ViewItem>
                    <Icon type='ionicon' size={ 50 } name='ios-compass' color='#3DDAD7'/>
                    <ViewName>
                      <StyledTextSmall>Available for the next</StyledTextSmall>
                      <StyledText>{this.props.marker.duration}</StyledText>
                    </ViewName>
                  </ViewItem>
                }
                <ViewItem>
                  <Icon type='ionicon' size={ 50 } name='ios-clock' color='#3DDAD7'/>
                  <ViewName>
                    <StyledText>{distance}</StyledText>
                    <StyledTextSmall>{duration}</StyledTextSmall>
                  </ViewName>
                </ViewItem>
              </ViewSecondaryDetails>
              { this.state.canOpenURL &&
                <ViewMainDetailsCentered>
                  <StyledText>Open {type} App</StyledText>
                  <TouchableOpacityStyled onPress={() => this.onClickLinkApp(this.state.link)}>
                    <Icon reverse raised type='ionicon' size={ 30 } name='ios-key' color='#2A93D7'/>
                  </TouchableOpacityStyled>
                </ViewMainDetailsCentered>
              }
          </Animated.View>
        </Interactable.View>
        <ToastComponent message='Problems to access the App' visible={this.props.errorLinking !== ''}/>
      </Modal>
    )
  }
}

CarDetailsComponent.propTypes = {
  marker: PropTypes.object.isRequired,
  distance: PropTypes.object.isRequired,
  positionInVancouver: PropTypes.bool.isRequired,
  onLinkingError: PropTypes.func.isRequired,
  errorLinking: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#EDFAFD',
    padding: 10,
    margin: 10,
    borderRadius: 6,
    marginHorizontal: 10,
    marginVertical: 100,
    shadowColor: '#7f7f7f',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 4,
    zIndex: 4
  }
})

const TouchableOpacityStyled = styled.TouchableOpacity`
  zIndex: 10;
  elevation: 10;
`

const DetailsContainer = styled.View`
  flexDirection: column;
  justifyContent: space-around;
  backgroundColor: #EDFAFD;
`

const ViewMainDetails = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
`

const ViewMainDetailsCentered = styled.View`
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
`

const ViewSecondaryDetails = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  paddingVertical: 10;
  paddingHorizontal: 10;
`

const ViewName = styled.View`
  flexDirection: column;
  justifyContent: center;
  paddingVertical: 10;
  paddingHorizontal: 10;
`

const ViewItem = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
`

const ImageContainer = styled.View`
  flexDirection: row;
  justifyContent: center;
  alignItems: flex-end;
`

const TitleContainer = styled.View`
  flexDirection: row;
  justifyContent: center;
  alignItems: flex-start;
`

const StyledImage = styled.Image`
  height: 100;
  width: 100;
`

const StyledImageLong = styled.Image`
  height: 80;
  width: 200;
`

const StyledText= styled.Text`
  color: #135589;
`

const StyledTitle= styled.Text`
  color: #135589;
  fontSize: 20;
`

const StyledTextSmall= styled.Text`
  color: #135589;
  fontSize: 10;
`

const StyledTextBig= styled.Text`
  color: #135589;
  fontSize: 16;
`
