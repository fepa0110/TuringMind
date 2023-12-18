import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
	Text,
} from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Theme } from "../types/Theme";

interface PrimaryButtonType {
	onPress: () => void;
	text: string;
	size?: number;
	loading?: boolean;
}

export function PrimaryButton({
	onPress,
	text,
	size,
	loading,
}: PrimaryButtonType) {
	const { getTheme } = useTheme();
	const styles = stylesPrimaryButton(getTheme());

	if (loading === undefined) loading = false;

	return (
		<TouchableOpacity
			style={[{ width: size || 40, height: size || 40 }, styles.button]}
			onPress={onPress}
			accessibilityLabel="Setear caracter">
			{loading ? (
				<ActivityIndicator size={28} color={getTheme().onSecondary} />
			) : (
				<Text style={styles.text}>{text}</Text>
			)}
		</TouchableOpacity>
	);
}

const stylesPrimaryButton = (colors: Theme) =>
	StyleSheet.create({
		button: {
			backgroundColor: colors.secondary,
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 32,
		},
		text: {
            color: colors.onSecondary
        },
	});
