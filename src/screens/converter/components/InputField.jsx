import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

export function InputField({isTo, openSheet}) {
  const {colors} = useTheme();

  const handleTextChange = text => {
    const numericText = text.replace(/[^0-9]/g, '');
    return numericText;
  };

  const backgroundColor = isTo ? colors.primary100 : colors.background;
  const textColor = isTo ? colors.white : colors.black;

  return (
    <View style={[gs.flex1, {backgroundColor}]}>
      <TouchableOpacity style={[gs.p4]} onPress={openSheet}>
        <Text style={{color: textColor}} variant="labelLarge">
          from
        </Text>
        <Text style={{color: textColor}} variant="headlineMedium">
          EUR
        </Text>
      </TouchableOpacity>
      <TextInput
        style={[
          gs.flex1,
          gs.p4,
          styles.input,
          {backgroundColor, color: textColor},
        ]}
        multiline
        keyboardType="number-pad"
        // editable={false} // Disable keyboard input
        onPaste={event => {
          const pastedText = event.nativeEvent.text;
          const filteredText = handleTextChange(pastedText);
          console.log(filteredText); // Handle the filtered numeric text
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {fontSize: 57, fontWeight: '200'},
});

InputField.propTypes = {
  isTo: PropTypes.bool,
  openSheet: PropTypes.func,
};
