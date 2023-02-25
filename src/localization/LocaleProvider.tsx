import React, { createContext, useEffect, useState } from "react"
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import {en, ja, ru} from './locales'


const i18n = new I18n({en, ru, ja})

i18n.locale = getLocales()[0].languageCode
i18n.enableFallback = true

export const LocaleContext = createContext(i18n)

export const LocaleProvider = (props: any) => {

  const locale = i18n

  return (
    <LocaleContext.Provider value={locale}>
      {props.children}
    </LocaleContext.Provider>
  )
}
