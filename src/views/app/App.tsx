import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import "./styles.scss";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./MaterialTheme";
import { Auth0Provider } from "@auth0/auth0-react";
import { env } from "@/environments/environments";
import { Provider } from "react-redux";
import { store } from "@/store/rootStore";

function App() {
	return (
		<Provider store={store}>
			<Auth0Provider
				useRefreshTokens
				cacheLocation="localstorage"
				domain={env.domain}
				clientId={env.clientId}
				authorizationParams={{
					redirect_uri: "http://localhost:5173/",
				}}
			>
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<Router />
					</BrowserRouter>
				</ThemeProvider>
			</Auth0Provider>
		</Provider>
	);
}

export default App;
