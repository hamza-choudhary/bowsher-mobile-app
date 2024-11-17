import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {forwardRef, useCallback, useState} from 'react';
import {SectionList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Searchbar, Text, useTheme} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';

const unitSections = [
  {
    title: 'Weights',
    data: [
      {name: 'Kilogram', type: 'weight'},
      {name: 'Pounds', type: 'weight'},
    ],
  },
  {
    title: 'Gas',
    data: [
      {name: 'Cubic Feet', type: 'gas'},
      {name: 'Cubic Meter', type: 'gas'},
    ],
  },
  {
    title: 'Liquid',
    data: [
      {name: 'Gallons', type: 'liquid'},
      {name: 'Liter', type: 'liquid'},
    ],
  },
];

export const SelectUnitSheet = forwardRef(function SelectUnitSheet(
  params,
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

  const renderSectionHeader = useCallback(
    ({section: {title}}) => (
      <View
        style={[
          styles.sectionHeader,
          {backgroundColor: theme.colors.background},
        ]}>
        <Text style={[styles.sectionHeaderText, {color: theme.colors.primary}]}>
          {title}
        </Text>
      </View>
    ),
    [theme],
  );

  const renderItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={[styles.item, {backgroundColor: theme.colors.surface}]}
        // onPress={() => onSelectUnit(item)}
      >
        <Text style={[styles.itemText, {color: theme.colors.text}]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    ),
    [theme],
  );

  return (
    <RBSheet
      ref={ref}
      customStyles={{
        wrapper: {backgroundColor: 'rgba(0, 0, 0, 0.4)'},
        draggableIcon: {backgroundColor: theme.colors.grey},
        container: {
          backgroundColor: theme.colors.background,
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
            placeholder="Search products"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={[
              styles.searchBar,
              {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.primary,
              },
              gs.itemsCenter,
            ]}
            inputStyle={styles.searchInput}
            iconColor={theme.colors.primary}
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onClearIconPress={() => setSearchQuery('')}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <SectionList
          sections={filteredSections}
          keyExtractor={(item, index) => item.name + index}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </RBSheet>
  );
});

const styles = StyleSheet.create({
  searchContainer: {height: 45, paddingHorizontal: 10, marginBottom: 8},
  searchBar: {height: 45, borderWidth: 1, borderRadius: 50},
  searchInput: {height: 45, alignSelf: 'center'},
  listContent: {paddingBottom: 20},
  sectionHeader: {paddingHorizontal: 16, paddingVertical: 8},
  sectionHeaderText: {fontSize: 18, fontWeight: 'bold'},
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  itemText: {fontSize: 16},
});
