import {STORAGE} from '@constants';
import {useFocusEffect} from '@react-navigation/native';
import {globalStyles as gs} from '@styles';
import {deleteItemFromLocalStorage, getItemFromLocalStorage} from '@utils';
import {useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Button, Dialog, Portal, Text, useTheme} from 'react-native-paper';
import {ConversionCard} from './components/ConversionCard';

export function History() {
  const [data, setData] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const {colors, roundness} = useTheme();

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
    setDialogVisible(false)
    //TODO: show toaster
  }

  //TODO: create functionality for favorite

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  return (
    <View style={[gs.flex1, {backgroundColor: colors.background}]}>
      <View style={[gs.flexRow, gs.justifyBetween, gs.itemsCenter, gs.px3]}>
        <Text variant="titleLarge" style={[gs.textCenter, gs.my3]}>
          History
        </Text>
        <Button mode="outlined" icon="history" onPress={showDialog}>
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
      <Portal>
        <Dialog
          style={{borderRadius: roundness}}
          visible={dialogVisible}
          onDismiss={hideDialog}>
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              this action will clear all history.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleDelete}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
