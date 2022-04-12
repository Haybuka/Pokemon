import React,{useContext} from 'react'
import Characters from './component/Characters'
import {QueryClientProvider,QueryClient} from 'react-query'
import { PokemonProvider} from './context/Pokemon'
import { ThemeContext } from './context/ThemeContext'
import { PokieContextProvider } from './context/PokieContext'
import { AnimatePresence } from 'framer-motion'
import { Route,Routes,useLocation,useParams } from 'react-router-dom'
import { About,Stats,Move,Evolution } from './component/navigation/Navigation'
import './App.css'
import Pokedex from './Pokedex'
import Pokie from './component/Pokie'
const queryClient = new QueryClient ()


function App() {
  const location = useLocation();
  const {mode} = useContext(ThemeContext)
  const random = () => {
    let index = Math.floor(Math.random() * 500)
    if(index <10){
      index =`00${index}`
     }else if(index >=10 && index<100){
      index = `0${index}`
      }
  return index
  }

  return (
   <div className={mode ? 'App light-mode' : 'App dark-mode'}>
     {/* randomly display two pokemons, display is fixed and zindex in negatives */}
      <div className='bgShow'>
          <img className='first' src={`http://assets.pokemon.com/assets/cms2/img/pokedex/detail/${random()}.png`} alt="Catch 'em all"/>
          <img className='second' src={`http://assets.pokemon.com/assets/cms2/img/pokedex/detail/${random()}.png`} alt="Catch 'em all"/>
      </div>
    {/* App begins here */}
      <div className='container'>
        <QueryClientProvider client={queryClient}>
           <PokemonProvider>
             <PokieContextProvider>
               <AnimatePresence exitBeforeEnter>
               <Routes >
                  <Route path="/" element={<Pokedex/>}/>
                   <Route path="/:id" element={<Pokie />}>
                      <Route path="about" element={<About />}/>
                      <Route path="move" element={<Move />}/>
                      <Route path="stats" element={<Stats />}/>
                      <Route path="evolution" element={<Evolution />}/>
                  </Route>
                  <Route path="*" element={<Pokedex />}/>
               </Routes>
               </AnimatePresence>
             </PokieContextProvider>
           </PokemonProvider>
         </QueryClientProvider>
      </div>
   </div>
  )
}

export default App

