import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {createSelector} from 'reselect';
import {connect} from 'react-redux';
import {apiRequest, updateUser} from './actions/user-actions';


class App extends Component {
    constructor(props) {
        super(props);
        this.onUpdateUser = this.onUpdateUser.bind(this);
    }

    componentDidMount() {
        this.props.onApiRequest();
    }


    onUpdateUser(event) {
        this.props.onUpdateUser(event.target.value);
    }

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome Dev Pledge React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div onClick={this.onUpdateUser}>Update User</div>
                <input onChange={this.onUpdateUser}/>
                {this.props.user} <br/>

            </div>
        );
    }
}

const productsSelector = createSelector(
    state => state.products,
    products => products
    )
;

const userSelector = createSelector(
    state => state.user,
    user => user
);

const mapStateToProps = createSelector(
    productsSelector,
    userSelector,
    (products, user) => (
        {
            products,
            user
        }
    )
);


const mapActionsToProps = (
    {
        onUpdateUser: updateUser,
        onApiRequest: apiRequest
    }
);


export default connect(mapStateToProps, mapActionsToProps)(App);
