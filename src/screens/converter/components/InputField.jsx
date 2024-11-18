import {UNITS} from '@constants';
import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

export function InputField({isSource = false, data, onValueChange, openSheet}) {
  const {colors} = useTheme();

  const validateAndSetValue = text => {
    const numericText = text.replace(/[^0-9.]/g, '');

    const parts = numericText.split('.');
    const sanitizedText =
      parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : numericText;

    if (sanitizedText === '' || isNaN(Number(sanitizedText))) {
      return;
    }

    onValueChange?.(sanitizedText.toString());
  };

  const handlePaste = event => {
    const pastedText = event.nativeEvent.text;
    validateAndSetValue(pastedText);
  };

  const backgroundColor = isSource ? colors.primary100 : colors.background;
  const textColor = isSource ? colors.white : colors.black;

  return (
    <View style={[gs.flex1, {backgroundColor}]}>
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
        value={data.value}
        multiline
        showSoftInputOnFocus={false}
        contextMenuHidden={false}
        onPaste={handlePaste}
        selection={{start: data.value.length, end: data.value.length}}
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
  isSource: PropTypes.bool,
  data: PropTypes.object,
  onValueChange: PropTypes.func,
  openSheet: PropTypes.func,
};
