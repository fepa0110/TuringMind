import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";

import { useTheme } from "../hooks/useTheme";
import { Theme } from "../types/Theme";

import { FlashList } from "@shopify/flash-list";

import { Automata } from "../types/Automata";

import AutomataJson from "../automata.json";
import { StackScreenProps } from "@react-navigation/stack";
import { BibliotecaNavigationStackParamList } from "../navigation/types/BibliotecaNavigationType";

type BibliotecaNavigationProps = StackScreenProps<BibliotecaNavigationStackParamList, 'Biblioteca'>;

export default function Biblioteca({ navigation } : BibliotecaNavigationProps) {

	const { getTheme } = useTheme();
	const colors = getTheme();

	const automatas: Automata[] = [AutomataJson];

	const AutomataItem = ({ item }: { item: Automata }) => {
		return (
			<TouchableOpacity
				style={styles().automataItemContainer}
				onPress={() => {
					navigation.navigate('VerAutomata', { automata: item})
				}}>
				<Text style={styles().itemPrimaryLabel}>{item.nombre}</Text>
				<Text style={styles().itemSecondaryLabel}>
					{item.estados.length + " estados"}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles().mainContainer}>
			<FlashList
				renderItem={({ item }) => {
					return <AutomataItem item={item} />;
				}}
				estimatedItemSize={5}
				data={automatas}
			/>
		</View>
	);
}

const styles = (colors = useTheme().getTheme()) =>
	StyleSheet.create({
		automataItemContainer: {
			flex: 1,
			flexDirection: "column",
			alignItems: "flex-start",
			justifyContent: "center",
			height: 60,
			width: "100%",
			backgroundColor: colors.background,
			borderBottomWidth: 1,
			borderBottomColor: colors.outline,
		},
		itemPrimaryLabel: {
			color: colors.onBackground,
			paddingHorizontal: "3%",
			fontSize: 22,
		},
		itemSecondaryLabel: {
			color: colors.terciary,
			paddingHorizontal: "3%",
			fontSize: 16,
		},
		mainContainer: {
			backgroundColor: colors.background,
			width: "100%",
			height: "100%",
		},
	});
