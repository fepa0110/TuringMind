import { Theme } from "#types/Theme";
import { useTheme } from "?hooks/useTheme";
import React from "react"
import { StyleSheet, Text, View } from "react-native"

export const Chip = ({text} : {text: string}) => {
    const { getTheme } = useTheme();
	const styles = stylesChip(getTheme());

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const stylesChip = (colors: Theme) => StyleSheet.create({
    container: {
        width: 48,
        height: 32,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: colors.secondary
    },
    text: {
        fontSize: 16,
        color: colors.secondary,
        fontFamily: "Play-Bold"
    }
})