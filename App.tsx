import React, { useState, useRef, useEffect, useCallback } from "react";
import { useFonts, Play_400Regular } from "@expo-google-fonts/play";

import { ThemeProvider } from "./context/theme";

import Home from "./screens/Home";
import Biblioteca from "./screens/Biblioteca";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Header } from "./components/Header";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTheme } from "./hooks/useTheme";
import { View, Text } from "react-native";
import SwitchThemeButton from "./components/SwitchThemeButton";
import { SafeAreaView } from "react-native-safe-area-context";

import * as SplashScreen from "expo-splash-screen";

const DrawerNavigatorApp = createDrawerNavigator();

// SplashScreen.preventAutoHideAsync();

export default function App() {
	let [fontsLoaded, fontError] = useFonts({
		Play_400Regular,
	});

	/* const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}
 */
	const { getTheme } = useTheme();
	const colors = getTheme();

	const headerOptions = {
		headerStyle: {
			backgroundColor: colors.primary,
		},
		headerTintColor: colors.onPrimary,
		headerTitleStyle: {
			// fontFamily: "Play_400Regular",
		},
		headerTitleAllowFontScaling: true,
	};

	const drawerStyle = {
		drawerContentStyle: {
			backgroundColor: colors.background,
			// fontFamily: "Play_400Regular",
		},
		drawerActiveBackgroundColor: colors.primary,
		drawerActiveTintColor: colors.onPrimary,
		drawerLabelStyle: {
			// fontFamily: "Play_400Regular",
			fontSize: 16,
		},
	};

	const globalNavigatorOptions = {
		...headerOptions,
		...drawerStyle,
		gestureHandlerProps: {
			enabled: false,
		},
	};

	const globalScreenOptions = {
		headerShown: false,
	};

	function DrawerHeader() {
		return (
			<>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}>
					<Text>Matur</Text>
				</View>
			</>
		);
	}

	return (
		// <SafeAreaView
		// 	onLayout={onLayoutRootView}
		// 	style={{ height: "100%", width: "100%" }}>
		<ThemeProvider>
			<NavigationContainer>
				<DrawerNavigatorApp.Navigator
					screenOptions={{
						...globalNavigatorOptions,
						headerRight: SwitchThemeButton,
						headerRightContainerStyle: {paddingRight: "3%"}
					}}>
					<DrawerNavigatorApp.Screen name="Home" component={Home} />
					<DrawerNavigatorApp.Screen
						name="Biblioteca"
						component={Biblioteca}
					/>
				</DrawerNavigatorApp.Navigator>
			</NavigationContainer>
		</ThemeProvider>
		// </SafeAreaView>
	);
}
