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
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import { Theme } from "../types/Theme";
import { useTheme } from "../hooks/useTheme";

import { Celda } from "../components/Celda";
import { Header } from "../components/Header";
import { PrimaryIconButton } from "../components/PrimaryIconButton";
import { SecondaryIconButton } from "../components/SecondaryIconButton";
import { TablaEstadosSimulacion } from "../components/TablaEstadosSimulacion";
import { useBiblioteca } from "../hooks/useBiblioteca";
import Toast from "../components/Toast";

export default function Simulacion() {
	const { getTheme } = useTheme();
	const colors = getTheme();

	const [showToast, setShowToast] = useState(false);
	const [messageToast, setMessageToast] = useState("Automata finalizado");

	const { automataActual, caracterVacio, seleccionarAutomata } = useBiblioteca();
	console.log("🚀 ~ file: Simulacion.tsx:42 ~ Simulacion ~ automataActual:", automataActual)


	const [cinta, setCinta] = useState<String[]>([
		caracterVacio,
		caracterVacio,
		caracterVacio,
		caracterVacio,
		caracterVacio,
	]);

	const [indiceActual, setIndiceActual] = useState<number>(0);

	const [caracterIngresado, onChangeCaracterIngresado] =
		React.useState<string>("");
	
	function ejecutarToast() {
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 5000);
	}

	function moverseDerecha() {
		if (cinta.length - 1 === indiceActual) {
			setCinta((prevState) => [...prevState, caracterVacio]);
		}
		setIndiceActual((prevIndiceActual) => prevIndiceActual + 1);
	}

	function moverseIzquierda() {
		if (indiceActual === 0) {
			setCinta((prevState) => [caracterVacio, ...prevState]);
		} else setIndiceActual((prevIndiceActual) => prevIndiceActual - 1);
	}

	function saltarPosicionCinta(posicion: number) {
		setIndiceActual(posicion);
	}

	function setActualCaracter(caracterNuevo: string) {
		setCinta(
			cinta.map((caracterCinta, indexCaractetCinta) => {
				return indexCaractetCinta === indiceActual
					? caracterNuevo
					: caracterCinta;
			})
		);
	}

	function limpiarCaracterActual() {
		setCinta(
			cinta.map((caracterCinta, indexCaractetCinta) => {
				return indexCaractetCinta === indiceActual
					? caracterVacio
					: caracterCinta;
			})
		);
	}

	function Cinta() {
		return (
			<View
				style={{
					flexDirection: "column",
					width: "100%",
					marginVertical: 10,
					gap: 10,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<View style={styles(colors).cintaContainer}>
					<ScrollView
						style={{
							alignSelf: "center",
							alignContent: "center",
							height: "auto",
							width: "100%",
							borderWidth: 1,
							borderEndColor: colors.error,
							borderColor: colors.outline,
							borderStyle: "dashed",
							paddingVertical: 3,
						}}
						horizontal={true}
						alwaysBounceHorizontal={true}
						centerContent={true}
						showsHorizontalScrollIndicator={false}>
						{cinta.map((caracter, index) => {
							return (
								<View
									key={"viewCaracter" + index}
									style={{
										flexDirection: "row",
										justifyContent: "center",
									}}>
									<Text
										key={"caracter" + index}
										style={{
											color:
												index != indiceActual
													? colors.onBackground
													: colors.active,
											textAlign: "center",
										}}>
										{caracter}
									</Text>
								</View>
							);
						})}
					</ScrollView>
				</View>
				<View style={styles(colors).cintaContainer}>
					<ScrollView
						style={{ alignSelf: "center", height: "auto" }}
						horizontal={true}
						alwaysBounceHorizontal={true}
						centerContent={true}>
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
				<View style={styles(colors).buttonsContainer}>
					<PrimaryIconButton
						icon={faArrowLeft}
						onPress={moverseIzquierda}
						size={48}
					/>
					<PrimaryIconButton
						icon={faArrowRight}
						onPress={moverseDerecha}
						size={48}
					/>
				</View>
			</View>
		);
	}

	return (
		<View style={styles(colors).container}>
			{/* <Header /> */}

			<View style={styles(colors).mainContentContainer}>
				<Cinta />

				<View style={styles(colors).controlsContainer}>
					{/* <Text style={{ color: colors.onBackground }}>{cinta}</Text>
					<Text style={{ color: colors.onBackground }}>
						{indiceActual + " => " + cinta[indiceActual]}{" "}
					</Text> */}

					<View style={styles(colors).fieldContainer}>
						<TextInput
							style={styles(colors).input}
							onChangeText={onChangeCaracterIngresado}
							value={caracterIngresado}
							placeholder="Caracter actual"
							placeholderTextColor={colors.onBackground}
							cursorColor={colors.primary}
							underlineColorAndroid={colors.onBackground}
							autoComplete="off"
							maxLength={1}
							autoCapitalize="none"
						/>

						<PrimaryIconButton
							onPress={() => setActualCaracter(caracterIngresado)}
							icon={faArrowUp}
						/>

						<SecondaryIconButton
							onPress={limpiarCaracterActual}
							icon={faEraser}
						/>
					</View>

					{automataActual !== undefined ? <TablaEstadosSimulacion
						automataActual={automataActual}
						caracterActualCinta={cinta[indiceActual]}
						moverseDerecha={moverseDerecha}
						moverseIzquierda={moverseIzquierda}
						colocarCaracter={setActualCaracter}
						onShowMessage={ejecutarToast}
					/>: <Text style={styles(colors).messageAutomataNoSeleccionado}>No se selecciono ningun automata</Text>}
				</View>
			</View>

			{showToast ? <Toast message={messageToast} type="info" /> : null}
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
			gap: 25,
		},
		container: {
			flex: 1,
			flexDirection: "column",
			height: "100%",
			alignItems: "center",
			justifyContent: "space-between",
			backgroundColor: colors.background,
		},
		controlsContainer: {
			flex: 1,
			flexDirection: "column",
			justifyContent: "flex-start",
			alignItems: "center",
			width: "100%",
		},
		cintaContainer: {
			flexDirection: "row",
			gap: 2,
			width: "100%",
			justifyContent: "center",
			alignItems: "center",
		},
		input: {
			height: 40,
			width: 200,
			marginVertical: 16,
			marginHorizontal: 8,
			padding: 10,
			color: colors.onBackground,
			backgroundColor: colors.background,
			fontFamily: "Play-Regular",
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
		messageAutomataNoSeleccionado:{
			fontFamily: "Play-Regular",
			color: colors.terciary,
			fontSize: 22
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
