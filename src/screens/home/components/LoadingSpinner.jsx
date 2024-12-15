import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';

export function LoadingSpinner({isLoading}) {
  const {colors} = useTheme();

  if (!isLoading) {
    return null;
  }

  return (
    <View
      style={[
        gs.absolute,
        gs.justifyCenter,
        gs.itemsCenter,
        gs.xy0,
        gs.z50,
        styles.container,
      ]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: 'rgba(255, 255, 255, 0.6)'},
});

LoadingSpinner.propTypes = {
  isLoading: PropTypes.bool,
};
