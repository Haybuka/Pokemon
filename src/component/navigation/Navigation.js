import React,{useContext} from 'react'
import { useParams } from 'react-router-dom'
import { Pokiecontext } from '../../context/PokieContext'
import '../Moves.css'
export function About() {
    const params = useParams ()
    const name = params.id
    const {navData} = useContext(Pokiecontext)
    console.log(navData)
  return (
    <div>{name} About</div>
    // https://pokeapi.co/api/v2/ability/{id or name}/
    // https://pokeapi.co/api/v2/characteristic/{id}/
  )
}

export function Stats() {
    const params = useParams ()
    const name = params.id
    const {stats} = useContext(Pokiecontext)
    console.log(stats)
    return (
      <div>{name} Stats</div>
    )
}

export function Move() {
    const params = useParams ()
    const name = params.id
    const {moves} = useContext(Pokiecontext)
    const truncatedMoves = moves.slice(0,20)
    return (
      <ul className='Moves'>
          {truncatedMoves.map((move,id) => (
              <li key={id}> {move.move.name}</li>
          ))}
      </ul>
    )

}
  
export function Evolution() {
    const params = useParams ()
    const name = params.id
    const {navData} = useContext(Pokiecontext)
    console.log(navData)
    return (
      <div>{name} Evolution</div>
    )
}
  