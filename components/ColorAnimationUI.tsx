import { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, GestureResponderEvent } from 'react-native';
import { DataContext, SetDataContext } from '@/app/(tabs)/_layout';

type ColorValue = {
    position: number;
    hue: number;
}

type AnimationDef = {
    duration: number;
    music: string;
    major: ColorValue[];
    minor?: ColorValue[];
}

const ColorAnimationUI: React.FC = () => {
    // const [animationDef, setAnimationDef] = use
    const animationDef = useContext(DataContext);
    const setAnimationDef = useContext(SetDataContext);
    const [showMinor, setShowMinor] = useState(false);

    const handleDurationChange = (text: string) => {
        setAnimationDef(prev => ({ ...prev, duration: parseFloat(text) || 0 }));
    };

    const handleSeekbarClick = (isMajor: boolean) => (event: GestureResponderEvent) => {
        const { locationX } = event.nativeEvent;
        const newColorValue: ColorValue = {
            position: locationX / 300, // Assuming seekbar width is 300
            hue: Math.random() * 360, // Random initial hue
        };
        setAnimationDef(prev => ({
            ...prev,
            [isMajor ? 'major' : 'minor']: [...prev[isMajor ? 'major' : 'minor']!, newColorValue],
        }));
    };

    const Seekbar: React.FC<{ values: ColorValue[], isMajor: boolean }> = ({ values, isMajor }) => (
        <View style={styles.seekbar}>
            <TouchableOpacity style={styles.seekbarTrack} onPress={handleSeekbarClick(isMajor)}>
                {values.map((value, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.seekbarKnob,
                            { left: `${value.position * 100}%`, backgroundColor: `hsl(${value.hue}, 100%, 50%)` }
                        ]}
                    />
                ))}
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Duration"
                value={animationDef.duration.toString()}
                onChangeText={handleDurationChange}
                keyboardType="numeric"
            />
            <Seekbar values={animationDef.major} isMajor={true} />
            {!showMinor && (
                <TouchableOpacity style={styles.button} onPress={() => setShowMinor(true)}>
                    <Text>Split</Text>
                </TouchableOpacity>
            )}
            {showMinor && <Seekbar values={animationDef.minor || []} isMajor={false} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
    seekbar: {
        height: 40,
        marginBottom: 20,
    },
    seekbarTrack: {
        height: 4,
        backgroundColor: '#ccc',
        position: 'relative',
    },
    seekbarKnob: {
        width: 20,
        height: 20,
        borderRadius: 10,
        position: 'absolute',
        top: -8,
    },
    button: {
        backgroundColor: '#ddd',
        padding: 10,
        alignItems: 'center',
    },
});

export default ColorAnimationUI;