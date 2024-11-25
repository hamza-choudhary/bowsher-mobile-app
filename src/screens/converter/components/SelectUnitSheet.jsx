import {GASES} from '@constants';
import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {forwardRef, useMemo, useState} from 'react';
import {SectionList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Searchbar, Text, useTheme} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';

export const SelectUnitSheet = forwardRef(function SelectUnitSheet(
  {onUnitSelect, gas},
  ref,
) {
  const theme = useTheme();
  const {colors} = theme;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    const allSections = GASES[gas].unitList;
    if (!searchQuery.trim()) {
      return allSections;
    }
    const query = searchQuery.toLowerCase();
    return allSections
      .map(section => {
        const filteredItems = section.data.filter(
          item =>
            item.name.toLowerCase().includes(query) ||
            item.unit.toLowerCase().includes(query) ||
            section.title.toLowerCase().includes(query),
        );
        if (filteredItems.length > 0) {
          return {...section, data: filteredItems};
        }
        return null;
      })
      .filter(Boolean);
  }, [gas, searchQuery]);

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
          sections={filteredData}
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
  gas: PropTypes.string,
};
SectionHeader.propTypes = {
  title: PropTypes.string,
};
ListItem.propTypes = {
  item: PropTypes.object,
  onSelect: PropTypes.func,
};
