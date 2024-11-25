import {Image} from 'react-native';

export function resolveImageSource(image) {
  return Image.resolveAssetSource(image).uri;
}
