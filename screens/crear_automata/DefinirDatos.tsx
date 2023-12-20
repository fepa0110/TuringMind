import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { PrimaryIconButton } from "../../components/PrimaryIconButton";
import {
	faAdd,
	faChevronRight,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FlashList } from "@shopify/flash-list";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { CrearAutomataNavigationStackParamList } from "../../navigation/types/CrearAutomataNavigationType";
import { Automata } from "../../types/Automata";
import { Transicion } from "../../types/Transicion";
import { Estado } from "../../types/Estado";
import { useBiblioteca } from "../../hooks/useBiblioteca";
import { BibliotecaNavigationStackParamList } from "../../navigation/types/BibliotecaNavigationType";

type BibliotecaNavigationProps = StackScreenProps<
	BibliotecaNavigationStackParamList,
	"DatosIniciales"
>;

export function DefinirDatos({ navigation }: BibliotecaNavigationProps) {
	const { caracterVacio } = useBiblioteca();

	const { getTheme } = useTheme();
	const colors = getTheme();

	const [caracteres, setCaracteres] = useState<string[]>([caracterVacio]);

	const [nombreAutomata, onChangeNombreAutomata] = React.useState<string>("");

	const [cantidadEstados, onChangeCantidadEstados] =
		React.useState<string>("");

	const [caracterIngresado, onChangeCaracterIngresado] =
		React.useState<string>("");

	const [mensajeError, setMensajeError] = useState("Esto es un errro");
	const [mostrarError, setMostrarError] = useState(false);

	const [loading, setLoading] = useState(false);

	function quitarCaracter(indiceSeleccionado: number) {
		setCaracteres((prevLista) => {
			return prevLista.filter(
				(caracter, indiceCaracter) => indiceCaracter !== indiceSeleccionado
			);
		});
	}

	const CaracterItem = ({
		item,
		indiceCaracter,
	}: {
		item: string;
		indiceCaracter: number;
	}) => {
		return (
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-around",
					alignItems: "center",
					width: 60,
					height: 32,
					backgroundColor: colors.secondary,
					borderWidth: 1,
					borderColor: colors.secondary,
					borderRadius: 10,
					marginHorizontal: 6,
				}}>
				<Text style={styles().caracterItemLabel}>{item}</Text>
				<TouchableOpacity onPress={() => quitarCaracter(indiceCaracter)}>
					<FontAwesomeIcon
						style={{ width: "100%", color: getTheme().onSecondary }}
						icon={faTimes}
						size={18}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	function ingresarCaracter() {
		if (
			caracteres.indexOf(caracterIngresado) < 0 &&
			caracterIngresado.length != 0
		) {
			setCaracteres((prevState) => [...prevState, caracterIngresado]);
			onChangeCaracterIngresado("");
		}
	}

	function NavegarNuevasTransiciones() {
		const transiciones: Transicion[] = caracteres.map((caracter) => {
			return { caracter: caracter };
		});

		let nuevosEstados: Estado[] = [];
		for (
			let indexEstado = 0;
			indexEstado < Number(cantidadEstados);
			indexEstado++
		) {
			nuevosEstados.push({
				nombre: indexEstado + 1,
				transiciones: transiciones,
			});
		}

		const nuevoAutomata: Automata = {
			nombre:
				nombreAutomata.length !== 0 ? nombreAutomata : "Nuevo Automata",
			estados: nuevosEstados,
		};

		setLoading(false);
		navigation.navigate("DefinirTransiciones", { automata: nuevoAutomata });
	}

	return (
		<View style={styles().mainContainer}>
			<View style={styles().inputsContainer}>
				<View>
					<Text style={styles().title}>Datos iniciales</Text>
				</View>
				<TextInput
					style={styles().input}
					onChangeText={onChangeNombreAutomata}
					value={nombreAutomata}
					placeholder="Nombre de automata"
					placeholderTextColor={colors.onBackground}
					cursorColor={colors.primary}
					underlineColorAndroid={colors.onBackground}
					autoComplete="off"
					maxLength={15}
					autoCapitalize="sentences"
					keyboardType="default"
				/>
				<TextInput
					style={styles().input}
					onChangeText={onChangeCantidadEstados}
					value={cantidadEstados}
					placeholder="Cantidad de estados"
					placeholderTextColor={colors.onBackground}
					cursorColor={colors.primary}
					underlineColorAndroid={colors.onBackground}
					autoComplete="off"
					maxLength={2}
					autoCapitalize="none"
					keyboardType="number-pad"
				/>
			</View>
			<View style={styles().agregarCaracteresContainer}>
				<Text style={{ color: colors.onBackground, marginBottom: "1%", fontFamily: "Play-Regular" }}>
					Caracteres
				</Text>
				<FlashList
					renderItem={({ item, index }) => {
						return <CaracterItem item={item} indiceCaracter={index} />;
					}}
					centerContent={true}
					horizontal={true}
					estimatedItemSize={2}
					data={caracteres}
				/>
				<View style={styles().nuevoCaracterContainer}>
					<TextInput
						style={styles().input}
						onChangeText={onChangeCaracterIngresado}
						value={caracterIngresado}
						defaultValue=""
						placeholder="Agregar caracter"
						placeholderTextColor={colors.onBackground}
						cursorColor={colors.primary}
						underlineColorAndroid={colors.onBackground}
						autoComplete="off"
						maxLength={1}
						autoCapitalize="none"
					/>

					<PrimaryIconButton onPress={ingresarCaracter} icon={faAdd} />
				</View>
			</View>
			<View style={styles().siguienteContainer}>
				<PrimaryIconButton
					icon={faChevronRight}
					size={50}
					onPress={NavegarNuevasTransiciones}
					loading={loading}
				/>
				{mostrarError && (
					<View style={styles().labelErrorContainer}>
						<Text style={styles().labelError}>{mensajeError}</Text>
					</View>
				)}
			</View>
		</View>
	);
}

const styles = (colors = useTheme().getTheme()) =>
	StyleSheet.create({
		agregarCaracteresContainer: {
			width: "90%",
			alignContent: "center",
		},
		caracterItemLabel: {
			height: "100%",
			color: colors.onSecondary,
			fontSize: 18,
			fontFamily: "Play-Regular",
		},
		caracteresListContainer: {
			width: "100%",
			height: "100%",
		},
		input: {
			height: 40,
			width: 200,
			padding: 10,
			color: colors.onBackground,
			backgroundColor: colors.background,
			fontFamily: "Play-Regular",
		},
		inputsContainer: {
			flexDirection: "column",
			gap: 6,
			marginBottom: 12,
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
		mainContainer: {
			flexDirection: "column",
			justifyContent: "space-around",
			alignItems: "center",
			backgroundColor: colors.background,
			width: "100%",
			height: "100%",
		},
		nuevoCaracterContainer: {
			flexDirection: "row",
			width: "100%",
			height: "auto",
			justifyContent: "center",
			alignItems: "center",
			gap: 6,
			marginTop: "6%",
		},
		siguienteContainer: {
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			width: "100%",
			gap: 32,
			marginBottom: 6,
		},
		title: {
			width: "100%",
			marginVertical: "1%",
			color: colors.onBackground,
			fontFamily: "Play-Regular",
			fontSize: 20,
			textAlign: "center",
		},
	});
