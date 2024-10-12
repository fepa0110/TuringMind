import {
	FlatList,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useTheme } from "?hooks/useTheme";
import { useBiblioteca } from "?hooks/useBiblioteca";

import { Theme } from "#types/Theme";

import { FlashList } from "@shopify/flash-list";

import { Automata } from "#types/Automata";

import { faCheckCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as faCheckCircleRegular } from "@fortawesome/free-regular-svg-icons";

import { faCircle } from "@fortawesome/free-regular-svg-icons";

import { StackScreenProps } from "@react-navigation/stack";
import { BibliotecaNavigationStackParamList } from "../navigation/types/BibliotecaNavigationType";
import { PrimaryIconButton } from "@components/PrimaryIconButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AutomataEntry } from "../data/biblioteca/types/AutomataEntry";
import Toast from "@components/Toast";

type BibliotecaNavigationProps = StackScreenProps<
	BibliotecaNavigationStackParamList,
	"Biblioteca"
>;

export default function Biblioteca({ navigation }: BibliotecaNavigationProps) {
	const { getTheme } = useTheme();
	const colors = getTheme();

	const { automatas, seleccionarAutomata, indiceAutomataActual } =
	useBiblioteca();

	const [showToast, setShowToast] = useState(false);
	const [messageToast, setMessageToast] = useState("Automata seleccionado correctamente");

	function elegirAutomata(indiceAutomata: number) {
		seleccionarAutomata(indiceAutomata);
		ejecutarToast();
	}

	function ejecutarToast() {
		setShowToast(true);
		setTimeout(() => {
			setShowToast(false);
		}, 5000);
	}

	const AutomataItem = ({
		item,
		indiceAutomata,
	}: {
		item: AutomataEntry;
		indiceAutomata: number;
	}) => {
		return (
			<Pressable
				style={styles().automataItemContainer}
				onPress={() => {
					navigation.navigate("VerAutomata", {
						indiceAutomata: indiceAutomata,
					});
				}}>
				<View style={styles().labelsContainer}>
					<Text style={styles().itemPrimaryLabel}>{item.nombre}</Text>
				</View>
				{indiceAutomata === indiceAutomataActual ? (
					<FontAwesomeIcon
						style={{ marginHorizontal: "3%" }}
						icon={faCheckCircle}
						color={colors.active}
						size={22}
					/>
				) : (
					<TouchableOpacity
						style={{ marginHorizontal: "3%" }}
						onPress={() => elegirAutomata(indiceAutomata)}>
						<FontAwesomeIcon
							icon={faCircle}
							color={colors.outline}
							size={22}
						/>
					</TouchableOpacity>
				)}
			</Pressable>
		);
	};

	return (
		<View style={styles().mainContainer}>
			<FlatList
				data={automatas}
				renderItem={({ item, index }) => {
					return <AutomataItem item={item} indiceAutomata={index} />;
				}}
				ListEmptyComponent={
					<Text
						style={{
							fontSize: 22,
							fontFamily: "Play-Regular",
							color: colors.terciary,
							alignSelf: "center",
							marginTop: "3%"
						}}>
						No hay autómatas guardados
					</Text>
				}
			/>
			<View
				style={{
					position: "absolute",
					right: 0,
					bottom: 0,
					marginRight: "2%",
					marginBottom: "2%",
				}}>
				<PrimaryIconButton
					icon={faPlus}
					size={50}
					onPress={() => {
						navigation.navigate("DatosIniciales");
					}}
				/>
			</View>

			{showToast ? <Toast message={messageToast} type="info" /> : null}

		</View>
	);
}

const styles = (colors = useTheme().getTheme()) =>
	StyleSheet.create({
		automataItemContainer: {
			flex: 1,
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			height: 60,
			width: "100%",
			backgroundColor: colors.background,
			borderBottomWidth: 1,
			borderBottomColor: colors.outline,
		},
		labelsContainer: {
			flexDirection: "column",
			paddingLeft: "3%",
			fontFamily: "Play-Regular",
		},
		itemPrimaryLabel: {
			color: colors.onBackground,
			fontSize: 22,
			fontFamily: "Play-Regular",
		},
		itemSecondaryLabel: {
			color: colors.terciary,
			fontSize: 16,
			fontFamily: "Play-Regular",
		},
		mainContainer: {
			backgroundColor: colors.background,
			width: "100%",
			height: "100%",
		},
	});
