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
                return <li><a href='/auth/google'>Login with Google</a></li>;
            // if there is user data
            default:
                return [
                    //satify the react key requirement
                    <li key='1'><Link className='btn' to='/tagLists'>Dashboard</Link></li>,
                    <li key='4'><a className='btn red' href='/api/logout'>Logout</a></li>                    
                ]
        }
    }
    
    

    render() {
        return (
            <div>
                <nav className='red darken-4 lighten-1'>
                    <div className="nav-wrapper">
                        <Link 
                        to={this.props.auth ? '/' : '/'} 
                        className="brand-logo"
                        >
                            Video Tagger
                        </Link>
                        <SideNav>
                                {this.renderContent()}
                        </SideNav>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {this.renderContent()}
                        </ul>
                    </div>
                    
                </nav>
            </div>
        );
    }
}

function mapStateToProps({ auth }){
    return { auth };
};
export default connect(mapStateToProps)(Header);