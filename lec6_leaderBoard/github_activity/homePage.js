const request = require("request")
const cheerio = require("cheerio");
const fs = require("fs");


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
    //console.log(aTag.attr("href"));
    //  let linkOneText = ch(pTags['0']).text();
    //  let linkTwoText = ch(pTags['1']).text();
    //  let linkThreeText = ch(pTags['2']).text();
    //  console.log(linkOneText, linkTwoText, linkThreeText);
    // let firstFolderPath = `./${linkOneText}`;
    // let secFolderPath = `./${linkTwoText}`;
    // let thirdFolderPath = `./${linkThreeText}`;
    // fs.mkdirSync(firstFolderPath);
    // fs.mkdirSync(secFolderPath);
    // fs.mkdirSync(thirdFolderPath);

     for(let i=0;i<aTags.length;i++){

         let aTagCur = aTags[i+""];
         let link = ch(aTagCur).attr("href");
         console.log(link);
         let pTag = pTags[i+""];
         let pTagCurText = ch(pTag).text();
         //console.log(pTagCurText)
         //let folderPath = `./${pTagCurText}`;
         //fs.mkdirSync(folderPath);

     }







    //console.log(aTag);
    //aTag = aTag.split("\n\r");
    //console.log(aTag);
    //let completeLink = "https://www.espncricinfo.com"+link;
    // console.log(completeLink);
    //getAllMatches(completeLink);
}
