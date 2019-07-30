import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import MapScreen from '../screens/map';
import AboutComponent from '../screens/about';
import Settings from '../screens/settings';

const AppNavigator = createStackNavigator(
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
                containerStyle={{ margin-horizontal: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                type="font-awesome"
                size={20}
                name="info-circle"
                onPress={() => navigation.navigate('About')}
                color="#135589"
                containerStyle={{ margin-horizontal: 10 }}
              />
            </TouchableOpacity>
          </StyledRightSideHeader>
        ),
        headerTitleStyle: {
          color: '#135589'
        },
        headerStyle: {
          background-color: '#edfafd'
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
          background-color: '#edfafd'
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
          background-color: '#edfafd'
        }
      }
    }
  },
  {
    cardStyle: {
      background-color: '#aed9da',
      opacity: 1
    }
  }
);

const StyledRightSideHeader = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export default AppNavigator;
