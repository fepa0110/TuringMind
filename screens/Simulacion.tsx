import { useState, useRef, useEffect, ReactNode } from "react";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import {
	faArrowRight,
	faArrowLeft,
	faArrowUpLong,
	faArrowUp,
	faEraser,
	faChevronUp,
	faAngleUp,
	faAngleDoubleUp,
	faUpDown,
	faUpLong,
	faRocket,
	faCircleQuestion,
	faQuestion,
	faChevronLeft,
	faChevronRight,
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

import { Theme } from "#types/Theme";
import { useTheme } from "?hooks/useTheme";

import { Celda } from "@components/Celda";
import { Header } from "@components/Header";
import { PrimaryIconButton } from "@components/PrimaryIconButton";
import { SecondaryIconButton } from "@components/SecondaryIconButton";
import { TablaEstadosSimulacion } from "@components/TablaEstadosSimulacion";
import { useBiblioteca } from "?hooks/useBiblioteca";
import Toast from "@components/Toast";

import {
	CopilotStep,
	walkthroughable,
} from "react-native-copilot";
import { SecondaryButton } from "@components/SecondaryButton";

const WalkthroughableView = walkthroughable(View);

export default function Simulacion({ navigation }: any) {
	// const [secondStepActive, setSecondStepActive] = useState(true);
	// const [lastEvent, setLastEvent] = useState(null);
	// const { start } = useCopilot();

	const { getTheme } = useTheme();
	const colors = getTheme();

	const [showToast, setShowToast] = useState(false);
	const [messageToast, setMessageToast] = useState("Automata finalizado");

	const [indiceActual, setIndiceActual] = useState<number>(0);

	const [caracterIngresado, onChangeCaracterIngresado] = useState<string>("");

	const { automataActual, caracterVacio, seleccionarAutomata } =
		useBiblioteca();

	const [cinta, setCinta] = useState<String[]>([
		caracterVacio,
		caracterVacio,
		caracterVacio,
		caracterVacio,
		caracterVacio,
	]);

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

	function limpiarCaracterActual() {
		setCinta(
			cinta.map((caracterCinta, indexCaractetCinta) => {
				return indexCaractetCinta === indiceActual
					? caracterVacio
					: caracterCinta;
			})
		);
	}

	function ejecutarToast() {
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 5000);
	}

	function saltarPosicionCinta(posicion: number) {
		setIndiceActual(posicion);
	}

	function setActualCaracter(caracterNuevo: string) {
		if (caracterNuevo.length > 0) {
			setCinta(
				cinta.map((caracterCinta, indexCaractetCinta) => {
					return indexCaractetCinta === indiceActual
						? caracterNuevo
						: caracterCinta;
				})
			);
		}
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
							borderTopWidth: 1,
							borderBottomWidth: 1,
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
										paddingHorizontal: 1
									}}>
									<Text
										key={"caracter" + index}
										style={{
											color:
												index != indiceActual
													? colors.onBackground
													: colors.secondary,
											textAlign: "center",
											fontSize: 14,
											fontFamily: "Play-Regular",
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
						icon={faChevronLeft}
						onPress={moverseIzquierda}
						size={48}
					/>
					<PrimaryIconButton
						icon={faChevronRight}
						onPress={moverseDerecha}
						size={48}
					/>
				</View>
			</View>
		);
	}

	return (
		// <WithCopilot>
		<View style={styles(colors).container}>
			<View style={styles(colors).mainContentContainer}>
				<CopilotStep
					text='Para moverte por la Cinta puedes presionar sobre una celda para posicionarte sobre ella o bien moverte con los controles en la parte inferior. La celda actual se encuentra señalada por una flecha.'
					order={1}
					name="cinta">
					<WalkthroughableView>
						<Cinta />
					</WalkthroughableView>
				</CopilotStep>

				{/* <PrimaryIconButton onPress={() => start()} icon={faQuestion} /> */}

				<View style={styles(colors).controlsContainer}>
					<View style={styles(colors).fieldContainer}>
						<CopilotStep
							text="Colocar un caracter en la posición actual de la cinta"
							order={2}
							name="colocarCaracter">
							<WalkthroughableView
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}>
								<TextInput
									style={styles(colors).input}
									onChangeText={onChangeCaracterIngresado}
									value={caracterIngresado}
									placeholder="Carácter actual"
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
							</WalkthroughableView>
						</CopilotStep>

						<View>
							<CopilotStep
								text='Borrar el caracter en la posición actual de la cinta (reemplaza por el "caracter nulo")'
								order={3}
								name="borrarCaracter">
								<WalkthroughableView>
									<SecondaryIconButton
										onPress={limpiarCaracterActual}
										icon={faEraser}
									/>
								</WalkthroughableView>
							</CopilotStep>
						</View>	
					</View>
				</View>

				<View style={styles(colors).controlsContainer}>
					{automataActual !== undefined ? (
						<CopilotStep
							text="Aqui se visualiza el automata seleccionado actualmente para simular"
							order={4}
							name="automataSeleccionado">
							<WalkthroughableView>
								<TablaEstadosSimulacion
									automataActual={automataActual}
									caracterActualCinta={cinta[indiceActual]}
									moverseDerecha={moverseDerecha}
									moverseIzquierda={moverseIzquierda}
									colocarCaracter={setActualCaracter}
									onShowMessage={ejecutarToast}
								/>
							</WalkthroughableView>
						</CopilotStep>
					) : (
						<CopilotStep
							text="Aun no haz seleccionado un automata, puedes hacerlo desde la biblioteca tocando sobre el boton o bien desde el menú lateral"
							order={4}
							name="seleccionarAutomata">
							<WalkthroughableView
								style={{
									flexDirection: "column",
									width: "100%",
									justifyContent: "center",
									alignItems: "center",
									gap: 42,
									marginTop: 22,
								}}>
								<Text
									style={styles(colors).messageAutomataNoSeleccionado}>
									No se seleccionó ningún autómata
								</Text>

								<SecondaryButton
									text="Abrir biblioteca"
									onPress={() => {
										navigation.jumpTo("BibliotecaNavigation");
									}}
									width={240}
								/>
							</WalkthroughableView>
						</CopilotStep>
					)}
				</View>
			</View>
			{/* <Simulacion /> */}
			{showToast ? <Toast message={messageToast} type="info" /> : null}
			{/* {iniciarTutorial ? 
					<MaskedView content={Simulacion()} />
					: Simulacion()
					} */}
		</View>
		// </WithCopilot>
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
			alignItems: "center",
			justifyContent: "center",
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
			// flexDirection: "column",
			// justifyContent: "space-between",
			alignItems: "center",
		},
		messageAutomataNoSeleccionado: {
			fontFamily: "Play-Regular",
			color: colors.terciary,
			fontSize: 22,
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
