import { useState, useEffect, useRef, FC } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    StatusBar,
    Animated,
} from 'react-native';
// import { Audio } from 'expo-av';

type ColorValue = {
    position: number;
    hue: number;
}

export type AnimationDef = {
    duration: number;
    music: string;
    major: ColorValue[];
    minor?: ColorValue[];
}

const CircleAnimation: FC<{ animationDef: AnimationDef, setTabBarHidden: (flag: boolean) => void }> = ({ animationDef, setTabBarHidden }) => {
    const { width, height } = Dimensions.get('window');
    const size = Math.min(width, height) * 0.8;

    const [isFullscreen, setIsFullscreen] = useState(false);

    const { duration, music, major, minor } = animationDef;
    const animatedValue = useRef(new Animated.Value(0)).current;

    // const soundRef = useRef<Audio.Sound | null>(null);

    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: duration,
                useNativeDriver: false,
            })
        );

        const playSound = async () => {
            // const { sound } = await Audio.Sound.createAsync(
            //     { uri: music },
            //     { isLooping: true }
            // );
            // soundRef.current = sound;
            // await sound.playAsync();
        };

        playSound();
        animation.start();

        return () => {
            animation.stop();
            // if (soundRef.current) {
            //     soundRef.current.unloadAsync();
            // }
        };
    }, [animatedValue, duration, music]);

    const interpolateColor = (colorValues: ColorValue[], outputRange: string[]) => {
        return animatedValue.interpolate({
            inputRange: colorValues.map(cv => cv.position),
            outputRange: outputRange,
        });
    };

    const majorColor = interpolateColor(
        major,
        major.map(cv => `hsl(${cv.hue}, 100%, 50%)`)
    );

    const minorColor = minor && minor.length > 0
        ? minor.length === 1
            ? `hsl(${minor[0].hue}, 100%, 50%)`
            : interpolateColor(
                minor,
                minor.map(cv => `hsl(${cv.hue}, 100%, 50%)`)
            )
        : majorColor;

    const toggleFullScreen = () => {
        setIsFullscreen(!isFullscreen);
        setTabBarHidden(!isFullscreen);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
        },
        circleContainer: {
            width: size,
            height: size,
            borderRadius: size / 2,
            overflow: 'hidden',
            position: 'relative',
        },
        halfCircle: {
            position: 'absolute',
            width: size / 2,
            height: size,
            top: 0,
        },
        leftHalf: {
            left: 0,
            borderTopLeftRadius: size / 2,
            borderBottomLeftRadius: size / 2,
        },
        rightHalf: {
            right: 0,
            borderTopRightRadius: size / 2,
            borderBottomRightRadius: size / 2,
        },
    });

    return (
        <TouchableWithoutFeedback onPress={toggleFullScreen}>
            <View style={styles.container}>
                <StatusBar hidden={isFullscreen} />
                <View style={styles.circleContainer}>
                    <Animated.View
                        style={[
                            styles.halfCircle,
                            styles.leftHalf,
                            { backgroundColor: majorColor },
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.halfCircle,
                            styles.rightHalf,
                            { backgroundColor: minorColor },
                        ]}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default CircleAnimation;