import {globalStyles as gs} from '@styles';
import {useCallback, useRef, useState} from 'react';
import {Platform, SafeAreaView, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import {Button} from './components/Button';
import {LoadingSpinner} from './components/LoadingSpinner';

export function Home() {
  const webViewRef = useRef(null);

  const [webNavigation, setWebNavigation] = useState({
    canGoBack: false,
    canGoForward: false,
    loading: true,
  });

  const handleNavigationStateChange = useCallback(navState => {
    setWebNavigation({
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward,
      loading: navState.loading,
    });
  }, []);

  const handleGoBack = useCallback(() => {
    if (webNavigation.canGoBack) {
      setWebNavigation(prev => ({...prev, loading: true}));
      webViewRef.current?.goBack();
    }
  }, [webNavigation.canGoBack]);

  const handleGoForward = useCallback(() => {
    if (webNavigation.canGoForward) {
      setWebNavigation(prev => ({...prev, loading: true}));
      webViewRef.current?.goForward();
    }
  }, [webNavigation.canGoForward]);

  const handleReload = useCallback(() => {
    setWebNavigation(prev => ({...prev, loading: true}));
    webViewRef.current?.reload();
  }, []);

  const {colors} = useTheme();

  return (
    <SafeAreaView style={[gs.flex1, {backgroundColor: colors.background}]}>
      <WebView
        ref={webViewRef}
        source={{uri: 'https://bowsherps.com/'}}
        style={[gs.flex1]}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        allowsFullscreenVideo={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onNavigationStateChange={handleNavigationStateChange}
        renderLoading={() => <></>}
        onLoadStart={() => setWebNavigation(prev => ({...prev, loading: true}))}
        onLoadEnd={() => setWebNavigation(prev => ({...prev, loading: false}))}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error:', nativeEvent);
          setWebNavigation(prev => ({...prev, loading: false}));
        }}
        userAgent={
          Platform.OS === 'ios'
            ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
            : undefined
        }
      />
      <View style={[gs.flexRow, gs.justifyAround, gs.itemsCenter]}>
        <Button
          icon="arrow-back"
          onPress={handleGoBack}
          disabled={!webNavigation.canGoBack}
        />
        <Button
          icon="arrow-forward"
          onPress={handleGoForward}
          disabled={!webNavigation.canGoForward}
        />
        <Button icon="refresh" onPress={handleReload} />
      </View>
      <LoadingSpinner isLoading={webNavigation.loading} />
    </SafeAreaView>
  );
}
