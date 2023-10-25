/***
 * File: /src/components/basic/Image/ImageBackground.tsx
 * Project: epik
 * Author: John Chan Kah Seng (johnc@chanksis.com)
 * -----
 * Created: 13th October 2022 2:32pm
 * Modified: 25th October 2023 11:29am     by: John Chan Kah Seng
 * -----
 * ReactNative: 0.70.2   ReactNavigation: 6.x
 * Copyright 2016 - 2022 Chanksis.
 * -----
 * Image source standard to take in object with uri property {uri:xxx}
 * Image size is to be sized by style.width/height
 ***/
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Image} from './Image';
import type {ImageBgProps, ImageBgSvgProps} from 'rnBasic';
//+ Types `
interface FCnamespace {
  Svg: React.FC<ImageBgSvgProps>;
}
//^ Vars `
/**
 * ## [FC] ImageBackground
 * A View component with Image as background with sizing feature.
 * setting `size` will invoke central flex layout on image & children.
 * - `source` accepts Asset.PngTag | ImageSourcePropType.
 * - `watermark` sets opacity, accepts value (0-1).
 * - `size` sets background image size (central position)
 * - `defaultSource` uses fallback from Asset.png as default.
 * @param {ImageBgProps} props - extension of ImageBackgroundProps(react-native)
 */
export const ImageBackground: React.FC<ImageBgProps> & FCnamespace = ({
  watermark: opacity = 1,
  size,
  children,
  style,
  ...rest
}) => {
  const {width, height, ...irest} = StyleSheet.flatten(style || {});
  return (
    <View style={[style, styles.center]}>
      <Image
        style={[
          !size && StyleSheet.absoluteFill,
          {
            opacity,
            width: size?.width || '100%',
            height: size?.height || '100%',
          },
        ]}
        {...rest}
      />
      {size ? (
        <View
          style={[styles.center, {...irest}, StyleSheet.absoluteFill]}
          children={children}
        />
      ) : (
        children
      )}
    </View>
  );
};
/**
 * ## [FC] ImageBackground.Svg
 * ImageBackground extension that accepts Svg file format.
 * Uses Image.Svg as background and View as parent.
 * - `source` accepts Asset.SvgTag | ImageURISource.
 * - `watermark` sets opacity, accepts value (0-1).
 * - `defaultSource` uses fallback from Asset.svg as default.
 * - `size` sets background image size (central position)
 * - defaults to 100% width/height. unless defined in style.
 * @param {ImageBgSvgProps} props - extension of SvgProps(react-native-svg)
 */
const Svg: React.FC<ImageBgSvgProps> = ({
  watermark: opacity = 1,
  size,
  children,
  style,
  ...rest
}) => {
  const {width, height, ...irest} = StyleSheet.flatten(style || {});
  const cover = !width && !height && StyleSheet.absoluteFill;
  return (
    <View style={[cover, style, styles.center]}>
      <Image.Svg
        style={[
          !size && StyleSheet.absoluteFill,
          {
            opacity,
            width: size?.width || '100%',
            height: size?.height || '100%',
          },
        ]}
        {...rest}
      />
      {size ? (
        <View
          style={[styles.center, {...irest}, StyleSheet.absoluteFill]}
          children={children}
        />
      ) : (
        children
      )}
    </View>
  );
};
ImageBackground.Svg = Svg;

//^ Styles `
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
