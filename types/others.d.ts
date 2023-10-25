/***
 * File: /types/others.d.ts
 * Project: epik
 * Author: John Chan Kah Seng (johnks.chan@gmail.com)
 * -----
 * Created: 25th October 2023 11:29am
 * Modified: 25th October 2023 11:32am     by: John Chan Kah Seng
 * -----
 * ReactNative: 0.70.2   ReactNavigation: 6.x
 * Copyright 2016 - 2023 Chanksis.
 ***/
declare module 'rnOthers' {
  import * as Rn from 'react-native';
  import Asset from 'Assets';
  //+ Badge `
  export interface BadgeProps extends Omit<Rn.ViewProps, 'style'> {
    /** text in Badge, undefined will hide badge */
    text: string | number | undefined;
    /** shape of badge, otherwise rounded box (default true) */
    round?: boolean;
    /** shape of badge, defaults to round */
    shape?: 'round' | 'block';
    /** FontSize of badge, Size of Badge is dependent on fontSize */
    size?: number;
    /** width of border. (default:0) */
    border?: number;
    /** Color of Badge */
    color?: Rn.ColorValue;
    /** Font Color (matches border color if specified) */
    fontColor?: Rn.ColorValue;
    /** Absolute position props */
    position?: Position;
    /** Badge Text Style */
    style?: Rn.StyleProp<Rn.TextStyle>;
  }
  export interface BadgeSvgProps extends Omit<BadgeProps, 'round'> {
    source: Asset.SvgTag;
  }
}
