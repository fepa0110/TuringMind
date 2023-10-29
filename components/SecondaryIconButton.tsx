import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Theme } from "../types/Theme";

interface SecondaryIconButtonType {
	onPress: () => void;
	icon: IconDefinition;
}

export function SecondaryIconButton({ onPress, icon }: SecondaryIconButtonType) {
    const { getTheme } = useTheme()
    const styles = stylesSecondaryIconButton(getTheme())

    return(
        <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        accessibilityLabel="Limpiar celda">
            <FontAwesomeIcon
                style={{ color: getTheme().error }}
                icon={icon}
                size={22}
            />
        </TouchableOpacity>
    )
}

const stylesSecondaryIconButton = (colors : Theme) => StyleSheet.create({
    button: {
		height: 40,
		width: 40,
		backgroundColor: colors.background,
		borderWidth: 2,
		borderColor: colors.error,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 32,
	}
})