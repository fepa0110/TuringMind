import React, { useState } from "react";
import { Text, View } from "react-native";

import { Automata } from "../types/Automata";
import { useTheme } from "../hooks/useTheme";
import { Estado } from "../types/Estado";
import { Transicion } from "../types/Transicion";

interface TablaEstadosViewProps {
	automata: Automata | undefined;
}

export function TablaEstadosView({ automata }: TablaEstadosViewProps) {
	const { getTheme } = useTheme();
	const colors = getTheme();

	const caracteres: String[] = automata ? automata?.estados[0].transiciones.map(
		(transicion) => transicion.caracter
	) : [];

	function CeldaEstadoTransicion({
		estado,
		transicion,
	}: {
		estado: Estado;
		transicion: Transicion;
	}) {
		let textoCelda = "";
		if (transicion.operacion !== undefined)
			textoCelda = textoCelda.concat(transicion.operacion);

		textoCelda = textoCelda.concat("/");

		if (transicion.nuevoEstado !== undefined)
			textoCelda = textoCelda.concat(transicion.nuevoEstado.toString());

		return (
			<View
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
						textAlign: "center",
					}}>
					{textoCelda}
				</Text>
			</View>
		);
	}

	function RowEstado({ estado }: { estado: Estado }) {
		return (
			<View style={{ flexDirection: "row", gap: 5 }}>
				{estado.transiciones.map((transicion) => {
					return (
						<CeldaEstadoTransicion
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
							<Text style={{ fontSize: 16, color: colors.onBackground, fontFamily: "Play-Regular", }}>
								{caracter}
							</Text>
						</View>
					);
				})}
			</View>
		);
	}

	return (
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
			<LabelsCaracteres />

			{automata?.estados.map((estado, indexEstado) => {
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
								color: colors.onBackground,
							}}>
							{estado.nombre}
						</Text>

						<RowEstado estado={estado} />
					</View>
				);
			})}
		</View>
	);
}
