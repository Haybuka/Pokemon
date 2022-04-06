import React from 'react'
import Characters from './component/Characters'
import {QueryClientProvider,QueryClient} from 'react-query'
import { PokemonProvider,PokemonContext} from './context/Pokemon'
import { Route,Routes } from 'react-router-dom'
import './App.css'
import Pokedex from './Pokedex'
import Pokie from './component/Pokie'
const queryClient = new QueryClient ()


function App() {
  return (
   <div className='App'>
      
      <div className='container'>
        <QueryClientProvider client={queryClient}>
           <PokemonProvider>
               {/* <Pokedex /> */}
               <Routes>
                  <Route path="/" element={<Pokedex/>}/>
                  <Route path="/:id" element={<Pokie />}/>
                  <Route path="*" element={<p>Not FOUND</p>}/>
              </Routes>
           </PokemonProvider>
         </QueryClientProvider>
      </div>
   </div>
  )
}

export default App

