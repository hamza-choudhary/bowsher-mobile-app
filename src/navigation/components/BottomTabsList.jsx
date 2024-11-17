import {BOTTOM_TABS_LABELS} from '@constants';
import {PlatformPressable} from '@react-navigation/elements';
import {useLinkBuilder} from '@react-navigation/native';
import {globalStyles as gs} from '@styles';
import {isIOS} from '@utils';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export function BottomTabsList({state, descriptors, navigation}) {
  const insets = useSafeAreaInsets();
  const {buildHref} = useLinkBuilder();
  const androidBottomPadding = 10;
  const paddingBottom = isIOS()
    ? insets.bottom
    : insets.bottom + androidBottomPadding;

  const {colors} = useTheme();
  const padding = {
    paddingTop: 1,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    paddingBottom: paddingBottom,
  };

  return (
    <View style={[styles.tabBar, {backgroundColor: colors.secondary}, padding]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[gs.flex1, gs.pt2]}>
            {renderIcon(label, isFocused, colors)}
          </PlatformPressable>
        );
      })}
    </View>
  );
}

function renderIcon(label, isFocused, colors) {
  const size = 25;
  const color = isFocused ? colors.primary600 : colors.black;
  let Icon;

  if (label === BOTTOM_TABS_LABELS.CONVERTER) {
    Icon = <AntDesign name="swap" size={size} color={color} />;
  } else if (label === BOTTOM_TABS_LABELS.SETTINGS) {
    Icon = <MaterialIcon name="swap-horizontal" size={size} color={color} />;
  } else {
    return null;
  }

  return (
    <View style={[styles.btn]}>
      <View
        style={[
          styles.icon,
          isFocused && {backgroundColor: colors.primaryWithOpacity},
        ]}>
        {Icon}
      </View>
      <Text
        variant={isFocused ? 'labelSmall' : 'bodySmall'}
        style={[isFocused && {color: colors.primary600}]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {flex: 1, paddingTop: 10},
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 0,
    elevation: 0,
    justifyContent: 'space-around',
  },
  btn: {alignItems: 'center', justifyContent: 'center', gap: 3},
  icon: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 99,
    overflow: 'hidden',
  },
});

BottomTabsList.propTypes = {
  state: PropTypes.object,
  descriptors: PropTypes.object,
  navigation: PropTypes.object,
};
