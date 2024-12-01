import AsyncStorage from "@react-native-async-storage/async-storage";
import { Automata } from "#types/Automata";
import { AutomataEntry } from "./types/AutomataEntry";
import { AutomataData } from "./types/AutomataData";

import sumaBinariaAutomata from "./suma-binaria-automata.json";
import { useBiblioteca } from "?hooks/useBiblioteca";

/* Agregar automata
    1 - Obtener lista de automatas
    2 - Obtener ultimo indice vacio
    3 - Crear el automata con el formato [indice: Automata]
    4 - Crear la entrada en automatas con la forma [nombreAutomata: indice]
*/
export async function createStorage() {
	try {
		const automatasGuardadosJson = await AsyncStorage.getItem("automatas");

		if (automatasGuardadosJson == null) {
			const sumaBinariaEntry: AutomataEntry = {
				indice: 0,
				borrador: false,
				nombre: "Incremento binario",
			};
			await AsyncStorage.setItem(
				"automatas",
				JSON.stringify([sumaBinariaEntry])
			);

			addAutomata(sumaBinariaAutomata, 0);
		}
	} catch (e) {}
}

export async function addAutomata(automata: Automata, posicion: number) {
	try {
		const automataJson = JSON.stringify(automata);
		return await AsyncStorage.setItem(posicion.toString(), automataJson).then(
			(automataCreado) => {
				return automataCreado;
			}
		);
	} catch (e) {}
}

export async function getAutomatas() {
	try {
		const automatasJson = await AsyncStorage.getItem("automatas");
		let automatasEntries: AutomataEntry[] = [];

		if (automatasJson != null) automatasEntries = JSON.parse(automatasJson);

		return automatasEntries;
	} catch (e) {}
}

export async function mergeAutomatas(automatasEntries: AutomataEntry[]) {
	try {
		await AsyncStorage.setItem("automatas", JSON.stringify(automatasEntries));
	} catch (e) {}
}

export async function editAutomata(indiceAutomata: number, automata: Automata) {
	try {
		const automataJson = JSON.stringify(automata);

		return await AsyncStorage.setItem(
			indiceAutomata.toString(),
			automataJson
		).then((automataEditado) => {
			return automataEditado;
		});
	} catch (e) {}
}

export async function removeAutomata(indiceAutomata: number) {
	try {
		await AsyncStorage.removeItem(indiceAutomata.toString());
	} catch (e) {}
}

export async function deleteStorage() {
	try {
		await AsyncStorage.removeItem("automatas");
	} catch (e) {}
}

export async function removeAutomataEntry(
	automatasEntries: AutomataEntry[],
	indiceAutomata: number
) {
	automatasEntries = automatasEntries.filter(
		(automataEntry) => automataEntry.indice !== indiceAutomata
	);

	try {
		await AsyncStorage.setItem("automatas", JSON.stringify(automatasEntries));
	} catch (e) {}
}

export async function getAutomata(claveAutomata: number) {
	try {
		const automatasJson = await AsyncStorage.getItem(
			claveAutomata.toString()
		);

		if (automatasJson != null) return JSON.parse(automatasJson);
	} catch (e) {}
}
