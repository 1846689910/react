/**
 * Created by Eric on 2/1/2018.
 */
const Messenger = () => {
    /** 无状态组件，用于存储，中转数据，对于组件尤其是同级组件之间的交互很有效
     * 及时更新数据，任何导入Messenger的组件都可以拿到更新后的数据，但不会触发组件状态更新
     * 有效避免了无限循环更新的错误。但是应该优先考虑内置的shouldComponentUpdate方法
     * Messenger还可以用于定向数据更新：
     * 组件1中，定义了某方法，用于更新数据，并将事件句柄传给Messenger
     * 在组件2中，当满足某条件，可以直接在Messenger中调用方法来触发组件1的更新或动作
     * */
    return {
        get msg(){
            return this.msg;
        },
        set msg(msg){
            this.msg = msg;
        }
    };
};
Messenger.msg = {
    arr1: [],
    obj1: {},
    handler1: function(){}
};
export default Messenger;