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
import { TablaEstados } from "../components/TablaEstados";

export default function Home() {		
	const { getTheme } = useTheme();
	const colors = getTheme();

	const caracterVacio: string = "$";

	const [cinta, setCinta] = useState<String[]>([
		caracterVacio,
		"0",
		"0",
		"1",
		caracterVacio,
		caracterVacio,
		caracterVacio,
		caracterVacio,
		caracterVacio,
		caracterVacio,
	]);
	const [indiceActual, setIndiceActual] = useState<number>(0);

	const [caracterIngresado, onChangeCaracterIngresado] =
		React.useState<string>("");

	useEffect(() => {
		setCinta([
			caracterVacio,
			"0",
			"0",
			"1",
			caracterVacio,
			caracterVacio,
			caracterVacio,
			caracterVacio,
			caracterVacio,
			caracterVacio,
		]);
	}, [caracterVacio]);

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
							// borderTopWidth: 1,
							// borderBottomWidth: 1,
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

					<TablaEstados
						caracterActualCinta={cinta[indiceActual]}
						moverseDerecha={moverseDerecha}
						moverseIzquierda={moverseIzquierda}
						colocarCaracter={setActualCaracter}
					/>
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
			alignItems: "center",
			justifyContent: "space-between",
			backgroundColor: colors.background
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
			alignItems: "center"
		},
		input: {
			height: 40,
			width: 200,
			marginVertical: 16,
			marginHorizontal: 8,
			padding: 10,
			color: colors.onBackground,
			backgroundColor: colors.background,
			// fontFamily: "Play_400Regular"
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
			// fontFamily: "Play_400Regular"
		},
	});
