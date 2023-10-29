import { Theme } from "../types/Theme"

const ColorsNames = {
    WhiteSmoke: "#F5F5F5",

    ImperialRed: "#F93943",
    Carmine: "#931F1D",
    Crimson: "#D91E36",
    Tomato: "#FC5130",
    
    PalatinateBlue: "#473BF0",
    SlateBlue: "#6665DD",
    ArgentinianBlue: "#49B6FF",
    CelestialBlue: "#008DD5",
    
    Celadon: "#8FDC97",
    Teal: "#087E8B",
    DarkSlateGray: "#255957",
    TimberWolf: "#CDD3CEAA",
    
    Jet: "#2E2F2F",
    Night: "#0D160B",
    RaisinBlack: "#232020",
    Black: "#050401",
    RichBlack: "#0C1618",
    EerieBlack: "#1A1D1A"
}

export const LightColors : Theme = {
    primary: ColorsNames.Crimson,
    onPrimary: ColorsNames.WhiteSmoke,

    secondary: ColorsNames.PalatinateBlue,
    onSecondary: ColorsNames.WhiteSmoke,

    terciary: ColorsNames.Teal,
    background: ColorsNames.WhiteSmoke,
    onBackground: ColorsNames.Night,

    error: ColorsNames.ImperialRed,
    onError: ColorsNames.WhiteSmoke,

    neutral: ColorsNames.RaisinBlack,
    neutralVariant: ColorsNames.Jet,

    outline: ColorsNames.TimberWolf,
    onOutline: ColorsNames.RaisinBlack,
}

export const DarkColors : Theme = {
    primary: ColorsNames.Crimson,
    onPrimary: ColorsNames.WhiteSmoke,

    secondary: ColorsNames.PalatinateBlue,
    onSecondary: ColorsNames.WhiteSmoke,

    terciary: ColorsNames.Teal,

    background: ColorsNames.EerieBlack,
    onBackground: ColorsNames.WhiteSmoke,

    error: ColorsNames.ImperialRed,
    onError: ColorsNames.WhiteSmoke,

    neutral: ColorsNames.DarkSlateGray,
    neutralVariant: ColorsNames.Jet,

    outline: ColorsNames.TimberWolf,
    onOutline: ColorsNames.RaisinBlack,
}