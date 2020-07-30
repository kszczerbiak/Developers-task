
function addPolys(first, second) {
    try {
        let firstMap = toMap(first);
        let secondMap = toMap(second);
        for (const [power, coeff] of secondMap) {
            const newCoeff = (firstMap.get(power) || 0) + coeff;
                firstMap.set(power, newCoeff);

        }
        return firstMap;
    } catch(err) {
        console.log(err);
    }
}

function toMap(poly) {
    const whitespace = /\s+/g;
    const groups = /[+-]?\d+x?(\^\d+)?/g;
    //delete whitespaces, split into array of groups, make Map
    let map = poly.replace(whitespace, '')
        .match(groups)
        .reduce((all, group) => {
            const [coeff, power] = parseGroup(group);
            return all.set(power, coeff);
        }, new Map);
    return map;

}

function parseGroup(group) {
    const [coeff, power] = group.split('x');
    return [Number(coeff), parsePower(power)];
}

function parsePower(power) {
    switch (power) {
        case undefined:
            return 0;
        case '':
            return 1;
        default:
            return Number(power.replace('^', ''));
    }
}

function toString(polyMap) {
    const formula = [...polyMap.entries()]
        .sort((a, b) => b[0] - a[0])
        .map(toGroup)
        .join('');

        const operationsInBetween = /(?!^)([+-])/g;
        const plusAtStart = /^\+/;

        return formula.replace('^1', '')
        .replace('x^0', '')
        .replace(operationsInBetween, ' $1 ')
        .replace(plusAtStart, '');
}

function toGroup([power, coeff]) {
    const plus = (coeff >= 0) ? '+' : '';
    return `${plus}${coeff}x^${power}`;
}



function calculate() {
    const first = document.getElementById("first").value;
    const second = document.getElementById("second").value;
    const addedMap = addPolys(first, second);
    console.log(addedMap);

    document.getElementById("res").innerHTML = toString(addedMap);

}

module.exports =  { 
addPolys,
parsePower,
parseGroup,
toGroup,
toString,
toMap }