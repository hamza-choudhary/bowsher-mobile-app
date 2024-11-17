import {globalStyles as gs} from '@styles';
import {TextInput, TouchableOpacity, View} from 'react-native';

import PropTypes from 'prop-types';
import {Text} from 'react-native-paper';

export function InputField({isRed, openSheet}) {
  const handleTextChange = text => {
    // Allow only numbers
    const numericText = text.replace(/[^0-9]/g, '');
    // Perform any further processing if needed
    return numericText;
  };

  return (
    <View style={[gs.flex1, {backgroundColor: isRed ? 'orange' : 'pink'}]}>
      <TouchableOpacity style={{backgroundColor: 'blue'}} onPress={openSheet}>
        <Text>from</Text>
        <Text variant="displaySmall">from</Text>
      </TouchableOpacity>
      <TextInput
        style={[gs.flex1, {backgroundColor: '#ccc'}]}
        multiline
        keyboardType="number-pad" // Set number pad as the default
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

InputField.propTypes = {
  isRed: PropTypes.bool,
  openSheet: PropTypes.func,
};
