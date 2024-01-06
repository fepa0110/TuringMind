import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { Theme } from "../types/Theme";

interface CeldaProps{
    caracter: String
}

export function Celda({ caracter } : CeldaProps) {
    const { getTheme } = useTheme()
    
    const styles = stylesCelda(getTheme())
    const Colors = getTheme()

    return(
        <View style={styles.celdaContainer}>
            <Text style={{ fontSize: 18, 
                // fontFamily: "Play_400Regular",
                color: Colors.onBackground }}>
                {caracter}
            </Text>
        </View>
    )
}

const stylesCelda = (colors: Theme)=> StyleSheet.create({
	celdaContainer: {
		height: 48,
		width: 48,
		backgroundColor: "transparent",
		alignItems: "center",
		justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.primary,
	}
});