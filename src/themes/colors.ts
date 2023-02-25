import { PlatformColor } from "react-native"
import {
  ReactNavigationDarkTheme,
  ReactNavigationDefaultTheme,
  ReactNavigationDraculaTheme,
} from "./ReactNavigationThemes"


export const defaultColors = {
  ...ReactNavigationDefaultTheme.colors,
  background: "rgb(242, 242, 246)",
  card: "rgb(255, 255, 255)",
  touching: "rgb(229, 229, 234)",
  divider: "rgb(197, 197, 199)",
  helperText: "rgb(138, 138, 142)",
  helperIcon: "rgb(196, 196, 198)",
  touchingHelperIcon: "rgb(178, 178, 184)",
  disabledText: "rgb(143, 143, 143)",
  input: "rgb(227, 227, 232)",
  inputPlaceholder: "rgb(142, 142, 147)",
  modalBackground: "rgb(242, 242, 246)",
  modalCard: "rgb(255, 255, 255)",
  modalInput: "rgb(244, 244, 245)",
  modalInputActive: "rgb(228, 228, 229)",
  modalTouching: "rgb(209, 209, 213)",
  modalDivider: "rgb(197, 197, 199)",
  modalInputPlaceholder: "rgb(197, 197, 199)",
  contrastText: "rgb(0, 0, 0)",

  // test: PlatformColor("secondaryLabel"),
  test: "black",
}

export const darkColors: ColorsType = {
  ...ReactNavigationDarkTheme.colors,
  background: "rgb(0, 0, 0)",
  card: "rgb(28, 28, 30)",
  touching: "rgb(44, 44, 46)",
  divider: "rgb(61, 61, 65)",
  helperText: "rgb(152, 152, 159)",
  helperIcon: "rgb(90, 90, 94)",
  touchingHelperIcon: "rgb(101, 101, 105)",
  disabledText: "rgb(143, 143, 143)",
  input: "rgb(28, 28, 30)",
  inputPlaceholder: "rgb(142, 142, 147)",
  modalBackground: "rgb(28, 28, 30)",
  modalCard: "rgb(44, 44, 46)",
  modalInput: "rgb(57, 57, 61)",
  modalInputActive: "rgb(71, 71, 75)",
  modalTouching: "rgb(58, 58, 60)",
  modalDivider: "rgb(68, 68, 71)",
  modalInputPlaceholder: "rgb(101, 101, 105)",
  contrastText: "rgb(255, 255, 255)",

  // test: PlatformColor("secondaryLabel"),
  test: "white"
}

export const draculaMintColors: ColorsType = {
  ...ReactNavigationDraculaTheme.colors,
  background: "#292d3e",
  card: "#212432",
  touching: "#353a51",
  divider: "#212432",
  helperText: "#9696ae",
  helperIcon: "#9696ae",
  touchingHelperIcon: "rgb(101, 101, 105)",
  disabledText: "#9696ae",
  input: "#292d3e",
  inputPlaceholder: "#717790",
  modalBackground: "#292d3e",
  modalCard: "#212432",
  modalInput: "#292d3e",
  modalInputActive: "#292d3e",
  modalTouching: "#353a51",
  modalDivider: "#212432",
  modalInputPlaceholder: "#717790",
  contrastText: "rgb(255, 255, 255)",

  test: 'white'
}

export type ColorsType = typeof defaultColors