import {Alert} from '@common';
import {MESSAGES, STORAGE} from '@constants';
import {useFocusEffect} from '@react-navigation/native';
import {globalStyles as gs} from '@styles';
import {deleteItemFromLocalStorage, getItemFromLocalStorage} from '@utils';
import {useCallback, useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {Button, Text, useTheme} from 'react-native-paper';
import {ConversionCard} from './components/ConversionCard';
import {NoDataFound} from './components/NoDataFound';

export function History() {
  const [data, setData] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const {colors} = useTheme();

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
    setDialogVisible(false);
    //TODO: show toaster
  }

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  return (
    <SafeAreaView style={[gs.flex1, {backgroundColor: colors.background}]}>
      {data.length > 0 && (
        <View style={[gs.flexRow, gs.justifyBetween, gs.itemsCenter, gs.px3]}>
          <Text variant="titleLarge" style={[gs.textCenter, gs.my3]}>
            History
          </Text>
          <Button mode="outlined" icon="history" onPress={showDialog}>
            clear
          </Button>
        </View>
      )}
      <FlatList
        data={data}
        renderItem={({item}) => (
          <ConversionCard refetch={getHistoryFromStorage} data={item} />
        )}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        contentContainerStyle={[gs.pb3, gs.px3]}
        ListEmptyComponent={<NoDataFound fullScreen />}
        showsVerticalScrollIndicator={false}
      />
      <Alert
        visible={dialogVisible}
        message={MESSAGES.ALERT_DELETE_HISTORY}
        onConfirm={handleDelete}
        onDismiss={hideDialog}
      />
    </SafeAreaView>
  );
}
