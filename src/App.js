import React from 'react'
import Characters from './component/Characters'
import {QueryClientProvider,QueryClient} from 'react-query'
import { PokemonProvider,PokemonContext} from './context/Pokemon'
import './App.css'
import Pokedex from './Pokedex'
const queryClient = new QueryClient ()


function App() {
  return (
   <div className='App'>
      <div className='container'>
        <QueryClientProvider client={queryClient}>
           <PokemonProvider>
               <Pokedex />
           </PokemonProvider>
         </QueryClientProvider>
      </div>
   </div>
  )
}

export default App

