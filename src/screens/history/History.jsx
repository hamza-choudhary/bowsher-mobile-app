import {STORAGE} from '@constants';
import {useFocusEffect} from '@react-navigation/native';
import {globalStyles as gs} from '@styles';
import {deleteItemFromLocalStorage, getItemFromLocalStorage} from '@utils';
import {useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import {ConversionCard} from './components/ConversionCard';

export function History() {
  const [data, setData] = useState([]);
  const getHistoryFromStorage = useCallback(() => {
    (async () => {
      const history =
        (await getItemFromLocalStorage(STORAGE.CONVERSION_HISTORY)) || [];
      setData(history);
    })();
  }, []);

  useFocusEffect(getHistoryFromStorage);

  async function handleDelete() {
    await deleteItemFromLocalStorage(STORAGE.CONVERSION_HISTORY);
    getHistoryFromStorage();
    //TODO: show toaster
  }

  //TODO: create functionality for favorite

  const {colors} = useTheme();
  return (
    <View style={[gs.flex1, {backgroundColor: colors.background}]}>
      <View style={[gs.flexRow, gs.justifyBetween, gs.itemsCenter, gs.px3]}>
        <Text variant="titleLarge" style={[gs.textCenter, gs.my3]}>
          History
        </Text>
        <Button mode="outlined" icon="history" onPress={handleDelete}>
          clear
        </Button>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <ConversionCard refetch={getHistoryFromStorage} data={item} />
        )}
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
