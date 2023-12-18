import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface SelectProps {
	data: any[];
	onSelect: (selectedItem: any, index: number) => void;
	defaultButtonText: string;
	buttonTextAfterSelection: (item: any, index: number) => string;
	rowTextForSelection: (item: any, index: number) => string;
	backgroundColor: string;
	borderColor: string;
    textColor: string;
}

export function Select({
	data,
	onSelect,
	defaultButtonText,
	buttonTextAfterSelection,
	rowTextForSelection,
	backgroundColor,
	borderColor,
    textColor
}: SelectProps) {

    const selectStyles = styles(backgroundColor, borderColor, textColor)

	return (
		<SelectDropdown
			data={data}
			onSelect={onSelect}
			buttonTextAfterSelection={buttonTextAfterSelection}
			rowTextForSelection={rowTextForSelection}
			defaultButtonText={defaultButtonText}
			buttonStyle={selectStyles.buttonStyle}
			buttonTextStyle={selectStyles.buttonTextStyle}
			renderDropdownIcon={(isOpened) => {
				return (
					<FontAwesomeIcon color={textColor} icon={isOpened ? faChevronUp : faChevronDown} />
				);
			}}
			dropdownIconPosition={"right"}
			dropdownStyle={selectStyles.dropdownStyle}
			rowStyle={selectStyles.rowStyle}
			rowTextStyle={selectStyles.rowTextStyle}
		/>
	);
}

const styles = (backgroundColor: string, borderColor: string, textColor: string) =>
	StyleSheet.create({
		buttonStyle: {
			width: "80%",
			height: 50,
			backgroundColor: backgroundColor,
			borderRadius: 8,
			borderWidth: 1,
			borderColor: borderColor,
		},
		buttonTextStyle: { color: textColor, textAlign: "left" },
		dropdownStyle: { backgroundColor: backgroundColor },
		rowStyle: {
			backgroundColor: backgroundColor,
			borderColor: borderColor,
		},
		rowTextStyle: { color: textColor, textAlign: "left" },
	});
