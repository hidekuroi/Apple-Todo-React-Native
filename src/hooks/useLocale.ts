import React, { useContext } from "react";
import { LocaleContext } from "../localization/LocaleProvider";

export const useLocale = () => useContext(LocaleContext)