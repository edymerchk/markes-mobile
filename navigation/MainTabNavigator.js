import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ListScreen from '../screens/ListScreen';
import NewScreen from '../screens/NewScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ListStack = createStackNavigator(
  {
    Home: ListScreen,
  },
  config
);

ListStack.navigationOptions = {
  tabBarLabel: 'List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-list'
          : 'md-information-circle'
      }
    />
  ),
};

ListStack.path = '';

const NewStack = createStackNavigator(
  {
    New: NewScreen,
  },
  config
);

NewStack.navigationOptions = {
  tabBarLabel: 'New',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-camera' : 'md-link'} />
  ),
};

NewStack.path = '';

const tabNavigator = createBottomTabNavigator({
  NewStack,
  ListStack
});

tabNavigator.path = '';

export default tabNavigator;
