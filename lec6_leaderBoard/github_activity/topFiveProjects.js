const request = require("request");
const cheerio = require("cheerio");

function getTopFiveProjectLink(link){
    request(link, cb);
}

function cb(error, respons, data){
    parseData(data);
}

function parseData(html){
    let ch = cheerio.load(html);















    
}

module.exports = getTopFiveProjectLink;
