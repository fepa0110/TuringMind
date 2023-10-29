import React, { useState, useRef, useEffect } from "react";

import { ThemeContext, ThemeProvider } from "./context/theme";
import Home from "./Home";

export default function App() {

	return (
		<ThemeProvider>
			<Home />
		</ThemeProvider>
	);
}
