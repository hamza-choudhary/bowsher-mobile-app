import {ROUTES} from '@navigation';
import {useNavigation} from '@react-navigation/native';
import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export function Header({
  showBackButton = false,
  title,
  rightIcon = null,
  backButtonPressHandler,
}) {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleNavigation() {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate(ROUTES.CONVERTER);
  }

  return (
    <View
      style={[
        gs.static,
        {backgroundColor: theme.colors.background},
        styles.container,
      ]}>
      <View
        style={[
          styles.shadowContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        <View
          style={[
            gs.itemsCenter,
            gs.flexRow,
            {paddingHorizontal: theme.spacing.m},
            styles.contentContainer,
          ]}>
          <View style={styles.item}>
            {showBackButton && (
              <TouchableOpacity
                onPress={backButtonPressHandler || handleNavigation}
                style={styles.button}>
                <MaterialIcon
                  name="arrow-back-ios"
                  size={23}
                  color={theme.colors.black}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={gs.flex1}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={gs.textCenter}
              variant="titleLarge">
              {title}
            </Text>
          </View>
          <View style={[gs.itemsEnd, styles.item]}>{rightIcon}</View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {paddingBottom: 5},
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
    gap: 5,
  },
  contentContainer: {paddingBottom: 5, minHeight: 60},
  button: {
    width: 45,
    height: 45,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {minWidth: '13%'},
});

Header.propTypes = {
  showBackButton: PropTypes.bool,
  title: PropTypes.string.isRequired,
  rightIcon: PropTypes.object,
  backButtonPressHandler: PropTypes.func,
};
