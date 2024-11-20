import {globalStyles as gs} from '@styles';
import {View} from 'react-native';
import WebView from 'react-native-webview';

export function Home() {
  return (
    <View style={gs.flex1}>
      <WebView source={{uri: 'https://bowsherps.com/'}} style={gs.flex1} />
    </View>
  );
}
