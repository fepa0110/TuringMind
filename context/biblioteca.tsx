import React, { useState, createContext, useEffect } from "react";

import { LightColors, DarkColors } from "../constants/Colors";
import { Automata } from "../types/Automata";

import * as AutomatasStorage from "../data/biblioteca/storage";
import { AutomataEntry } from "../data/biblioteca/types/AutomataEntry";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface BibliotecaType {
	automatas: AutomataEntry[] | undefined;
	automataActual: Automata | undefined;
	caracterVacio: string;
	indiceAutomataActual: number;
	addAutomata: (automata: Automata) => void;
	seleccionarAutomata: (indiceAutomata: number) => void;
	seleccionarCaracterVacio: (caracterVacio: string) => void;
}

export const BibliotecaContext = createContext<BibliotecaType>({
	automatas: [],
	automataActual: undefined,
	caracterVacio: "▲",
	indiceAutomataActual: 0,
	addAutomata: (automata: Automata) => {},
	seleccionarAutomata: (indiceAutomata: number) => {},
	seleccionarCaracterVacio: (caracterVacio: string) => {},
});

type BibliotecaProps = {
	children?: React.ReactNode;
};

export function BibliotecaProvider({ children }: BibliotecaProps) {
	const [automatas, setAutomatas] = useState<AutomataEntry[]|undefined>([]);

	const [automataActual, setAutomataActual] = useState<Automata|undefined>();
	const [indiceAutomataActual, setIndiceAutomataActual] = useState(0);

	const [caracterVacio, setCaracterVacio] = useState<string>("▲");

	const addAutomata = (automata: Automata) => {
		AutomatasStorage.addAutomata(automata, automatas != undefined ? automatas.length : 0);
	};

	const seleccionarAutomata = async (indiceAutomata: number) => {
		let automataObtenido = await AutomatasStorage.getAutomata(indiceAutomata);
		setAutomataActual(automataObtenido);
		setIndiceAutomataActual(indiceAutomata);
	};

	const seleccionarCaracterVacio = (caracterVacio: string) => {
		setCaracterVacio(caracterVacio);
	};

	useEffect(() => {
		getAutomatasFromStorage();
	}, []);

	async function getAutomatasStorage() {
		try {
		  const automatasJson = await AsyncStorage.getItem('automatas');
		  let automatasEntries : AutomataEntry[] = []
	
		  if(automatasJson != null)
			automatasEntries = JSON.parse(automatasJson)
			
			console.log("Automatas obtenidos");
			
		  return automatasEntries
		} catch (e) {
		  console.log("Ocurrio un error al obtener los automatas.");
		}
	};

	async function getAutomatasFromStorage() {
		let automatasEntries = await getAutomatasStorage().then((automatasLeidos) => {
			return automatasLeidos;
		});

		await setAutomatas(automatasEntries)
	}

	return (
		<BibliotecaContext.Provider
			value={{
				automatas,
				automataActual,
				caracterVacio,
				indiceAutomataActual,
				addAutomata,
				seleccionarAutomata,
				seleccionarCaracterVacio,
			}}>
			{children}
		</BibliotecaContext.Provider>
	);
}
