/**
 * change entry point: config/paths.js
 * */
import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/core';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import Main from './concise/ReduxConcise';  /** redux */
import Main1 from "./concise/ReactReduxConcise";  /** display react-redux */
import registerServiceWorker from './registerServiceWorker';
import store from "./concise/Store";
import { Provider } from "react-redux";

/**
 * for only redux rendering
 * */
// const render = () => ReactDOM.render(
//    <Main store={store} />,
//    document.getElementById('root'));
// render();
// store.subscribe(render);  // 最后store一定要subscribe render方法，使得state更新后能及时地刷新UI

/**
 * for react-redux rendering
 * */
ReactDOM.render(
    <Provider store={store}>
        <Main1/>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
