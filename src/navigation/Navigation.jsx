import {BOTTOM_TABS_LABELS} from '@constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStaticNavigation} from '@react-navigation/native';
import {Converter, Explore, History} from '@screens';
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
    [ROUTES.HISTORY]: {
      screen: History,
      options: {
        tabBarLabel: BOTTOM_TABS_LABELS.HISTORY,
        headerTitle: BOTTOM_TABS_LABELS.HISTORY,
      },
    },
    [ROUTES.EXPLORE]: {
      screen: Explore,
      options: {
        tabBarLabel: BOTTOM_TABS_LABELS.EXPLORE,
        headerTitle: BOTTOM_TABS_LABELS.EXPLORE,
      },
    },
  },
  screenOptions: {headerStyle: {backgroundColor: '#EDEDED'}},
});

export const Navigation = createStaticNavigation(BottomTabs);
