import AsyncStorage from "@react-native-async-storage/async-storage";
import { Automata } from "../../types/Automata";
import { AutomataEntry } from "./types/AutomataEntry";
import { AutomataData } from "./types/AutomataData";

import sumaBinariaAutomata from "./suma-binaria-automata.json";

/* Agregar automata
    1 - Obtener lista de automatas
    2 - Obtener ultimo indice vacio
    3 - Crear el automata con el formato [indice: Automata]
    4 - Crear la entrada en automatas con la forma [nombreAutomata: indice]
*/
export async function createStorage() {
	try {
		const automatasJson = await AsyncStorage.getItem("automatas");
		if (automatasJson == null) {
			const sumaBinariaEntry: AutomataEntry = {
				indice: 0,
				nombre: "Suma binaria",
			};
			await AsyncStorage.setItem(
				"automatas",
				JSON.stringify([sumaBinariaEntry])
			);

			addAutomata(sumaBinariaAutomata, 0);
			console.log("Storage creado");
		} else {
			console.log("Storage no creado");
			console.log(automatasJson);
		}
	} catch (e) {
		console.log("Ocurrio un error al guardar el automata");
	}
}

export async function addAutomata(automata: Automata, posicion: number) {
	try {
		const automataJson = JSON.stringify(automata);
		return await AsyncStorage.setItem(posicion.toString(), automataJson).then(
			(automataCreado) => {
				return automataCreado;
			}
		);
	} catch (e) {
		console.log("Ocurrio un error al guardar el automata");
	}
}

export async function getAutomatas() {
	try {
		const automatasJson = await AsyncStorage.getItem("automatas");
		let automatasEntries: AutomataEntry[] = [];

		if (automatasJson != null) automatasEntries = JSON.parse(automatasJson);

		console.log("Automatas obtenidos");

		return automatasEntries;
	} catch (e) {
		console.log("Ocurrio un error al obtener los automatas.");
	}
}

export async function mergeAutomatas(automatasEntries: AutomataEntry[]) {
	try {
		await AsyncStorage.setItem("automatas", JSON.stringify(automatasEntries));
	} catch (e) {
		console.log("Ocurrio un error al actualizar la lista de automatas");
	}
}

export async function removeAutomata(indiceAutomata: number) {
	try {
		await AsyncStorage.removeItem(indiceAutomata.toString());
	} catch (e) {
		console.log("Error al remover");
	}

	console.log("Automata eliminado.");
}

export async function removeAutomataEntry(
	automatasEntries: AutomataEntry[],
	indiceAutomata: number
) {
	console.log(indiceAutomata);
	
	automatasEntries = automatasEntries.filter(
		(automataEntry) => automataEntry.indice !== indiceAutomata
	);
	console.log("🚀 ~ file: storage.ts:91 ~ automatasEntries:", automatasEntries)

	try {
		await AsyncStorage.setItem("automatas", JSON.stringify(automatasEntries));
	} catch (e) {
		console.log("Error al remover");
	}

	console.log("Automata eliminado.");
}

export async function getAutomata(indice: number) {
	try {
		const automatasJson = await AsyncStorage.getItem(indice.toString());

		if (automatasJson != null) return JSON.parse(automatasJson);

		return null;
	} catch (e) {
		console.log("Ocurrio un error al obtener el automata.");
	}
}
