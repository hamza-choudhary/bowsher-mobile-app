import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

//TODO: fix the fontsize text, fix colors, fix handlers logic

const buttons = [
  [
    '7',
    '8',
    '9',
    {icon: <Ionicons name="backspace-outline" size={20} />, isOperator: true},
  ],
  [
    '4',
    '5',
    '6',
    {icon: <Ionicons name="star-outline" size={20} />, isOperator: true},
  ],
  [
    '1',
    '2',
    '3',
    {icon: <MCIcon name="plus-minus" size={20} />, isOperator: true},
  ],
  [
    '0',
    '.',
    {icon: <MCIcon name="equal" size={20} />, isOperator: true, isWide: true},
  ],
];

export function InputPad(params) {
  return (
    <View style={[gs.flex1, gs.justifyEnd, {backgroundColor: 'green', gap: 1, padding: 1}]}>
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
  const buttonContent = icon ? (
    icon
  ) : (
    <Text style={[styles.buttonText, isOperator && styles.operatorText]}>
      {label}
    </Text>
  );

  return (
    <TouchableOpacity
      style={[
        gs.flex1,
        gs.justifyCenter,
        gs.itemsCenter,
        isWide && styles.wideButton,
        isOperator && styles.operatorButton,
        {backgroundColor: 'brown'},
      ]}
      onPress={onPress}>
      {buttonContent}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row', justifyContent: 'space-between', flex: 1, gap: 1},
  wideButton: {flex: 2},
  operatorButton: {backgroundColor: '#ff9500'},
  buttonText: {fontSize: 24, color: '#333'},
  operatorText: {color: '#fff'},
});

InputButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onPress: PropTypes.func,
  isWide: PropTypes.bool,
  isOperator: PropTypes.bool,
  icon: PropTypes.element,
};
