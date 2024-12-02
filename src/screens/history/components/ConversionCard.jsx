import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Card, Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome6';

export function ConversionCard({data}) {
  const {colors, roundness} = useTheme();

  // TODO: add remove history button + logic

  return (
    <Card style={[gs.mb3,{borderRadius: roundness}]}>
      <Card.Content style={gs.gap2}>
        <Text
          variant="titleMedium"
          style={[gs.textCenter, gs.capitalize, {color: colors.primary}]}>
          {data.type}
        </Text>
        <View style={[gs.flexRow, gs.flex1]}>
          <View style={[gs.itemsCenter, gs.flex1, gs.justifyBetween]}>
            <Text variant="bodyLarge">{data.sourceValue}</Text>
            <Text variant="labelLarge" style={gs.uppercase}>
              {data.sourceUnit}
            </Text>
          </View>
          <View style={[gs.mx2, gs.itemsCenter, gs.justifyCenter]}>
            <Icon color={colors.primary} size={30} name="arrow-right-long" />
          </View>
          <View style={[gs.itemsCenter, gs.flex1, gs.justifyBetween]}>
            <Text variant="bodyLarge">{data.targetValue}</Text>
            <Text variant="labelLarge" style={gs.uppercase}>
              {data.targetUnit}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

ConversionCard.propTypes = {
  data: PropTypes.object,
};
