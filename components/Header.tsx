import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
	faMemory,
} from "@fortawesome/free-solid-svg-icons";

import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons'

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useTheme } from "?hooks/useTheme";
import { Theme } from "#types/Theme";

export function Header() {
	const { darkTheme, getTheme, toggleTheme } = useTheme();
	const colors = getTheme();
	const styles = stylesHeader(colors);

	const [isEnabled, setIsEnabled] = useState(false);

	return (
		<>
			<StatusBar style="light" translucent={true} />

			<View style={styles.headerContainer}>
				<View style={styles.headerContent}>
					<View style={styles.headerLogoContainer}>
						<FontAwesomeIcon
							style={{ color: colors.onPrimary, marginRight: 10 }}
							icon={faMemory}
							size={24}
						/>

						<Text style={{ color: colors.onPrimary, fontWeight: "bold" }}>
							Matur
						</Text>
					</View>

					<TouchableOpacity
						style={styles.buttonTheme}
						onPress={toggleTheme}>
						<FontAwesomeIcon
							style={{ color: colors.onPrimary }}
							icon={darkTheme ? faMoon : faSun}
							size={22}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
}

const stylesHeader = (colors: Theme) =>
	StyleSheet.create({
		headerContainer: {
			flexDirection: "row",
			alignItems: "flex-end",
			justifyContent: "space-between",
			height: "10%",
			width: "100%",
			backgroundColor: colors.primary,
		},
		headerContent: {
			flex: 1,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			width: "100%",
			height: "75%",
			marginHorizontal: 10,
		},
		headerLogoContainer: {
			flex: 1,
			flexDirection: "row",
			alignItems: "center",
		},
		buttonTheme: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			height: 28,
			width: 28,
			borderRadius: 64,
		},
	});
