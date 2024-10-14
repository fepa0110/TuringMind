import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

interface RadioButtonProps {
	options: string[];
	onSelectValue: (selectedValue: string) => void;
	fontSize: number;
	horizontal: boolean;
	activeDecorationColor: string;
	activeTextColor: string;
	inactiveTextColor: string;
}

const RadioButton = ({
	options,
	onSelectValue,
	fontSize,
	horizontal,
	activeDecorationColor,
	activeTextColor,
	inactiveTextColor,
}: RadioButtonProps) => {
	const [indexItemSelected, setIndexItemSelected] = useState(0);

	const stylesRadio = styles(
		fontSize,
		horizontal,
		activeDecorationColor,
		activeTextColor,
		inactiveTextColor
	);

	function selectItem(indexSelected: number) {
		setIndexItemSelected(indexSelected);
		onSelectValue(options[indexSelected]);
	}

	return (
		<View style={stylesRadio.radioGroupContainer}>
			{options.map((item, indexItem) => {
				return (
					<Pressable
						key={item}
						style={stylesRadio.optionContainer}
						onPress={() => {selectItem(indexItem)}}>
						<Text
							style={
								indexItem === indexItemSelected
									? stylesRadio.itemActiveText
									: stylesRadio.itemInactiveText
							}>
							{item}
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
};

export default RadioButton;

const styles = (
	fontSize: number,
	horizontal: boolean,
	activeDecorationColor: string,
	activeTextColor: string,
	inactiveTextColor: string
) =>
	StyleSheet.create({
		itemInactiveText: {
			fontSize: fontSize,
			color: inactiveTextColor,
			fontFamily: "Play-Regular",
		},
		itemActiveText: {
			fontFamily: "Play-Regular",
			fontSize: fontSize,
			borderBottomWidth: 2,
			color: activeTextColor,
			borderBottomColor: activeTextColor,
			paddingBottom: 1,
		},
		optionContainer: {
			padding: 4,
		},
		radioGroupContainer: {
			flexWrap: "wrap",
			flexDirection: horizontal ? "row" : "column",
			gap: 3,
		},
	});
