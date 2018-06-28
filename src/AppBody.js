import React from 'react';
import {SVGDisplay, DragNDropDisplay, FlexGridDisplay, FileDragNDropDisplay, SpinnerDisplay} from './displays/display1';
import ReselectDisplay from './displays/ReselectDisplay';
import utils from './utils';
export default (props) => {
    const rowWrapperStyle = {
        display: "flex",
            justifyContent: "space-evenly",
            marginTop: "10px"
    };
    const eachDisplayStyle = {
        padding: 0,
            background: "whitesmoke",
            width: "32%"
    };
    console.log(utils.getTime());

    return (<div>
        <div style={rowWrapperStyle}>
            <SVGDisplay eachDisplayStyle={eachDisplayStyle}/>
            <DragNDropDisplay eachDisplayStyle={eachDisplayStyle}/> {/* jquery ui issue, sortable element when drag and drop with the existence of scroll bar not at the top, will jumps down with offset of scroll bar */}
            <FlexGridDisplay eachDisplayStyle={eachDisplayStyle}/>
        </div>
        <div style={rowWrapperStyle}>
            {/*<div style={this.props.eachDisplayStyle}>Other display here</div>*/}
            <ReselectDisplay store={props.store} eachDisplayStyle={eachDisplayStyle}/>
            {/* needs to pass down store explicitly layer by layer when doing pure redux display, because no Provider from react-redux now */}
            <FileDragNDropDisplay eachDisplayStyle={eachDisplayStyle}/>
            <SpinnerDisplay eachDisplayStyle={eachDisplayStyle} />
        </div>
    </div>);
};
