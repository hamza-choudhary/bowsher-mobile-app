import {saveConversionInStorage} from '@helpers';
import {globalStyles as gs} from '@styles';
import {WIDTH} from '@utils';
import PropTypes from 'prop-types';
import {useCallback, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const BUTTON_TYPES = {
  BACKSPACE: 'backspace',
  FAVORITE: 'favorite',
  EQUAL: 'equal',
  PLUS_MINUS: 'plusMinus',
  SELECT_GAS: 'selectGas',
};

const BUTTON_SIZE = WIDTH * 0.21;

const createButtonConfig = (colors, gas) => [
  [
    {label: '7'},
    {label: '8'},
    {label: '9'},
    {
      icon: (
        <Ionicons name="backspace-outline" color={colors.white} size={35} />
      ),
      id: BUTTON_TYPES.BACKSPACE,
      hasPrimaryBackground: false,
    },
  ],
  [
    {label: '4'},
    {label: '5'},
    {label: '6'},
    {label: gas, id: BUTTON_TYPES.SELECT_GAS, hasPrimaryBackground: false},
  ],
  [
    {label: '1'},
    {label: '2'},
    {label: '3'},
    {
      icon: <Ionicons name="star-outline" color={colors.white} size={30} />,
      id: BUTTON_TYPES.FAVORITE,
      hasPrimaryBackground: false,
    },
  ],
  [
    {label: '0'},
    {label: '.'},
    {
      icon: <MCIcon name="plus-minus" color={colors.white} size={30} />,
      id: BUTTON_TYPES.PLUS_MINUS,
      hasPrimaryBackground: true,
    },
    {
      icon: <MCIcon name="equal" color={colors.white} size={30} />,
      id: BUTTON_TYPES.EQUAL,
      hasPrimaryBackground: false,
    },
  ],
];

export function InputPad({
  onKeyPress,
  gas,
  openGasSelectSheet,
  value,
  activeField,
}) {
  const [buttonSize, setButtonSize] = useState(BUTTON_SIZE);
  const {colors} = useTheme();
  const buttons = useMemo(() => createButtonConfig(colors, gas), [colors, gas]);

  const handleKeyPress = useCallback(
    key => {
      switch (key) {
        case BUTTON_TYPES.BACKSPACE:
          onKeyPress(prev => prev.slice(0, -1));
          break;
        case BUTTON_TYPES.PLUS_MINUS:
          onKeyPress(prev =>
            prev.startsWith('-') ? prev.slice(1) : `-${prev}`,
          );
          break;
        case BUTTON_TYPES.FAVORITE:
          saveConversionInStorage({
            activeField,
            conversion: value,
            gas,
            favorite: true,
          });
          break;
        case BUTTON_TYPES.EQUAL:
          saveConversionInStorage({activeField, conversion: value, gas});
          break;
        case BUTTON_TYPES.SELECT_GAS:
          openGasSelectSheet();
          break;
        default:
          onKeyPress(prev => {
            if (key === '.' && prev.includes('.')) {
              return prev;
            }
            return prev === '0' && key !== '.' ? key : prev + key;
          });
      }
    },
    [onKeyPress, openGasSelectSheet, activeField, value, gas],
  );

  const handleLayout = e => {
    const {height} = e.nativeEvent.layout;
    setButtonSize(height * 0.22);
  };

  return (
    <View style={[gs.flex1, styles.container]} onLayout={handleLayout}>
      {buttons.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((button, buttonIndex) => (
            <InputButton
              key={`button-${rowIndex}-${buttonIndex}`}
              {...button}
              onPress={() => handleKeyPress(button.id || button.label)}
              buttonSize={buttonSize}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

function InputButton({
  label,
  icon,
  onPress,
  hasPrimaryBackground = true,
  isSelect = false,
  buttonSize = BUTTON_SIZE,
}) {
  const {colors} = useTheme();

  const buttonContent = icon || (
    <Text
      variant={isSelect ? 'headlineSmall' : 'headlineMedium'}
      style={[gs.uppercase, {color: colors.white}]}>
      {label}
    </Text>
  );

  const backgroundColor =
    hasPrimaryBackground || isSelect ? colors.primary : colors.primary300;

  return (
    <TouchableOpacity
      style={[
        gs.justifyCenter,
        gs.itemsCenter,
        gs.overflowHidden,
        {
          backgroundColor,
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
        },
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
});

InputPad.propTypes = {
  onKeyPress: PropTypes.func,
  gas: PropTypes.string,
  openGasSelectSheet: PropTypes.func,
  value: PropTypes.object.isRequired,
  activeField: PropTypes.string,
};
InputButton.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onPress: PropTypes.func,
  hasPrimaryBackground: PropTypes.bool,
  icon: PropTypes.element,
  isSelect: PropTypes.bool,
  buttonSize: PropTypes.number,
};
