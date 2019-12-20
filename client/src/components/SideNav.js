import React, { Component } from "react";
import M from "materialize-css";
import { Link } from 'react-router-dom';
import "materialize-css/dist/css/materialize.min.css";

class Sidenav extends Component {
  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 200,
      draggable: true
    };

    M.Sidenav.init(this.Sidenav);

  }
  render() {
    return (
      <>
        <ul
          ref={Sidenav => {
            this.Sidenav = Sidenav;
          }}
          id="slide-out"
          className="sidenav"
          style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
        >
            <li>
                <div>
                    <Link 
                    to={this.props.auth ? '/' : '/'} 
                    className="brand-logo black-text"
                    style={{position:'relative'}}
                    >
                        Emaily
                    </Link>
                </div>
            </li>
            {this.props.children}
        </ul>
        <div className="hide-on-large-only">
          <i data-target='slide-out' className="sidenav-trigger material-icons">menu</i>
        </div>
        <div className="hide-on-large-only fixed-action-btn">
            <div data-target="slide-out" className="sidenav-trigger btn-floating btn-large red darken-4">
                <i className="material-icons">menu</i>
            </div>
        </div>
      </>
    );
  }
}

export default Sidenav;