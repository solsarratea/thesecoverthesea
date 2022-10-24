import Layers from './Layers.js'
import { useState } from 'react'
import { Vector3 } from 'three'
const data = require('../postcards.json')
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}

const postcardsSource = shuffle(data.postcards)

const rand = Math.random()

const randomPos = (idx) => {
  return {
    x: Math.cos((idx / 9) * Math.PI * 2) * 150,
    y: 10,
    z: -Math.sin((idx / 9) * Math.PI * 2) * 150,
  }
}

function Postcards({ updateControls }) {
  const [postcards] = useState(postcardsSource)
  return (
    <>
      {postcards.length > 0 ? (
        <>
          {postcards.map((props, idx) => {
            const position = randomPos(idx)
            return (
              <Layers
                updateControls={updateControls}
                position={new Vector3(position.x, position.y, position.z)}
                key={`${props.author}-${props.artwork}-postcard`}
                {...props}
              />
            )
          })}
        </>
      ) : null}
    </>
  )
}
export default Postcards
