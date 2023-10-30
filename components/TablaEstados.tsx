import React from "react";
import { Text, View } from "react-native";

import AutomataJson from "../automata.json";
import { Automata } from "../types/Automata";
import { useTheme } from "../hooks/useTheme";

export function TablaEstados() {
    const { getTheme } = useTheme()
    const colors = getTheme()

	const automata: Automata = AutomataJson;

	const caracteres: String[] = automata.estados[0].transiciones.map(
		(transicion) => transicion.caracter
	);

	return (
		<View
			style={{
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "90%",
				gap: 5,
				paddingVertical: 6,
                marginHorizontal: 6,
			}}>
			<View style={{ flexDirection: "row", gap: 5, marginLeft:14 }}>
                    {caracteres.map((caracter, indexCaracter) => {
                        return (
                            <View
                                key={
                                    "caracter" + indexCaracter
                                }
                                style={{
                                    width: 50,
                                    height: 22,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                <Text style={{ fontSize: 16, color: colors.onBackground }}>
                                    {caracter}
                                </Text>
                            </View>
                        );
                    })}
                </View>

			{automata.estados.map((estado, indexEstado) => {
				return (
					<View
						key={"estado" + estado.nombre}
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 5,
						}}>
						<Text style={{ fontSize: 18, color: colors.onBackground }}>{estado.nombre}</Text>

						<View style={{ flexDirection: "row", gap: 5 }}>
							{estado.transiciones.map((transicion, indexTransicion) => {
								return (
									<View
										key={
											"transicion" + estado.nombre + indexTransicion
										}
										style={{
											borderWidth: 1,
                                            borderColor: colors.secondary,
											width: 50,
											height: 32,
                                            padding: 4,
											justifyContent: "center",
											alignItems: "center",
										}}>
										<Text style={{ fontSize: 16, color: colors.onBackground }}>
											{transicion.operacion}/{transicion.nuevoEstado}
										</Text>
									</View>
								);
							})}
						</View>
					</View>
				);
			})}
		</View>
	);
}
