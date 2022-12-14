////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - This Modal, even though its a React component, has an imperative API
//   to open and close it. Can you convert it to a declarative API?
//
// Got extra time?
//
// - What happens when you click the overlay? How can you keep the state of
//   the <App> consistent with what you see in the page?
////////////////////////////////////////////////////////////////////////////////
import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Modal extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  componentDidMount() {
    this.doImperativeWorkI();
  }

  componentDidUpdate() {
    this.doImperativeWorkI();
  }

  doImperativeWorkI() {
    $(this.node).modal(this.props.isOpen ? "show" : "hide");
  }

  render() {
    return (
      <div className="modal fade" ref={node => (this.node = node)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  state = { isModalOpen: false };

  render() {
    return (
      <div className="container">
        <h1>Let’s make bootstrap modal declarative</h1>

        <button className="btn btn-primary" onClick={this.openModal}>
          open modal
        </button>

        <Modal
          title="Declarative is better"
          isOpen={this.state.isModalOpen}
        >
          <p>Calling methods on instances is a FLOW not a STOCK!</p>
          <p>
            It’s the dynamic process, not the static program in text
            space.
          </p>
          <p>
            You have to experience it over time, rather than in
            snapshots of state.
          </p>
          <button
            onClick={this.closeModal}
            type="button"
            className="btn btn-default"
          >
            Close
          </button>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
