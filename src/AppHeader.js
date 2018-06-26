/**
 * Created by Eric on 6/15/2018.
 */
import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import utils from "./utils";
import {SVGDisplay, DragNDropDisplay, FlexGridDisplay} from './displays/display1';
class AppHeader extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    static get defaultProps(){
        return {
            eachDisplayStyle: {
                padding: 0,
                background: "whitesmoke",
                width: "32%"
            }
        };
    }
    componentDidMount(){
        $( function() {  // 使用jquery-ui的特性来拖拽调整顺序
            $( "#sortable" ).sortable({
                axis: "y",  /** 可以限制拖拽方向为x或y */
                revert: true,
                cancel: ".classname1", /** 当你点到某个类的元素时，不允许拖拽 */
                //handle: ".classname2",  /** 只有拖拽某个类的元素时，拖拽动作才被允许执行 */
                start: function(event, ui){

                },
                update: function(event, ui){

                },
                stop: function(event, ui){

                }
            });
            $( "#draggable" ).draggable({
                connectToSortable: "#sortable",
                helper: "clone",
                revert: "invalid",
                axis: "y"
            });
        });
        console.log(utils.getTime());
    }
    render() {
        return (
            <div>
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
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <SVGDisplay eachDisplayStyle={this.props.eachDisplayStyle}/>
                    <DragNDropDisplay eachDisplayStyle={this.props.eachDisplayStyle}/>
                    <FlexGridDisplay eachDisplayStyle={this.props.eachDisplayStyle}/>
                </div>
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    {/*<div style={this.props.eachDisplayStyle}>Other display here</div>*/}
                </div>
        </div>
        );
    }
}
export default AppHeader;