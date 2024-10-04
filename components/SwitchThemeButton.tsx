import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity, StyleSheet } from "react-native";

import { Theme } from "../types/Theme";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import { useTheme } from "../hooks/useTheme";

export default function SwitchThemeButton() {
	const { darkTheme, getTheme, toggleTheme } = useTheme();
	const colors = getTheme();
	const styles = stylesHeader(colors);

	return (
		<TouchableOpacity style={styles.buttonTheme} onPress={toggleTheme}>
			<FontAwesomeIcon
				style={{ color: colors.onPrimary }}
				icon={darkTheme ? faMoon : faSun}
				size={22}
			/>
		</TouchableOpacity>
	);
}

const stylesHeader = (colors: Theme) =>
	StyleSheet.create({
		buttonTheme: {
			alignItems: "center",
			justifyContent: "center",
			height: "auto",
			width: 32,
			borderRadius: 64,
            paddingHorizontal: 10
		},
	});
