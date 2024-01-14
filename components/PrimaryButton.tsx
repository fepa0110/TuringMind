import React, { useState } from "react";
import {
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
	Text,
	DimensionValue,
} from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Theme } from "../types/Theme";

interface PrimaryButtonType {
	onPress: () => void;
	text: string;
	width?: DimensionValue;
	loading?: boolean;
	disabled?: boolean;
}

export function PrimaryButton({
	onPress,
	text,
	width,
	loading,
	disabled
}: PrimaryButtonType) {
	const { getTheme } = useTheme();
	const styles = stylesPrimaryButton(getTheme(), width, disabled);

	const [isLoading, setIsLoading] = useState(loading||false)

	return (
		<TouchableOpacity
			style={styles.button}
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

const stylesPrimaryButton = (colors: Theme, width: DimensionValue | undefined, disabled: boolean | undefined) =>
	StyleSheet.create({
		button: {
			flexDirection: "row",
			width: width || 40, 
			height: 40,
			backgroundColor: disabled ? colors.outline : colors.primary,
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 32,
		},
		text: {
            color: disabled ? colors.onOutline : colors.onPrimary,
			fontSize: 16,
			fontFamily: "Play-Regular",
			paddingBottom: 6
        },
	});
