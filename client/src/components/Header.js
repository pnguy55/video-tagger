import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SideNav from './SideNav';

class Header extends Component {
    

    renderContent() {
        // this auth object actually has our user data
        switch (this.props.auth){
            // if the reducer is still loading
            case null:
                return 'Loading';
            // if there is no user data
            case false:
                return [
                    <li key='2'><a className='log-in-btn' href='/auth/google'>Login with Google</a></li>
                ]
            // if there is user data
            default:
                return [
                    //satify the react key requirement
                    <li key='1'><Link id='new-list' className='btn dash-btn sidenav-close' to='/'>New List</Link></li>,
                    <li key='2'><Link className='btn dash-btn sidenav-close' to='/tagLists'>Dashboard</Link></li>,
                    <li key='3'><a className='btn logout-btn sidenav-close' href='/api/logout'>Logout</a></li>                    
                ]
        }
    }
    
    

    render() {
        return (
            <div>
                <nav id='navbar' className=''>
                    <div className="nav-wrapper">
                        <a href='/'
                        className="brand-logo black-text"
                        style={{height: '100%', display: 'flex', alignItems: 'center', marginLeft:'.5rem'}}
                        >
                            <img src='/yt-tagger.png' style={{height: '2rem', width: 'auto'}}></img> 
                            MyVideoTagger
                        </a>
                        <SideNav>
                                {this.renderContent()}
                        </SideNav>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {this.renderContent()}
                        </ul>
                    </div>                    
                </nav>
                <div className="hide-on-large-only fixed-action-btn">
                    <div data-target="slide-out" className="sidenav-trigger btn-floating btn-large red darken-4">
                        <i className="material-icons">menu</i>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth }){
    return { auth };
};
export default connect(mapStateToProps)(Header);