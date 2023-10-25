/***
 * File: /src/components/basic/Image/Image.tsx
 * Project: epik
 * Author: John Chan Kah Seng (johnc@chanksis.com)
 * -----
 * Created: 13th October 2022 2:32pm
 * Modified: 25th October 2023 11:29am     by: John Chan Kah Seng
 * -----
 * ReactNative: 0.70.2   ReactNavigation: 6.x
 * Copyright 2016 - 2022 Chanksis.
 * -----
 * - react-native-svg | -react-native-svg-transformer
 * Specify custom attributes in .svgrrc for custom SVG fill path properties.
 * any changes to .svgrrc, SvgProps type definition will need update.
 * SvgProps type definition can be extended in type.d.ts.
 * SVG fill paths will need to be edited in the SVG file.
 * @ref https://dev.to/gautham495/how-to-use-svgs-in-react-native-37n9
 * @ref https://medium.com/@HassanYousefi/how-to-use-svg-with-dynamic-colors-in-react-native-171a94e8a8e2
 ***/
import React from 'react';
import * as RN from 'react-native';
import Asset from 'Assets';
import {SvgUri, type UriProps} from 'react-native-svg';
import type {ImageProps, ImageSvgProps} from 'rnBasic';
//+ Types `
interface FCnamespace {
  Svg: React.FC<ImageSvgProps>;
}
//^ Vars `
const PngFallback = Asset.png('fallback');
const SvgFallback = Asset.svg('fallback');
/**
 * ## [FC] Image
 * React-Native's Image component with predefined properties. unless overidden.
 * - `source` accepts Asset.PngTag | ImageSourcePropType.
 * - `defaultSource` uses fallback from Asset.png
 * @param {ImageProps} props - React-native's ImageProps.
 */
export const Image: React.FC<ImageProps> & FCnamespace = ({
  source: src,
  ...rest
}) => {
  const source = Asset.png(src as Asset.PngTag) || src;
  return <RN.Image source={source} defaultSource={PngFallback} {...rest} />;
};
/**
 * ## [FC] Image.Svg
 * Imports SVG file using react-native-svg | react-native-svg-transformer.
 * The import returns a SVG Image component loaded from assets or uri.
 * - `defaultSource` uses fallback from Asset.svg as default.
 * - defaults to 100% width/height. unless defined in style.
 * - predefined {defaultSource} with fallback image(Asset).
 * - accepts Svg file uri with fallback image(Asset).
 * -----
 * To set .svg fill color, edit .svg file props(strokes).
 * SVG path fill colors, refer to .svgrrc for props available/edit.
 * SvgProps(react-native-svg) type is extended in definitions.d.ts
 * any changes to SVG path fill colors, SvgProps(extended) will need update.
 * -----
 * @param {ImageSvgProps} props - SvgProps(react-native-svg) extended props
 */
const Svg: React.FC<ImageSvgProps> = ({source: src, style, ...rest}) => {
  const {
    width: W = '100%',
    height: H = '100%',
    ...fstyle
  } = RN.StyleSheet.flatten(style || {});
  //? SvgUri
  if (isImageSource(src))
    return <UriSvg uri={src.uri as string} style={style} {...rest} />;
  //? ImportedSVG file
  const SVG = Asset.svg(src as Asset.SvgTag) || SvgFallback;
  return <SVG width={W} height={H} style={fstyle} {...rest} />;
};
//^ Exports `
Image.Svg = Svg;

/**
 * ### UriSvg
 * loads SVG from uri provided, otherwise use Asset fallback
 */
const UriSvg = ({uri: uriS, style}: UriProps) => {
  const [uri, setUri] = React.useState(uriS);
  return (
    <RN.View style={style}>
      {!uri ? (
        <SvgFallback width={'100%'} height={'100%'} fill={'skyblue'} />
      ) : (
        <SvgUri
          uri={uri}
          width="100%"
          height="100%"
          onError={() => setUri(null)}
          style={{alignItems: 'center'}}
        />
      )}
    </RN.View>
  );
};
/**
 * ### isImageSource
 * Checks if value is of Uri object type
 */
function isImageSource(value: any): value is RN.ImageURISource {
  return (
    value instanceof Object && // Check if it's an object
    ('uri' in value || 'width' in value || 'height' in value)
  );
}
