import {globalStyles as gs} from '@styles';
import {FlatList, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {ConversionCard} from './components/ConversionCard';

const sampleData = [
  {
    type: 'nitrogen',
    sourceUnit: 'kg',
    targetUnit: 'lb',
    sourceValue: '1344234234223.1231213123',
    targetValue: '324324234234.344',
  },
  // Add more sample data here if needed
];

export function History() {

  //get data from storage on every usefocus

  const {colors} = useTheme();
  return (
    <View style={[gs.flex1, {backgroundColor: colors.background}]}>
      <Text variant="titleLarge" style={[gs.textCenter, gs.my3]}>
        History
      </Text>
      <FlatList
        data={sampleData}
        renderItem={({item}) => <ConversionCard data={item} />}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        contentContainerStyle={[gs.pb3, gs.px3]}
      />
    </View>
  );
}
