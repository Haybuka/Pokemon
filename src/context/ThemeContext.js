import React,{useState,createContext} from 'react'

export const ThemeContext = createContext()
export function ThemeContextProvider({children}) {
    const [mode,setMode] = useState(false)
  return (
    <ThemeContext.Provider value={{mode,setMode}}>
        {children}
    </ThemeContext.Provider>
  )
}
