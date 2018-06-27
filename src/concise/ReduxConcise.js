import React, { Component } from 'react';
import './../App.css';
import AppHeader from "../AppHeader";
import AppBody from "../AppBody";

const Counter = (props) => {
    const divStyle = {
        padding: 0,
    };
    return (
        <div>
            <p style={{textAlign: "center"}}><b><i>pure Redux Display</i></b>(for React-Redux Display change <code>src/index.js</code>)</p>
            <div style={divStyle}>
                <h3 style={{textAlign: "center"}}>{props.value}</h3>
                <div style={{textAlign: "center"}}>
                    <button className="inc-btn" onClick={props.increase}>increase</button>
                    <button className="dec-btn" onClick={props.decrease}>decrease</button>
                </div>
            </div>
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
            <div>
                <AppHeader store={this.store}/>
                <Counter value={this.store.getState().value} increase={this.increase} decrease={this.decrease}/>
                <AppBody store={this.store} /> {/* <ReselectDisplay /> needs store in props when doing pure redux display
             without react-redux assistance, so needs pass down store layer by layer */}
            </div>
        );
    }
}

export default Main;
