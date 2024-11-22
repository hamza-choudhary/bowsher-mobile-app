import {UNITS} from '@constants';
import {globalStyles as gs} from '@styles';
import {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {converter} from 'utils/converter';
import {InputField} from './components/InputField';
import {InputPad} from './components/InputPad';

const FIELD = {SOURCE: 'source', TARGET: 'target'};

export function Converter() {
  //? add ts for better suggestions and use [] syntax
  const [conversion, setConversion] = useState({
    source: {value: '0', unit: UNITS.kg.unit},
    target: {value: '0', unit: UNITS.kg.unit},
  });
  const [activeField, setActiveField] = useState(FIELD.SOURCE);
  const {colors} = useTheme();
  const sourceRef = useRef();
  const targetRef = useRef();

  const handleFieldFocus = useCallback(field => {
    setActiveField(field);
  }, []);

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
      to: targetUnit,
      from: sourceUnit,
      input: sourceValue,
    });

    // console.log(
    //   `to: ${targetUnit}, from: ${sourceUnit}, input: ${sourceValue}`,
    // );

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
      to: targetUnit,
      from: sourceUnit,
      input: updatedSourceValue,
    });
    setConversion(p => ({
      ...p,
      [targetField]: {...p[targetField], value: result},
    }));
  }

  useEffect(() => {
    sourceRef.current.focus();
  }, []);

  return (
    <View style={[gs.flex1, {backgroundColor: colors.background}]}>
      <View style={{flex: 0.8}}>
        <InputField
          ref={sourceRef}
          isSource
          isActive={activeField === FIELD.SOURCE}
          value={conversion.source}
          onUnitSelect={unit => handleUnitSelection(FIELD.SOURCE, unit)}
          onFocus={() => handleFieldFocus(FIELD.SOURCE)}
          onPaste={value => handlePaste(FIELD.SOURCE, value)}
        />
        <InputField
          ref={targetRef}
          isActive={activeField === FIELD.TARGET}
          value={conversion.target}
          onUnitSelect={unit => handleUnitSelection(FIELD.TARGET, unit)}
          onFocus={() => handleFieldFocus(FIELD.TARGET)}
          onPaste={value => handlePaste(FIELD.TARGET, value)}
        />
      </View>
      <InputPad onKeyPress={handleKeyPress} />
    </View>
  );
}
