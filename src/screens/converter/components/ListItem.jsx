import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

export function ListItem({item, onSelect}) {
  const {colors} = useTheme();
  const {name, unit} = item;
  return (
    <TouchableOpacity
      style={[
        {backgroundColor: colors.white100},
        gs.p4,
        gs.flexRow,
        styles.item,
        gs.justifyBetween,
        gs.itemsCenter,
      ]}
      onPress={() => onSelect(unit)}>
      <Text variant="bodyLarge" style={{color: colors.black}}>
        {name}
      </Text>
      <Text variant="bodyLarge" style={[{color: colors.black}, gs.capitalize]}>
        {` (${unit})`}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
});

ListItem.propTypes = {
  item: PropTypes.object,
  onSelect: PropTypes.func,
};
