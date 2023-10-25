/***
 * File: /types/basic.d.ts
 * Project: epik
 * File: /types/basic.d.ts
 * Project: epik
 * Created: 21st October 2023 1:32am
 * Modified: 25th October 2023 11:29am     by: John Chan Kah Seng
 * -----
 * Modified: 25th October 2023 11:29am     by: John Chan Kah Seng
 * Copyright 2016 - 2023 Chanksis.
 ***/
declare module 'rnBasic' {
  import * as Rn from 'react-native';
  import type {SvgProps} from 'react-native-svg';
  import {UStyle} from 'Utilities';
  //+ View `
  type ShadowSet = UStyle.shadow.ShadowSet;
  type ShadowTag = keyof typeof UStyle.shadow.depth;
  /** Extended react-native ViewProps */
  interface ViewProps extends Rn.ViewProps {
    shadow?: ShadowSet | ShadowTag;
  }
  //+ Text `
  export interface TextProps extends Rn.TextProps {
    /** Font Style of Text ( Family | Size | italic | weight ) */
    font?: keyof typeof UStyle.font;
    /** Text Font color */
    color?: Rn.ColorValue;
  }
  //+ Shape `
  interface RightAngleProps {
    /** Color of shaped view (default: lightgrey) */
    color?: Rn.ColorValue;
    /**
     * position of triangle in the View
     * presets for corners of parent View
     */
    corner?: Ordinals;
    /** length of triangle sides */
    sideLength?: {v?: number; h?: number};
    /** Style of shape */
    style?: Rn.StyleProp<SafeStyle<RightTriangleSS>>;
  }
  type RightTriangleSS = 'zIndex' | 'opacity' | 'borderWidth';
  interface TrapezoidProps {
    color?: string;
    height?: number;
    style?: Rn.StyleProp<Rn.ViewStyle>;
  }
  //+ Image `
  interface SvgFillProps {
    fill?: Rn.ColorValue;
    fill2?: Rn.ColorValue;
    fill3?: Rn.ColorValue;
  }
  export interface ImageProps extends Omit<Rn.ImageProps, 'source'> {
    /** Asset Name (i.e filename) | ImageSourcePropType*/
    source: Asset.PngTag | Rn.ImageSourcePropType;
  }
  export interface ImageSvgProps extends SvgProps, SvgFillProps {
    /** Asset Name (i.e filename) | ImageURISource*/
    source: Asset.SvgTag | Rn.ImageURISource;
  }
  //+ ImageBackground `
  export interface ImageBgProps extends React.PropsWithChildren<ImageProps> {
    /** number to indicate watermark transparency */
    watermark?: number;
    /** size of image in the background */
    size?: Size;
  }
  export interface ImageBgSvgProps extends ImageSvgProps {
    /** number to indicate watermark transparency */
    watermark?: number;
    /** size of image in the background */
    size?: Size;
  }
}
