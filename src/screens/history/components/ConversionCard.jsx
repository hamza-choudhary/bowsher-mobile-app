import {removeConversionFromStorage} from '@helpers';
import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Card, IconButton, Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';

export function ConversionCard({data, refetch}) {
  const {colors, roundness} = useTheme();

  const {id, type, sourceUnit, targetValue, targetUnit} = data;

  async function handleDelete() {
    await removeConversionFromStorage(id);
    refetch();
    //TODO: show toaster
  }

  // TODO: add remove history button + logic

  return (
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
              onPress={handleDelete}
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
  );
}

ConversionCard.propTypes = {
  data: PropTypes.object,
  refetch: PropTypes.func,
};
