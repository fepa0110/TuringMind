import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "?hooks/useTheme";
import { Theme } from "#types/Theme";

interface SecondaryIconButtonType {
	onPress: () => void;
	icon: IconDefinition;
	accessibilityLabel?: string,
	size?: number;
	loading?: boolean;
}

export function SecondaryIconButton({
	onPress,
	icon,
	size,
	loading,
	accessibilityLabel
}: SecondaryIconButtonType) {
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
					style={{ color: getTheme().primary }}
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
			backgroundColor: colors.onPrimary,
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 32,
            borderWidth: 2,
            borderColor: colors.primary
		},
	});
