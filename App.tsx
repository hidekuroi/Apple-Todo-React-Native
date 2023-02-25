import { NavigationContainer } from "@react-navigation/native"
import { Platform, useColorScheme } from "react-native"
import { Provider } from "react-redux"
import { store } from "./src/app/store"
import {
  ReactNavigationDarkTheme,
  ReactNavigationDefaultTheme,
  ReactNavigationDraculaTheme,
} from "./src/themes/ReactNavigationThemes"
import { ThemeProvider } from "./src/themes/ThemeProvider"
import RootNavigator from "./src/navigation/RootNavigator"
import { LocaleProvider } from "./src/localization/LocaleProvider"

export default function App() {
  let scheme = useColorScheme()

  //
  Platform.OS === "web" ? (scheme = "light") : (scheme = scheme)
  //

  return (
    <Provider store={store}>
      <LocaleProvider>
      <ThemeProvider>
        <NavigationContainer
          theme={
            scheme === "dark"
              ? ReactNavigationDarkTheme
              : ReactNavigationDefaultTheme
          }
        >
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
      </LocaleProvider>
    </Provider>
  )
}
