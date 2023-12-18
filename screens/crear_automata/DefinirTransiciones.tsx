import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "../../hooks/useTheme";

import { StackScreenProps } from "@react-navigation/stack";
import { CrearAutomataNavigationStackParamList } from "../../navigation/types/CrearAutomataNavigationType";

import { Estado } from "../../types/Estado";

import { TablaEstadosNueva } from "../../components/TablaEstadosNueva";
import { Automata } from "../../types/Automata";
import { PrimaryIconButton } from "../../components/PrimaryIconButton";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useBiblioteca } from "../../hooks/useBiblioteca";
import { BibliotecaNavigationStackParamList } from "../../navigation/types/BibliotecaNavigationType";

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

	const { addAutomata } = useBiblioteca()

	function crearAutomata() {
		addAutomata(automata)
		navigation.navigate("Biblioteca")
	}

	return (
		<View style={styles().mainContainer}>
			<View style={{width: "95%", flexDirection: "column", alignItems: "flex-start"}}>
				<Text style={styles().title}>Definir transiciones</Text>
				<Text style={styles().labelData}>
					{"Automata: " + automata.nombre}
				</Text>
			</View>

			<TablaEstadosNueva automata={automata} setAutomata={setAutomata} />

			<View style={styles().siguienteContainer}>
				<PrimaryIconButton
					icon={faCheck}
					size={50}
					onPress={crearAutomata}
					loading={loading}
				/>
			</View>
		</View>
	);
}

const styles = (colors = useTheme().getTheme()) =>
	StyleSheet.create({
		labelData: {
			color: colors.terciary,
			fontSize: 16,
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
		},
	});
