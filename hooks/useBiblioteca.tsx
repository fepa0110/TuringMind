import { useContext } from 'react'
import { BibliotecaContext } from '../context/biblioteca'

export const useBiblioteca = () => {
    const context = useContext(BibliotecaContext)

    if (!context) throw new Error('useTheme must be used within a BibliotecaContext')

    return context
}