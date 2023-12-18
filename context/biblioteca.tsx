import React, { useState, createContext } from "react";

import { LightColors, DarkColors } from "../constants/Colors";
import { Automata } from "../types/Automata";

import automataJson from '../data/biblioteca/automata.json'

interface BibliotecaType {
	automatas: Automata[];
    automataActual: Automata;
    caracterVacio: string;
	indiceAutomataActual: number;
	addAutomata: (automata: Automata) => void;
	seleccionarAutomata: (indiceAutomata: number) => void;
	seleccionarCaracterVacio: (caracterVacio: string) => void;
}

export const BibliotecaContext = createContext<BibliotecaType>({
	automatas: [automataJson],
    automataActual: automataJson,
    caracterVacio: "▲",
	indiceAutomataActual: 0,
	addAutomata: (automata: Automata) => {},
	seleccionarAutomata: (indiceAutomata: number) => {},
    seleccionarCaracterVacio: (caracterVacio: string) => {}
});

type BibliotecaProps = {
	children?: React.ReactNode;
};

export function BibliotecaProvider({ children }: BibliotecaProps){
    const [automatas, setAutomatas] = useState<Automata[]>([automataJson, automataJson])

    const [automataActual, setAutomataActual] = useState<Automata>(automatas[0])
	const [indiceAutomataActual, setIndiceAutomataActual] = useState(0)
	
    const [caracterVacio, setCaracterVacio] = useState<string>("▲")

	const addAutomata = (automata: Automata) => {
		setAutomatas((prevAutomatas) => [...prevAutomatas, automata])
	}

	const seleccionarAutomata = (indiceAutomata: number) => {
		setAutomataActual(automatas[indiceAutomata])
		setIndiceAutomataActual(indiceAutomata)
	}

    const seleccionarCaracterVacio = (caracterVacio: string) => {
		setCaracterVacio(caracterVacio)
	}

	return(
		<BibliotecaContext.Provider 
			value={{
					automatas,
					automataActual,
					caracterVacio,
					indiceAutomataActual,
					addAutomata,
					seleccionarAutomata,
					seleccionarCaracterVacio,
				}}
			>
					{children}
		</BibliotecaContext.Provider>
		
	)

}