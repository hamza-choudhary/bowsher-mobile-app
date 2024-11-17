import {BOTTOM_TABS_LABELS} from '@constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStaticNavigation} from '@react-navigation/native';
import {Converter, Settings} from '@screens';
import {BottomTabsList} from './components/BottomTabsList';
import {ROUTES} from './routes';

const BottomTabs = createBottomTabNavigator({
  tabBar: props => <BottomTabsList {...props} />,
  screens: {
    [ROUTES.CONVERTER]: {
      screen: Converter,
      options: {
        tabBarLabel: BOTTOM_TABS_LABELS.CONVERTER,
        headerTitle: BOTTOM_TABS_LABELS.CONVERTER,
      },
    },
    [ROUTES.SETTINGS]: {
      screen: Settings,
      options: {tabBarLabel: BOTTOM_TABS_LABELS.SETTINGS},
    },
  },
});

export const Navigation = createStaticNavigation(BottomTabs);
