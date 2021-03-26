const puppeteer = require('puppeteer');
const id = "pixel48413@bsmitao.com";
const pw = "12345678";
let tab;

// all functions of puppeteer promisifed => gives you a pending promise initially
// opens a new browser instance

let browserOpenPromise = puppeteer.launch({
     headless: false,
     defaultViewport : null,
     args: ["--start-maximized"]
});
// Promise<Pending>

browserOpenPromise.then(function(browser){
    console.log("Browser opened !!!");
    let allPagesPromise = browser.pages();
    return allPagesPromise;
})
.then(function(pages){
    tab = pages[0];
    let pageOpenPromise = tab.goto("https://www.hackerrank.com/auth/login");
    return pageOpenPromise;
    //Promise<pending>
})
.then(function(){
    let ipTypePromise = tab.type("#input-1", id);
    return ipTypePromise;
})
.then(function(){
    let pwTypePromise = tab.type("#input-2", pw);
    return pwTypePromise;
})
.then(function(){
    let loginPromise = tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
    return loginPromise;
})
.then(function(){
    console.log("logged into hackerrank !!!");
})
.catch(function(error){
    console.log(error);
})



// const browser = await puppeteer.launch();
// const page = await browser.newPage();
// await page.goto('https://example.com');
// await page.screenshot({ path: 'example.png' });
// await browser.close();