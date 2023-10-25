# reanimated-badge

Simple animated shaped text/number badge

![image](https://github.com/tunasing/reanimated-badge/assets/5899265/a97de38d-92ff-49b8-a95f-8f2e25daddb6)

> _use extended Image/ImageBackground provided instead of react-native's._

## Feature

-   on text state change, the badge shows bounce animation.
-   when text state is set, the badge animates in.
-   when text state is changed to `undefined`, the badge animates out.
-   customization properties `color`, `border`, `fontColor`.

## Instructions

-   define Asset directory.
-   have required .svg image available in asset directory(Badge.Svg)

```
<View>
    <Badge text={5} border={3} shape={'square'} color={'purple'}/>
</View>
<View>
    <Badge.Svg source={'roundTriangle'} text={5} color={'purple'}/>
</View>
```

## Pre-requisites

-   react-native-reanimated (package)
-   react-native-svg (package)

## compatibility

-   ios
-   android
