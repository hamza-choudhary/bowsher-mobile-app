import {UNITS} from '@constants';
import {validateConverterPaste} from '@helpers';
import {globalStyles as gs} from '@styles';
import {fontFamily, WIDTH} from '@utils';
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
    <>
      <View
        style={[
          gs.flex1,
          gs.overflowHidden,
          // gs.border1,
          // {borderColor, backgroundColor},
        ]}>
        <TouchableOpacity style={gs.flex1} onPress={onFocus}>
          <View style={[gs.flex1, gs.flexRow]}>
            <TextInput
              style={[
                gs.flex1,
                gs.p1,
                isSource ? gs.selfEnd : gs.selfStart,
                styles.input,
                {color: textColor},
              ]}
              ref={ref}
              value={value.value || '0'}
              multiline={true}
              showSoftInputOnFocus={false}
              contextMenuHidden={false}
              onPaste={handlePaste}
              selection={{start: value.value?.length, end: value.value?.length}}
              textAlign="right"
              onFocus={onFocus}
            />
            <TouchableOpacity
              style={[
                gs.justifyCenter,
                gs.p2,
                gs.hFull,
                isSource ? gs.justifyEnd : gs.justifyStart,
                {backgroundColor: 'orange', width: WIDTH / 6},
              ]}
              onPress={openSheet}>
              <Text
                style={[
                  gs.uppercase,
                  !isSource && styles.btnText,
                  {color: textColor},
                ]}
                variant="titleLarge">
                {value.unit}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <SelectUnitSheet ref={bottomSheetRef} onUnitSelect={uniSelectHandler} />
    </>
  );
});

const styles = StyleSheet.create({
  input: {fontSize: 50, fontFamily: fontFamily, fontWeight: '400'},
  btnText: {marginTop: 22},
});

InputField.propTypes = {
  isSource: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  value: PropTypes.object.isRequired,
  onUnitSelect: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
};
