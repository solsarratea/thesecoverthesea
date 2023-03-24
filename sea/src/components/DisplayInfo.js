import { useState, useEffect } from 'react'
import Modal from './Modal.js'

function DisplayInfo(props) {
  const [show, setShow] = useState(false)

  const { init, onShowCallback, onHideCallback } = props

  useEffect(() => {
    if (show) {
      onShowCallback()
    } else {
      onHideCallback()
    }
  }, [show, onShowCallback, onHideCallback])

  useEffect(() => {
    if (init) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [init])

  const { children, styleClass, hideClose = false, openText, id, src } = props

  return (
    <div id={id}>
      <Modal
        hideClose={hideClose}
        show={show}
        handleClose={() => {
          setShow(false)
        }}
      >
        {children}
      </Modal>
      <button
        className={styleClass}
        type="button"
        onClick={() => {
          setShow(true)
        }}
      >
        {openText ? openText : <img alt="display-src" src={src} />}
      </button>
    </div>
  )
}

export default DisplayInfo