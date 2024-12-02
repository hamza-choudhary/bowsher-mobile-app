import {validateConverterPaste} from '@helpers';
import {globalStyles as gs} from '@styles';
import {fontFamily, WIDTH} from '@utils';
import PropTypes from 'prop-types';
import {forwardRef, useCallback, useRef} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SelectUnitSheet} from './SelectUnitSheet';

export const InputField = forwardRef(function InputField(
  {isSource = false, isActive, value, onUnitSelect, onFocus, onPaste, gas},
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

  const textColor = isActive ? colors.black : colors.textSecondary;

  return (
    <>
      <View style={[gs.flex1, gs.overflowHidden]}>
        <TouchableOpacity style={[gs.flex1, gs.px5]} onPress={onFocus}>
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
                gs.py2,
                gs.hFull,
                isSource ? gs.justifyEnd : gs.justifyStart,
                {width: WIDTH / 6 + 6},
              ]}
              onPress={openSheet}>
              <View
                style={[
                  gs.justifyEnd,
                  gs.flexRow,
                  gs.itemsCenter,
                  !isSource && styles.btnText,
                ]}>
                <Text
                  style={[
                    gs.uppercase,
                    gs.flexShrink,
                    {color: colors.textSecondary},
                  ]}
                  variant="titleMedium">
                  {value.unit}
                </Text>
                <Ionicons
                  color={colors.textSecondary}
                  size={25}
                  name="chevron-expand"
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <SelectUnitSheet
        ref={bottomSheetRef}
        onUnitSelect={uniSelectHandler}
        gas={gas}
      />
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
  gas: PropTypes.string,
};
