import {MESSAGES} from '@constants';
import PropTypes from 'prop-types';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function NoDataFound({
  message = '',
  variant = 'bodyLarge',
  containerStyle,
  style,
  fullScreen = false,
}) {
  const {spacing, colors} = useTheme();
  const messageValue = message || MESSAGES.NO_DATA_FOUND;

  const container = [
    {paddingHorizontal: spacing.m, paddingVertical: spacing.m},
    fullScreen && styles.fullScreenContainer,
    containerStyle,
  ];

  return (
    <SafeAreaView style={container}>
      {fullScreen ? (
        <>
          <Icon name="history" size={200} color={colors.primary} />
          <Text variant="headlineLarge">No Data Found!</Text>
          <Text variant="titleMedium">{messageValue}</Text>
        </>
      ) : (
        <Text style={style} variant={variant}>
          {messageValue}
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {flex: 1, top: '20%', alignItems: 'center'},
  button: {marginTop: 10},
});

NoDataFound.propTypes = {
  message: PropTypes.string,
  variant: PropTypes.string,
  containerStyle: PropTypes.object,
  style: PropTypes.object,
  fullScreen: PropTypes.bool,
  isLoading: PropTypes.bool,
  showOptions: PropTypes.bool,
};
