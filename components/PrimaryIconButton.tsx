import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "?hooks/useTheme";
import { Theme } from "#types/Theme";

interface PrimaryIconButtonType {
	onPress: () => void;
	icon: IconDefinition;
	accessibilityLabel?: string,
	size?: number;
	loading?: boolean;
}

export function PrimaryIconButton({
	onPress,
	icon,
	size,
	loading,
	accessibilityLabel
}: PrimaryIconButtonType) {
	const { getTheme } = useTheme();
	const styles = stylesPrimaryIconButton(getTheme());
	
	const [isLoading, setIsLoading] = useState(loading||false)

	return (
		<TouchableOpacity
			style={[{ width: size || 40, height: size || 40 }, styles.button]}
			onPress={onPress}
			accessibilityLabel={accessibilityLabel}>
			{isLoading ? (
				<ActivityIndicator size={28} color={getTheme().onSecondary} />
			) : (
				<FontAwesomeIcon
					style={{ color: getTheme().onPrimary }}
					icon={icon}
					size={18}
				/>
			)}
		</TouchableOpacity>
	);
}

const stylesPrimaryIconButton = (colors: Theme) =>
	StyleSheet.create({
		button: {
			backgroundColor: colors.primary,
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 32,
		},
	});
