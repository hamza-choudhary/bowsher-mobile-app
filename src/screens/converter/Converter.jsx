import {CONVERSION_FIELD as FIELD, GASES} from '@constants';
import {useFocusEffect} from '@react-navigation/native';
import {globalStyles as gs} from '@styles';
import {useCallback, useRef, useState} from 'react';
import {Keyboard, SafeAreaView, StyleSheet, View} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import {converter} from 'utils/converter';
import {InputField} from './components/InputField';
import {InputPad} from './components/InputPad';
import {SelectGasSheet} from './components/SelectGasSheet';

export function Converter() {
  const [gas, setGas] = useState(GASES.n2.unit);
  //? add ts for better suggestions and use [] syntax
  const [conversion, setConversion] = useState({
    source: {value: '0', unit: 'kg'},
    target: {value: '0', unit: 'kg'},
  });
  const [activeField, setActiveField] = useState(FIELD.SOURCE);
  const {colors} = useTheme();
  const sourceRef = useRef();
  const targetRef = useRef();
  const bottomSheetRef = useRef();

  const handleFieldFocus = useCallback(field => {
    setActiveField(field);
  }, []);

  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current.open();
  }, []);

  const handleSelectGas = useCallback(
    gasUnit => {
      setGas(gasUnit);

      const sourceField = activeField;
      const targetField =
        activeField === FIELD.SOURCE ? FIELD.TARGET : FIELD.SOURCE;

      const {value: sourceValue, unit: sourceUnit} = conversion[sourceField];
      const targetUnit = conversion[targetField].unit;

      const result = converter({
        gas: gasUnit,
        to: targetUnit,
        from: sourceUnit,
        input: sourceValue,
      });

      setConversion(p => ({
        ...p,
        [targetField]: {...p[targetField], value: result},
      }));

      bottomSheetRef.current.close();
    },
    [activeField, conversion],
  );

  function handleUnitSelection(field, unit) {
    setConversion(p => ({...p, [field]: {...p[field], unit}}));

    //? perform conversion
    const sourceField = activeField;
    const targetField =
      activeField === FIELD.SOURCE ? FIELD.TARGET : FIELD.SOURCE;

    const sourceValue = conversion[sourceField].value;

    const sourceUnit =
      field === sourceField ? unit : conversion[sourceField].unit;
    const targetUnit =
      field === targetField ? unit : conversion[targetField].unit;

    const result = converter({
      gas: gas,
      to: targetUnit,
      from: sourceUnit,
      input: sourceValue,
    });

    setConversion(p => ({
      ...p,
      [targetField]: {...p[targetField], value: result},
    }));
  }

  const handlePaste = useCallback(
    (field, value) => {
      //TODO: validate
      const validatedValue = value;
      setConversion(p => ({
        ...p,
        [field]: {...p[field], value: validatedValue},
      }));
      handleFieldFocus(field);
    },
    [handleFieldFocus],
  );

  function handleKeyPress(onChange) {
    const conversionValue = conversion[activeField];
    const updatedSourceValue = onChange(conversionValue.value);
    setConversion(p => ({
      ...p,
      [activeField]: {...p[activeField], value: updatedSourceValue},
    }));
    //? perform conversion
    const {unit: sourceUnit} = conversion[activeField];
    const targetField =
      activeField === FIELD.SOURCE ? FIELD.TARGET : FIELD.SOURCE;
    const {unit: targetUnit} = conversion[targetField];
    const result = converter({
      gas: gas,
      to: targetUnit,
      from: sourceUnit,
      input: updatedSourceValue,
    });
    setConversion(p => ({
      ...p,
      [targetField]: {...p[targetField], value: result},
    }));
  }

  const handleSwap = useCallback(() => {
    setConversion(prev => ({source: prev.target, target: prev.source}));
    setActiveField(p => (p === FIELD.SOURCE ? FIELD.TARGET : FIELD.SOURCE));
    if (activeField === FIELD.SOURCE) {
      targetRef.current.focus();
      return;
    }
    sourceRef.current.focus();
  }, [activeField]);

  useFocusEffect(
    useCallback(() => {
      const dismissKeyboard = () => {
        Keyboard.dismiss();
      };
      const keyboardListener = Keyboard.addListener(
        'keyboardDidShow',
        dismissKeyboard,
      );
      return () => {
        keyboardListener.remove();
      };
    }, []),
  );

  return (
    <SafeAreaView style={[gs.flex1, {backgroundColor: colors.background}]}>
      <View style={[styles.inputContainer]}>
        <InputField
          ref={sourceRef}
          gas={gas}
          isSource
          isActive={activeField === FIELD.SOURCE}
          value={conversion.source}
          onUnitSelect={unit => handleUnitSelection(FIELD.SOURCE, unit)}
          onFocus={() => handleFieldFocus(FIELD.SOURCE)}
          onPaste={value => handlePaste(FIELD.SOURCE, value)}
        />
        <View style={[gs.justifyCenter, gs.z50]}>
          <IconButton
            onPress={handleSwap}
            icon="swap-vertical"
            size={32}
            iconColor={colors.black}
            style={[gs.absolute, gs.selfStart, gs.left0]}
          />
          <View
            style={[
              gs.borderThin,
              styles.dividerLine,
              {borderColor: colors.padBtnOperator},
            ]}
          />
        </View>
        <InputField
          ref={targetRef}
          gas={gas}
          isActive={activeField === FIELD.TARGET}
          value={conversion.target}
          onUnitSelect={unit => handleUnitSelection(FIELD.TARGET, unit)}
          onFocus={() => handleFieldFocus(FIELD.TARGET)}
          onPaste={value => handlePaste(FIELD.TARGET, value)}
        />
      </View>
      <InputPad
        gas={gas}
        value={conversion}
        activeField={activeField}
        onKeyPress={handleKeyPress}
        openGasSelectSheet={handleOpenSheet}
      />
      <SelectGasSheet ref={bottomSheetRef} onGasSelect={handleSelectGas} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {flex: 0.8},
  dividerLine: {marginLeft: 50},
});
