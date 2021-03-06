const puppeteer = require("puppeteer");
const id = "pixel48413@bsmitao.com";
const pw = "12345678";


let challenges = require("./challenges");

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
    await tab.waitForTimeout(5000);
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav a' , {visible:true});
    let bothATags = await tab.$$('.nav-tabs.nav.admin-tabbed-nav a');
    let manageATag = bothATags[1];
    await manageATag.click();

    await tab.waitForSelector('.btn.btn-green.backbone.pull-right', {visible: true});
    
    let createChallengeBtn = await tab.$('.btn.btn-green.backbone.pull-right');
    let createChallengeLink = await tab.evaluate( function(elem){ return elem.getAttribute("href") } , createChallengeBtn);
    createChallengeLink = 'https://www.hackerrank.com' + createChallengeLink;

    //simultaneously open tabs for all challenges
    // for(let i=0;i<challenges.length;i++){
    //     addChallenge(challenges[i], browser, createChallengeLink);
    // }


    //or

    //add challenges one by one
    for(let i=0;i<challenges.length;i++){
        await addChallenge(challenges[i], browser, createChallengeLink);
    }

    //await addChallenge(challenges[0], browser, createChallengeLink);
})();   


//Async function by default returns a pending promise
async function addChallenge(challenge, browser, createChallengeLink){
    let newTab = await browser.newPage();
    await newTab.goto(createChallengeLink);
    await newTab.waitForSelector('#name', {visible:true});

    await newTab.type('#name', challenge["Challenge Name"]);
    await newTab.type('#preview', challenge["Description"]);
    await newTab.type('#problem_statement-container .CodeMirror textarea', challenge["Problem Statement"]);
    await newTab.type('#input_format-container .CodeMirror textarea', challenge["Input Format"]);
    await newTab.type('#constraints-container .CodeMirror textarea', challenge["Constraints"]);
    await newTab.type('#output_format-container .CodeMirror textarea', challenge["Output Format"]);
    await newTab.type('#tags_tag', challenge["Tags"]);
    await newTab.keyboard.press("Enter");
    await newTab.click('.save-challenge.btn.btn-green');

    newTab.close();
}



// let allInputBoxes = await newTab.$$('.block.span12.profile-input');
    // for(let i=0;i<1;i++){
    //     let curInputBox = allInputBoxes[i];
    //     await curInputBox.type('Hello');
    // }

