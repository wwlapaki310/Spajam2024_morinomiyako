import { useState, useRef, useContext } from 'react';
import {
    View,
    TextInput,
    Button,
    TouchableOpacity,
    PanResponder,
    Animated,
    Text,
    Modal,
    StyleSheet,
    GestureResponderEvent,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { DataContext, SetDataContext } from '@/app/(tabs)/_layout';

type ColorValue = {
    position: number; // Range from 0 to 1
    hue: number;      // Range from 0 to 360
};

export type AnimationDef = {
    duration: number;
    music: string;
    major: ColorValue[];
    minor?: ColorValue[];
};

const AnimationEditor: React.FC = () => {
    const animationDef = useContext(DataContext);
    const setAnimationDef = useContext(SetDataContext);

    const duration = animationDef.duration;
    const majorColors = animationDef.major;
    const minorColors = animationDef.minor || [];
    const setDuration = (duration: number) => setAnimationDef(prev => ({ ...prev, duration }));
    const setMajorColors = (majorColors: ColorValue[]) => setAnimationDef(prev => ({ ...prev, major: majorColors }));
    const setMinorColors = (minorColors: ColorValue[]) => setAnimationDef(prev => ({ ...prev, minor: minorColors }));

    const [showMinor, setShowMinor] = useState<boolean>(animationDef.minor !== undefined);

    return (
        <View style={styles.container}>
            {/* Duration Input */}
            <Text style={styles.label}>Duration</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter duration"
                value={duration ? duration.toString() : ''}
                onChangeText={(text) => setDuration(Number(text))}
            />

            {/* Major Color Seek Bar */}
            <ColorSeekBar
                colors={majorColors}
                setColors={setMajorColors}
                label="Major Colors"
            />

            {/* Split Button */}
            {showMinor ? (
                <Button title="Remove Minor" onPress={() => { setMinorColors([]); setShowMinor(false); }} />
            ) : (
                <Button title="Split" onPress={() => setShowMinor(true)} />
            )}

            {/* Minor Color Seek Bar */}
            {showMinor && (
                <ColorSeekBar
                    colors={minorColors}
                    setColors={setMinorColors}
                    label="Minor Colors"
                />
            )}
        </View>
    );
};

type ColorSeekBarProps = {
    colors: ColorValue[];
    setColors: (colors: ColorValue[]) => void;
    label: string;
};

const ColorSeekBar: React.FC<ColorSeekBarProps> = ({ colors, setColors, label }) => {
    const [seekBarWidth, setSeekBarWidth] = useState<number>(0);

    const handleLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;
        setSeekBarWidth(width);
    };

    const handleAddColorValue = (event: GestureResponderEvent) => {
        const x = event.nativeEvent.locationX;
        const position = x / seekBarWidth;
        const newColorValue: ColorValue = { position, hue: 0 }; // Default hue
        setColors([...colors, newColorValue].sort((a, b) => a.position - b.position));
    };

    return (
        <View style={styles.seekBarContainer}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={styles.seekBar}
                activeOpacity={1}
                onPress={handleAddColorValue}
                onLayout={handleLayout}
            >
                {/* Knobs */}
                {colors.map((colorValue, index) => (
                    <ColorKnob
                        key={index}
                        colorValue={colorValue}
                        setColorValue={(newValue) => {
                            const newColors = [...colors];
                            newColors[index] = newValue;
                            setColors(newColors);
                        }}
                        removeKnob={() => {
                            const newColors = colors.filter((_, i) => i !== index);
                            setColors(newColors);
                        }}
                        seekBarWidth={seekBarWidth}
                    />
                ))}
            </TouchableOpacity>
        </View>
    );
};

type ColorKnobProps = {
    colorValue: ColorValue;
    setColorValue: (colorValue: ColorValue) => void;
    removeKnob: () => void;
    seekBarWidth: number;
};

const ColorKnob: React.FC<ColorKnobProps> = ({
    colorValue,
    setColorValue,
    removeKnob,
    seekBarWidth,
}) => {
    const [showHuePicker, setShowHuePicker] = useState<boolean>(false);
    const knobWidth = 20;
    const knobHeight = 50;

    const pan = useRef(new Animated.Value(0)).current;

    const positionX = colorValue.position * seekBarWidth - knobWidth / 2;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset(pan._value);
            },
            onPanResponderMove: (_, gestureState) => {
                let newX = positionX + gestureState.dx;
                if (newX < -knobWidth / 2) newX = -knobWidth / 2;
                if (newX > seekBarWidth - knobWidth / 2) newX = seekBarWidth - knobWidth / 2;
                const newPosition = (newX + knobWidth / 2) / seekBarWidth;
                setColorValue({ ...colorValue, position: newPosition });
            },
            onPanResponderRelease: () => {
                pan.flattenOffset();
            },
        })
    ).current;

    const handlePress = () => {
        setShowHuePicker(true);
    };

    return (
        <>
            <Animated.View
                {...panResponder.panHandlers}
                style={[
                    styles.knob,
                    {
                        left: positionX,
                        backgroundColor: `hsl(${colorValue.hue}, 100%, 50%)`,
                    },
                ]}
            >
                <TouchableOpacity onPress={handlePress} style={styles.knobTouchable}>
                    <View style={styles.knobInner} />
                </TouchableOpacity>
            </Animated.View>

            {/* Hue Picker Modal */}
            {showHuePicker && (
                <Modal transparent={true} animationType="fade">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text>Adjust Hue</Text>
                            <Slider
                                minimumValue={0}
                                maximumValue={360}
                                value={colorValue.hue}
                                onValueChange={(value) =>
                                    setColorValue({ ...colorValue, hue: value })
                                }
                            />
                            <Button title="Remove" onPress={removeKnob} />
                            <Button title="Done" onPress={() => setShowHuePicker(false)} />
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
    },
    seekBarContainer: {
        marginVertical: 20,
    },
    seekBar: {
        height: 50,
        backgroundColor: '#eee',
        position: 'relative',
        borderRadius: 5,
    },
    knob: {
        position: 'absolute',
        top: 0,
        width: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    knobTouchable: {
        width: '100%',
        height: '100%',
    },
    knobInner: {
        width: 20,
        height: 50,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        padding: 8,
        marginBottom: 10,
        borderRadius: 5,
        color: 'white',
    },
    label: {
        fontWeight: 'bold',
        color: 'white',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
});

export default AnimationEditor;
