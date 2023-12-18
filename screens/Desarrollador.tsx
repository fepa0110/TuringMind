import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RadioButton from "../components/RadioButton";
import Toast from "../components/Toast";

export function Desarrollador() {
	const opciones = ["Derecha", "Izquierda", "Sin operacion"];
	const [selectedOption, setSelectedOption] = useState(opciones[0]);
	const [showToast, setShowToast] = useState(false);

	function ejecutarToast() {
		setShowToast(true)
		setTimeout(() => {
			setShowToast(false)
		}, 5000);
	}

	return (
		<View style={{ height: "100%", width: "100%" }}>
			<Text
				style={{
					color: "red",
					fontWeight: "bold",
					marginBottom: 25,
					fontSize: 20,
				}}>
				Esta es una seccion de pruebas de desarrollador
			</Text>
			<Text style={{ color: "blue" }}>{selectedOption}</Text>
			<Button title="Presioname" onPress={ejecutarToast} />

			{showToast ? <Toast message="Holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" type="warning"/> : null}
		</View>
	);
}

const styles = StyleSheet.create({});
