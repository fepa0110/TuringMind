import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import {
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
	Text,
} from "react-native";
import { useTheme } from "?hooks/useTheme";
import { Theme } from "#types/Theme";

interface WarningButtonType {
	onPress: () => void;
	text: string;
	disabled?: boolean;
}

export function WarningButton({
	onPress,
	text,
	disabled,
}: WarningButtonType) {
	const { getTheme } = useTheme();
	const styles = stylesWarningButton(getTheme());

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
            style={styles.button}>
				<Text style={styles.text}>{text}</Text>
		</TouchableOpacity>
	);
}

const stylesWarningButton = (colors: Theme) =>
	StyleSheet.create({
		button: {
			alignSelf: "center",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			width: "40%",
			height: 40,
			borderRadius: 25,
            borderWidth: 2,
            borderColor: colors.error,
			backgroundColor: colors.background,
		},
		text: {
			color: colors.error,
			fontSize: 16,
			fontFamily: "Play-Regular",
		},
	});
