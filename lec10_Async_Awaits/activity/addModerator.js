const puppeteer = require("puppeteer");
const id = "pixel48413@bsmitao.com";
const pw = "12345678";

(async function(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
      }); // 10 sec
    let allPages = await browser.pages();
    let tab = allPages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pw);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});
    await tab.click('div[data-analytics="NavBarProfileDropDown"]');
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    // delay
    await tab.waitForTimeout(5000);
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav a' , {visible:true});
    let bothATags = await tab.$$('.nav-tabs.nav.admin-tabbed-nav a');
    let manageChallengeATag = bothATags[1];
    await manageChallengeATag.click();

    // moderator Add ka code comes here
    await addModerators(browser , tab); // faith => it will add all the moderators on all the pages !!!!
})();   


async function addModerators(browser, tab){

    //1.get all links of all the questions
    await tab.waitForSelector('.backbone.block-center', {visible:true});
    let allATags = await tab.$$('.backbone.block-center');
    let allLinks = [];
    for(let i=0;i<allATags.length;i++){
        let aTag = allATags[i];
        let link = await tab.evaluate(function(elem){
            return elem.getAttribute("href");
        }, aTag);
        allLinks.push(link);
    }
    let completeLinks = allLinks.map(function(link){
        return "https://www.hackerrank.com" + link;
    })
    //console.log(completeLinks);
    //2.loop on allLinks and call addModeratorToQuestion for every quesLink parallelly
    let allModeratorAddPromise = [];
    for(let i=0;i<completeLinks.length;i++){
        let moderatorAddPromise = addModeratorsToAQuestion(completeLinks[i], browser);
        allModeratorAddPromise.push(moderatorAddPromise);
    }

    await Promise.all(allModeratorAddPromise);

    //3.If next button is not disabled then, click on it.
    let allLis = await tab.$$('.pagination li');
    let nextBtnLi = allLis[allLis.length-2];
    let isDisabled = tab.evaluate(function(elem){
        return elem.classList.contains("disabled");
    }, nextBtnLi);
    if(isDisabled){
        return;
    }
    else{
        await nextBtnLi.click();
        await addModerators(browser, tab);
    }
}

async function addModeratorsToAQuestion(qLink, browser){
    let newTab = await browser.newPage();
    await newTab.goto(qLink);
    await newTab.waitForSelector('li[data-tab="moderators"]', {visible:true});
    await newTab.waitForTimeout(1000);
    await newTab.click('li[data-tab="moderators"]');
    await newTab.waitForSelector('#moderator',{visible:true});
    await newTab.click('#moderator', "Rishabh");
    await newTab.click('.btn.moderator-save');
    await newTab.click('.save-challenge.btn.btn-green');
    await newTab.close();
}