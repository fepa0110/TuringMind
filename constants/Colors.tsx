import { Theme } from "../types/Theme"

const ColorsNames = {
    // Claros
    WhiteSmoke: "#F5F5F5",

    // Rojos
    ImperialRed: "#F93943",
    Carmine: "#931F1D",
    Crimson: "#D91E36",
    Tomato: "#FC5130",
    
    // Azules
    PalatinateBlue: "#473BF0FF",
    PolynesianBlue: "#1F487E",
    PersianBlue: "#072AC8",
    SlateBlue: "#6665DD",
    ArgentinianBlue: "#49B6FF",
    CelestialBlue: "#008DD5",
    Verdigris: "#75B9BE",
    FluorescentCyan: "#7CFEF0",
    PrincessCyan: "#01BAEF",

    // Verdosos
    Celadon: "#8FCB9B",
    Teal: "#087E8B",
    DarkSlateGray: "#255957",
    DarkCyan: "#4B8F8C",
    ShamrockGreen: "#28965A",
    Aquamarine: "#2CEAA3",
    KellyGreen: "#38A700",
    
    // Grises
    ToupeGray: "#7F7B82",
    TimberWolf: "#CDD3CEAA",
    Silver: "#B0BBBF",
    
    // Oscuros
    Jet: "#2E2F2F",
    Night: "#0D160B",
    RaisinBlack: "#232020",
    Black: "#050401",
    RichBlack: "#0C1618",
    EerieBlack: "#1A1D1A"
}

// Colores originales
export const LightColors : Theme = {
    primary: ColorsNames.PersianBlue,
    onPrimary: ColorsNames.WhiteSmoke,

    secondary: ColorsNames.PalatinateBlue,
    onSecondary: ColorsNames.WhiteSmoke,

    terciary: ColorsNames.Teal,

    active: ColorsNames.KellyGreen,
    onActive: ColorsNames.WhiteSmoke,

    background: ColorsNames.WhiteSmoke,
    onBackground: ColorsNames.Night,

    error: ColorsNames.ImperialRed,
    onError: ColorsNames.WhiteSmoke,

    neutral: ColorsNames.RaisinBlack,
    neutralVariant: ColorsNames.Jet,

    outline: ColorsNames.Silver,
    onOutline: ColorsNames.RaisinBlack,
} 

export const DarkColors : Theme = {
    primary: ColorsNames.PersianBlue,
    onPrimary: ColorsNames.WhiteSmoke,

    secondary: ColorsNames.PalatinateBlue,
    onSecondary: ColorsNames.WhiteSmoke,

    terciary: ColorsNames.Teal,

    active: ColorsNames.KellyGreen,
    onActive: ColorsNames.WhiteSmoke,

    background: ColorsNames.EerieBlack,
    onBackground: ColorsNames.WhiteSmoke,

    error: ColorsNames.ImperialRed,
    onError: ColorsNames.WhiteSmoke,

    neutral: ColorsNames.DarkSlateGray,
    neutralVariant: ColorsNames.Jet,

    outline: ColorsNames.TimberWolf,
    onOutline: ColorsNames.RaisinBlack,
}