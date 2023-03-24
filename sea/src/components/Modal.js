import useUIManager from "../hooks/useUIManager";
import "../styles/modal.css";

const Modal = ({ handleClose, show, children, ...props }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const firstGesture = useUIManager(state=>state.firstGesture)
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <section className="modal-header">
          {firstGesture ? <button className="close-button" type="button" onClick={handleClose}>
            <img alt="exit" className="exit" src="UI/Exit-orange.png"></img>
          </button> : null}
        </section>
        {children}
      </section>
    </div>
  );
};

export default Modal;
