import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
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
import { WarningButton } from "../components/WarningButton";

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
	const [automata, setAutomata] = useState<Automata>();
	const indiceAutomata = route.params.indiceAutomata;

	const { seleccionarAutomata, indiceAutomataActual, eliminarAutomata } =
		useBiblioteca();

	useEffect(() => {
		getAutomata();
	}, []);

	async function removeAutomata() {
		await eliminarAutomata(indiceAutomata);
		navigation.goBack();
	}

	async function getAutomata() {
		setIsLoading(true);
		await AutomatasStorage.getAutomata(indiceAutomata)
			.then((automataLeido) => {
				setAutomata(automataLeido);
				return automataLeido;
			})
			.finally(() => setIsLoading(false));
	}

	function elegirAutomata() {
		seleccionarAutomata(indiceAutomata);
		navigation.goBack();
	}

	return isLoading ? (
		<View style={styles().loadingContainer}>
			<ActivityIndicator color={colors.primary} size={"large"} />
		</View>
	) : (
		<View style={styles().mainContainer}>
			<Text
				style={{
					color: colors.onBackground,
					fontSize: 26,
					margin: "3%",
					fontFamily: "Play-Regular",
				}}>
				{automata?.nombre}
			</Text>
			<TablaEstadosView automata={automata} />
			<View style={styles().buttonsContainer}>
				<TouchableOpacity
					style={styles().seleccionarButton}
					onPress={elegirAutomata}
					disabled={indiceAutomata === indiceAutomataActual}>
					<Text
						style={{
							color: indiceAutomata === indiceAutomataActual ? colors.outline : colors.onPrimary,
							fontSize: 16,
							fontFamily: "Play-Regular",
						}}>
						Seleccionar
					</Text>
				</TouchableOpacity>

				<WarningButton text="Eliminar" onPress={removeAutomata} />
			</View>
		</View>
	);
}

const styles = (colors = useTheme().getTheme()) =>
	StyleSheet.create({
		mainContainer: {
			height: "100%",
			width: "100%",
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
		buttonsContainer: {
			flexDirection: "column",
			width: "100%",
			justifyContent: "center",
			alignItems: "center",
			marginTop: "10%"
		},
		seleccionarButton: {
			flexDirection: "row",
			justifyContent: "center",
			alignItems: "center",
			width: "50%",
			height: 40,
			borderRadius: 25,
			backgroundColor: colors.primary,
		},
	});
