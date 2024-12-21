import PropTypes from 'prop-types';
import {Button, Dialog, Portal, Text, useTheme} from 'react-native-paper';

export function Alert({title, message, onDismiss, onConfirm, visible}) {
  const {roundness} = useTheme();
  return (
    <Portal>
      <Dialog
        style={{borderRadius: roundness}}
        visible={visible}
        onDismiss={onDismiss}>
        <Dialog.Title>{title || 'Are you sure?'}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onConfirm}>Confirm</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

Alert.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onDismiss: PropTypes.func,
  onConfirm: PropTypes.func,
  visible: PropTypes.bool,
};
