import {UNITS} from '@constants';
import {validateConverterPaste} from '@helpers';
import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {forwardRef, useCallback, useRef} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {SelectUnitSheet} from './SelectUnitSheet';

export const InputField = forwardRef(function InputField(
  {isSource = false, isActive, value, onUnitSelect, onFocus, onPaste},
  ref,
) {
  const bottomSheetRef = useRef();
  const {colors} = useTheme();

  const handlePaste = event => {
    const pastedText = event.nativeEvent.text;
    const validatedValue = validateConverterPaste(pastedText);
    onPaste(validatedValue);
  };

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.open();
  }, []);

  function uniSelectHandler(unit) {
    bottomSheetRef.current?.close();
    onUnitSelect(unit);
  }

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
          {isSource ? 'to' : 'from'} {value.unit}
        </Text>
        <Text style={{color: textColor}} variant="headlineMedium">
          {UNITS[value.unit].name}
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
        value={value.value}
        multiline
        showSoftInputOnFocus={false}
        contextMenuHidden={false}
        onPaste={handlePaste}
        selection={{start: value.value?.length, end: value.value?.length}}
        //onChangeText={validateAndSetValue} //!there is no need for that
        textAlign="right"
        onFocus={onFocus}
      />
      <SelectUnitSheet ref={bottomSheetRef} onUnitSelect={uniSelectHandler} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {borderWidth: 1},
  input: {fontSize: 45, fontWeight: '200'},
});

InputField.propTypes = {
  isSource: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  value: PropTypes.object.isRequired,
  onUnitSelect: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
};
