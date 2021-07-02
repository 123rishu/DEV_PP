const puppeteer = require("puppeteer");
const id = "pixel48413@bsmitao.com";
const pw = "12345678";


(async function(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport:null,
        args: ["--start-maximized"]
    });
    let allPages = await browser.pages();
    let tab = allPages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pw);
    await tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
    await tab.waitForSelector('.username.text-ellipsis');
    await tab.click('.username.text-ellipsis');
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]', {visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
})();

//.nav-tabs.nav.admin-tabbed-nav a