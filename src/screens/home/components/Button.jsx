import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

export function Button({icon, onPress, disabled = false}) {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        gs.flex1,
        gs.itemsCenter,
        gs.justifyCenter,
        gs.py3,
        disabled && styles.disabledButton,
      ]}>
      <Icon
        name={icon}
        size={25}
        color={disabled ? colors.grey : colors.black}
      />
    </TouchableOpacity>
  );
}

Button.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
  disabledButton: {opacity: 0.3},
});
