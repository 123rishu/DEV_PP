const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const getIssues = require("./oneProjectEachTopic");


function getTopFiveProjectLink(link){
    request(link, cb);
}

function cb(error, respons, data){
    parseData(data);
}

function parseData(html){
    let ch = cheerio.load(html);

    //find it's pTag for making folder
    //find it's aTag href to get the data inside it's each top5 project

    let allATags = ch('a.text-bold');
    //console.log(allATags);
    for(let i=0;i<5;i++){
        let aTag = allATags[i+""];
        let link = ch(aTag).attr("href");
        //console.log(link);
        let linkKaArray = link.split("/");
        //console.log(linkKaArray);
        linkKaLastPartText = linkKaArray[2];
        //console.log(linkKaLastPartText);
        let curTopicKaNam = ch('.h1-mktg').text();
        curTopicKaNam = curTopicKaNam.toLowerCase();
        curTopicKaNam = curTopicKaNam.replace(/(\r\n|\n|\r)/gm,"");
        curTopicKaNam = curTopicKaNam.trim();
        //module.exports.curTopicKaNam = curTopicKaNam;
       // console.log(curTopicKaNam);
        let completeLink = `https://github.com${link}/issues`;
        //console.log(completeLink);
        let folderPath = `./github/${curTopicKaNam}/${linkKaLastPartText}`;
        //console.log(folderPath);
        fs.mkdirSync(folderPath);
        getIssues(completeLink);
    }    
}

module.exports.getTopFiveProjectLink = getTopFiveProjectLink;
