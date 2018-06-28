/**
 * Created by Eric on 6/25/2018.
 */
import React from 'react';
import {MySVGIcon} from "./../Icons";
import $ from "jquery";
export const SVGDisplay = (props) => {
    return (
        <div style={props.eachDisplayStyle}>
            <p style={{textAlign: "center"}}><b><i>SVG Icon Display</i></b></p>
            <p style={{textAlign: "center"}}>use SVG as icon in jsx, concise refer to <code>Icons.js</code></p>
            <MySVGIcon wrapperStyle={{display: "block", margin: "0 auto", textAlign: "center"}} width="80px" height="80px" pathStyle={{fill: "red"}}/>
            {/* wrapperStyle to set position of the icon, width, height should be set separately, path style to set color ... */}
        </div>
    );
};
export const DragNDropDisplay = (props) => {
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
    return (
        <div style={Object.assign({}, props.eachDisplayStyle)}>
            <p style={{textAlign: "center"}}><b><i>Drag and Drop Display</i></b></p>
            {/** 为了解决有滚动条时，拖拽会jump to bottom and then bounce back的问题, 需要#sortable有position relative */}
            <div id="draggable" className="ui-state-highlight" style={{width: "150px"}}>Drag me down</div>
            <div id="sortable" style={{position: "relative"}}>
                {/*里面每一个拖拽项目必须是块级元素，外层包裹必须是#sortable才可以*/}
                <div className="sortable-item">hello</div>
                <div className="sortable-item">world</div>
                <div className="sortable-item">good</div>
                <div className="sortable-item">morning</div>
                <div className="sortable-item">great</div>
            </div>
        </div>
    );
};
export const FlexGridDisplay = (props) => {
    return (
        <div style={props.eachDisplayStyle}>
            <p style={{textAlign: "center"}}><b><i>Flex Grid Display</i></b></p>
            <div>outer <i><b>display:flex</b></i> with inner <i><b>flex: [width]</b></i></div>
            <div style={{display: "flex"}}>
                <div style={{flex: 0.5, background: "#999999"}}></div>
                <div style={{flex: 1, textAlign: "center", background: "#ff0000"}}>hello</div>
                <div style={{flex: 1, textAlign: "center", background: "#00ff00"}}>world</div>
                <div style={{flex: 1, textAlign: "right", background: "#0000ff"}}>logout</div>
                <div style={{flex: 0.5, background: "#999999"}}></div>
            </div>
            <div>outer <i><b>display:flex</b></i> and <i><b>justify-content</b></i> with inner <i><b>width: ...%</b></i></div>
            <div style={{display: "flex", justifyContent: "space-evenly", background: "#999999"}}>
                <div style={{width: "30%", textAlign: "center", background: "#ff0000"}}>hello</div>
                <div style={{width: "30%", textAlign: "center", background: "#00ff00"}}>world</div>
                <div style={{width: "30%", textAlign: "right", background: "#0000ff"}}>logout</div>
            </div>
        </div>
    );
};
export const FileDragNDropDisplay = (props) => {
    const dropZoneStyle = {
        width: "70%",
        height: "100px",
        background: "gray",
        border: "2px dashed black"
    };
    const dragOverHandler = (e) => {
        e.preventDefault();
        console.log("drag over drop zone");
    };

    const readFile = (file) => {
        console.log(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            console.log(content);
        };
        reader.readAsText(file);
    };
    const removeDragData = (e) => {
        if (e.dataTransfer.items) {
            // Use DataTransferItemList interface to remove the drag data
            e.dataTransfer.items.clear();
        } else {
            // Use DataTransfer interface to remove the drag data
            e.dataTransfer.clearData();
        }
    };
    const dropHandler = (e) => {
        e.preventDefault();
        if (e.dataTransfer === undefined && e.originalEvent && e.originalEvent.dataTransfer) e.dataTransfer = e.originalEvent.dataTransfer;
        if (e.dataTransfer.items) {
            for (let i = 0; i < e.dataTransfer.items.length; i ++) {
                // If dropped items aren't files, reject them
                if (e.dataTransfer.items[i].kind === 'file') {
                    const file = e.dataTransfer.items[i].getAsFile();
                    readFile(file);  // bind this to readerOnLoadFn, for the use of this inside function of readerOnLoadFn
                }
            }
        } else {
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
                const file = e.dataTransfer.files[i];
                readFile(file);
            }
        }
        removeDragData(e);
    };
    return (<div style={props.eachDisplayStyle}>
        <p style={{textAlign: "center"}}><b><i>File Drag And Drop Display</i></b></p>
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={dropZoneStyle} onDragOver={dragOverHandler} onDrop={dropHandler}>Please drop here</div>
        </div>
    </div>);
};
export const SpinnerDisplay = (props) => {
    let timer;
    let deg = 1;
    let total = 5000;
    let run = 0;
    const start = () => {
        const that = this;
        if (timer === undefined)
        timer = setInterval(() => {
            deg = deg === 360 ? 1 : deg + 1;
            that._spinner.style.transform = "rotate(" + deg + "deg)";
        }, 5);
    };
    const stop = () => {
        if (timer) {
            clearInterval(timer);
            timer = undefined;
        }
    };
    const runFor5s = () => {
        const that = this;
        if (timer === undefined) {
            deg = 1;
            timer = setInterval(() => {
                deg = deg === 360 ? 1 : deg + 1;
                run += 5;
                that._spinner.style.transform = "rotate(" + deg + "deg)";
                that._run.innerText = run;
                if (run >= total) {
                    stop();
                    run = 0;
                }
            }, 5);
        }
    };
    return (
        <div style={props.eachDisplayStyle}>
            <p style={{textAlign: "center"}}><b><i>Spinner Display</i></b></p>
            <div style={{textAlign: "center", fontSize: "30px"}}>
                <i className="fa fa-spinner" aria-hidden="true" ref={(r) => this._spinner = r}/>
                {/** 现在ref也可以在无状态组件中获取DOM元素了 */}
            </div>
            <div style={{display: "flex", justifyContent: "space-evenly", marginTop: "30px"}}>
                <button className="btn btn-primary start-btn" style={{width: "20%"}} onClick={start}>start</button>
                <button className="btn btn-primary run-for-btn" style={{width: "40%"}} onClick={runFor5s}>run for <span ref={(r) => this._run = r}>{run}</span></button>
                <button className="btn btn-primary stop-btn" style={{width: "20%"}} onClick={stop}>stop</button>
            </div>
        </div>
    );
};