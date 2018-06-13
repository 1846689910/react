import M from "./Messenger";
import $ from "jquery";
import url from "url-parse";
/** LRU Cache, default size 128 if size not given */
class LRUCache {
    constructor(size){
        this.size = size === undefined ? 128 : size;
        this.map = new Map();
        this.head = null;
        this.tail = null;
        this.Node = function(key, value){
            return {
                key: key,
                value: value,
                prev: null,
                next: null
            };
        };
    }
    append(node){
        this.map.set(node.key, node);
        if (this.head === null) {
            this.head = this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
    }
    remove(node){
        this.map.delete(node.key);
        if (node === this.head) {
            this.head = this.head.next;
        }
        if (node === this.tail) {
            this.tail = this.tail.prev;
        }
        if (node.next !== null) {
            node.next.prev = node.prev;
        }
        if (node.prev !== null) {
            node.prev.next = node.next;
        }
        node.prev = null;
        node.next = null;
    }
    set(key, value){
        let node = null;
        if (this.map.get(key) !== undefined) {
            node = this.map.get(key);
            node.value = value;
            this.remove(node);
        } else if (this.map.size < this.size) {
            node = this.Node(key, value);
        } else {
            node = this.tail;
            this.remove(node);
            node.key = key;
            node.value = value;
        }
        this.append(node);
    }
    get(key) {
        let node = this.map.get(key);
        if (node === undefined) return null;
        this.remove(node);
        this.append(node);
        return node.value;
    }
    clear() {
        this.map = new Map();
        this.head = null;
        this.tail = null;
    }
}

/** get time */
const getTime = () => {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " "
        + (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) + ":"
        + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) + ":"
        + (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
};

const fn = () => {
    return "hello world";
};

export default {
    LRUCache: LRUCache,
    getTime: getTime,
    fn: fn
};