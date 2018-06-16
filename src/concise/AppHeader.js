/**
 * Created by Eric on 6/15/2018.
 */
import React, { Component } from 'react';
import logo from './../logo.svg';
import $ from 'jquery';
class AppHeader extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    static get defaultProps(){
        return {

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
                revert: "invalid"
            });
        });
    }
    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Eric's React starter</h1>
                </header>
                <div style={{width: "100%", height: "30px"}}>
                    <div style={{width: "30%", height: "100%", display: "inline-block", background: "whitesmoke"}} />
                    <div style={{width: "30%", height: "100%", display: "inline-block", background: "blue"}} />
                    <div style={{width: "30%", height: "100%", display: "inline-block", background: "red"}} />
                </div>
                <p className="App-intro">
                    To get started, please refer <code>src/concise</code>, <code>src/integration</code>, <code>src/TemplateClass</code>
                </p>
                <div style={{width: "40%", margin: "0 auto", textAlign: "center"}}>
                    <div>
                        <div id="draggable" className="ui-state-highlight" style={{margin: "0 auto"}}>Drag me down</div>
                    </div>
                    <div id="sortable">
                        {/*里面每一个拖拽项目必须是块级元素，外层包裹必须是#sortable才可以*/}
                        <div>hello</div>
                        <div>world</div>
                        <div>good</div>
                        <div>morning</div>
                        <div>great</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AppHeader;