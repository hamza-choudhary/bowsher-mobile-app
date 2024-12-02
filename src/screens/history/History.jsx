import {STORAGE} from '@constants';
import {useFocusEffect} from '@react-navigation/native';
import {globalStyles as gs} from '@styles';
import {getItemFromLocalStorage} from '@utils';
import {useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {ConversionCard} from './components/ConversionCard';

export function History() {
  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const history =
          (await getItemFromLocalStorage(STORAGE.CONVERSION_HISTORY)) || [];
        if (JSON.stringify(history) !== JSON.stringify(data)) {
          setData(history);
        }
      })();
    }, [data]),
  );

  const {colors} = useTheme();
  return (
    <View style={[gs.flex1, {backgroundColor: colors.background}]}>
      <Text variant="titleLarge" style={[gs.textCenter, gs.my3]}>
        History
      </Text>
      <FlatList
        data={data}
        renderItem={({item}) => <ConversionCard data={item} />}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        contentContainerStyle={[gs.pb3, gs.px3]}
        ListEmptyComponent={NoDataFound}
      />
    </View>
  );
}

function NoDataFound() {
  //TODO: add icon no history found
  return (
    <View style={[gs.flex1]}>
      <Text>No history found.</Text>
    </View>
  );
}
