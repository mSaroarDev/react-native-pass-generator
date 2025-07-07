import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Easing,
} from 'react-native';

interface CustomSwitchProps {
  value?: boolean;
  onToggle?: (value: boolean) => void;
  style?: object;
}

const CustomSwitch = ({
  value = false,
  onToggle = () => {},
  style,
}: CustomSwitchProps) => {
  const offset = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(offset, {
      toValue: value ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
  }, [value, offset]);

  const translateX = offset.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  return (
    <TouchableOpacity onPress={() => onToggle(!value)} activeOpacity={0.8}>
      <View style={[styles.container, value ? styles.containerActive : null, style]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 22,
    borderRadius: 24,
    backgroundColor: '#2c2f48',
    padding: 4,
    justifyContent: 'center',
  },
  containerActive: {
    backgroundColor: '#5865f2',
  },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default CustomSwitch;
