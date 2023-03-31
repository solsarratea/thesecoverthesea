import DisplayInfo from './DisplayInfo.js'
import React, { useState } from 'react'
import '../styles/ui.css'
import useEnvManager from '../hooks/useEnvManager.js'
import useUIManager from '../hooks/useUIManager.js'
import useAudioManager from '../hooks/useAudioManager.js'
/* eslint-disable */
const boat = `
              |    |    |              
             )_)  )_)  )_)             
            )___))___))___)           
          )____)____)_____)\\          
        _____|____|____|____\\\__      
---------\                   /---------
^^^^^ ^^^^^^^^^^^^^^^^^^^^^
          ^^^^      ^^^^     ^^^    ^^
      ^^^^      ^^^
`

function UI({ show, init, ...props }) {
  const update = useEnvManager((state) => state.update)
  const updateUI = useUIManager((state) => state.update)
  const firstGesture = useUIManager((state) => state.firstGesture)
  const invite = useUIManager((state) => state.invite)
  const refs = useAudioManager((state) => state.audiosRef)

  const transition = useUIManager((state) => state.transition)
  const [inSea, setIn] = useState(false)

  return (
    <>
      {invite ? (
        <main>
          {inSea ? null : (
            <DisplayInfo
              id="helpContainer"
              src="UI/Question.png"
              styleClass="help"
              init={!firstGesture}
              onShowCallback={() => update('visible', false)}
              onHideCallback={() => null}
            >
              <p></p>
              <div style={{ whiteSpace: 'pre' }}>{boat}</div>
              {/* <button className="enter" onClick={()=>envManager.setDay()}>day</button>
        <button className="enter" onClick={()=>envManager.setNight()}>night</button>
        <br /> */}
              {transition ? (
                <button
                  onClick={() => {
                    updateUI('firstGesture', true)
                    setIn(true)
                    // Media callback
                    if (refs.audio1) {
                      console.log(refs)
                      Object.values(refs).map((ref, i) => {
                        if (ref.source) {
                          const audioCtx = ref.source.context
                          if (audioCtx.state === 'suspended') {
                            audioCtx.resume().then(function () {
                              // console.log('playing')
                              ref.play(0)
                            })
                          }
                        }
                        ref.play(0)
                        return null
                      })
                    }
                  }}
                  className="enter"
                >
                  NAVIGATE
                </button>
              ) : null}
            </DisplayInfo>
          )}
          <DisplayInfo
            openText="THESE COVERS THE SEA"
            styleClass="about"
            show={false}
            {...props}
            onShowCallback={() => update('visible', false)}
            onHideCallback={() => {
              if (!firstGesture) return
              update('visible', true)
            }}
          >
            <h2 className="about-subtitle">Creating New Dimensions</h2>
            <h1 className="about-title">THESE COVER THE SEA</h1>
            <div className="about-text" id="about">
              <div className="about-motiv glow" id="">
                <p>
                  {' '}
                  Imagine diving into something unknown for the first time.{' '}
                </p>
                <p> With new perspectives on known objects. </p>
              </div>

              <p> Navigate through the sea covered by chromatic layers </p>
              <p>& find the cards posted by peers around the world.</p>
              <br></br>
              <div className="center">
                <p>+ Observe the chromatic composition</p>

                <p>+ Observe flora and fauna</p>

                <p>+ Observe feathers and eyes</p>
              </div>

              <br></br>
              <p>
                Explore Georg Forsters's sketches from his observations during
                James Cook's second circumnavigation in the South Sea.
              </p>

              <div className="about-text-invert">
                <a
                  href="https://postcard-editor.solsarratea.world/"
                  className="invert"
                >
                  <img alt="postcard-src" src="UI/favicon.ico" />
                  <p>Design your own post card, and post it to the sea.</p>
                </a>
              </div>
            </div>

            <div className="social-networks">
              <a
                href="https://hackdash.org/projects/634ab7a16d202d739f69ce81"
                className="invert"
              >
                <img alt="hackdash-src" src="UI/Web.png" />
              </a>
              <a href="https://github.com/solsarratea/thesecoverthesea">
                <img alt="github-src" src="UI/github.png" />
              </a>
            </div>
          </DisplayInfo>
        </main>
      ) : null}
    </>
  )
}

export default UI
