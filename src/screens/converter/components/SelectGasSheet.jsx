import {BottomSheetList} from '@common';
import {globalStyles as gs} from '@styles';
import {getAllGases} from '@utils';
import PropTypes from 'prop-types';
import {forwardRef, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Searchbar, useTheme} from 'react-native-paper';
import {ListItem} from './ListItem';

export const SelectGasSheet = forwardRef(function SelectGasSheet(
  {onGasSelect},
  ref,
) {
  const theme = useTheme();
  const {colors} = theme;
  const [searchQuery, setSearchQuery] = useState('');

  //? search + all data
  const data = useMemo(() => {
    const allGases = getAllGases();
    const trimmedQuery = searchQuery.trim().toLowerCase();

    if (!trimmedQuery) {
      return allGases;
    }

    return allGases.filter(
      ({name, unit}) =>
        name.toLowerCase().includes(trimmedQuery) ||
        unit.toLowerCase().includes(trimmedQuery),
    );
  }, [searchQuery]);

  return (
    <BottomSheetList ref={ref}>
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
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({item}) => <ListItem item={item} onSelect={onGasSelect} />}
        contentContainerStyle={styles.listContent}
      />
    </BottomSheetList>
  );
});

const styles = StyleSheet.create({
  searchContainer: {height: 45, paddingHorizontal: 10, marginBottom: 8},
  searchBar: {height: 45, borderWidth: 1, borderRadius: 50},
  searchInput: {height: 45, alignSelf: 'center'},
  listContent: {paddingBottom: 20},
});

SelectGasSheet.propTypes = {
  onGasSelect: PropTypes.func.isRequired,
};
