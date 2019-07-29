import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import MapScreen from '../screens/Map/index';
import AboutComponent from '../screens/About/index';
import Settings from '../screens/Settings/index';

export default StackNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'CAR4VAN',
        headerBackTitle: 'MAP',
        headerRight: (
          <StyledRightSideHeader>
            <TouchableOpacity>
              <Icon
                type="font-awesome"
                size={20}
                name="cog"
                onPress={() => navigation.navigate('Settings')}
                color="#135589"
                containerStyle={{ marginHorizontal: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                type="font-awesome"
                size={20}
                name="info-circle"
                onPress={() => navigation.navigate('About')}
                color="#135589"
                containerStyle={{ marginHorizontal: 10 }}
              />
            </TouchableOpacity>
          </StyledRightSideHeader>
        ),
        headerTitleStyle: {
          color: '#135589'
        },
        headerStyle: {
          backgroundColor: '#edfafd'
        }
      })
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: 'SETTINGS',
        headerTitleStyle: {
          color: '#135589'
        },
        headerStyle: {
          backgroundColor: '#edfafd'
        }
      }
    },
    About: {
      screen: AboutComponent,
      navigationOptions: {
        title: 'ABOUT',
        headerTitleStyle: {
          color: '#135589'
        },
        headerStyle: {
          backgroundColor: '#edfafd'
        }
      }
    }
  },
  {
    cardStyle: {
      backgroundColor: '#aed9da',
      opacity: 1
    }
  }
);

const StyledRightSideHeader = styled.View`
  flexdirection: row;
  justifycontent: space-around;
`;
