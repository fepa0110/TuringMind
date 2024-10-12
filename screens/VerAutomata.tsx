import {
	ActivityIndicator,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { BibliotecaNavigationStackParamList } from "../navigation/types/BibliotecaNavigationType";
import { StackScreenProps } from "@react-navigation/stack";

import { TablaEstadosView } from "@components/TablaEstadosView";

import { useTheme } from "?hooks/useTheme";
import GraphComponent from "@components/GraphComponent";
import { DragTest } from "@components/DragTest";
import { PrimaryButton } from "@components/PrimaryButton";
import { useBiblioteca } from "?hooks/useBiblioteca";
import * as AutomatasStorage from "../data/biblioteca/storage";
import { Automata } from "#types/Automata";
import { WarningButton } from "@components/WarningButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import Toast from "@components/Toast";

type BibliotecaNavigationProps = StackScreenProps<
	BibliotecaNavigationStackParamList,
	"VerAutomata"
>;

export default function VerAutomata({
	navigation,
	route,
}: BibliotecaNavigationProps) {
	const indiceAutomata = route.params.indiceAutomata;

	const { getTheme } = useTheme();
	const colors = getTheme();

	const { seleccionarAutomata, indiceAutomataActual, eliminarAutomata } =
		useBiblioteca();

	const [isLoading, setIsLoading] = useState(true);
	const [automata, setAutomata] = useState<Automata>();
	const [showModalRemove, setShowModalRemove] = useState(false);

	const [showToast, setShowToast] = useState(false);
	const [messageToast, setMessageToast] = useState("Automata seleccionado correctamente");

	useEffect(() => {
		getAutomata();
	}, []);

	function ejecutarToast() {
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 5000);
	}

	async function removeAutomata() {
		setShowModalRemove(false);
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
			.finally(() => {
				setIsLoading(false);
			});
	}

	function elegirAutomata() {
		ejecutarToast();
		seleccionarAutomata(indiceAutomata);
	}

	function ModalDelete() {
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={showModalRemove}
				onRequestClose={() => {
					setShowModalRemove(false);
				}}
				>
				<View style={styles().centeredView}>
					<View style={styles().modalView}>
						<Text style={styles().modalText}>
							¿Estás seguro que deseas eliminar este autómata?
						</Text>
						<View
							style={{
								flexDirection: "row",
							}}>
							<Pressable
								style={[styles().button, styles().buttonCancel]}
								onPress={() => {
									setShowModalRemove(false);
								}}>
								<Text style={styles().textModalCancelButton}>
									Cancelar
								</Text>
							</Pressable>
							<Pressable
								style={[styles().button, styles().buttonAceptar]}
								onPress={removeAutomata}>
								<Text style={styles().textModalAceptarButton}>
									Aceptar
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	return isLoading ? (
		<View style={styles().loadingContainer}>
			<ActivityIndicator color={colors.primary} size={"large"} />
		</View>
	) : (
		<View style={styles().mainContainer}>
			<ModalDelete />
			<View style={{ flexDirection: "row", alignItems: "center", margin: "3%", gap: 10}}>
				<Text
					style={{
						color: colors.onBackground,
						fontSize: 26,
						fontFamily: "Play-Regular",
					}}>
					{automata?.nombre}
				</Text>

				{indiceAutomata !== indiceAutomataActual || <FontAwesomeIcon style={{ marginTop: 6 }} icon={faCheckCircle} color={colors.active} size={22} />}

			</View>
			
			<TablaEstadosView automata={automata} />

			<View style={styles().buttonsContainer}>
				{indiceAutomata !== indiceAutomataActual ? (
					<PrimaryButton
						text="Seleccionar"
						width={"50%"}
						onPress={elegirAutomata}
					/>
				) : null}

				<WarningButton
					text="Eliminar"
					onPress={() => {
						setShowModalRemove(true);
					}}
				/>
			</View>
			
			{showToast ? <Toast message={messageToast} type="info" /> : null}

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
			marginTop: "3%",
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

		// Modal styles
		centeredView: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: colors.neutral,
		},
		modalView: {
			margin: 20,
			backgroundColor: colors.background,
			borderRadius: 20,
			padding: 35,
			alignItems: "center",
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5,
		},
		button: {
			borderRadius: 20,
			padding: 10,
			elevation: 2,
			width: "50%",
		},
		buttonAceptar: {
			backgroundColor: colors.error,
			marginLeft: "3%",
		},
		buttonCancel: {
			backgroundColor: colors.background,
			borderWidth: 1,
			borderColor: colors.primary,
			marginRight: "3%",
		},
		textModalAceptarButton: {
			color: colors.onError,
			textAlign: "center",
			fontFamily: "Play-Regular",
		},
		textModalCancelButton: {
			color: colors.onBackground,
			textAlign: "center",
			fontFamily: "Play-Regular",
		},
		modalText: {
			marginBottom: 15,
			textAlign: "center",
			color: colors.onBackground,
			fontFamily: "Play-Regular",
		},
	});
