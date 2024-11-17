import {globalStyles, globalStyles as gs} from '@styles';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {InputField} from './components/InputField';
import {InputPad} from './components/InputPad';

export function Converter() {
  return (
    <View style={[gs.flex1, {backgroundColor: 'pink'}]}>
      <InputField />
      <InputField />
      <InputPad />
    </View>
  );
}
