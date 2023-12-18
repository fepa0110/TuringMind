import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import { BibliotecaNavigationStackParamList } from "../navigation/types/BibliotecaNavigationType";
import { StackScreenProps } from "@react-navigation/stack";

import { TablaEstadosView } from "../components/TablaEstadosView";

import { useTheme } from "../hooks/useTheme";
import GraphComponent from "../components/GraphComponent";
import { DragTest } from "../components/DragTest";
import { PrimaryButton } from "../components/PrimaryButton";
import { useBiblioteca } from "../hooks/useBiblioteca";

type BibliotecaNavigationProps = StackScreenProps<
	BibliotecaNavigationStackParamList,
	"VerAutomata"
>;

export default function VerAutomata({
	navigation,
	route,
}: BibliotecaNavigationProps) {
	const { getTheme } = useTheme();
	const colors = getTheme();

	const automata = route.params.automata;
	const indiceAutomata = route.params.indiceAutomata;

	const { seleccionarAutomata, indiceAutomataActual } = useBiblioteca();

	function elegirAutomata() {
		seleccionarAutomata(indiceAutomata);
		navigation.goBack();
	}

	return (
		<View style={styles().mainContainer}>
			<Text style={{color: colors.onBackground, fontSize: 26, margin: "3%"}}>{automata.nombre}</Text>
			<TablaEstadosView automata={route.params.automata} />
			{indiceAutomata !== indiceAutomataActual ? (
				<TouchableOpacity style={styles().seleccionarButton} onPress={elegirAutomata} >
					<Text style={{color: colors.onPrimary, fontSize: 16}}>Seleccionar</Text>
				</TouchableOpacity>
			) : null}
		</View>
	);
}

const styles = (colors = useTheme().getTheme()) =>
	StyleSheet.create({
		mainContainer: {
			height: "100%",
			width: "100%",
			flex: 1,
			flexDirection: "column",
			justifyContent: "flex-start",
			backgroundColor: colors.background,
		},
		seleccionarButton:{
			alignSelf: "center",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			width: "50%",
			height: 40,
			marginVertical: "8%",
			borderRadius: 25,
			backgroundColor: colors.primary
		}
	});
