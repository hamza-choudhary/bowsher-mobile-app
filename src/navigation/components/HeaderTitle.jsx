import {logoImage} from '@assets';
import {resolveImageSource} from '@utils';
import {Image, StyleSheet} from 'react-native';

const logo = resolveImageSource(logoImage);

export function HeaderTitle() {
  return (
    <Image style={styles.title} resizeMode="contain" source={{uri: logo}} />
  );
}

const styles = StyleSheet.create({
  title: {width: 120, height: 50},
});
