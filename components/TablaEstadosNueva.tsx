import React, { useState, Dispatch, SetStateAction } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";

import { Automata } from "#types/Automata";
import { useTheme } from "?hooks/useTheme";
import { Estado } from "#types/Estado";
import { Transicion } from "#types/Transicion";
import { PrimaryIconButton } from "./PrimaryIconButton";

import {
	faAngleLeft,
	faAngleRight,
	faChevronDown,
	faChevronUp,
	faStepForward,
	faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { SecondaryIconButton } from "@components/SecondaryIconButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import RadioButton from "./RadioButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Select } from "@components/Select";
import { useBiblioteca } from "?hooks/useBiblioteca";
import { PrimaryButton } from "@components/PrimaryButton";
import { SecondaryButton } from "@components/SecondaryButton";

import { Picker } from "@react-native-picker/picker";

interface TablaEstadosNuevaProps {
	automata: Automata;
	setAutomata: Dispatch<SetStateAction<Automata>>;
}

export function TablaEstadosNueva({
	automata,
	setAutomata,
}: TablaEstadosNuevaProps) {
	const { getTheme } = useTheme();
	const colors = getTheme();

	const operaciones = [
		"Izquierda (L)",
		"Derecha (R)",
		"No hacer nada",
		"Carácter",
	];

	const { caracterVacio } = useBiblioteca();

	const [selectedProximoEstado, setSelectedProximoEstado] =
		useState<string>("");

	const [caracterIngresado, setCaracterIngresado] = React.useState<string>("");
	const [inputCaracterEditable, setInputCaracterEditable] = useState(false);

	const [estadoSeleccionado, setEstadoSeleccionado] = useState<Estado>(
		automata.estados[0]
	);

	const [transicionSeleccionada, setTransicionSeleccionada] = useState(
		estadoSeleccionado.transiciones[0]
	);

	const caracteres: String[] = automata.estados[0].transiciones.map(
		(transicion) => transicion.caracter
	);

	function isTransicionActual(estado: Estado, transicion: Transicion) {
		return (
			estado.nombre === estadoSeleccionado.nombre &&
			transicion.caracter === transicionSeleccionada.caracter
		);
	}

	function CeldaEstadoTransicionActiva({
		estado,
		transicion,
	}: {
		estado: Estado;
		transicion: Transicion;
	}) {
		return (
			<View
				key={"transicion" + estado.nombre + transicion.caracter}
				style={{
					borderWidth: 1,
					borderColor: colors.active,
					backgroundColor: colors.background,
					width: 50,
					height: 32,
					padding: 4,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Text
					style={{
						fontSize: 16,
						fontFamily: "Play-Regular",
						color: colors.onBackground,
					}}>
					{transicion.operacion}/{transicion.nuevoEstado}
				</Text>
			</View>
		);
	}

	function CeldaEstadoTransicionInactiva({
		estado,
		transicion,
	}: {
		estado: Estado;
		transicion: Transicion;
	}) {
		return (
			<TouchableOpacity
				onPress={() => seleccionarTransicion(estado, transicion)}
				key={"transicion" + estado.nombre + transicion.caracter}
				style={{
					borderWidth: 1,
					borderColor: colors.onBackground,
					backgroundColor: colors.background,
					width: 50,
					height: 32,
					padding: 4,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Text
					style={{
						fontSize: 16,
						fontFamily: "Play-Regular",
						color: colors.onBackground,
					}}>
					{transicion.operacion}/{transicion.nuevoEstado}
				</Text>
			</TouchableOpacity>
		);
	}

	function seleccionarTransicion(estado: Estado, transicion: Transicion) {
		setEstadoSeleccionado(estado);
		setSelectedProximoEstado(
			transicion.nuevoEstado ? transicion.nuevoEstado.toString() : ""
		);
		setTransicionSeleccionada(transicion);
		setCaracterIngresado("");
	}

	function onOperacionTransicionChange(operacionSeleccionada: string) {
		let operacionCodigo = "";

		if (operaciones.indexOf(operacionSeleccionada) === 3) {
			setInputCaracterEditable(true);
			onChangeCaracterIngresado(caracterIngresado);
		} else {
			setInputCaracterEditable(false);
			if (operaciones.indexOf(operacionSeleccionada) === 0)
				operacionCodigo = "L";
			else if (operaciones.indexOf(operacionSeleccionada) === 1)
				operacionCodigo = "R";
			else if (operaciones.indexOf(operacionSeleccionada) === 2)
				operacionCodigo = "-";

			setTransicionSeleccionada((prevTransicion) => {
				return { ...prevTransicion, operacion: operacionCodigo };
			});

			setAutomata((prevAutomata) => {
				return {
					...prevAutomata,
					estados: prevAutomata.estados.map((estado) => {
						if (estado.nombre === estadoSeleccionado.nombre) {
							return {
								...estado,
								transiciones: estado.transiciones.map((transicion) => {
									if (
										transicion.caracter ===
										transicionSeleccionada.caracter
									) {
										return {
											...transicion,
											operacion: operacionCodigo,
										};
									} else return transicion;
								}),
							};
						} else return estado;
					}),
				};
			});
		}
	}

	function onNuevoEstadoTransicionChange(selectedItem: string) {
		// if (selectedItem === "Aceptador") selectedItem = "-1";
		setTransicionSeleccionada((prevTransicion) => {
			return { ...prevTransicion, nuevoEstado: Number(selectedItem) };
		});

		setAutomata((prevAutomata) => {
			return {
				...prevAutomata,
				estados: prevAutomata.estados.map((estado) => {
					if (estado.nombre === estadoSeleccionado.nombre) {
						return {
							...estado,
							transiciones: estado.transiciones.map((transicion) => {
								if (
									transicion.caracter ===
									transicionSeleccionada.caracter
								) {
									return {
										...transicion,
										nuevoEstado: Number(selectedItem),
									};
								} else return transicion;
							}),
						};
					} else return estado;
				}),
			};
		});

		setSelectedProximoEstado(selectedItem);
	}

	function onChangeCaracterIngresado(caracterColocado: string) {
		// if (caracterColocado !== "") {
		setCaracterIngresado(caracterColocado);

		setTransicionSeleccionada((prevTransicion) => {
			return { ...prevTransicion, operacion: caracterColocado };
		});

		setAutomata((prevAutomata) => {
			return {
				...prevAutomata,
				estados: prevAutomata.estados.map((estado) => {
					if (estado.nombre === estadoSeleccionado.nombre) {
						return {
							...estado,
							transiciones: estado.transiciones.map((transicion) => {
								if (
									transicion.caracter ===
									transicionSeleccionada.caracter
								) {
									return {
										...transicion,
										operacion: caracterColocado,
									};
								} else return transicion;
							}),
						};
					} else return estado;
				}),
			};
		});
	}

	function RowEstado({ estado }: { estado: Estado }) {
		return (
			<View style={{ flexDirection: "row", gap: 5 }}>
				{estado.transiciones.map((transicion) => {
					return isTransicionActual(estado, transicion) ? (
						<CeldaEstadoTransicionActiva
							key={"celda" + estado.nombre + transicion.caracter}
							estado={estado}
							transicion={transicion}
						/>
					) : (
						<CeldaEstadoTransicionInactiva
							key={"celda" + estado.nombre + transicion.caracter}
							estado={estado}
							transicion={transicion}
						/>
					);
				})}
			</View>
		);
	}

	function LabelsCaracteres() {
		return (
			<View style={{ flexDirection: "row", gap: 5, marginLeft: 20 }}>
				{caracteres.map((caracter, indexCaracter) => {
					return (
						<View
							key={"caracter" + indexCaracter}
							style={{
								width: 50,
								height: 22,
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Text
								style={{
									fontSize: 16,
									color: colors.onBackground,
									fontFamily: "Play-Regular",
								}}>
								{caracter}
							</Text>
						</View>
					);
				})}
			</View>
		);
	}

	return (
		<>
			<ScrollView
				style={{ width: "100%", height: "100%" }}
				centerContent={true}>
				<View
					style={{
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						gap: 5,
						paddingVertical: 6,
					}}>
					<LabelsCaracteres />

					{automata.estados.map((estado) => {
						return (
							<View
								key={"estado" + estado.nombre}
								style={{
									flexDirection: "row",
									alignItems: "center",
									gap: 5,
								}}>
								<Text
									style={{
										fontSize: 18,
										marginRight: 6,
										fontFamily: "Play-Regular",
										color:
											estado.nombre === estadoSeleccionado.nombre
												? colors.active
												: colors.onBackground,
									}}>
									{estado.nombre}
								</Text>

								<RowEstado estado={estado} />
							</View>
						);
					})}
				</View>
			</ScrollView>
			<View
				style={{
					width: "100%",
					borderWidth: 1,
					borderColor: colors.outline,
					borderRadius: 6,
					paddingHorizontal: 32,
					marginTop: 16,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<View style={{ width: "100%", marginVertical: 16 }}>
					<Text
						style={{
							color: colors.onBackground,
							fontFamily: "Play-Regular",
						}}>
						Operación
					</Text>
					<RadioButton
						options={operaciones}
						onSelectValue={onOperacionTransicionChange}
						fontSize={16}
						horizontal={true}
						activeDecorationColor={colors.secondary}
						activeTextColor={colors.secondary}
						inactiveTextColor={colors.outline}
					/>
					<View style={styles().nuevoCaracterContainer}>
						<TextInput
							style={styles().input}
							onChangeText={onChangeCaracterIngresado}
							value={caracterIngresado}
							editable={inputCaracterEditable}
							placeholder="Colocar carácter"
							placeholderTextColor={
								inputCaracterEditable
									? colors.onBackground
									: colors.outline
							}
							cursorColor={colors.primary}
							underlineColorAndroid={
								inputCaracterEditable
									? colors.onBackground
									: colors.outline
							}
							autoComplete="off"
							maxLength={1}
							autoCapitalize="none"
						/>

						<SecondaryButton
							text={caracterVacio}
							onPress={() => onChangeCaracterIngresado(caracterVacio)}
							disabled={!inputCaracterEditable}
						/>
					</View>
				</View>
				<View
					style={{
						width: "45%",
						marginVertical: 16,
						borderWidth: 1,
						borderColor: colors.outline,
						borderRadius: 6,
						paddingTop: 6,
						paddingHorizontal: 10,
					}}>
					<Text
						style={{
							color: colors.onBackground,
							fontFamily: "Play-Regular",
						}}>
						Próximo estado
					</Text>
					<Picker
						mode="dropdown"
						style={{
							borderWidth: 1,
							borderStyle: "dotted",
							borderColor: colors.onBackground,
							borderBlockColor: colors.onBackground,
							backgroundColor: colors.background,
							color: colors.onBackground,
							fontFamily: "Play-Regular",
						}}
						dropdownIconColor={colors.onBackground}
						dropdownIconRippleColor={colors.onBackground}
						selectedValue={selectedProximoEstado}
						onValueChange={(itemValue) =>
							onNuevoEstadoTransicionChange(itemValue)
						}>
						{automata.estados.map((estado) => (
							<Picker.Item
								key={"estado" + estado.nombre.toString()}
								label={estado.nombre.toString()}
								value={estado.nombre.toString()}
								style={{
									backgroundColor: colors.background,
									color: colors.onBackground,
									borderWidth: 1,
									borderColor: colors.outline,
								}}
								fontFamily="Play-Regular"
							/>
						))}

						<Picker.Item
							label="Aceptador"
							value="-1"
							fontFamily="Play-Regular"
							style={{
								backgroundColor: colors.background,
								color: colors.onBackground,
								borderWidth: 1,
								borderColor: colors.outline,
							}}
						/>
					</Picker>
				</View>
			</View>
		</>
	);
}

const styles = (colors = useTheme().getTheme()) =>
	StyleSheet.create({
		agregarCaracteresContainer: {
			width: "90%",
			alignContent: "center",
		},
		caracterItemLabel: {
			height: "100%",
			color: colors.onSecondary,
			fontSize: 18,
		},
		caracteresListContainer: {
			width: "100%",
			height: "100%",
		},
		input: {
			height: 40,
			width: 150,
			padding: 10,
			color: colors.onBackground,
			backgroundColor: colors.background,
			fontFamily: "Play-Regular",
		},
		inputsContainer: {
			flexDirection: "column",
			gap: 6,
			marginBottom: 12,
		},
		labelErrorContainer: {
			width: "100%",
			height: "20%",
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: colors.error,
		},
		labelError: {
			color: colors.onError,
			fontSize: 16,
		},
		nuevoCaracterContainer: {
			flexDirection: "row",
			width: "100%",
			height: "auto",
			justifyContent: "center",
			alignItems: "center",
			gap: 6,
			marginTop: "6%",
		},
	});
