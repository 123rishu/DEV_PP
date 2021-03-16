const request = require("request");
const cheerio = require("cheerio");
//const fs = require("fs");

function getIssues(link){
    request(link, cb);
}

function cb(error, respons, data){
    parseData(data);
}

function parseData(html){
    let ch = cheerio.load(html);

    //find it's pTag for making folder
    //find it's aTag href to get the data inside it's each top5 project

    
    
      
}

module.exports = getIssues;
