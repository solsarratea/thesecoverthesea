import { Component } from "react";
import Modal from "./Modal.js";

class DisplayInfo extends Component {
  constructor(props) {
    super();

    this.state = {
      show: props.show,
   //  disableControl: props.disableControl,
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  //  this.state.disableControl({ value: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  //  this.state.disableControl({ value: false });
  };

  render() {
    const { callback, children, styleClass, openText, id, src } = this.props;
    return (
      <div id={id}>
        <Modal
          show={this.state.show}
          handleClose={() => {
            this.hideModal();
            if (callback) {
              callback();
            }
          }}
        >
          {children}
        </Modal>
        <button
          className={styleClass}
          type="button"
          onClick={() => {
            this.showModal();
          }}
        >
          {openText ? openText : <img alt="display-src" src={src} />}
        </button>
      </div>
    );
  }
}

export default DisplayInfo;
