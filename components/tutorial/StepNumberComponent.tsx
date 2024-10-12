import React from "react";
import { Text, View, StyleSheet, } from "react-native";

import { useCopilot } from "react-native-copilot";

import { useTheme } from "?hooks/useTheme";
import { Theme } from "#types/Theme";

export const StepNumberComponent = () => {
    const {
      currentStep,
    } = useCopilot();
  
    const { getTheme } = useTheme();
    const styles = StepNumberComponentStyles(getTheme())

  
    return (
      <View style={styles.container}>
        <Text style={styles.stepNumber}>
            {currentStep?.order}
        </Text>
      </View>
    )
  };

  const StepNumberComponentStyles = (colors: Theme) =>
	StyleSheet.create({
		container: {
            width: 25,
            height: 25,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.primary
        },
        stepNumber: {
            color: colors.onPrimary,
            fontWeight: "bold",
            fontFamily: "Play-Regular",
        }
	});