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

import { useTheme } from "../hooks/useTheme";
import { Theme } from "../types/Theme";

import { FlashList } from "@shopify/flash-list";

import { Automata } from "../types/Automata";

import { faCheckCircle, faPlus } from "@fortawesome/free-solid-svg-icons";

import { faCircle } from "@fortawesome/free-regular-svg-icons";

import AutomataJson from "../automata.json";
import { StackScreenProps } from "@react-navigation/stack";
import { BibliotecaNavigationStackParamList } from "../navigation/types/BibliotecaNavigationType";
import { PrimaryIconButton } from "../components/PrimaryIconButton";
import { useBiblioteca } from "../hooks/useBiblioteca";
import { style } from "d3";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

type BibliotecaNavigationProps = StackScreenProps<
	BibliotecaNavigationStackParamList,
	"Biblioteca"
>;

export default function Biblioteca({ navigation }: BibliotecaNavigationProps) {
	const { getTheme } = useTheme();
	const colors = getTheme();

	const { automatas, seleccionarAutomata, indiceAutomataActual } =
		useBiblioteca();

	function elegirAutomata(indiceAutomata: number) {
		seleccionarAutomata(indiceAutomata);
	}

	const AutomataItem = ({
		item,
		indiceAutomata,
	}: {
		item: Automata;
		indiceAutomata: number;
	}) => {
		return (
			<Pressable
				style={styles().automataItemContainer}
				onPress={() => {
					navigation.navigate("VerAutomata", { automata: item, indiceAutomata: indiceAutomata });
				}}>
				<View style={styles().labelsContainer}>
					<Text style={styles().itemPrimaryLabel}>{item.nombre}</Text>
					<Text style={styles().itemSecondaryLabel}>
						{item.estados.length + " estados"}
					</Text>
				</View>
				{indiceAutomata === indiceAutomataActual ? (
					<FontAwesomeIcon style={{marginHorizontal: "3%"}} icon={faCheckCircle} color={colors.active} size={22}/>
				) : (
					<TouchableOpacity style={{marginHorizontal: "3%"}} onPress={() => elegirAutomata(indiceAutomata)}>
						<FontAwesomeIcon icon={faCircle} color={colors.outline} size={22}/>
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
		},
		itemPrimaryLabel: {
			color: colors.onBackground,
			fontSize: 22,
		},
		itemSecondaryLabel: {
			color: colors.terciary,
			fontSize: 16,
		},
		mainContainer: {
			backgroundColor: colors.background,
			width: "100%",
			height: "100%",
		},
	});
