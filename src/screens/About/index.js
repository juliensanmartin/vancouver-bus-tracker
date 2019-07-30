import React, { PureComponent } from './node_modules/react';
import styled from './node_modules/styled-components/native';

export default function AboutComponent() {
  return (
    <ViewContainer>
      <StyledView>
        <TitleText>VEHICLES DATA PROVIDED BY</TitleText>
        <StyledViewRow>
          <StyledCreditText>&bull; EVO CAR SHARE</StyledCreditText>
        </StyledViewRow>
        <StyledViewRow>
          <StyledCreditText>&bull; CAR 2 GO</StyledCreditText>
          <StyledTextSmall>
            This product uses the car2go API but is not endorsed or certified by car2go.
          </StyledTextSmall>
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
          <StyledTextSmall>
            Some of the data used in this product or service is provided by permission of TransLink.
            TransLink assumes no responsibility for the accuracy or currency of the Data used in
            this product or service.
          </StyledTextSmall>
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
        <StyledTextSmall>
          <StyledHighlightedText> CAR 4 VAN </StyledHighlightedText> - Version 0.1.0
        </StyledTextSmall>
      </StyledViewCentered>
    </ViewContainer>
  );
}

const ViewContainer = styled.View`
  flexdirection: column;
  justifycontent: space-around;
  height: 500;
  backgroundcolor: #aed9da;
  marginhorizontal: 20;
  marginvertical: 10;
`;

const StyledView = styled.View`
  flexdirection: column;
  justifycontent: space-between;
  backgroundcolor: #edfafd;
  alignitems: flex-start;
  borderradius: 6;
  borderwidth: 1;
  marginvertical: 10;
  shadowcolor: #7f7f7f;
  shadowoffset: 0 0;
  shadowradius: 2;
  shadowopacity: 0.6;
  paddingvertical: 10;
  paddinghorizontal: 10;
`;

const StyledViewCentered = styled.View`
  flexdirection: column;
  justifycontent: space-between;
  alignitems: center;
  marginvertical: 10;
  paddingvertical: 10;
  paddinghorizontal: 10;
`;

const StyledViewRow = styled.View`
  flexdirection: column;
  justifycontent: space-between;
  paddingvertical: 5;
`;

const StyledTextSmall = styled.Text`
  fontsize: 10;
`;

const StyledCreditText = styled.Text`
  color: #135589;
`;

const StyledHighlightedText = styled.Text`
  color: #135589;
`;

const TitleText = styled.Text`
  fontsize: 12;
  color: #2a93d5;
  align-self: center;
`;
