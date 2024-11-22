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
const BUTTON_WIDTH = WIDTH / 4 - 15; // - 4 gap

export function InputPad({onKeyPress}) {
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
          key: BACKSPACE,
        },
      ],
      [
        '4',
        '5',
        '6',
        {
          icon: <Ionicons name="star-outline" color={colors.black} size={30} />,
          isOperator: true,
          key: FAVORITE,
        },
      ],
      [
        '1',
        '2',
        '3',
        {
          icon: <MCIcon name="plus-minus" color={colors.black} size={30} />,
          isOperator: true,
          key: PLUS_MINUS,
        },
      ],
      [
        '0',
        '.',
        'X',
        {
          icon: <MCIcon name="equal" color={colors.black} size={30} />,
          isOperator: true,
          isWide: true,
          key: EQUAL,
        },
      ],
    ],
    [colors.black],
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
    [onKeyPress],
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
                label={typeof button === 'string' ? button : ''}
                icon={typeof button === 'object' ? button.icon : undefined}
                onPress={() => handleKeyPress(buttonKey)}
                isWide={typeof button === 'object' && button.isWide}
                isOperator={typeof button === 'object' && button.isOperator}
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
        gs.justifyCenter,
        gs.itemsCenter,
        gs.roundedFull,
        isWide && styles.wideButton,
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
};
InputButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onPress: PropTypes.func,
  isWide: PropTypes.bool,
  isOperator: PropTypes.bool,
  icon: PropTypes.element,
};
