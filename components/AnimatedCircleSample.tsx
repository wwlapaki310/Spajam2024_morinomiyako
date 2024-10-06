import { useState, useEffect, useRef, useCallback, FC } from 'react';
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

    const getRandomColor = () => {
        return `hsl(${Math.random() * 360}, 100%, 50%)`;
    };

    // 色のリストを状態として管理
    const [colors, setColors] = useState(() => Array(10).fill(0).map(getRandomColor));

    // 新しい色のリストを生成する関数
    const generateNewColors = useCallback(() => {
        setColors(Array(10).fill(0).map(getRandomColor));
    }, []);

    const leftColorAnim = useRef(new Animated.Value(0)).current;
    const rightColorAnim = useRef(new Animated.Value(0)).current;

    const [leftPrevColor, setLeftPrevColor] = useState('black');
    const [leftNextColor, setLeftNextColor] = useState(colors[0]);

    const [rightPrevColor, setRightPrevColor] = useState('black');
    const [rightNextColor, setRightNextColor] = useState(colors[0]);

    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    const seamlessAnimation = useCallback((interval: number, duration: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        let i = 0;

        const changeColor = () => {
            const color = colors[i++];
            setLeftPrevColor(leftNextColor);
            setLeftNextColor(color);
            setRightPrevColor(rightNextColor);
            setRightNextColor(color);

            Animated.parallel([
                Animated.timing(leftColorAnim, {
                    toValue: 1,
                    duration: interval,
                    useNativeDriver: false,
                }),
                Animated.timing(rightColorAnim, {
                    toValue: 1,
                    duration: interval,
                    useNativeDriver: false,
                }),
            ]).start(() => {
                leftColorAnim.setValue(0);
                rightColorAnim.setValue(0);
                setLeftPrevColor(color);
                setRightPrevColor(color);
            });
        };

        intervalRef.current = setInterval(changeColor, interval);

        return new Promise<void>((resolve) => {
            timeoutRef.current = setTimeout(() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                resolve();
            }, duration);
        });
    }, [colors, leftColorAnim, rightColorAnim, leftNextColor, rightNextColor]);

    const stepAnimation = (interval: number, duration?: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        let steps = 0;
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
        }, interval);

        return new Promise<void>((resolve) => {
            timeoutRef.current = setTimeout(() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                resolve();
            }, duration);
        });
    };

    const splitAnimation = (interval: number, duration: number) => {
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
                    duration: interval,
                    useNativeDriver: false,
                }),
                Animated.timing(rightColorAnim, {
                    toValue: 1,
                    duration: interval,
                    useNativeDriver: false,
                }),
            ]).start(() => {
                leftColorAnim.setValue(0);
                rightColorAnim.setValue(0);
                setLeftPrevColor(leftColor);
                setRightPrevColor(rightColor);
            });
        };

        intervalRef.current = setInterval(changeColor, interval);

        return new Promise<void>((resolve) => {
            timeoutRef.current = setTimeout(() => {
                if (intervalRef.current) clearInterval(intervalRef.current);
                resolve();
                // seamlessAnimation(1000, 6000);
            }, duration);
        });
    };

    useEffect(() => {
        let animation = Promise.resolve();

        // Sample Animation
        const loop = () => {
            animation = animation
                .then(() => seamlessAnimation(1000, 6000))
                .then(() => stepAnimation(500, 6000))
                .then(() => splitAnimation(1000, 6000))
                .then(() => {
                    generateNewColors(); // 新しい色のリストを生成
                    return loop();
                });
        }

        loop();

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
