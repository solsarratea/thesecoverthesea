import '../styles/story.css'
import useUIManager from '../hooks/useUIManager'
import { useSpring, a } from 'react-spring'
import { useState } from 'react'
var passage1 = ` You feel the excitement, and you are ready to explore.  My name is Georg Forster and I am a passionate explorer. I have had the privilege of accompanying my father, Johann Reinhold Forster, on several scientific expeditions, including James Cook's second voyage to the Pacific from 1772 to 1775.`

var passage2 = `During this incredible journey I experienced so much of what the world has to offer, discovering flora and fauna that I had never seen before. I'm especially fond of birds, and take great joy in drawing them with attention to detail.`

var passage3 = `My passion for exploration and discovery led me to become a revolutionary thinker in the way that people observe their surroundings. Since my time at sea I have been fascinated by communication between travelers and those they meet along their journey.  This curiosity has led me to become an ethnologist dedicated to understanding cultures around the world.`

var passage4 = `In my pursuit of uncovering the unknown, I am now making an invitation for you all to explore a new sea - a virtual one!  This sea is made up of chromatic layers of my drawings from my travels around the world. Each creation is a postcard sent from someone afar for us all to appreciate its beauty together. I now invite you to observe this new unknown sea with fresh eyes and as we explore this vibrant landscape we may find something new or unexpected; perhaps something that can inspire us with newfound knowledge or understanding of our world.`

function Story() {
  const set = useUIManager((state) => state.update)
  const [ready, setReady] = useState(false)

  const olProps = useSpring({
    from: { opacity: 1 },
    to: { opacity: ready ? 0 : 1 },
    config: { duration: 2000 },
    onResolve: ({ value }) => {
      if (ready) {
        set('invite', true)
      }
    },
  })

  return (
    <a.div style={olProps}>
      <div id="story-container">
        <p>Imagine diving into something unknown for the first time...</p>
        <br />
        <p>{passage1}</p>
        <p>{passage2}</p>
        <p>{passage3}</p>
        <p>{passage4}</p>
      </div>
      <button
        id="next"
        onClick={() => {
          setReady(true)
        }}
      >
        <img alt="back-src" src="UI/Right.png" />
      </button>
    </a.div>
  )
}

export default Story
