import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ThemeProvider } from "../context/theme";
import { DefinirDatos } from "../screens/crear_automata/DefinirDatos";
import { CrearAutomataNavigationStackParamList } from "./types/CrearAutomataNavigationType";
import DefinirTransiciones from "../screens/crear_automata/DefinirTransiciones";

const CrearAutomataStack =
	createStackNavigator<CrearAutomataNavigationStackParamList>();

export function CrearAutomataNavigation() {
	return (
		<CrearAutomataStack.Navigator screenOptions={{ headerShown: false }}>
			<CrearAutomataStack.Screen
				name="DatosIniciales"
				component={DefinirDatos}
				options={{ title: "Datos iniciales" }}
			/>
			<CrearAutomataStack.Screen
				name="DefinirTransiciones"
				component={DefinirTransiciones}
				options={{ title: "Definir transiciones" }}
			/>
		</CrearAutomataStack.Navigator>
	);
}
