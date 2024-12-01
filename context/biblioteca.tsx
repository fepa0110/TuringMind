import React, { useState, createContext, useEffect } from "react";

import { LightColors, DarkColors } from "../constants/Colors";
import { Automata } from "#types/Automata";

import * as AutomatasStorage from "../data/biblioteca/storage";
import { AutomataEntry } from "../data/biblioteca/types/AutomataEntry";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface BibliotecaType {
	automatas: AutomataEntry[] | undefined;
	automataActual: Automata | undefined;
	caracterVacio: string;
	indiceAutomataActual: number;
	addAutomata: (automata: Automata) => void;
	editarAutomata: (indiceAutomata: number, automata: Automata) => void;
	seleccionarAutomata: (indiceAutomata: number) => void;
	seleccionarCaracterVacio: (caracterVacio: string) => void;
	eliminarAutomata: (indiceAutomata: number) => void;
}

export const BibliotecaContext = createContext<BibliotecaType>({
	automatas: [],
	automataActual: undefined,
	caracterVacio: "▲",
	indiceAutomataActual: 0,
	addAutomata: (automata: Automata) => {},
	editarAutomata: (indiceAutomata: number, automata: Automata) => {},
	seleccionarAutomata: (indiceAutomata: number) => {},
	seleccionarCaracterVacio: (caracterVacio: string) => {},
	eliminarAutomata: (indiceAutomata: number) => {},
});

type BibliotecaProps = {
	children?: React.ReactNode;
};

export function BibliotecaProvider({ children }: BibliotecaProps) {
	const [automatas, setAutomatas] = useState<AutomataEntry[]>([]);

	const [automataActual, setAutomataActual] = useState<Automata | undefined>();
	const [indiceAutomataActual, setIndiceAutomataActual] = useState(-1);

	const [caracterVacio, setCaracterVacio] = useState<string>("▲");

	useEffect(() => {
		getAutomatasFromStorage()
	}, []);

	const addAutomata = (automata: Automata) => {
		const indiceNuevoAutomata = automatas?.length || 0;
		const isBorrador = automata.borrador || false

		// Crear automata
		AutomatasStorage.addAutomata(automata, indiceNuevoAutomata);

		// Crear entrada de automata
		AutomatasStorage.mergeAutomatas([
			...(automatas || []),
			{ indice: indiceNuevoAutomata, nombre: automata.nombre, borrador: isBorrador},
		]);

		getAutomatasFromStorage();
	};

	const editarAutomata = (indiceAutomata: number, automata: Automata) => {
		AutomatasStorage.editAutomata(indiceAutomata, automata);

		// Editar nombre de la lista de automatas
		automatas.forEach((automataEntry) => { if(automataEntry.indice == indiceAutomata) automataEntry.nombre = automata.nombre})
		AutomatasStorage.mergeAutomatas(automatas)

		if(indiceAutomata == indiceAutomataActual) seleccionarAutomata(indiceAutomata)
		getAutomatasFromStorage();
	};

	const seleccionarAutomata = async (indiceAutomata: number) => {		
		if (automatas !== undefined && automatas.length >= indiceAutomata) {
			let automataObtenido = await AutomatasStorage.getAutomata(
				automatas[indiceAutomata].indice
			);
			setAutomataActual(automataObtenido);
			setIndiceAutomataActual(indiceAutomata);
		} else setAutomataActual(undefined);

		await getAutomatasFromStorage();
	};

	const seleccionarCaracterVacio = (caracterVacio: string) => {
		setCaracterVacio(caracterVacio);
	};

	async function getAutomatasStorage() {
		try {
			const automatasJson = await AsyncStorage.getItem("automatas");
			let automatasEntries: AutomataEntry[] = [];

			if (automatasJson != null) {
				automatasEntries = JSON.parse(automatasJson);
				return automatasEntries;
			}


			return [];
		} catch (e) {
			return [];
		}
	}

	async function getAutomatasFromStorage() {
		let automatasEntries = await getAutomatasStorage().then(
			(automatasLeidos) => {
				return automatasLeidos;
			}
		);

		await setAutomatas(automatasEntries);
		return automatasEntries;
	}

	async function eliminarAutomata(indiceAutomata: number) {
		if (indiceAutomata === indiceAutomataActual) setAutomataActual(undefined);

		await AutomatasStorage.removeAutomata(indiceAutomata);
		await AutomatasStorage.removeAutomataEntry(
			automatas || [],
			indiceAutomata
		);

		getAutomatasFromStorage();
	}

	return (
		<BibliotecaContext.Provider
			value={{
				automatas,
				automataActual,
				caracterVacio,
				indiceAutomataActual,
				addAutomata,
				editarAutomata,
				seleccionarAutomata,
				seleccionarCaracterVacio,
				eliminarAutomata,
			}}>
			{children}
		</BibliotecaContext.Provider>
	);
}
