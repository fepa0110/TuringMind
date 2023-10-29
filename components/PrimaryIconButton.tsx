import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Theme } from "../types/Theme";

interface PrimaryIconButtonType {
	onPress: () => void;
	icon: IconDefinition;
}

export function PrimaryIconButton({ onPress, icon }: PrimaryIconButtonType) {
    const { getTheme } = useTheme()
    const styles = stylesPrimaryIconButton(getTheme())

	return (
		<TouchableOpacity
			style={styles.button}
			onPress={onPress}
			accessibilityLabel="Setear caracter">
			<FontAwesomeIcon
				style={{ color: getTheme().onSecondary }}
				icon={icon}
				size={16}
			/>
		</TouchableOpacity>
	);
}

const stylesPrimaryIconButton = (colors: Theme) => StyleSheet.create({
	button: {
		height: 40,
		width: 40,
		backgroundColor: colors.secondary,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 32,
	},
});
