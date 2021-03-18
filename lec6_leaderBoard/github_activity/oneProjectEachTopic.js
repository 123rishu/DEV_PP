const request = require("request");
const cheerio = require("cheerio");
//const {curTopicKaNam} = require("./topFiveProjects");
const fs = require("fs");




// function checkFolder(extension , folderPath) {
//   // .mp3
//   // folderPath ( "./Downloads/Audio" )
//   // check if extension is matching with any folderName
//   // .jpg => Images
//   // "./Downloads"
//   for (let key in extensions) {
//     // "Images" \\ "Audio" ......
//     if ( extensions[key].includes(extension)) {
//       // string interpolation
//       extFolderPath = `${folderPath}/${key}`;
//       break;
//     }
//   }
//   // "./Downloads/Images"
//   return fs.existsSync(extFolderPath);
// }



function getIssues(link) {
    request(link, cb);
}

function cb(error, response, data) {
    //console.log(curTopicKaNam);
    parseData(data);
}

function parseData(html) {
    let ch = cheerio.load(html);

    let allATags = ch('.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title');
    let curProjectName = ch('a[data-pjax="#js-repo-pjax-container"]').text();
    let issuesFileData = [];
    //console.log(curProjectName);
    for (let i = 0; i < 5; i++) {
        let aTag = allATags[i + ""];
        let issueLink = ch(aTag).attr("href");
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
    let curIssuePath = getCurIssuePath(curProjectName);
    
    
    let stringifiedData = JSON.stringify(issuesFileData);
    fs.writeFileSync(curIssuePath, stringifiedData);
}


function getCurIssuePath(curProjectName) {
    const dir = './github';
    const foldersName = fs.readdirSync(dir);
    const fOne = foldersName[0];
    const fTwo = foldersName[1];
    const fThree = foldersName[2];
    //console.log(foldersName);   

    const subDirOne = `./github/${foldersName[0]}`;
    const subFoldersNameOne = fs.readdirSync(subDirOne);
    //console.log(subFoldersNameOne);

    const subDirTwo = `./github/${foldersName[1]}`;
    const subFoldersNameTwo = fs.readdirSync(subDirTwo);
    //console.log(subFoldersNameTwo);

    const subDirThree = `./github/${foldersName[2]}`;
    const subFoldersNameThree = fs.readdirSync(subDirThree);
    //console.log(subFoldersNameThree);

    //create an object containing details of folder and its subfolders
    var key1 = `${fOne}`;
    var key2 = `${fTwo}`;
    var key3 = `${fThree}`;
    var object = {};
    object[key1] = [`${subFoldersNameOne[0]}`, `${subFoldersNameOne[1]}`, `${subFoldersNameOne[2]}`, `${subFoldersNameOne[3]}`, `${subFoldersNameOne[4]}`];
    object[key2] = [`${subFoldersNameTwo[0]}`, `${subFoldersNameTwo[1]}`, `${subFoldersNameTwo[2]}`, `${subFoldersNameTwo[3]}`, `${subFoldersNameTwo[4]}`,];
    object[key3] = [`${subFoldersNameThree[0]}`, `${subFoldersNameThree[1]}`, `${subFoldersNameThree[2]}`, `${subFoldersNameThree[3]}`, `${subFoldersNameThree[4]}`];
    //console.log(object);

    //curProjectName
    let curIssuePath;
    for (let key in object) {
        //key - docker , javascript, ...
        //console.log(`${key}`);
        if(object[key].includes(curProjectName)){
            curIssuePath = `./github/${key}/${curProjectName}/issues.json`;
        }
    }

    return curIssuePath;

}

module.exports = getIssues;















