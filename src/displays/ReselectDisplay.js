import React, { Component } from 'react';
import {createSelector} from  'reselect';
import { connect } from "react-redux";

/**
 * reselect的作用
 *
 1. Selectors can compute derived data, allowing Redux to store the minimal possible state.
 2. Selectors are efficient. A selector is not recomputed unless one of its arguments changes.
 3. Selectors are composable. They can be used as input to other selectors.
 * */

const getVisibleTasks = (tasks, filterText) => {  // 根据state.filterText的变化来决定我们要看的tasks的子集
    switch(filterText){
        case "SHOW_ALL":
            return tasks;
        case "SHOW_COMPLETED":
            return tasks.filter(task => Object.values(task)[0] === "completed");
        case "SHOW_ACTIVE":
            return tasks.filter(task => Object.values(task)[0] === "active");
    }
};

/**
 * the presentational component of VisibleTasks
 * */
const VisibleTasksPC = (props) => {
    const buttonStyle = {
        width: "30%"
    };
    return (
        <div style={props.eachDisplayStyle}>
            <p style={{textAlign: "center"}}><b><i>Reselect Display</i></b></p>
            <div>
                <div>tasks</div>
                <ul>
                    {
                        props.tasks.map((task, i) => <li key={i}>{Object.keys(task)[0]} : {Object.values(task)[0]}</li>)
                    }
                </ul>
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <button className="btn btn-primary" style={buttonStyle} onClick={props.showAll}>All</button>
                    <button className="btn btn-primary" style={buttonStyle} onClick={props.showCompleted}>Completed</button>
                    <button className="btn btn-primary" style={buttonStyle} onClick={props.showActive}>Active</button>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state, props) => {
    return {
        tasks: getVisibleTasks(state.tasks, state.filterText)
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        showAll: () => {
            dispatch({
                type: "SHOW_ALL"
            });
        },
        showCompleted: () => {
            dispatch({
                type: "SHOW_COMPLETED"
            });
        },
        showActive: () => {
            dispatch({
                type: "SHOW_ACTIVE"
            });
        }
    };
};
/**
 * VisibleTasks is the Container Component of VisibleTasksPC
 * */
const VisibleTasks = connect(mapStateToProps, mapDispatchToProps)(VisibleTasksPC);
export default VisibleTasks;