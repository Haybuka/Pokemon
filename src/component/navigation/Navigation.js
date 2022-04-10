import React,{useContext} from 'react'
import { Pokiecontext } from '../../context/PokieContext'
import { motion } from 'framer-motion'
import '../Moves.css'
import '../Stats.css'
import '../About.css'
import '../Evolution.css'
import { useQuery } from 'react-query'
export function About() {
    const {about,name,species,localData} = useContext(Pokiecontext)
   const abilities = about[0].abilities
   const {height} = about[0]
   const {weight} = about[0]
   const {experience} = about[0]
   const url = species.url
   async function fetchEncounter ({queryKey}){
       const res = await fetch(`${queryKey[1]}`)
       return res.json()
   }
   const {data,status} = useQuery(['encounter',url],fetchEncounter)
   const randomId = Math.floor(Math.random() * 20)

   const tips = status==="success" && data.flavor_text_entries 
   const eggGroups = status==="success" && data.egg_groups
   const habitat = status==="success" && data.habitat.name
   console.log(eggGroups)
  return (
    <aside className='About'>
        <div>

            <h4 className='About-experience'>
                <p>{experience.name}</p> 
                <span>-</span>
                <p className={experience.value > 100 ? 'exp-high':'exp-low'}>{experience.value}</p>
            </h4>
            <h4 className='About-experience'>
                <p>{habitat && 'Habitat'}</p> 
                <span>-</span>
                <p>{habitat}</p>
            </h4>
            <section className='About-eggGroup'>
           <h4>{eggGroups && 'Egg Group '} - </h4>
            <ul>
                {eggGroups && eggGroups.map((group,id)=>(
                    <li key={id}>{group.name}</li>
                ))}
            </ul>
           </section>
            <section className='About-fact'>
                <h4>#Random Fact</h4>
                <p>{tips &&  tips[randomId].flavor_text}</p>
            </section>
            <section className='About-personality'>
               <ul>
                   <li>
                      <aside>
                           <div>
                               {/* svg goes here */}
                             <p>
                                {weight.kg} ({weight.pounds})
                             </p>
                           </div>
                           <span>{weight.name}</span>

                      </aside>
                      <aside>
                         <div>
                           {/* <svg class="w-6 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> */}
                           <p>
                              {height.m} ({height.ft})
                           </p>
                         </div> 
                         <span>{height.name}</span>
                      </aside>
                      <span className='divider-span'></span>
                   </li>
               </ul>
            </section>
           <section>
               <h4>Abilities</h4>
               <ul className='About-abilities'>
                    {abilities.map((ability,id)=>(
                         <li key={id}>{ability.ability.name}</li>
                      ))}
               </ul>
           </section>
           
        </div>
    </aside>

    // https://pokeapi.co/api/v2/pokemon/10034/  further adjustments
  )
}

export function Stats() {
    const progressVariant ={
       hidden : {
           width:0,
           background : 'rgba(225,255,255)',
           opacity : 0.5,
           
       }
    }
  
    const {stats} = useContext(Pokiecontext)
    return (
      <motion.aside className='Stats'>
         {stats.map((stat,id)=> (
             <section key={id}>
                <h4 className='Stat-name'>{stat.stat.name}</h4>
                <article>
                    <p className='Stat-num'>{stat.base_stat}</p>
                    <div className='progress'>
                       <motion.div className='progress-bar'
                          variants={progressVariant}
                          initial="hidden" 
                          transition={{type:'spring', stiffness:120}}
                          animate={{width: stat.base_stat,backgroundColor:'rgba(70, 225, 70, 0.842)',opacity:0.8}}></motion.div>
                    </div>
                 </article>
             </section>
         ))}
      </motion.aside>
    )
}

export function Move() {
    const {moves} = useContext(Pokiecontext)
    const truncatedMoves = moves.slice(5,40)
    return (
      <ul className='Moves'>
          {truncatedMoves.map((move,id) => (
              <li key={id}> {move.move.name}</li>
          ))}
      </ul>
 
    )

}
  
export function Evolution() {
    const {species} = useContext(Pokiecontext)
    const url = species.url
    async function fetchEncounter ({queryKey}){
        const res = await fetch(`${queryKey[1]}`)
        return res.json()
    }
    const {data,status} = useQuery(['encounter',url],fetchEncounter)
 
    const {varieties,color,evolution_chain,evolves_from_species} = status==="success" && data
 
    // console.log(color.name,evolution_chain.url,evolves_from_species)
    return (
    <section className='Evolution'>
      <article className='Evolution-varieties'>
           <h4>varieties</h4>
           <ul>
               {varieties && varieties.map( (variety,id)=> <li key={id}>{variety.pokemon.name}</li>)}
           </ul>
      </article>
      {/* <article>
           <h4>#Facts</h4>
           <ul>
               {tips && truncatedTips.map( (tip,id)=> <li key={id}>{tip.flavor_text}</li>)}
           </ul>
      </article> */}
    </section>
    )
}
  