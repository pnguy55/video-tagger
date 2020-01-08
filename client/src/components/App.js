import React, { Component } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import TagListWizard from './tagLists/TagListWizard';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    };
    render() {
        return (
            <div>
                <HashRouter basename='/'>
                    <div>
                        {/* the exact makes sure that it only shows up on that path */}
                        <Header/>
                        <Route exact path='/' component={TagListWizard} />
                        <Route exact path='/tagLists' component={Dashboard} />
                        {/* <Route path='/tagLists/new' component={TagListWizard} /> */}
                        <Route path='/landing' component={Landing} />
                    </div>
                </HashRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);