const request = require("request")
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const {getTopFiveProjectLink} = require("./topFiveProjects");


//let path = https://github.com/topics;


request("https://github.com/topics" , cb);

function cb(error , response , data){
    parseData(data);
}

function parseData(html){
    // cheerio highly jquery
    let ch = cheerio.load(html);
    let pTags = ch('.f3.lh-condensed.text-center.Link--primary.mb-0.mt-1');
    let aTags = ch('.no-underline.d-flex.flex-column.flex-justify-center');
    //console.log(aTags);
    

     for(let i=0;i<aTags.length;i++){

         let aTagCur = aTags[i+""];
         let link = ch(aTagCur).attr("href");
         //console.log(link);
         let pTag = pTags[i+""];
         let pTagCurText = ch(pTag).text();
         pTagCurText = pTagCurText.toLowerCase();
         pTagCurText = pTagCurText.replace(/(\r\n|\n|\r)/gm,"");
         pTagCurText = pTagCurText.trim();
        //console.log(pTagCurText);
         let folderPath = `./github/${pTagCurText}`;
         //console.log(folderPath);
         fs.mkdirSync(folderPath);
         let completeLink = "https://github.com" + link;
         getTopFiveProjectLink(completeLink);

     }

}
