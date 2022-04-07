
import { useQuery } from 'react-query'
import { useContext } from 'react';
import { Pokiecontext } from '../context/PokieContext';
import {useParams,useNavigate, NavLink, Outlet} from 'react-router-dom'
import './Pokie.css'
async function fetchPokemon({queryKey}){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${queryKey[1]}`);
    return res.json()
}
function Pokie() {
    
    let params = useParams();
    const navigate = useNavigate()
    let name = params.id
    const {data,status} = useQuery(['Pokemon',name],fetchPokemon,{
        keepPreviousData:true
    })
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
        
        return {...data, id :pokeNum,rgb : rndColor() }
    }
    const pokemon = data && handleSearch(data)
    const pokemonType = pokemon && pokemon.types
    const {setNavData} = useContext(Pokiecontext)
  return (
    
       <>
         {pokemon && (
            //  style={{backgroundColor : pokemon.rgb}}
             <main className='Pokie' >
             <header>
                 <nav>
                    <svg onClick={()=> navigate("/")} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                     <h3>{`#${pokemon.id}`} </h3>
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                 </nav>
             </header>
             <section>
                 <div className='Pokemon-div'>
                     <img src={`http://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.id}.png`} alt="pokemon"/>
                 </div>
                 <h3 className='Pokie-name'>{name}</h3>
                 <PokeType type={pokemonType}/>
             </section>
             <section className='Pokie-details'>
                 <div onClick={()=> setNavData(pokemon)}>
                    <PokeNav />     
                 </div>
                <Outlet />
             </section>
         </main>
         )}
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

function PokeNav(){
    return (
        <ul className='details-nav' >
            <NavLink to="about"  className={({ isActive=true }) => (isActive ? 'pokieNav-active' : 'pokieNav')}>About</NavLink> 
            <NavLink to="stats"  className={({ isActive }) => (isActive ? 'pokieNav-active' : 'pokieNav')}>Stats</NavLink> 
            <NavLink to="move"  className={({ isActive }) => (isActive ? 'pokieNav-active' : 'pokieNav')}>Moves</NavLink> 
            <NavLink to="evolution"  className={({ isActive }) => (isActive ? 'pokieNav-active' : 'pokieNav')}>Evolution</NavLink> 
        </ul>
    )
}