import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight, faArrowLeft, faArrowUpLong, faPaperPlane, faMemory } from '@fortawesome/free-solid-svg-icons'

import { StatusBar } from "expo-status-bar";
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Celda } from "./components/Celda";

export default function App() {
	const [cinta, setCinta] = useState<String[]>([" ","*", "*", "a", "b", "*"," "," "," "," "," "]);
	const [indiceActual, setIndiceActual] = useState<number>(0);

	const [text, onChangeText] = React.useState<string>(' ');

	function moverseDerecha() {
		if(cinta.length-1 != indiceActual) setIndiceActual(indiceActual + 1);
	}

	function moverseIzquierda() {
		if(indiceActual > 0) setIndiceActual(indiceActual - 1);
	}

	function saltarPosicionCinta(posicion: number) {
		setIndiceActual(posicion)
	}

	function setActualCaracter() {
		setCinta(
			cinta.map((caracterCinta, indexCaractetCinta) => { 
					return indexCaractetCinta === indiceActual ? text : caracterCinta
				}
			)
		)
	}


	return (
		<View style={styles.container}>
			<StatusBar style="light" translucent={true}/>

			<View style={styles.headerContainer}>
				<View style={{ flex:1, flexDirection: "row", alignItems: "center",justifyContent: "flex-start", width: "100%", height: "75%", marginHorizontal: 10 }}>
					<FontAwesomeIcon style={{ color: "white", marginRight: 10 }} icon={ faMemory } size={24}/>

					<Text style={{ color: "white", fontWeight: "bold" }}>
						Maquina de Turing
					</Text>
				</View>
			</View>

			<View style={styles.mainContentContainer}>
				<View style={styles.cintaContainer}>
					<ScrollView style={{ alignSelf: "center"}} horizontal={true}>
						{cinta.map((caracter, index) => {
							return (
								<View style={{flex:1, flexDirection: "column", alignItems: "center", marginHorizontal: 2}}>
									<TouchableOpacity onPress={() => saltarPosicionCinta(index)}
										style={{ flexDirection: "column", alignItems:"center" }}>
										<Celda key={"caracter" + index} caracter={caracter} />
										{index == indiceActual ?
											<FontAwesomeIcon style={{ marginVertical: 5 }} icon={ faArrowUpLong } size={24}/> : null
										}
									</TouchableOpacity>
								</View>
							);
						})}
					</ScrollView>
				</View>
				<View style={{marginVertical: 8}}>
				</View>

				{/*                 index == indiceActual ?
							<Text style={{ color: "white" }}>{"<-"}</Text> : <></> */}

				<Text>{cinta}</Text>
				<Text>{indiceActual}</Text>

				<View style={styles.buttonsContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={moverseIzquierda}
						accessibilityLabel="Moverse a la izquierda">
							<FontAwesomeIcon style={{ color: "white" }} icon={ faArrowLeft } size={24}/>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.button}
						onPress={moverseDerecha}
						accessibilityLabel="Moverse a la derecha">
							<FontAwesomeIcon style={{ color: "white" }} icon={ faArrowRight } size={24}/>
					</TouchableOpacity>
				</View>

				<TextInput
					style={styles.input}
					onChangeText={onChangeText}
					value={text}
					placeholder="Caracter actual"
				/>
				<TouchableOpacity
						style={styles.button}
						onPress={setActualCaracter}
						accessibilityLabel="Setear caracter">
							<FontAwesomeIcon style={{ color: "white" }} icon={ faPaperPlane } size={24}/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		height: "100%",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-between",
	},
	mainContentContainer: {
		flex: 1,
		width: "100%",
		justifyContent:"center",
		alignItems: "center"
	},
	headerContainer: {
		// position: "absolute",
		// top: 0,
		// right: 0,
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between",
		height: "10%",
		width: "100%",
		backgroundColor: "crimson",
	},
	button: {
		height: 64,
		width: 64,
		backgroundColor: "crimson",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 16,
	},
	buttonsContainer: {
		flexDirection: "row",
		gap: 10,
		marginVertical: 10,
	},
	cintaContainer: {
		flexDirection: "row",
		gap: 2,
		width: "100%",
		justifyContent: "center"
	},
	input: {
		height: 40,
		width: 200,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		color: "crimson"
	}
});
