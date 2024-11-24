import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {forwardRef} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';

export const BottomSheetList = forwardRef(function BottomSheetList(
  {children},
  ref,
) {
  const theme = useTheme();
  const {colors} = theme;
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
      <View style={gs.flex1}>{children}</View>
    </RBSheet>
  );
});

BottomSheetList.propTypes = {
  children: PropTypes.node.isRequired,
};
