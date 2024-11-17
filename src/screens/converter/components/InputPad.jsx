import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

//TODO: fix the fontsize text, fix colors, fix handlers logic

export function InputPad() {
  const {colors} = useTheme();
  const buttons = useMemo(
    () => [
      [
        '7',
        '8',
        '9',
        {
          icon: (
            <Ionicons name="backspace-outline" color={colors.black} size={35} />
          ),
          isOperator: true,
        },
      ],
      [
        '4',
        '5',
        '6',
        {
          icon: <Ionicons name="star-outline" color={colors.black} size={30} />,
          isOperator: true,
        },
      ],
      [
        '1',
        '2',
        '3',
        {
          icon: <MCIcon name="plus-minus" color={colors.black} size={30} />,
          isOperator: true,
        },
      ],
      [
        '0',
        '.',
        {
          icon: <MCIcon name="equal" color={colors.black} size={30} />,
          isOperator: true,
          isWide: true,
        },
      ],
    ],
    [colors.black],
  );

  return (
    <View style={[gs.flex1, gs.justifyEnd, styles.container]}>
      {buttons.map((row, rowIndex) => (
        <View key={`${rowIndex}-keypad-row`} style={styles.row}>
          {row.map((button, buttonIndex) => (
            <InputButton
              key={`${buttonIndex}-keypad-btn`}
              label={typeof button === 'string' ? button : ''}
              icon={typeof button === 'object' ? button.icon : undefined}
              onPress={() => {}}
              isWide={typeof button === 'object' && button.isWide}
              isOperator={typeof button === 'object' && button.isOperator}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

function InputButton({
  label,
  onPress = () => {},
  isWide = false,
  isOperator = false,
  icon,
}) {
  const {colors} = useTheme();

  const buttonContent = icon ? (
    icon
  ) : (
    <Text variant="headlineMedium" style={[{color: colors.black}]}>
      {label}
    </Text>
  );

  let btnColor = isOperator ? colors.padBtnOperator : colors.padBtn;
  btnColor = isWide ? '#c7cbd1' : btnColor;

  return (
    <TouchableOpacity
      style={[
        gs.flex1,
        gs.justifyCenter,
        gs.itemsCenter,
        isWide && styles.wideButton,
        {backgroundColor: btnColor},
      ]}
      onPress={onPress}>
      {buttonContent}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {gap: 2, paddingVertical: 2},
  row: {flexDirection: 'row', justifyContent: 'space-between', flex: 1, gap: 2},
  wideButton: {flex: 2.01},
});

InputButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onPress: PropTypes.func,
  isWide: PropTypes.bool,
  isOperator: PropTypes.bool,
  icon: PropTypes.element,
};
