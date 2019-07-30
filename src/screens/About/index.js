import React from 'react';
import styled from 'styled-components';

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
  flex-direction: column;
  justify-content: space-around;
  height: 500;
  background-color: #aed9da;
  margin-horizontal: 20;
  margin-vertical: 10;
`;

const StyledView = styled.View`
  flex-direction: column;
  justify-content: space-between;
  background-color: #edfafd;
  align-items: flex-start;
  border-radius: 6;
  border-width: 1;
  margin-vertical: 10;
  shadow-color: #7f7f7f;
  shadow-offset: 0 0;
  shadow-radius: 2;
  shadow-opacity: 0.6;
  padding-vertical: 10;
  padding-horizontal: 10;
`;

const StyledViewCentered = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 10;
  padding-vertical: 10;
  padding-horizontal: 10;
`;

const StyledViewRow = styled.View`
  flex-direction: column;
  justify-content: space-between;
  padding-vertical: 5;
`;

const StyledTextSmall = styled.Text`
  font-size: 10;
`;

const StyledCreditText = styled.Text`
  color: #135589;
`;

const StyledHighlightedText = styled.Text`
  color: #135589;
`;

const TitleText = styled.Text`
  font-size: 12;
  color: #2a93d5;
  align-self: center;
`;
