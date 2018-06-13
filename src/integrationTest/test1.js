/**
 * Front end integration test: we use selenium and mocha to do automation test, which will mock up user activity in webpage
 * run integration test:
 *      npm run mocha src/integrationTest
 * 需要注意的是:
 *  1 integrationTest是在模拟用户对于浏览器的操作, 需要chromedriver和chrome浏览器的版本匹配.
 *      http://chromedriver.storage.googleapis.com/index.html
 *    在上边的网站上有所有的chromedriver的版本，点击任意一个版本进入它的note.txt查看并找到一个和当前浏览器的版本匹配的chromedriver
 *    然后使用
 *          npm i chromedriver@<version> --save --save-exact
 *
 * */
require('chromedriver');
const {Builder, By, Key, until} = require('selenium-webdriver');
const {describe, it, before, beforeEach, after, afterEach} = require('selenium-webdriver/testing');
const assert = require('selenium-webdriver/testing/assert');
describe("Counter component", function(){  // 对于异步测试会需要时间，有可能会超过selenium的默认2000ms的时间，
// 所以我们需要绑定this.timeout(更长时间)，箭头函数是没有绑定this的所以我们需要function(){}
    let driver;
    this.timeout(1000 * 60);
    const host = "http://localhost:3000";

    before(() => {
        driver = new Builder().forBrowser('chrome').build();
    });

    beforeEach(() => {
        console.log("before each test");
    });

    it("should display correct title", (done) => {
        const url = host;
        (async function(){
            await driver.get(url);
            await driver.getTitle().then(title => {
                assert(title).isEqualTo("React App");
                done();
            });
        })();
    });

    it("should increase when clicking the increase button", (done) => {
        const url = host;
        (async function(){
            await driver.get(url);
            await driver.findElement(By.className("inc-btn")).click();
            driver.sleep(1000);
            await driver.findElement(By.js(() => {
                return document.querySelector("h3")
            })).then(ele => ele.getText().then(text => {
                assert(text).isEqualTo('1');
                done();
            }));
        })();
    });

    it("should decrease when clicking the decrease button", (done) => {
        const url = host;
        (async function(){
            await driver.get(url);
            await driver.findElement(By.className("dec-btn")).click();
            driver.sleep(1000);
            await driver.findElement(By.js(() => {
                return document.querySelector("h3")
            })).then(ele => ele.getText().then(text => {
                assert(text).isEqualTo('-1');
                done();
            }));
        })();
    });

    afterEach(() => {
        console.log("after each test");
    });

    after(() => {
        driver.quit();
    });

});