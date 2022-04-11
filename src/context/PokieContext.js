import React,{createContext,useState} from 'react'

export const Pokiecontext = createContext ()
export function PokieContextProvider({children}) {
    const [navData,setNavData] = useState(null)
    navData && localStorage.setItem('data',JSON.stringify(navData))

    // const moves = navData && navData.moves
    const localData =  JSON.parse(localStorage.getItem('data'))
    const {moves,stats,rgb , name,species,sprites} = localData
    // const tipsId = localData.species.url
    // const species = localData.species.url
    const about = [
       {
         experience : {
           name : 'experience',
           value : localData.base_experience
         },
         height : {
           name : 'height',
           m : `${localData.height / 10} m`,
           ft : `${(localData.height/10 * 3.28084).toPrecision(2).replace('.',"'")}"`,
         },
         weight : {

           name : 'weight',
           kg : `${localData.weight /10} kg`,
           pounds : `${(localData.weight/10 * 2.205).toFixed(2)} lbs`,
           image : <svg class="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>

         },
         abilities : [...localData.abilities]
      }
    ]
 
  return (
     <Pokiecontext.Provider value={{name,moves,setNavData,stats,about,localData,species,sprites}}>
         {children}
     </Pokiecontext.Provider>
  )
}
