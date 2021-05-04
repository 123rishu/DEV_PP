function solveFormula(formula, lastSelectedCellObject){
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

            if(lastSelectedCellObject){
                cellObject.children.push(lastSelectedCellObject.name);
            }
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

function updateChildren(cellObject){
    // {
    //     name:"A1",
    //     value: "100",
    //     formula:"",
    //     children:[]
    // }
    for(let i=0;i<cellObject.children.length;i++){
        let childrenName = cellObject.children[i];

        let {rowId, colId} = getRowIdColIdFromAddress(childrenName);
        let childrenCellObject = db[rowId][colId];

        let newValue = solveFormula(childrenCellObject.formula);
        //Add it to UI
        document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`).textContent = newValue;
        //Add it to DB as well
        childrenCellObject.value = newValue;
        updateChildren(childrenCellObject);
    }


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