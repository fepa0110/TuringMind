import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "?hooks/useTheme";

import { StackScreenProps } from "@react-navigation/stack";
import { CrearAutomataNavigationStackParamList } from "../../navigation/types/CrearAutomataNavigationType";

import { Estado } from "#types/Estado";

import { TablaEstadosNueva } from "@components/TablaEstadosNueva";
import { Automata } from "#types/Automata";
import { PrimaryIconButton } from "@components/PrimaryIconButton";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useBiblioteca } from "?hooks/useBiblioteca";
import { BibliotecaNavigationStackParamList } from "../../navigation/types/BibliotecaNavigationType";
import Toast from "@components/Toast";
import { SecondaryIconButton } from "@components/SecondaryIconButton";
import { SecondaryButton } from "@components/SecondaryButton";

type BibliotecaNavigationProps = StackScreenProps<
	BibliotecaNavigationStackParamList,
	"DefinirTransiciones"
>;

export default function DefinirTransiciones({
	navigation,
	route,
}: BibliotecaNavigationProps) {
	const { getTheme } = useTheme();
	const colors = getTheme();

	const [loading, setLoading] = useState(false);

	const [automata, setAutomata] = useState<Automata>(route.params.automata);

	const [showToast, setShowToast] = useState(false);

	const [messageToast, setMessageToast] = useState(
		"No puede haber transiciones incompletas"
	);

	const { addAutomata } = useBiblioteca();

	function validarAutomata(): boolean {
		for (
			let indexEstado = 0;
			indexEstado < automata.estados.length;
			indexEstado++
		) {
			for (
				let indexTransicion = 0;
				indexTransicion < automata.estados[indexEstado].transiciones.length;
				indexTransicion++
			) {
				let transicion =
					automata.estados[indexEstado].transiciones[indexTransicion];
				if (transicion.nuevoEstado === undefined) {
					return false;
				}
				if (
					transicion.operacion === undefined ||
					transicion.operacion === ""
				) {
					// console.log("Operacion nula");
					return false;
				}
			}
		}
		return true;
	}

	function crearAutomata(borrador: Boolean) {
		if (borrador) {
			setAutomata((prevAutomata) => {
				return { ...prevAutomata, borrador: true };
			});
			addAutomata(automata);
			navigation.navigate("Biblioteca");
		} 
		else {
			if (validarAutomata() === false) {
				ejecutarToast();
				setLoading(false);
			} else {
				addAutomata(automata);
				navigation.navigate("Biblioteca");
			}
		}
	}

	function ejecutarToast() {
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 3000);
	}

	return (
		<View style={styles().mainContainer}>
			<View
				style={{
					width: "95%",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginTop: "2%",
				}}>
				<View
					style={{
						flexDirection: "column",
					}}>
					<Text style={styles().title}>Definir transiciones</Text>
					<Text style={styles().labelData}>
						{"Autómata: " + automata.nombre}
					</Text>
				</View>

				<View style={styles().siguienteContainer}>
					<SecondaryButton
						icon={faCheck}
						text="Borrador"
						width={120}
						onPress={() => {
							setLoading(true);
							crearAutomata(true);
						}}
						loading={loading}
					/>

					<PrimaryIconButton
						icon={faCheck}
						size={50}
						onPress={() => {
							setLoading(true);
							crearAutomata(false);
						}}
						loading={loading}
					/>
				</View>
			</View>

			<TablaEstadosNueva automata={automata} setAutomata={setAutomata} />
			{showToast ? <Toast message={messageToast} type="warning" /> : null}
		</View>
	);
}

const styles = (colors = useTheme().getTheme()) =>
	StyleSheet.create({
		labelData: {
			color: colors.terciary,
			fontSize: 16,
			fontFamily: "Play-Regular",
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
			fontFamily: "Play-Regular",
		},
		siguienteContainer: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			gap: 16,
		},
		mainContainer: {
			flexDirection: "column",
			justifyContent: "space-around",
			alignItems: "center",
			backgroundColor: colors.background,
			width: "100%",
			height: "100%",
		},
		title: {
			color: colors.onBackground,
			fontSize: 20,
			fontFamily: "Play-Regular",
		},
	});
