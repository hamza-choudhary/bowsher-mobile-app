import {AppStatusBar} from '@common';
import {Navigation} from '@navigation';
import {themeConfig, toastConfig} from '@utils';
import BootSplash from 'react-native-bootsplash';
import 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <PaperProvider theme={themeConfig}>
      <AppStatusBar />
      <Navigation
        onReady={() => {
          BootSplash.hide();
        }}
      />
      <Toast position="top" config={toastConfig} />
    </PaperProvider>
  );
}
