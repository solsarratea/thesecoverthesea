import "../styles/modal.css";

const Modal = ({ handleClose, show, children, ...props }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <section className="modal-header">
          <button className="close-button" type="button" onClick={handleClose}>
            <img alt="exit" className="exit" src="UI/Exit-orange.png"></img>
          </button>
        </section>
        {children}
      </section>
    </div>
  );
};

export default Modal;
