import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import {
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
	Text,
	DimensionValue,
} from "react-native";
import { useTheme } from "?hooks/useTheme";
import { Theme } from "#types/Theme";

interface SecondaryButtonType {
	onPress: () => void;
	icon?: IconDefinition;
	text: string;
	width?: DimensionValue;
	loading?: boolean;
	disabled?: boolean;
}

export function SecondaryButton({
	onPress,
	icon,
	text,
	width,
	loading,
	disabled,
}: SecondaryButtonType) {
	const { getTheme } = useTheme();
	const styles = stylesSecondaryButton(getTheme(), width, disabled);

	const [isLoading, setIsLoading] = useState(loading || false);

	return (
		<TouchableOpacity
			style={styles.button}
			onPress={onPress}
			disabled={disabled}>
			{isLoading ? (
				<ActivityIndicator size={28} color={getTheme().onSecondary} />
			) : icon !== undefined ? (
				<FontAwesomeIcon
					style={{ color: disabled ? getTheme().onOutline : getTheme().primary, }}
					icon={icon}
					size={22}
				/>
			) : (
				<></>
			)}
			<Text style={styles.text}>{text}</Text>
		</TouchableOpacity>
	);
}

const stylesSecondaryButton = (
	colors: Theme,
	width: DimensionValue | undefined,
	disabled: boolean | undefined
) =>
	StyleSheet.create({
		button: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-around",
			width: width || 40,
			height: 45,
			paddingHorizontal: 10,
			backgroundColor: colors.background,
			borderColor: disabled ? colors.outline : colors.primary,
			borderWidth: 2,
			borderRadius: 32,
		},
		text: {
			color: disabled ? colors.onOutline : colors.primary,
			fontSize: 16,
			fontFamily: "Play-Regular",
			paddingBottom: 6,
		},
	});
