import React, { useState, useEffect } from 'react'
import '../styles/index.css'
import '../styles/onboarding.css'
import UI from './UI.js'
import { useSpring, a } from 'react-spring'
import { DefaultLoadingManager } from 'three'
import useUIManager from '../hooks/useUIManager'
import App from './App'
import Story from './Story.js'

export function OpacityLayer({ loaded }) {
  const setResource = useUIManager((state) => state.resourceLoaded)
  const update = useUIManager((state) => state.update)
  const [invertedPercent, setPercent] = useState(100)
  const [finished, set] = useState(false)
  const [loadingText, setText] = useState('0%')

  useEffect(() => {
    DefaultLoadingManager.onLoad = () => {
      setResource('scene', true)
      set(true)
    }
    DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const v = (itemsLoaded / itemsTotal) * 100
      setText(Math.trunc(v) + ' %')
      const vv = 100 - Math.trunc(v)
      // console.log(vv * 0.5 + 50)
      setPercent(vv * 0.5 + 50)
    }
    DefaultLoadingManager.onError = function (url) {
      console.log('There was an error loading ' + url)
    }
    //eslint-disable-next-line
  }, [])

  const firstGesture = useUIManager((state) => state.firstGesture)
  const olProps = useSpring({
    from: { opacity: 1 },
    to: { opacity: finished && firstGesture ? 0 : 1 },
    config: { duration: 8000 },
    onResolve: ({ value }) => {
      if (Number(value) === 0) {
        update('transition', false)
      }
    },
  })
  return (
    <>
      <a.div style={olProps}>
        <a.div
          className="loading"
          style={{ filter: `grayscale(${invertedPercent}%)` }}
        />
        <div className="loading-text-container">
          {!loaded ? <p>{loadingText}</p> : null}
        </div>
      </a.div>
    </>
  )
}

function AppWrapper(props) {
  const transition = useUIManager((state) => state.transition)

  const didLoad = (state) => {
    const v = Object.values(state.loadingResources).every(Boolean)
    return v
  }
  const resourcesLoaded = useUIManager(didLoad)

  useEffect(() => {
    //console.log(resourcesLoaded, transition)
  }, [resourcesLoaded, transition])

  return (
    <>
      <UI />
      <App />
      {transition ? <OpacityLayer loaded={resourcesLoaded} /> : null}
      {resourcesLoaded && transition ? <Story /> : null}
    </>
  )
}

export default AppWrapper
