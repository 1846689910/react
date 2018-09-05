/**
 * Created by Eric on 1/20/2018.
 * 本文包含动态组件, 无状态组件的定义和使用.
 * 动态组件：组件被实例化，可以访问this，props，state， 并且有生命周期
 *      React.Component定义方法：不会自动给方法绑定this，只关心需要绑定的方法，它的PropTypes规定在定义外部
 *      React.createClass({})定义方法：会自动给方法绑定this，它的PropTypes规定在定义内部
 * 无状态组件：1组件不会被实例化，整体渲染性能得到提升；2组件不能访问this对象；3组件无法访问生命周期的方法；4无状态组件只能访问props没有state，同样的props会得到同样的渲染结果，不会有副作用
 * 选择原则：
 1 尽量使用无状态函数创建方式
 2 需要状态组件时，尽量使用React.Component方式
 */
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";  // React 从V15.5开始 用于参数验证的prop-types被存放在分开的包中
import M from "./Messenger";
/** Dynamic Component动态组件: 有生命周期，有state，可以使用refs的组件
 * 对于子组件<Element ref="xxx">的this.refs.xxx调用只可以在React.组件life cycle的方法中进行
 * 组件生命周期：will mount→ did mount→ will receive props→ should update→ will update→ did update→ (will unmount)
 *
 * 1 父组件可以把自己的state作为属性传给子组件，子组件拿到时就成了props，子组件要想更新这些属性，就要又父组件再传递一个更新方法，由子组件触发
 * 通知父组件更新自己的state，子组件就可以拿到新的props，接着可以通过生命周期的方法来更新自己
 *
 * 2 兄弟组件之间的交互可以借由父组件来传递数据，尽量避免组件间的双向数据流动，有引发maximum call stack overflow的风险
 *
 * 3 尽量减少使用有状态组件，或者尽量减少注册this.state上的状态，容易形成maximum call stack overflow. 发生无限更新循环时，解决方法：
 *      1 可以考虑，将引起循环的状态值this.state.a 变成普通值，this.a放在构造函数constructor中，根据生命周期函数的获取值，来写代码手动更新这个值
 *          这个值，更新了之后，代码中也可以获取到的，但是对状态没有影响，不会引起状态刷新。但是要考虑周全，所有的都要更新
 *      2 可以考虑，通过DOM的事件来进行触发。避免组件之间的双向数据流动。可以由dom元素注册事件addEventListener. 然后需要刷新状态时，不直接通过setState
 *          而是使用对方的DOM方法，比如让元素.click()，让他自己触发来更新状态，形成单向数据流动
 * */
class Template1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  // set initial state
            myState: "STATE_VAL1"
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);  /**需要绑定的原因:
         通过function fn(){}或者fn(){}定义的方法内部是有自己的this关键字的，如果我们创建了Template1的实例let a = new Template1()
         然后使用const fn1 = a.fn, 然后在全局使用fn1().这样其内部的this会指向全局，会导致this指向混乱,所以我们在这里绑定this
         */
        /** 绑定this的解决方法2:
         * 除了绑定我们可以在组件内用arrow function来定义方法，就不会出现this混乱问题。因为()=>{}箭头函数没有自己的this，他的this要向
         * 自身定义域来继承或父域来继承this，所以无需绑定.
         * 注意:箭头函数自身没有this, 在他里面用的this就是组件的this
         * */
    }
    static get defaultProps(){  /**set default props, 静态变量，可以由Template1.myStaticValue直接调用,可调用也可修改*/
        return {
            name: "Eric"
        };
    }
    componentWillMount() {
        /** 在渲染前调用,在客户端也在服务端 */
        console.log('Component WILL MOUNT!')
    }
    componentDidMount() {
        /** 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。
         * 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval
         * 或者发送AJAX请求等操作(防止异部操作阻塞UI)
         */
        console.log('Component DID MOUNT!');
        let div = this.domDiv;
        let input = this.domInput;
        console.log(input.value);
    }
    componentWillReceiveProps(newProps) {
        /** 已加载的组件收到新参数时调用 */
        console.log('Component WILL RECEIVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
        /** 返回一个布尔值。在组件接收到新的props或者state时被调用。
         * 在初始化时或者使用forceUpdate时不被调用。可以在你确认不需要更新组件时使用 */
        /** 如果不方便使用的时候，考虑使用Messenger来传递中转数据，尤其对于同级组件间的数据传递很有效
         * */
        console.log("Component should update");
        return true;
    }
    componentWillUpdate(newProps, newState) {
        /** 在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用 */
        console.log('Component WILL UPDATE!');
    }
    componentDidUpdate(oldProps, oldState) {
        /** 在组件完成更新后立即调用。在初始化时不会被调用 */
        console.log('Component DID UPDATE!')
    }
    componentWillUnmount() {
        /** 在组件从 DOM 中移除的时候立刻被调用 */
        console.log('Component WILL UNMOUNT!')
    }
    handleClick(){
        console.log("I was clicked");
    }
    handleChange(event){
        /** setState方法一：重置键值对 */
        this.setState({
            myState: event.target.value
        }, () => {  /** setState还可以接受一个回调函数，将在state设置完毕之后触发，可以在这里调用到最新的state */
            console.log(`now, myState = ${this.state.myState}`);

        });
    }
    handleChange1(event){
        /** setState方法二：更新键值对 */
        this.setState(function(state, props){
            console.log(state);  /** 当前的state */
            console.log(props);  /** 当前的props */
            return {
                myState: state.myState + event.target.value  /** 根据当前的state来构造新的state */
            }
        });
    }
    handleChange2 = (e) => {  /**无需绑定this，原因见上文*/
        this.setState({
            myState: e.target.value
        });
    }
    copy(obj, isDeepCopy) {
        if (obj === null) return null;
        if (isDeepCopy) return JSON.parse(JSON.stringify(obj));
        if (typeof obj === "object") {
            if (Array.isArray(obj)) {
                return [].concat(obj);
            } else {
                return Object.assign({}, obj);
            }
        }
    }

    render(){
        return (
            <div>
                <div ref={(r) => {this.domDiv = r}}>
                    {/*在react 16之后，ref要用函数包裹, 调用就直接this.domDiv就能拿到这个DOM元素或者组件*/}
                    <input className="img-rounded" type="text" value={this.state.myState} onChange={this.handleChange} ref={(r) => {this.domInput = r}}/>
                </div>
                <p>Initial state: {this.state.myState}</p>
                <p>Initial props: {this.props.name}</p>
                <button className="btn btn-primary" onClick={this.handleClick}>Click Me</button>
            </div>
        );
    }
}
Template1.myStaticValue = 123;  /**静态变量，可以由Template1.myStaticValue直接调用,可调用也可修改*/
Template1.propTypes = {
    age: PropTypes.number,  /** React15.5及之后的版本都这么写 */
};
/**
 可以放入其中的验证类型, 这里是React15.4及以下版本的写法，如果React15.5之后的版本，就直接用PropTypes.xxx.isRequired等
 // 可以声明 prop 为指定的 JS 基本数据类型，默认情况，这些数据是可选的
 optionalArray: React.PropTypes.array,
 optionalBool: React.PropTypes.bool,
 optionalFunc: React.PropTypes.func,
 optionalNumber: React.PropTypes.number,
 optionalObject: React.PropTypes.object,
 optionalString: React.PropTypes.string,
 // 可以被渲染的对象 numbers, strings, elements 或 array
 optionalNode: React.PropTypes.node,
 //  React 元素
 optionalElement: React.PropTypes.element,
 // 用 JS 的 instanceof 操作符声明 prop 为类的实例。
 optionalMessage: React.PropTypes.instanceOf(Message),
 // 用 enum 来限制 prop 只接受指定的值。
 optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),
 // 可以是多个对象类型中的一个
 optionalUnion: React.PropTypes.oneOfType([
 React.PropTypes.string,
 React.PropTypes.number,
 React.PropTypes.instanceOf(Message)
 ]),
 // 指定类型组成的数组
 optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),
 // 指定类型的属性构成的对象
 optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),
 // 特定 shape 参数的对象
 optionalObjectWithShape: React.PropTypes.shape({
       color: React.PropTypes.string,
       fontSize: React.PropTypes.number
   }),
 // 任意类型加上 `isRequired` 来使 prop 不可空。
 requiredFunc: React.PropTypes.func.isRequired,
 // 不可空的任意类型
 requiredAny: React.PropTypes.any.isRequired,
 // 自定义验证器。如果验证失败需要返回一个 Error 对象。不要直接使用 `console.warn` 或抛异常，因为这样 `oneOfType` 会失效。

 * */
/**
 * 动态组件React.CreateClass法定义, React15.5之后会被废弃，在React16.0之后会被完全移除, 不建议使用了
 * */

/*
const Template2 = React.createClass({  // return an object
    propTypes: { // as an object
        name: PropTypes.string
    },
    getInitialState(){  /!** set initial state *!/
        return {
            isEditing: false
        };
    },
    getDefaultProps(){  /!** set default props *!/
        return {
            name: "alex",
        };
    },
    handleClick(){
        this.setState(function(state){  /!** change state by using setState() method *!/
            return {
                isEditing: ! state.isEditing,
            };
        });
    },
    render(){
        return (<div onClick={this.handleClick}>
            <h1>Hello {this.props.name}, age: {this.props.age}</h1>
            <h2>{this.state.isEditing ? "Not Available" : "Ready"}</h2>
        </div>);
    }
});
*/
/** Static(Stateless) Component无状态组件: 组件不会被实例化，组件无生命周期，无state只有props，不可使用refs */
const Template3 = (props) => {  // 相当于const Template2 = function(props){};
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    );
};
module.exports = {
    Template1: Template1,
    Template3: Template3
};
/**
 * 组件的import 和 export有两种：
 *      1 集中式：常见于对于方法封装的类
 *          导出:
 *          export default {
 *              AAA: AAA,
 *              BBB: BBB
 *          }
 *          或者
 *          module.exports = {
 *              AAA: AAA,
 *              BBB: BBB
 *          }
 *          导入:
 *          import utils from "./xxx";
 *          调用: utils.AAA或者utils.BBB
 *      2 分散式: 常见于对于组件封装的类
 *          导出:
 *          export const AAA = (props) => {...};
 *          export function BBB (props){...}
 *          export class CCC extends React.Component{...}
 *          **注意：要对其中每一个都用export, 不能在最后使用export {AAA: AAA, ...}
 *          导入:
 *          import {AAA, BBB, CCC} from "./xxx";
 * */

/**
 * @deprecated  此部分可能已过时
 * 在main.js中获取时
 import Template from "./Template";
 const Template1 = Template.Template1;
 ReactDOM.render(
 <Template1 />,
 document.querySelector("#root")
 );
 关于导出组件，只有module.exports方式之后在别的组件导入时可以直接拿出内部组件，用import {Template1, Template2} from "..."
 * */

/**
 * npm install <package> 安装该package最新的version
 * npm install <package>@<version> 安装该package的某个确定的version
 *      --save 写入package.json,  --save --save-exact 将确定的version写入package.json
 * npm uninstall <package>
 * npm -v 查看npm的version
 * npm view <package> version 查看在npm中，该package的当前最新版本
 * npm list <package> 查看已安装的package的版本
 * npm list 所有dependencies版本号
 * npm list --depth=0
 *
 *
 * 在package.json中，除了定义了本app的信息，package版本信息外还可以设置自己的命令流
 * 在scripts一项中，可以设置自己的命令, 并执行:
 *      npm run <命令>
 * 比如使用npm run jest来跑test，或者使用npm run jest src/test 来指定目录或文件名来跑特定的test
 * npm run mocha integrationTest 来跑integrationTest
 *
 * some time npm cannot install, with 404 error
 *      npm set registry http://registry.npmjs.org/
 * */