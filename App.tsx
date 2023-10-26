import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
	faArrowRight,
	faArrowLeft,
	faArrowUpLong,
	faPaperPlane,
	faMemory,
	faArrowUp,
	faEraser,
} from "@fortawesome/free-solid-svg-icons";

import { StatusBar } from "expo-status-bar";
import {
	Button,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Celda } from "./components/Celda";
import { Colors } from "./constants/Colors";

export default function App() {
	const [cinta, setCinta] = useState<String[]>([
		"",
		"*",
		"*",
		"a",
		"b",
		"*",
		"",
		"",
		"",
		"",
		"",
	]);
	const [indiceActual, setIndiceActual] = useState<number>(0);

	const [text, onChangeText] = React.useState<string>(" ");

	function moverseDerecha() {
		if (cinta.length - 1 === indiceActual) {
			setCinta((prevState) => [...prevState, " "]);
		}
		setIndiceActual(indiceActual + 1);
	}

	function moverseIzquierda() {
		if (indiceActual === 0) {
			setCinta((prevState) => [" ", ...prevState]);
		} else setIndiceActual(indiceActual - 1);
	}

	function saltarPosicionCinta(posicion: number) {
		setIndiceActual(posicion);
	}

	function setActualCaracter() {
		setCinta(
			cinta.map((caracterCinta, indexCaractetCinta) => {
				return indexCaractetCinta === indiceActual ? text : caracterCinta;
			})
		);
	}

	function limpiarCaracterActual() {
		setCinta(
			cinta.map((caracterCinta, indexCaractetCinta) => {
				return indexCaractetCinta === indiceActual ? "" : caracterCinta;
			})
		);
	}

	return (
		<View style={styles.container}>
			<StatusBar style="light" translucent={true} />

			<View style={styles.headerContainer}>
				<View style={styles.headerContent}>
					<FontAwesomeIcon
						style={{ color: "white", marginRight: 10 }}
						icon={faMemory}
						size={24}
					/>

					<Text style={{ color: "white", fontWeight: "bold" }}>
						Maquina de Turing
					</Text>
				</View>
			</View>

			<View style={styles.mainContentContainer}>
				<View style={styles.cintaContainer}>
					<ScrollView style={{ alignSelf: "center" }} horizontal={true}>
						{cinta.map((caracter, index) => {
							return (
								<View
									key={"viewCelda" + index}
									style={{
										flex: 1,
										flexDirection: "column",
										alignItems: "center",
										marginHorizontal: 2,
									}}>
									<TouchableOpacity
										onPress={() => saltarPosicionCinta(index)}
										style={{
											flexDirection: "column",
											alignItems: "center",
										}}>
										<Celda
											key={"caracter" + index}
											caracter={caracter}
										/>
										{index == indiceActual ? (
											<FontAwesomeIcon
												style={{
													marginVertical: 5,
													color: Colors.secondary,
												}}
												icon={faArrowUpLong}
												size={24}
											/>
										) : null}
									</TouchableOpacity>
								</View>
							);
						})}
					</ScrollView>
				</View>

				<View style={styles.controlsContainer}>
					<Text>{cinta}</Text>
					<Text>{indiceActual + " => " + cinta[indiceActual]} </Text>

					<View style={styles.buttonsContainer}>
						<TouchableOpacity
							style={styles.button}
							onPress={moverseIzquierda}
							accessibilityLabel="Moverse a la izquierda">
							<FontAwesomeIcon
								style={{ color: "white" }}
								icon={faArrowLeft}
								size={24}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.button}
							onPress={moverseDerecha}
							accessibilityLabel="Moverse a la derecha">
{/* 							<Text style={{color: Colors.onPrimary}}>
								Derecha
							</Text> */}
							<FontAwesomeIcon
								style={{ color: "white" }}
								icon={faArrowRight}
								size={24}
							/>
						</TouchableOpacity>
					</View>

					<View style={styles.fieldContainer}>
						<TextInput
							style={styles.input}
							onChangeText={onChangeText}
							value={text}
							placeholder="Caracter actual"
						/>
						<TouchableOpacity
							style={styles.setCharacterButton}
							onPress={setActualCaracter}
							accessibilityLabel="Setear caracter">
							<FontAwesomeIcon
								style={{ color: "white" }}
								icon={faArrowUp}
								size={16}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.clearCharacterButton}
							onPress={limpiarCaracterActual}
							accessibilityLabel="Limpiar celda">
							<FontAwesomeIcon
								style={{ color: Colors.error }}
								icon={faEraser}
								size={22}
							/>
						</TouchableOpacity>
					</View>
				</View>
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
	controlsContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		marginVertical: 32,
		width: "100%",
	},
	fieldContainer: {
		flexDirection: "row",
		width: "100%",
		height: "auto",
		justifyContent: "center",
		alignItems: "center",
		gap: 6,
	},
	mainContentContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between",
		height: "10%",
		width: "100%",
		backgroundColor: Colors.primary,
	},
	headerContent: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
		height: "75%",
		marginHorizontal: 10,
	},
	button: {
		flexDirection: "row",
		height: 48,
		width: "auto",
		gap: 6,
		paddingHorizontal: 12,
		backgroundColor: Colors.secondary,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
	},
	setCharacterButton: {
		height: 40,
		width: 40,
		backgroundColor: Colors.secondary,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 32,
	},
	clearCharacterButton: {
		height: 40,
		width: 40,
		backgroundColor: "transparent",
		borderWidth: 2,
		borderColor: Colors.error,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 32,
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
		justifyContent: "center",
		marginTop: 16,
	},
	input: {
		height: 40,
		width: 200,
		marginVertical: 16,
		marginHorizontal: 8,
		borderWidth: 1,
		padding: 10,
		color: Colors.onBackground,
	},
});
