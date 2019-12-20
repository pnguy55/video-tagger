Set up main routes from what we know
make sure there is a container class div
make sure you check if there is someone logged in

action creator -> axios -> api -> redux thunk -> authReducer -> content
1) navigate to client directory
2) npm i axios redux-thunk
3) go to index.js
4) import reduxThunk from 'redux-thunk';
5) add reduxThunk to applyMiddleware
    a) applyMiddleware(reduxThunk)

6) create actions folder in src
** remember to hook the app up to store by wrapping in <Provider store={store}></Provider>
7) use authReducer with a switch statement to determine state
8) to actually hookup a component to the store import  
    import { connect } from 'react-redux'

    and at the bottom, in the export statement
    function mapStateToProps({ auth }) {
        return { auth };
    }
    export default connect(mapStateToProps)(Component);