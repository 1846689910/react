import React, { Component } from 'react';
import './../App.css';
import { connect } from "react-redux";
import AppHeader from "../AppHeader";

/**
 * Counter is a presentational component(pc)
 * pc (for UI only, no state mgmt, all data from props, no redux api)
 * */
const CounterPC = (props) => {
    const divStyle = {
        padding: 0
    };
    return (
        <div>
            <div className="row">
                <div className="col-sm-12" style={divStyle}>
                    <p><b><i>React-Redux Display</i></b>(for pure Redux Display change <code>src/index.js</code>)</p>
                </div>
                <div className="col-sm-12" style={divStyle}>
                    <h3>{props.value}</h3>
                    <button className="inc-btn" onClick={props.increase}>increase</button>
                    <button className="dec-btn" onClick={props.decrease}>decrease</button>
                </div>
            </div>
        </div>
    );
};

/**
 * mapStateToProps: 建立state到内部pc组件的联系，使得内部PC组件可以拿到更新的state和props
 * */
const mapStateToProps = (state, props) => {
    return {
        value: state.value  // 连接CounterPC的属性value到state的value属性
    };
};

/**
 * mapDispatchToProps: 建立dispatch方法到props的连接，使得内部PC组件可以向外发送
 * 写法1：作为函数 => 返回对象，每个键值对都会返回一个函数，内部发送Action
 * */
const mapDispatchToProps1 = (dispatch, props) => {
    return {
        increase: () => {
            dispatch({
                type: "INCREASE"
            });
        },
        decrease: () => {
            dispatch({
                type: "DECREASE"
            });
        }
    };
};
/**
 * 写法2：作为object, 每个键值对都会返回一个函数，内部返回一个Action
 * */
const mapDispatchToProps2 = {
    increase: () => {
        return {
            type: "INCREASE"
        };
    },
    decrease: () => {
        return {
            type: "DECREASE"
        };
    }
};


/**
 * CounterCC is CounterPC's container component(cc)
 * cc (manage state and logic, no UI, use redux api)
 * 如果CounterCC没有传入mapStateToProps和mapDispatchToProps的话，那么内部的PC组件不会及时地刷新UI
 * */
const CounterCC = connect(
    mapStateToProps,
    mapDispatchToProps2
)(CounterPC);


const Main = () => {
    return (
        <div className="App container-fluid">
            <AppHeader />
            <CounterCC />
        </div>
    );
};

export default Main;
