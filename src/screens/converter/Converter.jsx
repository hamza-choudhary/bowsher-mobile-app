import {UNITS} from '@constants';
import {globalStyles as gs} from '@styles';
import {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {converter} from 'utils/converter';
import {InputField} from './components/InputField';
import {InputPad} from './components/InputPad';
import {SelectUnitSheet} from './components/SelectUnitSheet';

const FIELD = {SOURCE: 'source', TARGET: 'target'};

export function Converter() {
  const [source, setSource] = useState({value: '', unit: UNITS.kg.unit});
  const [target, setTarget] = useState({value: '', unit: UNITS.kg.unit});
  const [activeField, setActiveField] = useState(FIELD.SOURCE);
  const {colors} = useTheme();
  const bottomSheetRef = useRef();

  const performConversion = useCallback(
    (fromField, newSourceValue, newSourceUnit, newTargetUnit) => {
      try {
        const currentSourceValue = newSourceValue ?? source.value;
        const currentSourceUnit = newSourceUnit ?? source.unit;
        const currentTargetUnit = newTargetUnit ?? target.unit;

        const inputValue = Number(currentSourceValue) || 0;
        const result = converter({
          input: inputValue,
          from: currentSourceUnit,
          to: currentTargetUnit,
        });

        if (fromField === FIELD.SOURCE) {
          setTarget(prev => ({...prev, value: result.toString()}));
        } else {
          setSource(prev => ({...prev, value: result.toString()}));
        }
      } catch (error) {
        console.error('Conversion error:', error);
      }
    },
    [source, target.unit],
  );

  const handleUnitSelection = useCallback(
    selectedUnit => {
      if (activeField === FIELD.SOURCE) {
        setSource(prev => ({...prev, unit: selectedUnit}));
        performConversion(
          FIELD.SOURCE,
          source.value,
          selectedUnit,
          target.unit,
        );
      } else {
        setTarget(prev => ({...prev, unit: selectedUnit}));
        performConversion(
          FIELD.TARGET,
          target.value,
          target.unit,
          selectedUnit,
        );
      }
      bottomSheetRef.current?.close();
    },
    [activeField, performConversion, source.value, target],
  );

  const handleValueChange = useCallback(
    (field, value) => {
      if (field === FIELD.SOURCE) {
        setSource(prev => ({...prev, value: value}));
        performConversion(FIELD.SOURCE, value);
        return;
      }
      setTarget(prev => ({...prev, value: value}));
      performConversion(FIELD.TARGET, value);
    },
    [performConversion],
  );

  const handleFieldFocus = useCallback(field => {
    setActiveField(field);
  }, []);

  const openSheet = useCallback(field => {
    setActiveField(field);
    bottomSheetRef.current?.open();
  }, []);

  const handleKeyPress = useCallback(
    valueUpdater => {
      const currentField = activeField;
      const currentValue =
        currentField === FIELD.SOURCE ? source.value : target.value;
      const newValue = valueUpdater(currentValue);

      handleValueChange(currentField, newValue);
    },
    [activeField, handleValueChange, source.value, target.value],
  );

  return (
    <View style={[gs.flex1, {backgroundColor: colors.background}]}>
      <View style={{flex: 1.5}}>
        <InputField
          isSource
          data={source}
          isActive={activeField === FIELD.SOURCE}
          onFocus={() => handleFieldFocus(FIELD.SOURCE)}
          onValueChange={value => handleValueChange(FIELD.SOURCE, value)}
          openSheet={() => openSheet(FIELD.SOURCE)}
        />
        <InputField
          data={target}
          isActive={activeField === FIELD.TARGET}
          onFocus={() => handleFieldFocus(FIELD.TARGET)}
          onValueChange={value => handleValueChange(FIELD.TARGET, value)}
          openSheet={() => openSheet(FIELD.TARGET)}
        />
      </View>
      <InputPad onKeyPress={handleKeyPress} />
      <SelectUnitSheet
        ref={bottomSheetRef}
        onUnitSelect={handleUnitSelection}
      />
    </View>
  );
}
