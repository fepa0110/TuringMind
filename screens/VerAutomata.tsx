import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import { BibliotecaNavigationStackParamList } from "../navigation/types/BibliotecaNavigationType";
import { StackScreenProps } from "@react-navigation/stack";

import { TablaEstadosView } from "../components/TablaEstadosView";

import { useTheme } from "../hooks/useTheme";
import GraphComponent from "../components/GraphComponent";
import { DragTest } from "../components/DragTest";
import { PrimaryButton } from "../components/PrimaryButton";
import { useBiblioteca } from "../hooks/useBiblioteca";
import * as AutomatasStorage from "../data/biblioteca/storage";
import { Automata } from "../types/Automata";

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

	const [isLoading, setIsLoading] = useState(true);
	const [automata, setAutomata] = useState<Automata | undefined>();
	// const automata = route.params.indiceAutomata;
	const indiceAutomata = route.params.indiceAutomata;

	const { seleccionarAutomata, indiceAutomataActual } = useBiblioteca();

	useEffect(() => {
		getAutomata()
	}, [])
	

	async function getAutomata() {
		setIsLoading(true);
		const automataLeido = await AutomatasStorage.getAutomata(indiceAutomata)
			.then((automataLeido) => {
				return automataLeido;
			})
			.finally(() => setIsLoading(false));
		setAutomata(automataLeido)
	}

	function elegirAutomata() {
		seleccionarAutomata(indiceAutomata);
		navigation.goBack();
	}

	return (
		isLoading ? 
		<View style={styles().loadingContainer}>
			<ActivityIndicator color={colors.primary} size={"large"}/>
		</View>:
		<View style={styles().mainContainer}>
			<Text
				style={{ color: colors.onBackground, fontSize: 26, margin: "3%", fontFamily: "Play-Regular", }}>
				{automata?.nombre}
			</Text>
			<TablaEstadosView automata={automata} />
			{indiceAutomata !== indiceAutomataActual ? (
				<TouchableOpacity
					style={styles().seleccionarButton}
					onPress={elegirAutomata}>
					<Text style={{ color: colors.onPrimary, fontSize: 16 }}>
						Seleccionar
					</Text>
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
		loadingContainer: {
			height: "100%",
			width: "100%",
			flex: 1,
			flexDirection: "column",
			justifyContent: "center",
			backgroundColor: colors.background,
		},
		seleccionarButton: {
			alignSelf: "center",
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			width: "50%",
			height: 40,
			marginVertical: "8%",
			borderRadius: 25,
			backgroundColor: colors.primary,
		},
	});
