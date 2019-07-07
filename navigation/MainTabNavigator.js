import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ArchiveScreen from '../screens/ArchiveScreen';
import BusScreen from '../screens/BusScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const NowStack = createStackNavigator(
  {
    Home: HomeScreen,
    Bus: BusScreen,
  },
  config
);

NowStack.navigationOptions = {
  tabBarLabel: 'Сейчас',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-pulse`
          : 'md-pulse'
      }
    />
  ),
};

NowStack.path = '';

const ArchiveStack = createStackNavigator(
  {
    Archive: ArchiveScreen,
  },
  config
);

ArchiveStack.navigationOptions = {
  tabBarLabel: 'Архив',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-archive' : 'md-archive'} />
  ),
};

ArchiveStack.path = '';

const tabNavigator = createBottomTabNavigator({
  NowStack,
  ArchiveStack,
});

tabNavigator.path = '';

export default tabNavigator;
