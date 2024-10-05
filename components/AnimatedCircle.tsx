import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    StatusBar,
} from 'react-native';

const CircleAnimation = () => {
    const { width, height } = Dimensions.get('window');
    const size = Math.min(width, height) * 0.8;

    const [leftColor, setLeftColor] = useState('black');
    const [rightColor, setRightColor] = useState('black');
    const [statusBarHidden, setStatusBarHidden] = useState(false);

    const ANIMATION_DURATION = 6000; // 各アニメーションの持続時間（ミリ秒）

    const getRandomColor = () => {
        return `hsl(${Math.random() * 360}, 100%, 50%)`;
    };

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const seamlessAnimation = () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            intervalRef.current = setInterval(() => {
                const color = getRandomColor();
                setLeftColor(color);
                setRightColor(color);
            }, 500);

            timeoutRef.current = setTimeout(() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                stepAnimation();
            }, ANIMATION_DURATION);
        };

        const stepAnimation = () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            let steps = 0;
            const maxSteps = ANIMATION_DURATION / 1000;
            intervalRef.current = setInterval(() => {
                if (steps % 2 === 0) {
                    const color = getRandomColor();
                    setLeftColor(color);
                    setRightColor(color);
                } else {
                    setLeftColor('black');
                    setRightColor('black');
                }
                steps++;
                if (steps >= maxSteps) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    splitAnimation();
                }
            }, 1000);
        };

        const splitAnimation = () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            intervalRef.current = setInterval(() => {
                setLeftColor(getRandomColor());
                setRightColor(getRandomColor());
            }, 500);

            timeoutRef.current = setTimeout(() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                seamlessAnimation();
            }, ANIMATION_DURATION);
        };

        // アニメーションを開始
        seamlessAnimation();

        // クリーンアップ関数
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const toggleFullScreen = () => {
        setStatusBarHidden(!statusBarHidden);
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
                <StatusBar hidden={statusBarHidden} />
                <View style={styles.circleContainer}>
                    <View
                        style={[
                            styles.halfCircle,
                            styles.leftHalf,
                            { backgroundColor: leftColor },
                        ]}
                    />
                    <View
                        style={[
                            styles.halfCircle,
                            styles.rightHalf,
                            { backgroundColor: rightColor },
                        ]}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default CircleAnimation;
