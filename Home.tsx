import React, { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
	faArrowRight,
	faArrowLeft,
	faArrowUpLong,
	faArrowUp,
	faEraser,
} from "@fortawesome/free-solid-svg-icons";

import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import { Celda } from "./components/Celda";
import { Header } from "./components/Header";
import { PrimaryIconButton } from "./components/PrimaryIconButton";
import { SecondaryIconButton } from "./components/SecondaryIconButton";
import { useTheme } from "./hooks/useTheme";
import { Theme } from "./types/Theme";
import { TablaEstados } from "./components/TablaEstados";

export default function Home() {
	const { getTheme } = useTheme();
	const colors = getTheme();

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

	const [tablaEstados, setTablaEstados] = useState<string[]>(["R", "L", "L"]);
	const [estadoActual, setEstadoActual] = useState<number>(0);

	/* 
		1 [ "a"   "b"   "c"]
		2 [ "R/2","L/3, "R/2"]
		3 [ "L/2","L/2","R/2"]
	*/

	const [text, onChangeText] = React.useState<string>("");

	useEffect(() => {
	  ejecutarEstadoNuevo()
	}, [estadoActual])
	
	function moverseDerecha() {
		if (cinta.length - 1 === indiceActual) {
			setCinta((prevState) => [...prevState, " "]);
		}
		setIndiceActual((prevIndiceActual) => prevIndiceActual + 1);
	}

	function moverseIzquierda() {
		if (indiceActual === 0) {
			setCinta((prevState) => [" ", ...prevState]);
		} else setIndiceActual((prevIndiceActual) => prevIndiceActual - 1);
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

	function Cinta() {
		return (
			<View style={styles(colors).cintaContainer}>
				<ScrollView
						style={{ alignSelf: "center", height:80 }}
						horizontal={true}
						alwaysBounceHorizontal={true}
						centerContent={true}
					>
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
												color: colors.secondary,
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
		);
	}

	const ejecutarEstadoNuevo = () => {
		if (tablaEstados[estadoActual] === "R") {
			console.log("🚀 Derecha:", estadoActual);
			moverseDerecha();
		} else if (tablaEstados[estadoActual] === "L") {
			console.log("🚀 Izquierda:", estadoActual);
			moverseIzquierda();
		}
	};

	function siguienteEstado() {
		if (estadoActual < tablaEstados.length - 1) {
			setEstadoActual((prevEstado) => prevEstado + 1);
			ejecutarEstadoNuevo();
		}
	}

	function anteriorEstado() {
		if (estadoActual > 0) {
			setEstadoActual((prevEstado) => prevEstado - 1);
			ejecutarEstadoNuevo();
		}
	}

	/* function TablaEstados() {
		return (
			<View style={[styles(colors).tablaEstadosContainer]}>
				<View style={{ flexDirection: "row", gap: 6 }}>
					{tablaEstados.map((estado, estadoIndex) => {
						return (
							<Text
								key={"estadoTabla" + estadoIndex}
								style={
									estadoIndex === estadoActual
										? { color: colors.primary }
										: { color: colors.neutral }
								}>
								{estado}
							</Text>
						);
					})}
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						gap: 6,
					}}>
					<PrimaryIconButton onPress={anteriorEstado} icon={faArrowLeft} />
					<PrimaryIconButton
						onPress={siguienteEstado}
						icon={faArrowRight}
					/>
				</View>
				<Text style={{ color: colors.onBackground }}>
					{"estadoActual: " + estadoActual}
				</Text>
				<Text style={{ color: colors.onBackground }}>
					{"estadoActualNombre: " + tablaEstados[estadoActual]}
				</Text>
			</View>
		);
	} */

	return (
		<View style={styles(colors).container}>
			<Header />

			<View style={styles(colors).mainContentContainer}>
				<Cinta />

				<View style={styles(colors).controlsContainer}>
					<Text style={{ color: colors.onBackground }}>{cinta}</Text>
					<Text style={{ color: colors.onBackground }}>
						{indiceActual + " => " + cinta[indiceActual]}{" "}
					</Text>

					<View style={styles(colors).buttonsContainer}>
						<TouchableOpacity
							style={styles(colors).button}
							onPress={moverseIzquierda}
							accessibilityLabel="Moverse a la izquierda">
							<FontAwesomeIcon
								style={{ color: colors.onSecondary }}
								icon={faArrowLeft}
								size={24}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles(colors).button}
							onPress={moverseDerecha}
							accessibilityLabel="Moverse a la derecha">
							<FontAwesomeIcon
								style={{ color: colors.onSecondary }}
								icon={faArrowRight}
								size={24}
							/>
						</TouchableOpacity>
					</View>

					<View style={styles(colors).fieldContainer}>
						<TextInput
							style={styles(colors).input}
							onChangeText={onChangeText}
							value={text}
							placeholder="Caracter actual"
							placeholderTextColor={colors.onBackground}
							cursorColor={colors.primary}
							underlineColorAndroid={colors.onBackground}
							autoComplete="off"
							maxLength={1}
							autoCapitalize="none"
						/>

						<PrimaryIconButton
							onPress={setActualCaracter}
							icon={faArrowUp}
						/>

						<SecondaryIconButton
							onPress={limpiarCaracterActual}
							icon={faEraser}
						/>
					</View>

					<TablaEstados />
				</View>
			</View>
		</View>
	);
}

const styles = (colors: Theme) =>
	StyleSheet.create({
		button: {
			flexDirection: "row",
			height: 48,
			width: "auto",
			gap: 6,
			paddingHorizontal: 12,
			backgroundColor: colors.secondary,
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 8,
		},
		buttonsContainer: {
			flexDirection: "row",
			gap: 10,
			marginVertical: 10,
		},
		container: {
			flex: 1,
			flexDirection: "column",
			height: "100%",
			backgroundColor: colors.background,
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
		cintaContainer: {
			flexDirection: "row",
			gap: 2,
			width: "100%",
			justifyContent: "center",
			marginVertical: 32,
		},
		input: {
			height: 40,
			width: 200,
			marginVertical: 16,
			marginHorizontal: 8,
			padding: 10,
			color: colors.onBackground,
			backgroundColor: colors.background,
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
		setCharacterButton: {
			height: 40,
			width: 40,
			backgroundColor: colors.secondary,
			alignItems: "center",
			justifyContent: "center",
			borderRadius: 32,
		},
		tablaEstadosContainer: {
			marginHorizontal: 12,
			borderWidth: 1,
			borderColor: colors.neutral,
			width: "90%",
		},
	});
