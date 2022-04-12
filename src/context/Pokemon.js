import React,{createContext,useState} from 'react'
import { useQuery } from 'react-query'

export const PokemonContext = createContext()

const fetchPokemon = async ({queryKey}) => {

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${queryKey[1]}&limit=20`)
    
     return res.json()
  }
  


  function handleSearch(value){
      let pokeNum = value.url.slice(34,-1)
      let rndColor = () =>{
          const r = Math.floor(Math.random() * 255)
          const g = Math.floor(Math.random() * 255)
          const b = Math.floor(Math.random() * 255)
          const a = Math.random().toPrecision(1)
          return `rgba(${r},${g},${b},${a})`
      }
      if(pokeNum <10){
          pokeNum =`00${pokeNum}`
      }else if(pokeNum >=10 && pokeNum<100){
          pokeNum = `0${pokeNum}`
      } else if(pokeNum > 999) {
          pokeNum = `${pokeNum}`
      }
      
      return {...value, image :pokeNum,rgb : rndColor() }
  }


export function PokemonProvider({children}) {
    const [pokie,setPokie] = useState('')
    const [offset,setOffset] = useState(0)
    const {data,status} = useQuery(['pokemon',offset],fetchPokemon,{
        keepPreviousData:true
    })
    const newData = (data && data.results.map (handleSearch))

    const first = (newData && newData.slice(0,4))
    const second = (newData && newData.slice(4,8))
    const third = (newData && newData.slice(8,12))
    const fourth = (newData && newData.slice(12,16))
    const fifth = (newData && newData.slice(16))
    function handleClick(poke){
        setPokie(poke)
    }
  return (
    <PokemonContext.Provider value={{status,offset,setOffset,newData,first,second,third,fourth,fifth,handleClick,pokie,handleSearch}}>
      {children}
    </PokemonContext.Provider>
  )
}

