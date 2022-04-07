import React,{createContext,useState} from 'react'

export const Pokiecontext = createContext ()
export function PokieContextProvider({children}) {
    const [navData,setNavData] = useState(null)
    const moves = navData && navData.moves
    const abilities = navData && navData.abilities
    const stats = navData && navData.stats
  return (
     <Pokiecontext.Provider value={{navData,moves,abilities,setNavData,stats}}>
         {children}
     </Pokiecontext.Provider>
  )
}
