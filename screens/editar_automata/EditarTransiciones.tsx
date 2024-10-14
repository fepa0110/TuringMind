import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

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

import { Picker } from "@react-native-picker/picker";
import Toast from "@components/Toast";
import { Chip } from "@components/Chip";

type BibliotecaNavigationProps = StackScreenProps<
	BibliotecaNavigationStackParamList,
	"EditarTransiciones"
>;

export default function EditarTransiciones({
	navigation,
	route,
}: BibliotecaNavigationProps) {
	const automataParametro = route.params.automata;
	const indiceAutomata = route.params.indiceAutomata;

	const { getTheme } = useTheme();
	const colors = getTheme();

	const [loading, setLoading] = useState(false);

	const [automata, setAutomata] = useState<Automata>(automataParametro);

	const [nombreAutomata, onChangeNombreAutomata] = React.useState<string>(
		automataParametro.nombre.toString()
	);

	const [showToast, setShowToast] = useState(false);

	const [messageToast, setMessageToast] = useState(
		"No puede haber transiciones incompletas"
	);

	const { editarAutomata } = useBiblioteca();

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

		if (nombreAutomata.length > 0) automataParametro.nombre = nombreAutomata;

		return true;
	}

	function editAutomata() {
		if (validarAutomata() === false) {
			ejecutarToast();
			setLoading(false);
		} else {
			editarAutomata(indiceAutomata, automata);
			navigation.navigate("Biblioteca");
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
					flexDirection: "column",
					alignItems: "flex-start",
					marginTop: "2%",
				}}>
				<View style={{ width: "100%", flexDirection: "row", gap: 6 }}>
					<Text style={styles().title}>Editar automata</Text>

					<Chip text="Beta" />
				</View>

				<TextInput
					style={styles().input}
					onChangeText={onChangeNombreAutomata}
					value={nombreAutomata}
					placeholder="Nombre de autómata"
					placeholderTextColor={colors.onBackground}
					cursorColor={colors.primary}
					underlineColorAndroid={colors.onBackground}
					autoComplete="off"
					maxLength={15}
					autoCapitalize="sentences"
					keyboardType="default"
				/>
			</View>

			<TablaEstadosNueva automata={automata} setAutomata={setAutomata} />

			<View style={styles().siguienteContainer}>
				<PrimaryIconButton
					icon={faCheck}
					size={50}
					onPress={() => {
						setLoading(true);
						editAutomata();
					}}
					loading={loading}
				/>
			</View>
			{showToast ? <Toast message={messageToast} type="warning" /> : null}
		</View>
	);
}

const styles = (colors = useTheme().getTheme()) =>
	StyleSheet.create({
		input: {
			height: 40,
			width: 200,
			padding: 10,
			color: colors.onBackground,
			backgroundColor: colors.background,
			fontFamily: "Play-Regular",
		},
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
			width: "100%",
			marginBottom: "3%",
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
