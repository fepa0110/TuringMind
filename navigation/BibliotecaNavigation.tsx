import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Biblioteca from "../screens/Biblioteca";
import VerAutomata from "../screens/VerAutomata";
import { BibliotecaNavigationStackParamList } from "./types/BibliotecaNavigationType";
import { ThemeProvider } from "../context/theme";
import { CrearAutomataNavigation } from "./CrearAutomataNavigation";
import { DefinirDatos } from "../screens/crear_automata/DefinirDatos";
import DefinirTransiciones from "../screens/crear_automata/DefinirTransiciones";

const BibliotecaStack =
	createStackNavigator<BibliotecaNavigationStackParamList>();

export function BibliotecaNavigation() {
	return (
		<BibliotecaStack.Navigator screenOptions={{ headerShown: false }}>
			<BibliotecaStack.Screen
				name="Biblioteca"
				component={Biblioteca}
				options={{ title: "Biblioteca" }}
			/>
			<BibliotecaStack.Screen
				name="VerAutomata"
				component={VerAutomata}
				options={{ title: "Ver automata" }}
			/>
			<BibliotecaStack.Screen
				name="DatosIniciales"
				component={DefinirDatos}
				options={{ title: "Datos iniciales" }}
			/>
			<BibliotecaStack.Screen
				name="DefinirTransiciones"
				component={DefinirTransiciones}
				options={{ title: "Definir transiciones" }}
			/>
		</BibliotecaStack.Navigator>
	);
}
