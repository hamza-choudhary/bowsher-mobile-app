import {AppStatusBar} from '@common';
import {Navigation} from '@navigation';
import {themeConfig, toastConfig} from '@utils';
import {useEffect} from 'react';
import BootSplash from 'react-native-bootsplash';
import 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function App() {
  useEffect(() => {
    (async () => {
      await BootSplash.hide({fade: true});
    })();
  }, []);

  return (
    <PaperProvider theme={themeConfig}>
      <AppStatusBar />
      <Navigation />
      <Toast position="top" config={toastConfig} />
    </PaperProvider>
  );
}
