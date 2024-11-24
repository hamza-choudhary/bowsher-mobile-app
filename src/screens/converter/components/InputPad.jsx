import {globalStyles as gs} from '@styles';
import {WIDTH} from '@utils';
import PropTypes from 'prop-types';
import {useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const FAVORITE = 'favorite';
const BACKSPACE = 'backspace';
const EQUAL = 'equal';
const PLUS_MINUS = 'plusMinus';
const SELECT_GAS = 'selectGas';
const BUTTON_WIDTH = WIDTH / 4 - 15; // - 4 gap

export function InputPad({onKeyPress, gas, openGasSelectSheet}) {
  const {colors} = useTheme();
  const buttons = useMemo(
    () => [
      [
        '7',
        '8',
        '9',
        {
          icon: (
            <Ionicons name="backspace-outline" color={colors.white} size={35} />
          ),
          isOperator: true,
          key: BACKSPACE,
        },
      ],
      ['4', '5', '6', {key: SELECT_GAS, label: gas}],
      [
        '1',
        '2',
        '3',
        {
          icon: <Ionicons name="star-outline" color={colors.white} size={30} />,
          isOperator: true,
          key: FAVORITE,
        },
      ],
      [
        '0',
        '.',
        {
          icon: <MCIcon name="plus-minus" color={colors.white} size={30} />,
          isOperator: true,
          key: PLUS_MINUS,
        },
        {
          icon: <MCIcon name="equal" color={colors.white} size={30} />,
          isOperator: true,
          isWide: true,
          key: EQUAL,
        },
      ],
    ],
    [colors, gas],
  );

  const handleKeyPress = useCallback(
    key => {
      switch (key) {
        case BACKSPACE:
          onKeyPress(prev => prev.slice(0, -1));
          break;
        case PLUS_MINUS:
          onKeyPress(prev =>
            prev.startsWith('-') ? prev.slice(1) : `-${prev}`,
          );
          break;
        case FAVORITE:
          // Handle favorite functionality
          break;
        case EQUAL:
          // Trigger conversion
          break;
        case SELECT_GAS:
          openGasSelectSheet();
          break;
        default:
          onKeyPress(prev => {
            if (key === '.' && prev.includes('.')) {
              return prev;
            }
            if (prev === '0' && key !== '.') {
              return key;
            }
            return prev + key;
          });
      }
    },
    [onKeyPress, openGasSelectSheet],
  );

  return (
    <View style={[gs.flex1, styles.container]}>
      {buttons.map((row, rowIndex) => (
        <View key={`${rowIndex}-keypad-row`} style={styles.row}>
          {row.map((button, buttonIndex) => {
            const buttonKey = typeof button === 'object' ? button.key : button;
            return (
              <InputButton
                key={`${buttonIndex}-keypad-btn`}
                label={typeof button === 'string' ? button : button?.label}
                icon={typeof button === 'object' ? button.icon : undefined}
                onPress={() => handleKeyPress(buttonKey)}
                isOperator={typeof button === 'object' && button.isOperator}
                isSelect={button.key === SELECT_GAS}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

function InputButton({
  label,
  onPress = () => {},
  isOperator = false,
  icon,
  isSelect = false,
}) {
  const {colors} = useTheme();

  const buttonContent = icon ? (
    icon
  ) : (
    <Text
      variant={isSelect ? 'headlineSmall' : 'headlineMedium'}
      style={[{color: colors.white}, gs.uppercase]}>
      {label}
    </Text>
  );

  const btnColor = isOperator || isSelect ? colors.primary300 : colors.primary;

  return (
    <TouchableOpacity
      style={[
        gs.justifyCenter,
        gs.itemsCenter,
        gs.roundedFull,
        {backgroundColor: btnColor, width: BUTTON_WIDTH, height: BUTTON_WIDTH},
      ]}
      onPress={onPress}>
      {buttonContent}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 7,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {flexDirection: 'row', gap: 7},
  wideButton: {width: BUTTON_WIDTH * 2, height: BUTTON_WIDTH},
});

InputPad.propTypes = {
  onKeyPress: PropTypes.func,
  gas: PropTypes.string,
  openGasSelectSheet: PropTypes.func,
};
InputButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onPress: PropTypes.func,
  isOperator: PropTypes.bool,
  icon: PropTypes.element,
  isSelect: PropTypes.bool,
};
