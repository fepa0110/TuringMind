import React, { useState, useRef, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { ThemeProvider } from "./context/theme";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";

import { useTheme } from "./hooks/useTheme";
import { View, Text } from "react-native";
import SwitchThemeButton from "./components/SwitchThemeButton";

import { BibliotecaNavigation } from "./navigation/BibliotecaNavigation";
import Simulacion from "./screens/Simulacion";
import { Desarrollador } from "./screens/Desarrollador";
import { BibliotecaProvider } from "./context/biblioteca";
import * as AutomatasStorage from "./data/biblioteca/storage";
import { StatusBar } from "expo-status-bar";

const DrawerNavigatorApp = createDrawerNavigator();

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);
	const { getTheme } = useTheme();
	const colors = getTheme();

	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();

				// await AutomatasStorage.deleteStorage()
				// Pre-load fonts, make any API calls you need to do here
				await AutomatasStorage.createStorage()

				Font.loadAsync({
					"Play-Regular": require("./assets/fonts/Play-Regular.ttf"),
					"Play-Bold": require("./assets/fonts/Play-Bold.ttf")
				});

				await new Promise((resolve) => setTimeout(resolve, 1000));
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	const headerOptions = {
		headerStyle: {
			backgroundColor: colors.primary,
		},
		headerTintColor: colors.onPrimary,
		headerTitleStyle: {
			fontFamily: "Play-Regular",
		},
		headerTitleAllowFontScaling: true,
	};

	const drawerStyle = {
		drawerContentStyle: {
			backgroundColor: colors.background,
			fontFamily: "Play-Regular",
		},
		drawerActiveBackgroundColor: colors.primary,
		drawerActiveTintColor: colors.onPrimary,
		drawerLabelStyle: {
			fontFamily: "Play-Regular",
			fontSize: 18,
		},
	};

	const globalNavigatorOptions = {
		...headerOptions,
		...drawerStyle,
		gestureHandlerProps: {
			enabled: false,
		},
	};

	return (
		<View
			style={{ height: "100%", width: "100%" }}
			onLayout={onLayoutRootView}>
			<StatusBar style="auto"/>
			<ThemeProvider>
				<BibliotecaProvider>
					<NavigationContainer>
						<DrawerNavigatorApp.Navigator
							screenOptions={{
								...globalNavigatorOptions,
								drawerType: "slide",
								headerRight: SwitchThemeButton,
								headerRightContainerStyle: { paddingRight: "3%" },
							}}>
							<DrawerNavigatorApp.Screen
								name="Simulación"
								component={Simulacion}
								options={{ title: "Simulación" }}
							/>
							<DrawerNavigatorApp.Screen
								name="BibliotecaNavigation"
								component={BibliotecaNavigation}
								options={{ title: "Biblioteca" }}
							/>
							{/* 						<DrawerNavigatorApp.Screen
							name="Desarrollador"
							component={Desarrollador}
							options={{ title: "Desarrollador" }}
						/> */}
						</DrawerNavigatorApp.Navigator>
					</NavigationContainer>
				</BibliotecaProvider>
			</ThemeProvider>
		</View>
	);
}
