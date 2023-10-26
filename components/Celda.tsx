import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface CeldaProps{
    caracter: String
}

export function Celda({ caracter } : CeldaProps) {
    return(
        <View style={styles.celdaContainer}>
            <Text style={{ fontSize: 18}}>
                {caracter}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
	celdaContainer: {
		height: 48,
		width: 48,
		backgroundColor: "transparent",
		alignItems: "center",
		justifyContent: "center",
        borderWidth: 1,
        borderColor: "blue",
	}
});