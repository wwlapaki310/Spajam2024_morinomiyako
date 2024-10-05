import { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
    StatusBar,
    Animated,
} from 'react-native';

const CircleAnimation = () => {
    const { width, height } = Dimensions.get('window');
    const size = Math.min(width, height) * 0.8;

    const [statusBarHidden, setStatusBarHidden] = useState(false);

    const ANIMATION_DURATION = 6000; // 各アニメーションの持続時間（ミリ秒）

    const getRandomColor = () => {
        return `hsl(${Math.random() * 360}, 100%, 50%)`;
    };

    // 左右の半円の色アニメーション用のAnimated.Valueを作成
    const leftColorAnim = useRef(new Animated.Value(0)).current;
    const rightColorAnim = useRef(new Animated.Value(0)).current;

    // 前回と次回の色を保持するための状態を作成
    const [leftPrevColor, setLeftPrevColor] = useState('black');
    const [leftNextColor, setLeftNextColor] = useState(getRandomColor());

    const [rightPrevColor, setRightPrevColor] = useState('black');
    const [rightNextColor, setRightNextColor] = useState(getRandomColor());

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const seamlessAnimation = () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            const changeColor = () => {
                const color = getRandomColor();
                setLeftPrevColor(leftNextColor);
                setLeftNextColor(color);
                setRightPrevColor(rightNextColor);
                setRightNextColor(color);

                Animated.parallel([
                    Animated.timing(leftColorAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: false,
                    }),
                    Animated.timing(rightColorAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: false,
                    }),
                ]).start(() => {
                    leftColorAnim.setValue(0);
                    rightColorAnim.setValue(0);
                    setLeftPrevColor(color);
                    setRightPrevColor(color);
                });
            };

            intervalRef.current = setInterval(changeColor, 500);

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

                    setLeftPrevColor(leftNextColor);
                    setLeftNextColor(color);
                    setRightPrevColor(rightNextColor);
                    setRightNextColor(color);

                    Animated.parallel([
                        Animated.timing(leftColorAnim, {
                            toValue: 1,
                            duration: 0,
                            useNativeDriver: false,
                        }),
                        Animated.timing(rightColorAnim, {
                            toValue: 1,
                            duration: 0,
                            useNativeDriver: false,
                        }),
                    ]).start(() => {
                        leftColorAnim.setValue(0);
                        rightColorAnim.setValue(0);
                        setLeftPrevColor(color);
                        setRightPrevColor(color);
                    });
                } else {
                    setLeftPrevColor(leftNextColor);
                    setLeftNextColor('black');
                    setRightPrevColor(rightNextColor);
                    setRightNextColor('black');

                    Animated.parallel([
                        Animated.timing(leftColorAnim, {
                            toValue: 1,
                            duration: 0,
                            useNativeDriver: false,
                        }),
                        Animated.timing(rightColorAnim, {
                            toValue: 1,
                            duration: 0,
                            useNativeDriver: false,
                        }),
                    ]).start(() => {
                        leftColorAnim.setValue(0);
                        rightColorAnim.setValue(0);
                        setLeftPrevColor('black');
                        setRightPrevColor('black');
                    });
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

            const changeColor = () => {
                // 左半分の色を変更
                const leftColor = getRandomColor();
                setLeftPrevColor(leftNextColor);
                setLeftNextColor(leftColor);
                // 右半分の色を変更
                const rightColor = getRandomColor();
                setRightPrevColor(rightNextColor);
                setRightNextColor(rightColor);

                Animated.parallel([
                    Animated.timing(leftColorAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: false,
                    }),
                    Animated.timing(rightColorAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: false,
                    }),
                ]).start(() => {
                    leftColorAnim.setValue(0);
                    rightColorAnim.setValue(0);
                    setLeftPrevColor(leftColor);
                    setRightPrevColor(rightColor);
                });
            };

            intervalRef.current = setInterval(changeColor, 500);

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

    // 左右の半円の背景色をアニメーション化
    const leftBackgroundColor = leftColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [leftPrevColor, leftNextColor],
    });

    const rightBackgroundColor = rightColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [rightPrevColor, rightNextColor],
    });

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
                    <Animated.View
                        style={[
                            styles.halfCircle,
                            styles.leftHalf,
                            { backgroundColor: leftBackgroundColor },
                        ]}
                    />
                    <Animated.View
                        style={[
                            styles.halfCircle,
                            styles.rightHalf,
                            { backgroundColor: rightBackgroundColor },
                        ]}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default CircleAnimation;
