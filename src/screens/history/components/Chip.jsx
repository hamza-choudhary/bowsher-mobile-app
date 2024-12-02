import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

export function Chip({isActive = false, onPress, text}) {
  const {colors} = useTheme();
  const backgroundColor = isActive ? colors.primary100 : colors.white;
  const color = isActive ? colors.white : colors.primary;
  const borderColor = colors.primary100;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        gs.py2,
        gs.px4,
        gs.roundedFull,
        gs.borderThin,
        {backgroundColor, borderColor},
      ]}
      stl>
      <Text variant="labelLarge" style={{color}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

Chip.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
