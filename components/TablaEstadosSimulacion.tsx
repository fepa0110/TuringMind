import React, { useState } from "react";
import { Text, View } from "react-native";

import { Automata } from "../types/Automata";
import { useTheme } from "../hooks/useTheme";
import { Estado } from "../types/Estado";
import { Transicion } from "../types/Transicion";
import { PrimaryIconButton } from "./PrimaryIconButton";

import {
	faAngleLeft,
	faAngleRight,
	faForwardStep,
	faStepForward,
	faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { SecondaryIconButton } from "./SecondaryIconButton";
import { useBiblioteca } from "../hooks/useBiblioteca";
import { ScrollView } from "react-native-gesture-handler";

interface TablaEstadosSimulacionProps {
	automataActual: Automata;
	caracterActualCinta: String;
	moverseDerecha: () => void;
	moverseIzquierda: () => void;
	colocarCaracter: (caracter: string) => void;
	onShowMessage: () => void;
}

export function TablaEstadosSimulacion({
	automataActual,
	caracterActualCinta,
	moverseDerecha,
	moverseIzquierda,
	colocarCaracter,
	onShowMessage,
}: TablaEstadosSimulacionProps) {
	const { caracterVacio } = useBiblioteca();

	const finAutomata: number = -1;

	const { getTheme } = useTheme();
	const colors = getTheme();

	const [estadoActual, setEstadoActual] = useState<Estado>(
		automataActual.estados[0]
	);

	const caracteres: String[] = automataActual.estados[0].transiciones.map(
		(transicion) => transicion.caracter
	);

	function isTransicionActual(estado: Estado, transicion: Transicion) {
		return (
			estado.nombre === estadoActual.nombre &&
			transicion.caracter === caracterActualCinta
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
					borderColor: colors.onBackground,
					backgroundColor: isTransicionActual(estado, transicion)
						? colors.active
						: colors.background,
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
						color: colors.onActive,
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
			<View
				key={"transicion" + estado.nombre + transicion.caracter}
				style={{
					borderWidth: 1,
					borderColor: colors.onBackground,
					backgroundColor: isTransicionActual(estado, transicion)
						? colors.active
						: colors.background,
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
			<View style={{ flexDirection: "row", gap: 5, marginLeft: 14 }}>
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

	function ejecutarSiguienteTransicion() {
		const transicionActual = estadoActual.transiciones.find((transicion) => {
			return isTransicionActual(estadoActual, transicion);
		});

		if (transicionActual !== undefined) {
			if (transicionActual.operacion === "R") moverseDerecha();
			else if (transicionActual.operacion === "L") moverseIzquierda();
			else if (
				transicionActual.operacion !== "-" &&
				transicionActual.operacion !== caracterVacio
			)
				colocarCaracter(transicionActual.operacion || caracterVacio);

			if (transicionActual.nuevoEstado === finAutomata) {
				onShowMessage();
				reiniciarAutomata();
			} else {
				const estadoNuevo = automataActual.estados.find(
					(estado) => estado.nombre === transicionActual.nuevoEstado
				);

				if (estadoNuevo !== undefined) setEstadoActual(estadoNuevo);
			}
		}
	}

	function reiniciarAutomata() {
		setEstadoActual(automataActual.estados[0]);
	}

	return (
		<ScrollView>
			<View
				style={{
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					width: "90%",
					gap: 5,
					paddingVertical: 6,
					marginHorizontal: 6,
				}}>
				
				<Text
					style={{
						alignSelf: "flex-start",
						color: colors.terciary,
						fontSize: 16,
						fontFamily: "Play-Regular",
					}}>
					{automataActual.nombre}
				</Text>

				<LabelsCaracteres />

				{automataActual.estados.map((estado, indexEstado) => {
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
									fontFamily: "Play-Regular",
									color:
										estado.nombre === estadoActual.nombre
											? colors.active
											: colors.onBackground,
								}}>
								{estado.nombre}
							</Text>

							<RowEstado estado={estado} />
						</View>
					);
				})}

				<View
					style={{
						flex: 1,
						flexDirection: "row",
						gap: 5,
						marginVertical: 6,
					}}>
					<PrimaryIconButton
						icon={faForwardStep}
						onPress={ejecutarSiguienteTransicion}
					/>
					<SecondaryIconButton icon={faUndo} onPress={reiniciarAutomata} />
				</View>
			</View>
		</ScrollView>
	);
}
