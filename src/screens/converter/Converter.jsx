import {globalStyles as gs} from '@styles';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {InputField} from './components/InputField';
import {InputPad} from './components/InputPad';
import { useRef } from 'react';
import { SelectUnitSheet } from './components/SelectUnitSheet';

export function Converter() {

  const bottomSheetRef = useRef()

  const openSheet = ()=>{
    bottomSheetRef.current.open();
  }

  return (
    <View style={[{backgroundColor: 'pink'}, gs.flex1]}>
      <View style={{flex: 1.5}}>
        <InputField openSheet={openSheet} isTo={true} />
        <InputField openSheet={openSheet} />
      </View>
      <InputPad />
      <SelectUnitSheet ref={bottomSheetRef}/>
    </View>
  );
}
