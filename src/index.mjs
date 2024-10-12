import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello JavaScript!</h1>
`;


const input = {
    A: (a, b, c) => a + b + c,
    B: (a, b, c) => a - b - c,
    C: (a, b, c) => a + (b * c),
    D: {
        E: (a, b, c) => a + b + c
    }
}

function compute(...args) {
    function calculate(inputObj, ...args) {
        let res = {}
        for (let key in inputObj) {
            if (typeof inputObj[key] === 'function') {
                res[key] = inputObj[key](...args);
            }
            else if (typeof inputObj[key] === 'object') {
                res[key] = calculate(inputObj[key], ...args)
            }
        }
        return res;
    }
    return calculate(input, ...args);
}

let res = compute(1, 1, 1)
console.log(res);

// Custom reduce

Array.prototype.myReduce = function(callback, initVal) {
    if (typeof callback !== 'function') {
        throw new Error('Cannot apply reduce')
    }

    let acc = this[0], i = 1;

    if (initVal !== undefined) {
        acc = initVal;
        i = 0
    }

    while (i < this.length) {
        acc = callback(acc, this[i], i, this);
        i++;
    }

    return acc;
}

let arr = [1, 2, 3]
let sum1 = arr.reduce((acc, curr) => {
    acc = acc + curr;
    return acc;
}, 0)
console.log('sum1 ', sum1);

let sum2 = arr.myReduce((acc, curr) => {
    acc = acc + curr;
    return acc;
}, 0)
console.log('sum2 ', sum2);

let details = [
    {
        name: 'Siddharth',
        age: 28,
        location: 'PUNE'
    },
    {
        name: 'Siddhant',
        age: 29,
        location: 'PUNE'
    }
]

let newDetails = details.myReduce((acc, curr) => {
    curr.location = 'Pune';
    acc.push(curr)
    return acc;
}, [])
console.log('newDetails ', newDetails);