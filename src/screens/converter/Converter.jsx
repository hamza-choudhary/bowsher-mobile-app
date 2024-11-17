import {globalStyles as gs} from '@styles';
import {useRef} from 'react';
import {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {InputField} from './components/InputField';
import {InputPad} from './components/InputPad';
import {SelectUnitSheet} from './components/SelectUnitSheet';

export function Converter() {
  const {colors} = useTheme();
  const bottomSheetRef = useRef();

  const openSheet = () => {
    bottomSheetRef.current.open();
  };

  return (
    <View style={[gs.flex1, {backgroundColor: colors.background}]}>
      <View style={{flex: 1.5}}>
        <InputField openSheet={openSheet} isTo={true} />
        <InputField openSheet={openSheet} />
      </View>
      <InputPad />
      <SelectUnitSheet ref={bottomSheetRef} />
    </View>
  );
}
