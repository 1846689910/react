/**
 * Created by Eric on 6/15/2018.
 */
import React, { Component } from 'react';
import logo from './logo.svg';
import AppBody from "./AppBody";
export default (props) => {
    return (<div>
        <header className="App-header" style={{width: "100%"}}>
            <img src={logo} className="App-logo" alt="logo" style={{display: "block", margin: "0 auto"}}/>
            <h1 className="App-title" style={{textAlign: "center"}}>Welcome to Eric's React starter</h1>
        </header>
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{flex: 0.2}} />{/*此div是个占位符，左右各空出0.2个位置*/}
            <div style={{flex: 1, height: "30px", background: "#4286f4"}} />
            <div style={{flex: 1, height: "30px", background: "red"}} />
            <div style={{flex: 1, height: "30px", background: "yellow"}} />
            <div style={{flex: 1, height: "30px", background: "green"}} />
            <div style={{flex: 0.2}} />
        </div>
        <div style={{padding: 0, display: "flex"}}>
            <p className="App-intro" style={{flex: 1, textAlign: "center"}}>
                To get started, please refer <code>src/concise</code>, <code>src/integrationTest</code>, <code>src/TemplateClass</code>
            </p>
        </div>
    </div>);
};