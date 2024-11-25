import {BOTTOM_TABS_LABELS} from '@constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStaticNavigation} from '@react-navigation/native';
import {Converter, History, Home} from '@screens';
import {BottomTabsList} from './components/BottomTabsList';
import {HeaderTitle} from './components/HeaderTitle';
import {ROUTES} from './routes';

const BottomTabs = createBottomTabNavigator({
  tabBar: props => <BottomTabsList {...props} />,
  screens: {
    [ROUTES.HOME]: {
      screen: Home,
      options: {tabBarLabel: BOTTOM_TABS_LABELS.HOME},
    },
    [ROUTES.CONVERTER]: {
      screen: Converter,
      options: {tabBarLabel: BOTTOM_TABS_LABELS.CONVERTER},
    },
    [ROUTES.HISTORY]: {
      screen: History,
      options: {tabBarLabel: BOTTOM_TABS_LABELS.HISTORY},
    },
  },
  screenOptions: {
    headerStyle: {backgroundColor: '#87181a'},
    headerTitleAlign: 'center',
    headerTitleStyle: {color: '#fafafa'},
    headerTitle: props => <HeaderTitle {...props} />,
  },
});

export const Navigation = createStaticNavigation(BottomTabs);
