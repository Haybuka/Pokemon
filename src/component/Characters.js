import { useQuery } from 'react-query'
import { useState } from 'react'
import {motion} from 'framer-motion'
import Character from './Character'




function Characters() {
  const [page,setPage] = useState(42)

  const fetchCharacters=async ({queryKey})=>{
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`)
    return response.json()
  }
  const {data,isFetching,isFetched} = useQuery(['characters',page],fetchCharacters,{keepPreviousData:true})
  console.log(data)
    return (
     <>
        <h1>Rick and Morty</h1>

      <motion.div >
      <motion.button initial={{x:-300}} animate={{x:0}} disabled={page === 1} onClick={ () => setPage((old)=> old-1)}>Prev</motion.button>
      {page}
      <motion.button initial={{x:300}} animate={{x:0}} disabled={data && !data.info.next} onClick={ () => setPage((old)=> old+1)}>Next</motion.button>
      
  
    </motion.div >
    <div className='characters'>
        
       {data && (
         data.results.map( character => (
          <Character key={character.id} character={character}/>
        ))
       )}
     
    </div>
     </>
  );
}

export default Characters;
