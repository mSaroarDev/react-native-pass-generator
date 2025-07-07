import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 

interface GradientButtonProps {
  title?: string;
  onPress?: () => void;
  style?: object;
  textStyle?: object;
}

const GradientButton = ({
  title = 'Button',
  onPress = () => {},
  style,
  textStyle,
}: GradientButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <LinearGradient
        colors={['#4776E6', '#8E54E9', '#4776E6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.button, style]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 45,
    borderRadius: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundSize: '200% auto', // Simulated via the gradient config
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: '#eee',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
      },
    }),
    marginTop: 5,
    cursor: 'pointer',
  },
  text: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 14,
    fontFamily: 'Quicksand-Bold', 
    letterSpacing: 1,
  },
});

export default GradientButton;
