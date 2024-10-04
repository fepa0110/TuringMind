import React from "react";

import { CopilotProvider, useCopilot } from "react-native-copilot"
import { StepNumberComponent } from "./StepNumberComponent"
import { useTheme } from "../../hooks/useTheme";

export const WithCopilot = ({
	children
  }: {
	children: React.ReactNode
  }) => {
    const { getTheme } = useTheme();
	
    return (
        <CopilotProvider
			stopOnOutsideClick={true}
			stepNumberComponent={StepNumberComponent}
			tooltipStyle={{ backgroundColor: getTheme().background }}
			labels={{
				previous: "Atras",
				next: "Siguiente",
				skip: "Saltar",
				finish: "Finalizar",
			}}>
			{children}
		</CopilotProvider>
    )
}