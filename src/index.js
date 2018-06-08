import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
//import App from './App';
import Main from './Main';
import registerServiceWorker from './registerServiceWorker';
import {combineReducers, createStore} from 'redux';
/**
 * 一个APP只有一个store, 管理一个state
 * */
const initialState = {
    value: 0,
    value2: 0
};
const valueHandler = (value = 0, action) => {
    switch(action.type){
        case "increase":
            value += 1;
            break;
        case "decrease":
            value -= 1;
            break;
    }
    return value;
};
const value2Handler = (value2 = 0, action) => {return value2};

/**
 * Reducer所接收的函数都是纯函数pure function, 一个input 对应一个确定的返回值
 * 	    1 不能修改参数
 *      2 不能调用系统的I/O的API
 *      3 不能调用Date.now()或Math.random()这种方法，因为每次得到的结果会不一样
 *
 * reducer写法1
 *  单一的reducer
 * 有initialState, reducer接收两个参数state = initialState和action对象
 * */
const reducer1 = (state = initialState, action) => {
    state.value = valueHandler(state.value, action);
    state.value2 = value2Handler(state.value2, action);
    return Object.assign({}, state);
};

/**
 * reducer写法2, 其实和写法1是一样的，只不过把value和value2都放到新的object里
 * */
const reducer2 = (state = initialState, action) => {
    return {
        value: valueHandler(state.value, action),
        value2: value2Handler(state.value2, action)
    }
};

/**
 * reducer写法3
 * use combineReducers
 * 默认地initialState是空{}, 函数名就是state的属性名
 * */
const reducer3 = combineReducers({
    value: valueHandler,  // 如果valueHandler的名字为value和state.value属性的名字一样，就可以只写{value, value2}
    value2: value2Handler
});

/**
 * the unique store accepts one reducer of above
 * */
const store = createStore(reducer3);

ReactDOM.render(<Main store={store} />, document.getElementById('root'));
const render = () => ReactDOM.render(<Main store={store} />, document.getElementById('root'));
store.subscribe(render);
registerServiceWorker();
