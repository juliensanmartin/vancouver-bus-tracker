import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Linking, Animated } from 'react-native';
import { Icon, Tabs, Tab } from 'react-native-elements';

export default class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    this.deltaX = new Animated.Value(0);
  }

  componentWillMount() {}

  onClickLinkApp(linking) {
    return Linking.openURL(linking).catch(err => this.props.onLinkingError(err.message));
  }

  render() {
    return (
      <Tabs>
        <Tab
          titleStyle={{ fontWeight: 'bold', fontSize: 10 }}
          selectedTitleStyle={{ marginTop: -1, marginBottom: 6 }}
          selected={selectedTab === 'feed'}
          title={selectedTab === 'feed' ? 'FEED' : null}
          renderIcon={() => (
            <Icon
              containerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 12
              }}
              color="#5e6977"
              name="whatshot"
              size={33}
            />
          )}
          renderSelectedIcon={() => <Icon color="#6296f9" name="whatshot" size={30} />}
          onPress={() => this.changeTab('feed')}
        >
          <Feed />
        </Tab>
        <Tab
          titleStyle={{ fontWeight: 'bold', fontSize: 10 }}
          selectedTitleStyle={{ marginTop: -1, marginBottom: 6 }}
          selected={selectedTab === 'profile'}
          title={selectedTab === 'profile' ? 'PROFILE' : null}
          renderIcon={() => (
            <Icon
              containerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 12
              }}
              color="#5e6977"
              name="person"
              size={33}
            />
          )}
          renderSelectedIcon={() => <Icon color="#6296f9" name="person" size={30} />}
          onPress={() => this.changeTab('profile')}
        >
          <Profile />
        </Tab>
      </Tabs>
    );
  }
}

TabBarComponent.propTypes = {
  onFilterPress: PropTypes.func.isRequired,
  onAboutPress: PropTypes.func.isRequired
};
