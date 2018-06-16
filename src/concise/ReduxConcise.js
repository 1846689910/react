import React, { Component } from 'react';
import './../App.css';
import AppHeader from "./AppHeader";

const Counter = (props) => {
    return (
        <div>
            <h3>{props.value}</h3>
            <button className="inc-btn" onClick={props.increase}>increase</button>
            <button className="dec-btn" onClick={props.decrease}>decrease</button>
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
        // console.log(this.store);
        // console.log(this.initialState);
    }
    componentDidUpdate(){
        // console.log("updated");
        // console.log(this.store.getState().value);
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
                <AppHeader />
                <Counter value={this.store.getState().value} increase={this.increase} decrease={this.decrease}/>
            </div>
        );
    }
}

export default Main;
