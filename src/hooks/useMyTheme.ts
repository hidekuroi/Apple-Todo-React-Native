import React, { useContext } from "react";
import { ThemeContext } from "../themes/ThemeProvider";

export const useMyTheme = () => useContext(ThemeContext)