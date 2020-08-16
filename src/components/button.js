import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import colors from '../assets/colors';
import scaling from './../config/device/normalize';
const { heightScale, widthScale, moderateScale, normalize } = scaling;

export const Button = ({ onPress, isDisabled, title, buttonStyle, textStyle, buttonContainer }) => {
  return (
    <View style={buttonContainer}>
      <Pressable onPress={onPress} disabled={isDisabled} style={({ pressed }) => pressed ? styles.pressed : null}>
        <View style={[styles.button, isDisabled ? styles.pressed : null, buttonStyle]}>
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    paddingVertical: heightScale(8),
    paddingHorizontal: widthScale(16),
    borderRadius: moderateScale(4),
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: normalize(14),
    color: colors.white,
  },
  pressed: {
    opacity: 0.4,
  },
});
