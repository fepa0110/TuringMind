import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import {
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
	Text,
} from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Theme } from "../types/Theme";

interface SecondaryButtonType {
	onPress: () => void;
	text: string;
	size?: number;
	loading?: boolean;
	disabled?: boolean;
}

export function SecondaryButton({
	onPress,
	text,
	size,
	loading,
	disabled
}: SecondaryButtonType) {
	const { getTheme } = useTheme();
	const styles = stylesSecondaryButton(getTheme());

	const [isLoading, setIsLoading] = useState(loading||false)

	return (
		<TouchableOpacity
			style={[{ width: size || 40, height: size || 40 }, styles.button]}
			onPress={onPress}
			disabled={disabled}>
			{isLoading ? (
				<ActivityIndicator size={28} color={getTheme().onSecondary} />
			) : (
				<Text style={styles.text}>{text}</Text>
			)}
		</TouchableOpacity>
	);
}

const stylesSecondaryButton = (colors: Theme) =>
	StyleSheet.create({
		button: {
			flexDirection: "row",
			backgroundColor: colors.background,
			alignItems: "center",
			justifyContent: "center",
            borderWidth: 2,
			borderRadius: 32,
            borderColor: colors.primary
		},
		text: {
            color: colors.primary,
			fontSize: 22,
			fontFamily: "Play-Regular",
			paddingBottom: 6
        },
	});
