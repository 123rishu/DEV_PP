const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

//name: "".
//wickets:"",
//economy: ""

let highestWicketTaker = {};

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/kolkata-knight-riders-vs-rajasthan-royals-54th-match-1216530/full-scorecard" , cb);

function cb(error, respons, data){
    parseData(data);
}

function parseData(html){
    let highestWicketSoFar = 0;
    let nameOfHighestWicketTaker;
    let economy;

    let ch = cheerio.load(html);
    let bothBowlingTables = ch('.Collapsible .table.bowler');
    //{ '0': {}, '1': {} }

    for(let i=0;i<bothBowlingTables.length;i++){
        let bowlingTable = bothBowlingTables[`${i}`];
        let allTrs = ch(bowlingTable).find("tbody tr");
        // { 0:tr, 1:tr}
        for(let j=0;j<allTrs.length;j++){
            let allTds = ch(allTrs[j]).find("td");
            let wicketsTaken = ch(allTds['4']).text();
            if(wicketsTaken > highestWicketSoFar){
                highestWicketSoFar = wicketsTaken;
                nameOfHighestWicketTaker = ch(allTds['0']).text();
                economy = ch(allTds['5']).text();
            }
        }

    }
    highestWicketTaker.name = nameOfHighestWicketTaker;
    highestWicketTaker.wickets = highestWicketSoFar;
    highestWicketTaker.economy = economy;
    console.log(highestWicketTaker);
}