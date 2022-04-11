import React from 'react'
import Characters from './component/Characters'
import {QueryClientProvider,QueryClient} from 'react-query'
import { PokemonProvider} from './context/Pokemon'
import { ThemeContextProvider } from './context/ThemeContext'
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
  return (
   <div className='App'>
      
      <div className='container'>
        <QueryClientProvider client={queryClient}>
           <ThemeContextProvider >
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
           </ThemeContextProvider>
         </QueryClientProvider>
      </div>
   </div>
  )
}

export default App

