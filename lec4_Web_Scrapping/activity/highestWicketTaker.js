const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

//name: "".
//wickets:"",
//economy: ""

let highestWicketTaker = {};

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/kolkata-knight-riders-vs-rajasthan-royals-54th-match-1216530/full-scorecard" , cb);

function cb(error, response, data){
    parseData(data);
}

function parseData(html){
    let highestWicketSoFar = 0;
    let nameOfHighestWicketTaker;
    let economy;
    let teamName;
    let opponentTeamName;

    let ch = cheerio.load(html);
    let bothScorecards = ch('.Collapsible');
    let bothTeamName = bothScorecards.find(".Collapsible h5");
    let teamNameOne = ch(bothTeamName['0']).text();
    let teamNameTwo = ch(bothTeamName['1']).text();
    teamNameOne = teamNameOne.split("INNINGS")[0].trim();
    teamNameTwo = teamNameTwo.split("INNINGS")[0].trim();
    //console.log(bothTeamName);
    //console.log(teamNameOne);
    //console.log(teamNameTwo);
    //{ '0': {}, '1': {} }
    //let bothBowlingTables = ch('Collapsible .table.bowler.');
    //{ '0': {}, '1': {} }

    for(let i=0;i<bothScorecards.length;i++){
        let scorecard = ch(bothScorecards[`${i}`]);
        let bowlingTable = scorecard.find(".table.bowler");
        let opponentCurTeamName = scorecard.find(".Collapsible h5").text();
        opponentCurTeamName = opponentCurTeamName.split("INNINGS")[0].trim();
        //console.log(teamName);
        let allTrs = ch(bowlingTable).find("tbody tr");
        // // { 0:tr, 1:tr}
        for(let j=0;j<allTrs.length;j++){
            let allTds = ch(allTrs[j]).find("td");
            let wicketsTaken = ch(allTds['4']).text();
            if(wicketsTaken > highestWicketSoFar){
                if(opponentCurTeamName === teamNameTwo){
                   teamName = teamNameOne;
                   opponentTeamName = opponentCurTeamName;
                }
                else if(opponentCurTeamName === teamNameOne){
                    teamName = teamNameTwo;
                    opponentTeamName = opponentCurTeamName;
                }
                highestWicketSoFar = wicketsTaken;
                nameOfHighestWicketTaker = ch(allTds['0']).text();
                economy = ch(allTds['5']).text();
            }
        }

    }


    highestWicketTaker.name = nameOfHighestWicketTaker;
    highestWicketTaker.teamKaName = teamName;
    highestWicketTaker.opponentTeamKaName = opponentTeamName;
    highestWicketTaker.wickets = highestWicketSoFar;
    highestWicketTaker.economy = economy;
    console.log(highestWicketTaker);
}