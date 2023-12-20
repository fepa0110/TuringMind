import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface ToastType {
	message: string;
	type: "info" | "warning";
}

export default function Toast({ message, type }: ToastType) {
	const { getTheme } = useTheme();
	const colors = getTheme();
	const styles = toastStyles(colors,type);

    const animatedHeight = useSharedValue(60);
      
    const animatedStyle = useAnimatedStyle(() => {
        return {
          height:   withTiming(animatedHeight.value, {
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
          }),
        };
      });

	return (
		<Animated.View style={[styles.mainContainer, animatedStyle]}>
			<Text style={styles.label}>{message}</Text>
		</Animated.View>
	);
}

const toastStyles = (colors = useTheme().getTheme(), type: string) =>
	StyleSheet.create({
		label: {
			color: colors.onSecondary,
			fontSize: 16,
			fontFamily: "Play-Regular"
		},
		mainContainer: {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
			// height: "8%",
			position: "absolute",
			bottom: 0,
			right: 0,
			left: 0,
            backgroundColor: type === "info" ? colors.secondary : colors.error
		},
	});
