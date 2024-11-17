import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

export function InputField({isTo, openSheet, onValueChange}) {
  const {colors} = useTheme();
  const [value, setValue] = useState('');

  const validateAndSetValue = text => {
    const numericText = text.replace(/[^0-9.]/g, '');

    const parts = numericText.split('.');
    const sanitizedText =
      parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : numericText;

    if (sanitizedText === '' || isNaN(Number(sanitizedText))) {
      return;
    }

    setValue(sanitizedText);
    onValueChange?.(sanitizedText);
  };

  const handlePaste = event => {
    const pastedText = event.nativeEvent.text;
    validateAndSetValue(pastedText);
  };

  const backgroundColor = isTo ? colors.primary100 : colors.background;
  const textColor = isTo ? colors.white : colors.black;

  return (
    <View style={[gs.flex1, {backgroundColor}]}>
      <TouchableOpacity style={[gs.px4, gs.pt4, gs.pb1]} onPress={openSheet}>
        <Text style={{color: textColor}} variant="labelLarge">
          {isTo ? 'to' : 'from'} kilogram
        </Text>
        <Text style={{color: textColor}} variant="headlineMedium">
          KG
        </Text>
      </TouchableOpacity>
      <TextInput
        style={[
          gs.flex1,
          gs.p4,
          styles.input,
          {backgroundColor, color: textColor},
        ]}
        value={value}
        multiline
        showSoftInputOnFocus={false}
        contextMenuHidden={false}
        onPaste={handlePaste}
        selection={{start: value.length, end: value.length}}
        onChangeText={validateAndSetValue}
        textAlign="right"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 45,
    fontWeight: '200',
  },
});

InputField.propTypes = {
  isTo: PropTypes.bool,
  openSheet: PropTypes.func,
  onValueChange: PropTypes.func,
};
