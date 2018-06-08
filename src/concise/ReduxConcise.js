import React, { Component } from 'react';
import logo from './../logo.svg';
import './../App.css';
import { createStore, combineReducers } from 'redux';

const Counter = (props) => {
    return (
        <div>
            <h3>{props.value}</h3>
            <button onClick={props.increase}>increase</button>
            <button onClick={props.decrease}>decrease</button>
        </div>
    );
};

class Main extends Component {
    constructor(props){
        super(props);
        this.store = this.props.store;
        this.initialState = this.store.getState();
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
    }
    static get defaultProps(){
        return {};
    }
    componentDidMount(){
        console.log(this.store);
        console.log(this.initialState);
    }
    componentDidUpdate(){
        console.log("updated");
        console.log(this.store.getState().value);
    }
    increase(){
        this.store.dispatch({
            type: "INCREASE"
        });
    }
    decrease(){
        this.store.dispatch({
            type: "DECREASE"
        });
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <Counter value={this.store.getState().value} increase={this.increase} decrease={this.decrease}/>
            </div>
        );
    }
}

export default Main;
