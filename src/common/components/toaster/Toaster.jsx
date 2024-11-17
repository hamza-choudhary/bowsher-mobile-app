import {TOASTER} from '@constants';
import {globalStyles as gs} from '@styles';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text, useTheme} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IonIcons from 'react-native-vector-icons/Ionicons';
import OctIcon from 'react-native-vector-icons/Octicons';

export function ErrorToaster({message}) {
  return <Toaster message={message} type={TOASTER.ERROR} />;
}

export function WarningToaster({message}) {
  return <Toaster message={message} type={TOASTER.WARNING} />;
}

export function SuccessToaster({message}) {
  return <Toaster message={message} type={TOASTER.SUCCESS} />;
}
export function InfoToaster({message}) {
  return <Toaster message={message} type={TOASTER.INFO} />;
}

function Toaster({type, message}) {
  const {spacing, colors} = useTheme();

  let Icon;
  let backgroundColor;
  if (type === TOASTER.ERROR) {
    Icon = <OctIcon name="x-circle-fill" size={26} color={colors.black} />;
    backgroundColor = colors.toasterRed;
  } else if (type === TOASTER.INFO) {
    Icon = (
      <EntypoIcon name="info-with-circle" size={26} color={colors.black} />
    );
    backgroundColor = colors.toasterBlue;
  } else if (type === TOASTER.SUCCESS) {
    Icon = <IonIcons name="checkmark-circle" size={26} color={colors.black} />;
    backgroundColor = colors.toasterGreen;
  } else if (type === TOASTER.WARNING) {
    Icon = (
      <FontAwesome6 name="circle-exclamation" size={26} color={colors.black} />
    );
    backgroundColor = colors.toasterYellow;
  }

  return (
    <View style={[gs.wFull, gs.mt4, {paddingHorizontal: spacing.m}]}>
      <View style={[styles.container, gs.pl4, {backgroundColor}]}>
        <View style={styles.content}>
          {Icon}
          <View style={[gs.flex1, gs.gap4]}>
            <Text variant="titleSmall" style={{color: colors.black}}>
              {type}
              {':  '}
              <Text variant="bodyMedium" style={{color: colors.black}}>
                {message}
              </Text>
            </Text>
          </View>
        </View>
        <IconButton
          size={25}
          icon="close"
          iconColor={colors.black}
          onPress={Toast.hide}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
  content: {flexDirection: 'row', gap: 10, flex: 1, alignItems: 'center'},
});

Toaster.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};
SuccessToaster.propTypes = {
  message: PropTypes.string,
};
InfoToaster.propTypes = {
  message: PropTypes.string,
};
WarningToaster.propTypes = {
  message: PropTypes.string,
};
ErrorToaster.propTypes = {
  message: PropTypes.string,
};
