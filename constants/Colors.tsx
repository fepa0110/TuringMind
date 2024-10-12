import { Theme } from "#types/Theme"

const ColorsNames = {
    
    // Primary
    ByzantineBlue: "hsl(220, 87%, 50%)",
    // Secondary
    Veronica: "hsl(282, 87%, 50%)",
    // Terciary
    Moonstone: "hsl(188, 87%, 40%)",
    // Dark
    RichBlack: "hsl(220, 45%, 8%)",
    // Light
    SeaSalt: "hsl(220, 87%, 98%)",
    // Outline Light
    SlateGray: "hsl(220, 8%, 50%)",
    // Outline Dark
    CoolGray: "hsl(220, 10%, 60%)",
    // Neutral dark
    Charcoal: "hsl(219, 12%, 28%)",
    // Neutral light
    AntiFlashWhite: "hsl(220, 18%, 90%)",
    // Error
    PantoneRed: "hsl(350, 87%, 50%)",
    // Active
    SpringGreen: "hsl(150, 87%, 45%)"
}

// Colores originales
export const LightColors : Theme = {
    primary: ColorsNames.ByzantineBlue,
    onPrimary: ColorsNames.SeaSalt,

    secondary: ColorsNames.Veronica,
    onSecondary: ColorsNames.SeaSalt,

    terciary: ColorsNames.Moonstone,

    active: ColorsNames.Moonstone,
    onActive: ColorsNames.SeaSalt,

    background: ColorsNames.SeaSalt,
    onBackground: ColorsNames.RichBlack,

    error: ColorsNames.PantoneRed,
    onError: ColorsNames.SeaSalt,

    neutral: ColorsNames.Charcoal,
    neutralVariant: ColorsNames.AntiFlashWhite,

    outline: ColorsNames.CoolGray,
    onOutline: ColorsNames.SlateGray,
} 

export const DarkColors : Theme = {
    primary: ColorsNames.ByzantineBlue,
    onPrimary: ColorsNames.SeaSalt,

    secondary: ColorsNames.Veronica,
    onSecondary: ColorsNames.SeaSalt,

    terciary: ColorsNames.Moonstone,

    active: ColorsNames.Moonstone,
    onActive: ColorsNames.SeaSalt,

    background: ColorsNames.RichBlack,
    onBackground: ColorsNames.SeaSalt,

    error: ColorsNames.PantoneRed,
    onError: ColorsNames.SeaSalt,

    neutral: ColorsNames.Charcoal,
    neutralVariant: ColorsNames.AntiFlashWhite,

    outline: ColorsNames.CoolGray,
    onOutline: ColorsNames.SlateGray,
}