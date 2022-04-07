import React,{useContext} from 'react'
import { motion } from 'framer-motion'
import { PokemonContext } from '../context/Pokemon'
import { Link} from 'react-router-dom'

const sectionVariant = {
    hidden : {
        x:-100
      },
      visible : {
          x:0
      }
}
const pokeBtn = {
    hidden : {
      y:0,
    },
    visible : {
        y:-5,
        transition: {
          yoyo : Infinity
        }
    }
}
function Pokemon({Pokedata}) {
    const {handleClick} = useContext(PokemonContext)
  return (
    <section className='Pokedex-group'>
        {Pokedata.map((poke) => ( 
        <motion.section style={{backgroundColor : `${poke.rgb}`}} variants={sectionVariant} animate="visible" initial="hidden" key={poke.url} className='Pokedex-card'>
            <div className={poke.image > 999 ? 'poke-alt':'poke-img'}>
    
                 <img src={poke.image > 999 ? 'https://www.svgrepo.com/show/276264/pokeball-pokemon.svg': `http://assets.pokemon.com/assets/cms2/img/pokedex/detail/${poke.image}.png`} alt="pokemon"/>
    
            </div>
            <h3>{poke.name}</h3>
    
            <motion.p variants={pokeBtn}  className='Pokedex-btn' onClick={ () =>handleClick(poke)}>
               <Link to={`/${poke.name}`} >
                 About
               </Link>
            </motion.p>
       </motion.section>
    ))}
    </section>
  )
}

export default Pokemon