import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import "./styles.scss";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./MaterialTheme";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
