import {UNITS} from '@constants';
import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {forwardRef} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

export const InputField = forwardRef(function InputField(
  {isSource = false, data, onValueChange, openSheet, isActive = false, onFocus},
  ref,
) {
  const {colors} = useTheme();

  const validateAndSetValue = text => {
    const numericText = text.replace(/[^0-9.-]/g, '');

    const isNegative = numericText.startsWith('-');
    const absNumericText = numericText.replace(/-/g, '');

    const parts = absNumericText.split('.');
    const sanitizedText =
      parts.length > 2
        ? `${parts[0]}.${parts.slice(1).join('')}`
        : absNumericText;

    if (sanitizedText === '') {
      onValueChange?.('0');
      return;
    }

    if (isNaN(Number(sanitizedText))) {
      return;
    }

    const finalValue = isNegative ? `-${sanitizedText}` : sanitizedText;
    onValueChange?.(finalValue);
  };

  const handlePaste = event => {
    const pastedText = event.nativeEvent.text;
    validateAndSetValue(pastedText);
  };

  const backgroundColor = isSource ? colors.primary100 : colors.background;
  const textColor = isSource ? colors.white : colors.black;

  let borderColor = isActive ? colors.white : 'transparent';
  if (!isSource) {
    borderColor = isActive ? colors.primary100 : 'transparent';
  }

  return (
    <View style={[gs.flex1, {backgroundColor, borderColor}, styles.container]}>
      <TouchableOpacity style={[gs.px4, gs.pt4, gs.pb1]} onPress={openSheet}>
        <Text style={{color: textColor}} variant="labelLarge">
          {isSource ? 'to' : 'from'} {data.unit}
        </Text>
        <Text style={{color: textColor}} variant="headlineMedium">
          {UNITS[data.unit].name}
        </Text>
      </TouchableOpacity>
      <TextInput
        style={[
          gs.flex1,
          gs.p4,
          styles.input,
          {backgroundColor, color: textColor},
        ]}
        ref={ref}
        value={data.value}
        multiline
        showSoftInputOnFocus={false}
        contextMenuHidden={false}
        onPaste={handlePaste}
        selection={{start: data.value.length, end: data.value.length}}
        onChangeText={validateAndSetValue}
        textAlign="right"
        onFocus={onFocus}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {borderWidth: 1},
  input: {fontSize: 45, fontWeight: '200'},
});

InputField.propTypes = {
  isSource: PropTypes.bool,
  data: PropTypes.object,
  onValueChange: PropTypes.func,
  openSheet: PropTypes.func,
  isActive: PropTypes.bool,
  onFocus: PropTypes.func,
};
