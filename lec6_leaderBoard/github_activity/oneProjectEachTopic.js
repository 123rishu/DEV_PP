const request = require("request");
const cheerio = require("cheerio");
//const {curTopicKaNam} = require("./topFiveProjects");
const fs = require("fs");

function getIssues(curTopicKaNam , link) {
    request(link, function cb(error, response, data){
        parseData(data, curTopicKaNam);
    })
}

// function cb(error, response, data) {
//     //console.log(curTopicKaNam);
    
// }

function parseData(html, curTopicKaNam) {
    let ch = cheerio.load(html);

    let allATags = ch('.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title');
    let curProjectName = ch('a[data-pjax="#js-repo-pjax-container"]').text();
    let issuesFileData = [];
    //console.log(curProjectName);
    for (let i = 0; i < 5; i++) {
        let aTag = allATags[i + ""];
        let issueLink = ch(aTag).attr("href");
        let completeIssueLink = "https://github.com"
        let issueTitle = ch(aTag).text();

        if (issueTitle === undefined || issueLink === undefined) {
            issueTitle = "No issues found";
            issueLink = "No issues found";
        }

        let issue = {
            title: issueTitle,
            link: issueLink,
        }

        issuesFileData.push(issue);

        //let pathname = `./github/`;
        //console.log(__filename);
        //console.log(__dirname);
        //console.log(issueTitle);
        //console.log(issueLink);
        //let issueFilePath = `./github/${__filename}`;
        //console.log(issueFilePath);

    }
    //let curIssuePath = getCurIssuePath(curProjectName);

    let curIssuePath = `./github/${curTopicKaNam}/${curProjectName}/issues.json`;
    
    
    let stringifiedData = JSON.stringify(issuesFileData);
    fs.writeFileSync(curIssuePath, stringifiedData);
}



module.exports = getIssues;















