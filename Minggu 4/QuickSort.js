function quickSort(arr) {
    
    if (arr.length < 2) return arr;

    let min = 1;
    let max = arr.length - 1;
    let indexRand = Math.floor(min + Math.random() * max);

    let pivot = arr[indexRand];

    const left = [];
    const right = [];

    arr.splice(indexRand, 1);
    arr = [pivot].concat(arr);
    for (let i = 1; i < arr.length; i++) {
        if (pivot > arr[i]) {
        left.push(arr[i]);
        } else {
        right.push(arr[i]);
        }
    }
    console.log("Pivot = " + pivot);
    console.log("Index Pivot = " + indexRand);
    console.log("After Sorting = " + left.concat(pivot, right));
    console.log("");
    return quickSort(left).concat(pivot, quickSort(right));
}

function processData(input) {
    console.log("Before Sorting = " + input);
    console.log("");

    let arr = input.split(",");
    
    for (let i = 0; i < arr.length; i++) {
        arr[i] = parseInt(arr[i]);
    }
    console.log("Result = " + quickSort(arr).join())
}

let sample = "-5,5,-4,4,-3,3,-2,2,-1,1,0";
processData(sample);