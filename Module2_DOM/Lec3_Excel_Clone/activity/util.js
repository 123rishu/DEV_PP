function solveFormula(formula){
    // ( A1 + A2 )
    let formulaComps = formula.split(" ");
    //["(", "A1", "+", "A2", ")"]

    for(let i=0;i<formulaComps.length;i++){
        let formSingleComp = formulaComps[i];
        if(formSingleComp[0] >= "A" && formSingleComp[0] <= "Z"){
            // valid formula component
            //A1 -> Z100
            let {rowId, colId} = getRowIdColIdFromAddress(formSingleComp);
            let cellObject = db[rowId][colId];
            let value = cellObject.value;
            formula = formula.replace(formSingleComp, value);
            // ( 10 + A2 )
            // in the next iteration when A2 appears, it will make the formula as ( 10 + 20 )
        }
    }
    //Stack Infix Evaluation !!!
    let computedValue = eval(formula);
    return computedValue;
}

function getRowIdColIdFromElement(element){
    let rowId = element.getAttribute("rowid");
    let colId = element.getAttribute("colid");
    return {
        rowId, colId
    }
}

function getRowIdColIdFromAddress(address){
    //B2 => colid, rowid
    let rowId = Number(address.substring(1)) - 1;
    let colId = address.charCodeAt(0) - 65; // 66 - 65 => colId => 1
    return {
        rowId, colId
    }
}