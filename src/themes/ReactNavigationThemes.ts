import { DarkTheme, DefaultTheme } from "@react-navigation/native"

export const ReactNavigationDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "rgb(242, 242, 246)",
    card: "rgb(255, 255, 255)",
  },
}

export const ReactNavigationDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "rgb(0, 0, 0)",
    card: "rgb(28, 28, 30)",
  },
}

export const ReactNavigationDraculaTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#292d3e",
    primary: "#2fdeb1",
  },
}
