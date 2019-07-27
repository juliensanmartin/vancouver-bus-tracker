import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import styled from 'styled-components/native'

export default class AboutComponent extends PureComponent {
  render() {
    return (
        <ViewContainer>
          <StyledView>
            <TitleText>VEHICLES DATA PROVIDED BY</TitleText>
            <StyledViewRow>
              <StyledCreditText>&bull; EVO CAR SHARE</StyledCreditText>
            </StyledViewRow>
            <StyledViewRow>
              <StyledCreditText>&bull; CAR 2 GO</StyledCreditText>
              <StyledTextSmall>This product uses the car2go API but is not endorsed or certified by car2go.</StyledTextSmall>
            </StyledViewRow>
            <StyledViewRow>
              <StyledCreditText>&bull; MOBI BIKES</StyledCreditText>
              <StyledTextSmall>Provided by http://doodles.mountainmath.ca/</StyledTextSmall>
            </StyledViewRow>
            <StyledViewRow>
              <StyledCreditText>&bull; MODO</StyledCreditText>
            </StyledViewRow>
            <StyledViewRow>
              <StyledCreditText>&bull; TRANSLINK</StyledCreditText>
              <StyledTextSmall>Some of the data used in this product or service is provided by permission of TransLink. TransLink assumes no responsibility for the accuracy or currency of the Data used in this product or service.</StyledTextSmall>
            </StyledViewRow>
          </StyledView>
          <StyledView>
            <TitleText>DISTANCE DATA PROVIDED BY</TitleText>
            <StyledViewRow>
              <StyledCreditText>&bull; GOOGLE MAPS</StyledCreditText>
            </StyledViewRow>
          </StyledView>
          <StyledView>
            <TitleText>ICONS AND ASSETS PROVIDED BY</TitleText>
            <StyledViewRow>
              <StyledTextSmall>&bull; Loader by Steven Parisi</StyledTextSmall>
            </StyledViewRow>
            <StyledViewRow>
              <StyledTextSmall>&bull; Car by Nurutdinov Timur from the Noun Project</StyledTextSmall>
            </StyledViewRow>
            <StyledViewRow>
              <StyledTextSmall>&bull; Freepik from www.flaticon.com</StyledTextSmall>
            </StyledViewRow>
          </StyledView>
          <StyledViewCentered>
            <StyledTextSmall>Made with &hearts; from Vancouver, BC</StyledTextSmall>
            <StyledTextSmall>By Simon Reggiani &amp; Julien Sanmartin</StyledTextSmall>
            <StyledTextSmall><StyledHighlightedText> CAR 4 VAN </StyledHighlightedText> - Version 0.1.0</StyledTextSmall>
          </StyledViewCentered>
        </ViewContainer>
    )
  }
}

const ViewContainer = styled.View`
  flexDirection: column;
  justifyContent: space-around;
  height: 500;
  backgroundColor: #aed9da;
  marginHorizontal: 20;
  marginVertical: 10;
`

const StyledView = styled.View`
  flexDirection: column;
  justifyContent: space-between;
  backgroundColor: #EDFAFD;
  alignItems: flex-start;
  borderRadius: 6;
  borderWidth: 1;
  marginVertical: 10;
  shadowColor: #7f7f7f;
  shadowOffset: 0 0;
  shadowRadius: 2;
  shadowOpacity: 0.6;
  paddingVertical: 10;
  paddingHorizontal: 10;
`

const StyledViewCentered = styled.View`
  flexDirection: column;
  justifyContent: space-between;
  alignItems: center;
  marginVertical: 10;
  paddingVertical: 10;
  paddingHorizontal: 10;
`

const StyledViewRow = styled.View`
  flexDirection: column;
  justifyContent: space-between;
  paddingVertical: 5;
`

const StyledTextSmall = styled.Text`
  fontSize: 10;
`

const StyledCreditText = styled.Text`
  color: #135589;
`

const StyledHighlightedText= styled.Text`
  color: #135589;
`

const TitleText= styled.Text`
  fontSize: 12;
  color: #2A93D5;
  align-self: center;
`
