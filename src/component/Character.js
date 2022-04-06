import React from 'react'
import './Character.css'
export default function Character({character}) {
  return (
    <div className='card'>
        <div className='img-div'>
           <img src={character.image} alt=""/>
        </div>
        <div className='text-container'>
            <h3>{character.name}</h3>
            <p className='status'>
                {character.status}
            </p>
           <div>
             <p className='title'> last seen on</p>
              <p>{character.location.name}</p>
           </div>
        </div>
    </div>
  )
}
