import {StatusBar} from 'react-native';
import {useTheme} from 'react-native-paper';

export function AppStatusBar() {
  const {colors} = useTheme();
  return <StatusBar backgroundColor={colors.primary} />;
}
