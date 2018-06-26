/**
 * Created by Eric on 6/25/2018.
 */
import React from 'react';
import {MySVGIcon} from "./../Icons";
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
    return (
        <div style={props.eachDisplayStyle}>
            <p style={{textAlign: "center"}}><b><i>Drag and Drop Display</i></b></p>
            <div id="draggable" className="ui-state-highlight">Drag me down</div>
            <div id="sortable">
                {/*里面每一个拖拽项目必须是块级元素，外层包裹必须是#sortable才可以*/}
                <div>hello</div>
                <div>world</div>
                <div>good</div>
                <div>morning</div>
                <div>great</div>
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