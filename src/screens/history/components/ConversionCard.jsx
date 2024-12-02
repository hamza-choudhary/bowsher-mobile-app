import {removeConversionFromStorage} from '@helpers';
import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {View} from 'react-native';
import {
  Button,
  Card,
  Dialog,
  IconButton,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';

export function ConversionCard({data, refetch}) {
  const {colors, roundness} = useTheme();
  const [dialogVisible, setDialogVisible] = useState(false);

  const {id, type, sourceUnit, targetValue, targetUnit} = data;

  async function handleDelete() {
    await removeConversionFromStorage(id);
    refetch();
    setDialogVisible(false);
    //TODO: show toaster
  }

  // TODO: add remove history button + logic

  const showDialog = () => setDialogVisible(true);
  const hideDialog = () => setDialogVisible(false);

  return (
    <>
      <Card style={[gs.mb3, {borderRadius: roundness}]}>
        <Card.Content style={gs.gap2}>
          <View style={[gs.justifyBetween, gs.itemsCenter, gs.flexRow]}>
            <Text
              variant="titleMedium"
              style={[gs.capitalize, {color: colors.primary}]}>
              {type}
            </Text>
            <View style={[gs.flexRow]}>
              <IconButton
                icon="star-outline"
                iconColor={colors.primary}
                size={25}
              />
              <IconButton
                onPress={showDialog}
                icon="trash-can-outline"
                iconColor={colors.primary}
                size={25}
              />
            </View>
          </View>
          <View style={[gs.flexRow, gs.flex1]}>
            <View style={[gs.itemsCenter, gs.flex1, gs.justifyBetween]}>
              <Text variant="bodyLarge">{data.sourceValue}</Text>
              <Text variant="labelLarge" style={gs.uppercase}>
                {sourceUnit}
              </Text>
            </View>
            <View style={[gs.mx2, gs.itemsCenter, gs.justifyCenter]}>
              <Icon color={colors.primary} size={30} name="arrow-right-long" />
            </View>
            <View style={[gs.itemsCenter, gs.flex1, gs.justifyBetween]}>
              <Text variant="bodyLarge">{targetValue}</Text>
              <Text variant="labelLarge" style={gs.uppercase}>
                {targetUnit}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
      <Portal>
        <Dialog
          style={{borderRadius: roundness}}
          visible={dialogVisible}
          onDismiss={hideDialog}>
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">this action will delete this item.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleDelete}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

ConversionCard.propTypes = {
  data: PropTypes.object,
  refetch: PropTypes.func,
};
