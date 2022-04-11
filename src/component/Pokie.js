
import { useQuery } from 'react-query'
import { useContext,useState } from 'react';
import { Pokiecontext } from '../context/PokieContext';
import { ThemeContext } from '../context/ThemeContext';
import {useParams,useLocation,useNavigate, NavLink, Outlet} from 'react-router-dom'
import { motion,AnimatePresence} from 'framer-motion';
import './Pokie.css'
async function fetchPokemon({queryKey}){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${queryKey[1]}`);
    return res.json()
}
function handleSearch(data){
    let pokeNum = data.id
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

    return {...data, idx :pokeNum,rgb : rndColor(),specie : 'https://pokeapi.co/api/v2/pokemon-species/' }
}
function Pokie() {
    
    const [pageView,setPageView] =useState(false)
    const {mode,setMode} = useContext(ThemeContext)
    let params = useParams();
    const navigate = useNavigate()
    let name = params.id
    const {data} = useQuery(['Pokemon',name],fetchPokemon,{
        keepPreviousData:true
    })   
    const pokemon = data && handleSearch(data)
    const pokemonType = pokemon && pokemon.types
    const pageVariant = {
         hidden : {
            y: 0
         },
         visible : {
             y: pageView ? '-40px' : '0px'
         }
    }

    const pokieVariant = {
        hidden: {
           opacity:0
        },
        visible : {
          opacity:1,
            transition : {
                type:'spring',
                when:'beforeChildren',
                staggerChildren : 0.4
            }
        },
           exit : {
               opacity:0.5,
               transition : {
                   ease : 'easeInOut'
               }
           }
       }
       const location = useLocation()
//   console.log(data)
  return (
    
       <>
         {pokemon && (
             
             <main className={pageView ? 'Pokie h-screen light-mode':'Pokie dark-mode'}>
             <div className={mode ? 'Pokie-container light-mode':'Pokie-container dark-mode'} onClick={()=> setPageView(false)}>
             <header>
                 <nav>
                    <svg onClick={()=> navigate("/")} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                     <h3>{!pageView && `#${pokemon.idx}`} </h3>
                     <svg style={{opacity:0}} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                 </nav>
             </header>
             <section className='Pokie-pageView'>
                 {pageView && (<section>
                     <ul className='viewHeader'>
                         <li>
                           <h3>{pokemon.name}</h3>
                         </li>
                         <li>
                           <h3>#{pokemon.idx} </h3>
                         </li>
                     </ul>
                     <PokeType type={pokemonType}/>
                 </section>)}
                 <div className={pageView ? 'Pokemon-div overlay-img':'Pokemon-div'}>
                     <img src={`http://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.idx}.png`} alt="pokemon"/>
                 </div>
                 { !pageView && (
                    <>
                        <h3 className='Pokie-name'>{name}</h3>
                        <PokeType type={pokemonType}/>
                    </>
                 )}
             </section>
             </div>
             <motion.section variants={pageVariant} animate="visible" initial="hidden" className={pageView ? 'Pokie-details h-auto': 'Pokie-details'} onClick={()=> setPageView(true)}>
                <PokeNav pokemon={pokemon}/>     
                <AnimatePresence exitBeforeEnter>
                    <Outlet key={location.key} />
                </AnimatePresence>
             </motion.section>
         </main>
         )}
         <div className='switch' onClick={()=> setMode(!mode)}>
              <label>
             <input type='checkbox'/>
             <span>

               </span>

           </label>
      </div>
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       </>
    

  )
}

export default Pokie

function PokeType ({type}){
    return (
        <ul className='Pokie-type'>
           {type.map( (i,id) => (
               <li key={id}>{i.type.name}</li>
           ))}
        </ul>
    )
}

function PokeNav({pokemon}){
    const {setNavData,setIsLoaded} = useContext(Pokiecontext)
    return (
        <ul className='details-nav' >
            <NavLink onClick={()=> setNavData(pokemon)} to="about"  className={({ isActive=true }) => (isActive ? 'pokieNav-active' : 'pokieNav')}>About</NavLink> 
            <NavLink onClick={()=> setNavData(pokemon)} to="stats"  className={({ isActive }) => (isActive ? 'pokieNav-active' : 'pokieNav')}>Stats</NavLink> 
            <NavLink onClick={()=> setNavData(pokemon)} to="move" className={({ isActive }) => (isActive ? 'pokieNav-active' : 'pokieNav')}>Moves</NavLink> 
            <NavLink onClick={()=> setNavData(pokemon)} to="evolution"  className={({ isActive }) => (isActive ? 'pokieNav-active' : 'pokieNav')}>Evolution</NavLink> 
        </ul>
    )
}