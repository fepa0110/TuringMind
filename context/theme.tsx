import React, { useState, createContext } from "react";

import { LightColors, DarkColors } from "../constants/Colors";
import { Theme } from "#types/Theme";
import { Appearance } from "react-native";

interface ThemeType {
	darkTheme: boolean;
	toggleTheme: () => void;
	getTheme: () => Theme;
}

export const ThemeContext = createContext<ThemeType>({
	darkTheme: false,
	toggleTheme: () => {},
	getTheme: () => LightColors
});

type ThemeProps = {
	children?: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProps){
	const [ darkTheme, setDarkTheme ] = useState(Appearance.getColorScheme() === 'dark');

	const toggleTheme = () => {
		setDarkTheme(!darkTheme)
	}

	const getTheme = () => {
		return darkTheme ? DarkColors : LightColors
	}

	return(
		<ThemeContext.Provider 
			value={{
				darkTheme,
				toggleTheme,
				getTheme
				}}
			>
					{children}
		</ThemeContext.Provider>
		
	)

}