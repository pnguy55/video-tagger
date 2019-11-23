import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>


class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    };
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        {/* the exact makes sure that it only shows up on that path */}
                        <Header/>
                        <Route exact path='/' component={Landing} />
                        <Route exact path='/surveys' component={Dashboard} />
                        <Route path='/survey/new' component={SurveyNew} />
                        <Route path='/landing' component={Landing} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);