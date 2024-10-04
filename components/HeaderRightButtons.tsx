import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import SwitchThemeButton from "./SwitchThemeButton";
import { useTheme } from "../hooks/useTheme";
import { Theme } from "../types/Theme";
import { faCircleInfo, faCircleQuestion, faInfo, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useCopilot } from "react-native-copilot";

export default function HeaderRightButtons() {
	const { start } = useCopilot();

	const { getTheme } = useTheme();
	const colors = getTheme();
	const styles = stylesHeaderRight(colors);

	return (
		<View style={styles.container}>
			<TouchableOpacity style={[styles.button]} onPress={() => start()}>
				<FontAwesomeIcon
					style={{ color: colors.onPrimary }}
					icon={faInfo}
					size={22}
				/>
			</TouchableOpacity>
			<SwitchThemeButton />
		</View>
	);
}

const stylesHeaderRight = (colors: Theme) =>
	StyleSheet.create({
		container: {
            height: 30,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
            gap: 6
		},
		button: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			height: 28,
			width: 32,
			borderRadius: 64,
			paddingHorizontal: 10,
		},
	});
