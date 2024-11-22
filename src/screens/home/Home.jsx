import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';

export function Home() {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigationStateChange = navState => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setIsLoading(navState.loading);
  };

  const handleGoBack = () => {
    if (canGoBack) {
      webViewRef.current?.goBack();
    }
  };

  const handleGoForward = () => {
    if (canGoForward) {
      webViewRef.current?.goForward();
    }
  };

  const handleReload = () => {
    webViewRef.current?.reload();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* //! IOS */}
      <WebView
        ref={webViewRef}
        source={{uri: 'https://bowsherps.com/'}}
        allowingReadAccessToURL={'https://bowsherps.com/'}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={false}
        allowsFullscreenVideo={true}
        allowsBackForwardNavigationGestures={true}
        useWebKit={true}
        mixedContentMode="always"
        cacheEnabled={true}
        injectedJavaScript={`document.querySelector('meta[name=viewport]').setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');`}
        renderLoading={() => (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loadingIndicator}
          />
        )}
        onNavigationStateChange={handleNavigationStateChange}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />

      {/* <WebView
      useWebView2
      pagingEnabled
      pullToRefreshEnabled
        ref={webViewRef}
        source={{uri: 'https://bowsherps.com/'}}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsFullscreenVideo={true}
        onNavigationStateChange={handleNavigationStateChange}
        mixedContentMode="always"
        renderLoading={() => (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loadingIndicator}
          />
        )}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      /> */}

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          onPress={handleGoBack}
          disabled={!canGoBack}
          style={[
            styles.navigationButton,
            !canGoBack && styles.disabledButton,
          ]}>
          <Icon
            name="arrow-back"
            size={24}
            color={canGoBack ? '#000' : '#888'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleGoForward}
          disabled={!canGoForward}
          style={[
            styles.navigationButton,
            !canGoForward && styles.disabledButton,
          ]}>
          <Icon
            name="arrow-forward"
            size={24}
            color={canGoForward ? '#000' : '#888'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleReload}
          style={styles.navigationButton}>
          <Icon name="refresh" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#e7e7e7',
  },
  navigationButton: {
    padding: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

// import React, { useRef, useState, useEffect } from 'react';
// import {
//   ActivityIndicator,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   Platform,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { WebView } from 'react-native-webview';

// export function Home() {
//   const webViewRef = useRef(null);
//   const [canGoBack, setCanGoBack] = useState(false);
//   const [canGoForward, setCanGoForward] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const handleNavigationStateChange = navState => {
//     setCanGoBack(navState.canGoBack);
//     setCanGoForward(navState.canGoForward);
//     setIsLoading(navState.loading);
//   };

//   const handleGoBack = () => {
//     if (canGoBack) {
//       webViewRef.current?.goBack();
//     }
//   };

//   const handleGoForward = () => {
//     if (canGoForward) {
//       webViewRef.current?.goForward();
//     }
//   };

//   const handleReload = () => {
//     webViewRef.current?.reload();
//   };

//   const injectedJavaScript = `
//     (function() {
//       function wrap(fn) {
//         return function wrapper() {
//           var res = fn.apply(this, arguments);
//           window.ReactNativeWebView.postMessage('navigationStateChange');
//           return res;
//         }
//       }

//       history.pushState = wrap(history.pushState);
//       history.replaceState = wrap(history.replaceState);
//       window.addEventListener('popstate', function() {
//         window.ReactNativeWebView.postMessage('navigationStateChange');
//       });
//     })();

//     true;
//   `;

//   const onMessage = (event) => {
//     if (event.nativeEvent.data === 'navigationStateChange') {
//       webViewRef.current.injectJavaScript(`
//         window.ReactNativeWebView.postMessage(JSON.stringify({
//           canGoBack: window.history.length > 1,
//           canGoForward: window.history.length < window.history.state?.idx + 1
//         }));
//       `);
//     } else {
//       try {
//         const data = JSON.parse(event.nativeEvent.data);
//         setCanGoBack(data.canGoBack);
//         setCanGoForward(data.canGoForward);
//       } catch (error) {
//         console.error('Failed to parse WebView message:', error);
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <WebView
//         ref={webViewRef}
//         source={{ uri: 'https://bowsherps.com/' }}
//         style={styles.webview}
//         originWhitelist={['*']}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//         startInLoadingState={true}
//         scalesPageToFit={true}
//         allowsFullscreenVideo={true}
//         onNavigationStateChange={handleNavigationStateChange}
//         mixedContentMode="always"
//         injectedJavaScript={injectedJavaScript}
//         onMessage={onMessage}
//         renderLoading={() => (
//           <ActivityIndicator
//             size="large"
//             color="#0000ff"
//             style={styles.loadingIndicator}
//           />
//         )}
//         onError={syntheticEvent => {
//           const { nativeEvent } = syntheticEvent;
//           console.warn('WebView error: ', nativeEvent);
//         }}
//         contentInsetAdjustmentBehavior="automatic"
//         automaticallyAdjustContentInsets={true}
//         decelerationRate="normal"
//         scrollEnabled={true}
//         bounces={true}
//         userAgent={
//           Platform.OS === 'ios'
//             ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
//             : undefined
//         }
//       />

//       <View style={styles.navigationContainer}>
//         <TouchableOpacity
//           onPress={handleGoBack}
//           disabled={!canGoBack}
//           style={[
//             styles.navigationButton,
//             !canGoBack && styles.disabledButton,
//           ]}>
//           <Icon
//             name="arrow-back"
//             size={24}
//             color={canGoBack ? '#000' : '#888'}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={handleGoForward}
//           disabled={!canGoForward}
//           style={[
//             styles.navigationButton,
//             !canGoForward && styles.disabledButton,
//           ]}>
//           <Icon
//             name="arrow-forward"
//             size={24}
//             color={canGoForward ? '#000' : '#888'}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={handleReload}
//           style={styles.navigationButton}>
//           <Icon name="refresh" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   webview: {
//     flex: 1,
//   },
//   navigationContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingVertical: 10,
//     backgroundColor: '#f8f8f8',
//     borderTopWidth: 1,
//     borderTopColor: '#e7e7e7',
//   },
//   navigationButton: {
//     padding: 10,
//   },
//   disabledButton: {
//     opacity: 0.5,
//   },
//   loadingIndicator: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
// });

// import React, {useRef, useState} from 'react';
// import {
//   ActivityIndicator,
//   Dimensions,
//   Platform,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {WebView} from 'react-native-webview';

// export function Home() {
//   const webViewRef = useRef(null);
//   const [canGoBack, setCanGoBack] = useState(false);
//   const [canGoForward, setCanGoForward] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const handleNavigationStateChange = navState => {
//     setCanGoBack(navState.canGoBack);
//     setCanGoForward(navState.canGoForward);
//     setIsLoading(navState.loading);
//   };

//   const handleGoBack = () => {
//     if (canGoBack && webViewRef.current) {
//       webViewRef.current.goBack();
//     }
//   };

//   const handleGoForward = () => {
//     if (canGoForward && webViewRef.current) {
//       webViewRef.current.goForward();
//     }
//   };

//   const handleReload = () => {
//     if (webViewRef.current) {
//       webViewRef.current.reload();
//     }
//   };

//   const injectedJavaScript = `
//     (function() {
//       // Enhance clickability for iOS
//       function enhanceInteractions() {
//         // Make all clickable elements more responsive
//         var clickables = document.querySelectorAll(
//           'a, button, [onclick], .menu-item, .clickable, [role="button"]'
//         );

//         clickables.forEach(function(el) {
//           // Ensure cursor is pointer
//           el.style.cursor = 'pointer';

//           // Add touch feedback
//           el.addEventListener('touchstart', function(e) {
//             this.style.opacity = '0.7';
//           });

//           el.addEventListener('touchend', function(e) {
//             this.style.opacity = '1';
//           });

//           // Prevent default to handle click events
//           el.addEventListener('click', function(e) {
//             e.preventDefault();
//             e.stopPropagation();

//             // Trigger click programmatically
//             this.click();
//           }, false);
//         });

//         // Handle video elements
//         var videos = document.getElementsByTagName('video');
//         for (var i = 0; i < videos.length; i++) {
//           videos[i].setAttribute('playsinline', '');
//           videos[i].setAttribute('webkit-playsinline', '');
//           videos[i].pause();
//         }
//       }

//       // Run on initial load and observe DOM changes
//       function initializeInteractions() {
//         enhanceInteractions();

//         var observer = new MutationObserver(function(mutations) {
//           mutations.forEach(function(mutation) {
//             if (mutation.addedNodes) {
//               enhanceInteractions();
//             }
//           });
//         });

//         observer.observe(document.body, {
//           childList: true,
//           subtree: true
//         });
//       }

//       // Ensure interactions are set up
//       if (document.readyState === 'complete') {
//         initializeInteractions();
//       } else {
//         document.addEventListener('DOMContentLoaded', initializeInteractions);
//       }

//       true; // Required for WebView
//     })();
//   `;

//   return (
//     <SafeAreaView style={styles.container}>
//       <WebView
//         ref={webViewRef}
//         source={{uri: 'https://bowsherps.com/'}}
//         style={styles.webview}
//         originWhitelist={['*']}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//         startInLoadingState={true}
//         scalesPageToFit={Platform.OS === 'android'}
//         allowsFullscreenVideo={true}
//         allowsInlineMediaPlayback={true}
//         mediaPlaybackRequiresUserAction={false}
//         scrollEnabled={true}
//         nestedScrollEnabled={true}
//         bounces={true}
//         decelerationRate="normal"
//         onNavigationStateChange={handleNavigationStateChange}
//         injectedJavaScript={injectedJavaScript}
//         renderLoading={() => (
//           <ActivityIndicator
//             size="large"
//             color="#0000ff"
//             style={styles.loadingIndicator}
//           />
//         )}
//         onError={syntheticEvent => {
//           const {nativeEvent} = syntheticEvent;
//           console.warn('WebView error: ', nativeEvent);
//         }}
//         onShouldStartLoadWithRequest={request => {
//           // Allow navigation within the same domain and common external domains
//           return request.url.startsWith('https://bowsherps.com');
//         }}
//         userAgent={
//           Platform.OS === 'ios'
//             ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
//             : undefined
//         }
//       />

//       {isLoading && (
//         <ActivityIndicator
//           size="large"
//           color="#0000ff"
//           style={styles.loadingIndicator}
//         />
//       )}

//       <View style={styles.navigationContainer}>
//         <TouchableOpacity
//           onPress={handleGoBack}
//           disabled={!canGoBack}
//           style={[
//             styles.navigationButton,
//             !canGoBack && styles.disabledButton,
//           ]}>
//           <Icon
//             name="arrow-back"
//             size={24}
//             color={canGoBack ? '#000' : '#888'}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={handleGoForward}
//           disabled={!canGoForward}
//           style={[
//             styles.navigationButton,
//             !canGoForward && styles.disabledButton,
//           ]}>
//           <Icon
//             name="arrow-forward"
//             size={24}
//             color={canGoForward ? '#000' : '#888'}
//           />
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={handleReload}
//           style={styles.navigationButton}>
//           <Icon name="refresh" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   webview: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
//   navigationContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     height: 50,
//     backgroundColor: '#f8f8f8',
//     borderTopWidth: 1,
//     borderTopColor: '#e7e7e7',
//   },
//   navigationButton: {
//     padding: 10,
//   },
//   disabledButton: {
//     opacity: 0.3,
//   },
//   loadingIndicator: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
// });

// import React, {useCallback, useState} from 'react';
// import {
//   Alert,
//   Linking,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {InAppBrowser} from 'react-native-inappbrowser-reborn';

// export function Home() {
//   const WEBSITE_URL = 'https://bowsherps.com/';

//   const openWebsite = useCallback(async () => {
//     try {
//       const isAvailable = await InAppBrowser.isAvailable();

//       if (isAvailable) {
//         const result = await InAppBrowser.open(WEBSITE_URL, {
//           // iOS Properties
//           dismissButtonStyle: 'close',
//           preferredBarTintColor: '#FFFFFF',
//           preferredControlTintColor: '#000000',
//           readerMode: false,
//           animated: true,
//           modalPresentationStyle: 'fullScreen',
//           modalTransitionStyle: 'coverVertical',
//           modalEnabled: true,
//           enableBarCollapsing: false,

//           // Android Properties
//           showTitle: true,
//           toolbarColor: '#FFFFFF',
//           secondaryToolbarColor: '#F0F0F0',
//           navigationBarColor: '#000000',
//           enableUrlBarHiding: true,
//           enableDefaultShare: true,
//           forceCloseOnRedirection: false,

//           // Animations for a smooth transition
//           animations: {
//             startEnter: 'slide_in_right',
//             startExit: 'slide_out_left',
//             endEnter: 'slide_in_left',
//             endExit: 'slide_out_right',
//           },
//         });

//         if (result) {
//           console.log('Browser session completed', result);
//         }
//       } else {
//         Alert.alert(
//           'Browser Unavailable',
//           'Unable to open in-app browser. Opening in default browser.',
//         );
//         Linking.openURL(WEBSITE_URL);
//       }
//     } catch (error) {
//       console.error('Error opening website:', error);
//       Alert.alert('Error', 'Could not open the website');
//     }
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />

//       <View style={styles.content}>
//         <Text style={styles.title}>Bowsher PS Website</Text>

//         <TouchableOpacity onPress={openWebsite} style={styles.button}>
//           <Text style={styles.buttonText}>Browse Website</Text>
//         </TouchableOpacity>

//         <Text style={styles.subtitle}>
//           Tap the button to explore our website in an in-app browser
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     borderRadius: 10,
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     width: '75%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   subtitle: {
//     color: '#666666',
//     textAlign: 'center',
//     marginTop: 15,
//     fontSize: 14,
//   },
// });

// import React, {useRef, useState} from 'react';
// import {Dimensions, StyleSheet, View} from 'react-native';
// import {ActivityIndicator} from 'react-native-paper';

// export function Home(params) {
//   const webViewRef = useRef(null);
//   const [canGoBack, setCanGoBack] = useState(false);
//   const [canGoForward, setCanGoForward] = useState(false);

//   const handleNavigationStateChange = navState => {
//     setCanGoBack(navState.canGoBack);
//     setCanGoForward(navState.canGoForward);
//   };

//   const injectedJavaScript = `
//     // Ensure responsiveness
//     const meta = document.createElement('meta');
//     meta.setAttribute('name', 'viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
//     document.head.appendChild(meta);

//     // Prevent default touch behaviors that might interfere with navigation
//     document.addEventListener('touchstart', function(e) {
//       e.preventDefault();
//     }, { passive: false });

//     // Ensure clickable elements work
//     document.querySelectorAll('a, button, [onclick]').forEach(el => {
//       el.addEventListener('click', function(e) {
//         window.ReactNativeWebView.postMessage(JSON.stringify({
//           type: 'link',
//           href: this.href || this.getAttribute('data-href')
//         }));
//         e.preventDefault();
//       });
//     });

//     true; // note: this is required
//   `;

//   const handleMessage = event => {
//     const data = JSON.parse(event.nativeEvent.data);
//     if (data.type === 'link' && data.href) {
//       webViewRef.current.stopLoading();
//       webViewRef.current.injectJavaScript(`
//         window.location.href = "${data.href}";
//         true;
//       `);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <WebView
//         ref={webViewRef}
//         source={{uri: 'https://bowsherps.com/'}}
//         style={styles.webview}
//         // injectedJavaScript={injectedJavaScript}
//         onNavigationStateChange={handleNavigationStateChange}
//         onMessage={handleMessage}
//         // Additional props for better performance and compatibility
//         domStorageEnabled={true}
//         javaScriptEnabled={true}
//         thirdPartyCookiesEnabled={true}
//         sharedCookiesEnabled={true}
//         originWhitelist={['*']}
//         allowsFullscreenVideo={true}
//         // Handle loading and errors
//         startInLoadingState={true}
//         renderLoading={() => (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" />
//           </View>
//         )}
//         onError={syntheticEvent => {
//           const {nativeEvent} = syntheticEvent;
//           console.warn('WebView error: ', nativeEvent);
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
//   webview: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
