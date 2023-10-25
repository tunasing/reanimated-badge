/***
 * File: /Badge.tsx
 * Project: src
 * Author: John Chan Kah Seng (johnks.chan@gmail.com)
 * -----
 * Created: 5th September 2023 3:40pm
 * Modified: 25th October 2023 3:37pm     by: John Chan Kah Seng
 * -----
 * ReactNative: 0.70.2   ReactNavigation: 6.x
 * Copyright 2016 - 2023 Chanksis.
 ***/
import R from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withTiming,
	withSequence,
	ZoomOut,
} from "react-native-reanimated";
import { ImageBackground } from "~/basic";
import type { BadgeProps, BadgeSvgProps } from "rnOthers";
//+ Types `
interface FCnamespace {
	Svg: R.FC<BadgeSvgProps>;
}
//^ Vars `
const dur = { duration: 100 };
const bounceIn = withSpring(1, { mass: 2, damping: 20, stiffness: 300 });
const bounceInIn = withSequence(withTiming(1.3, dur), withTiming(1, dur));
const bounceOut = withSpring(0, { mass: 2, damping: 20, stiffness: 300 });
/**
 * ## [FC] Badge
 * Indicator Badge with internal text, uses Reanimatd's `exiting` property,
 * `entering` is handled on render. Badge size is determined by fontSize.
 * Animation works on conditional rendering or setting Text undefined.
 * - `text` - badge content ( string | number ) undefined hides badge.
 * - `size` - fontSize which also regulates size of badge.
 * - `shape` - shape of badge, defaults to 'round'
 * - `border` - border width of shape. (default 0)
 * - `color` - color of badge.
 * - `fontColor` - color of text.
 * - `{padding}` - will also adjust the size of badge
 * @param {BadgeProps} BadgeProps - badge design props
 */
const Badge: R.FC<BadgeProps> & FCnamespace = ({
	text = undefined,
	round = true,
	border = 0,
	size: fontSize = 14,
	color: backgroundColor = "red",
	fontColor: color = "white",
	style,
}) => {
	const [height, setHeight] = R.useState(0);
	const UAS = useAnimationEffects(text, height);
	const length = height + border * 2;
	const vwSty = {
		minWidth: length,
		borderRadius: round ? length / 2 : length / 5,
		borderColor: color,
		borderWidth: border,
		backgroundColor,
	};
	return (
		<Animated.View
			exiting={ZoomOut}
			style={[style, UAS, vwSty, styles.shape]}
		>
			<Text
				onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
				style={[styles.txt, { color, fontSize }]}
				children={text}
			/>
		</Animated.View>
	);
};
/**
 * ## [FC] Badge.Svg
 * Badge with internal text, defaults as round badge, otherwise rounded box
 * Applies only Reanimated's exiting property while entering is handled in component
 * having Text as undefined will hide badge.
 * Animation works on conditional rendering or setting Text undefined.
 * - use `style:padding` to adjust text height based on svg.
 * @param {BadgeProps} BadgeProps -
 */
const Svg: R.FC<BadgeSvgProps> = ({
	source,
	text = undefined,
	border = 0,
	size: fontSize = 14,
	color: shapeColor = "red",
	fontColor: color = "white",
	txtStyle,
	style,
}) => {
	const [height, setHeight] = R.useState(0);
	const UAS = useAnimationEffects(text, height);
	const length = height + border * 2;
	const minWidth = length;
	return (
		<Animated.View
			exiting={ZoomOut}
			style={[UAS, { minWidth }, style, styles.shape]}
		>
			<ImageBackground.Svg
				source={source}
				fill={shapeColor}
				stroke={color}
				strokeWidth={border}
				size={{ width: "120%", height: "120%" }}
			/>
			<Text
				onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
				style={[styles.txt, txtStyle, { color, fontSize }]}
				children={text}
			/>
		</Animated.View>
	);
};
Badge.Svg = Svg;
//^ Exports `
export default Badge;
//^ Styles ~
const styles = StyleSheet.create({
	shape: {
		justifyContent: "center",
		alignItems: "center",
	},
	txt: {
		padding: 3,
		fontWeight: "800",
		textAlign: "center",
	},
});

/**
 * ### useAnimationEffects
 */
const useAnimationEffects = (
	text: string | number | undefined,
	height: number
) => {
	const shared = useSharedValue(0);
	//^ useRef
	R.useEffect(() => {
		shared.value =
			text === undefined
				? bounceOut
				: shared.value === 1
				? bounceInIn
				: bounceIn;
	}, [text]);
	//^ useAnimatedStyle
	const UAS = useAnimatedStyle(() => {
		return {
			transform: [{ scale: shared.value }],
			opacity: height ? shared.value : 0,
		};
	});
	return UAS;
};
