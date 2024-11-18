import {UNITS} from '@constants';
import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {forwardRef, useState} from 'react';
import {SectionList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Searchbar, Text, useTheme} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';

const unitSections = [
  {title: 'Weights', data: [UNITS.kg, UNITS.lb]},
  {title: 'Gas', data: [UNITS.scf, UNITS.nm3]},
  {title: 'Liquid', data: [UNITS.gal, UNITS.l]},
];

export const SelectUnitSheet = forwardRef(function SelectUnitSheet(
  {onUnitSelect},
  ref,
) {
  const theme = useTheme();
  const {colors} = theme;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = unitSections
    .map(section => ({
      ...section,
      data: section.data.filter(unit =>
        unit.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter(section => section.data.length > 0);

  return (
    <RBSheet
      ref={ref}
      customStyles={{
        wrapper: {backgroundColor: 'rgba(0, 0, 0, 0.4)'},
        draggableIcon: {backgroundColor: colors.grey},
        container: {
          backgroundColor: colors.background,
          height: '50%',
          borderRadius: theme.roundness,
        },
      }}
      draggable
      customModalProps={{animationType: 'slide', statusBarTranslucent: true}}
      customAvoidingViewProps={{enabled: false}}>
      <View style={gs.flex1}>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search units"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={[
              styles.searchBar,
              {backgroundColor: colors.background, borderColor: colors.black},
              gs.itemsCenter,
            ]}
            inputStyle={styles.searchInput}
            iconColor={colors.black}
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onClearIconPress={() => setSearchQuery('')}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <SectionList
          sections={filteredSections}
          keyExtractor={(item, index) => item.name + index}
          renderSectionHeader={({section: {title}}) => (
            <SectionHeader title={title} />
          )}
          renderItem={({item}) => (
            <ListItem item={item} onSelect={onUnitSelect} />
          )}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </RBSheet>
  );
});

function SectionHeader({title}) {
  const {colors} = useTheme();
  return (
    <Text variant="titleLarge" style={[{color: colors.black}, gs.px4, gs.py3]}>
      {title}
    </Text>
  );
}

function ListItem({item, onSelect}) {
  const {colors} = useTheme();
  const {name, unit} = item;
  return (
    <TouchableOpacity
      style={[
        {backgroundColor: colors.white100},
        gs.p4,
        gs.flexRow,
        styles.item,
        gs.justifyBetween,
        gs.itemsCenter,
      ]}
      onPress={() => onSelect(unit)}>
      <Text variant="bodyLarge" style={{color: colors.black}}>
        {name}
      </Text>
      <Text variant="bodyLarge" style={[{color: colors.black}, gs.capitalize]}>
        {` (${unit})`}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchContainer: {height: 45, paddingHorizontal: 10, marginBottom: 8},
  searchBar: {height: 45, borderWidth: 1, borderRadius: 50},
  searchInput: {height: 45, alignSelf: 'center'},
  listContent: {paddingBottom: 20},
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
});

SelectUnitSheet.propTypes = {
  onUnitSelect: PropTypes.func,
};
SectionHeader.propTypes = {
  title: PropTypes.string,
};
ListItem.propTypes = {
  item: PropTypes.object,
  onSelect: PropTypes.func,
};
