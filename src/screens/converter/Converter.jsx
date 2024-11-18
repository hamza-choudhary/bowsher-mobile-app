import {globalStyles as gs} from '@styles';
import {useCallback, useRef, useState} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {InputField} from './components/InputField';
import {InputPad} from './components/InputPad';
import {SelectUnitSheet} from './components/SelectUnitSheet';

export function Converter() {
  const [source, setSource] = useState({value: '', unit: 'kg'});
  const [target, setTarget] = useState({value: '', unit: 'kg'});
  const [currentSelectionMode, setCurrentSelectionMode] = useState(true);
  const {colors} = useTheme();
  const bottomSheetRef = useRef();

  const handleUnitSelection = useCallback(
    selectedUnit => {
      if (currentSelectionMode) {
        setSource(prev => ({...prev, unit: selectedUnit}));
      } else {
        setTarget(prev => ({...prev, unit: selectedUnit}));
      }

      bottomSheetRef.current?.close();
    },
    [currentSelectionMode],
  );

  const handleValueChange = useCallback((isSource, value) => {
    if (isSource) {
      setSource(prev => ({...prev, value}));
      return;
    }
    setTarget(prev => ({...prev, value}));
  }, []);

  const openSheet = useCallback(isSource => {
    setCurrentSelectionMode(isSource);
    bottomSheetRef.current?.open();
  }, []);

  return (
    <View style={[gs.flex1, {backgroundColor: colors.background}]}>
      <View style={{flex: 1.5}}>
        <InputField
          isSource
          data={source}
          onValueChange={value => handleValueChange(true, value)}
          openSheet={() => openSheet(true)}
        />
        <InputField
          data={target}
          onValueChange={value => handleValueChange(false, value)}
          openSheet={() => openSheet(false)}
        />
      </View>
      <InputPad />
      <SelectUnitSheet
        ref={bottomSheetRef}
        onUnitSelect={handleUnitSelection}
      />
    </View>
  );
}
