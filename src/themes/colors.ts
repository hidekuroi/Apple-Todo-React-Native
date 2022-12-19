import { ReactNavigationDarkTheme, ReactNavigationDefaultTheme, ReactNavigationDraculaTheme } from "./ReactNavigationThemes"

export const defaultColors = {
    ...ReactNavigationDefaultTheme.colors,
    background: 'rgb(242, 242, 246)',
    card: 'rgb(255, 255, 255)',
    touching: 'rgb(229, 229, 234)',
    divider: 'rgb(229, 229, 234)',
    helperText: 'rgb(138, 138, 142)',
    helperIcon: 'rgb(196, 196, 198)',
    touchingHelperIcon: 'rgb(178, 178, 184)',
    disabledText: 'rgb(143, 143, 143)',
    input: 'rgb(227, 227, 232)',
    inputPlaceholder: 'rgb(142, 142, 147)',
    modalBackground: 'rgb(242, 242, 246)',
    modalCard: 'rgb(255, 255, 255)',
    modalInput: 'rgb(228, 228, 229)'

}

export const darkColors = {
    ...ReactNavigationDarkTheme.colors,
    background: 'rgb(0, 0, 0)',
    card: 'rgb(28, 28, 30)',
    touching: 'rgb(44, 44, 46)',
    divider: 'rgb(44, 44, 46)',
    helperText: 'rgb(152, 152, 159)',
    helperIcon: 'rgb(90, 90, 94)',
    touchingHelperIcon: 'rgb(101, 101, 105)',
    disabledText: 'rgb(143, 143, 143)',
    input: 'rgb(28, 28, 30)',
    inputPlaceholder: 'rgb(142, 142, 147)',
    modalBackground: 'rgb(28, 28, 30)',
    modalCard: 'rgb(44, 44, 46)',
    modalInput: 'rgb(71, 71, 75)'

}

export const draculaMintColors = {
    ...ReactNavigationDraculaTheme.colors,
    background: '#292d3e',
    card: '#212432',
    touching: '#353a51',
    divider: '#212432',
    helperText: '#9696ae',
    helperIcon: '#9696ae',
    touchingHelperIcon: 'rgb(101, 101, 105)',
    disabledText: '#4e515f',
    input: '#292d3e',
    inputPlaceholder: '#717790',
    modalBackground: '#212432',
    modalCard: '#263038',
    modalInput: 'rgb(71, 71, 75)',
}