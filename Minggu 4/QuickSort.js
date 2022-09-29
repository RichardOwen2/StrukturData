// let counted = false;

function quickSort(arr) {
    if (arr.length < 2) return arr;

    let min = 1;
    let max = arr.length - 1;
    let rand = Math.floor(min + Math.random() * (max + 1 - min));

    // let nums = [];
    // if (!counted) {
    //     for (let i = 0; i < 100 ; i++) {
    //         nums.push(Math.floor(Math.random() * max + min));
    //     }
    //     for (let i = 0; i < arr.length; i ++) {
    //         let count = 0;
    //         for (let j = 0; j < nums.length; j++) {
    //             if (nums[j] === i) {
    //                 count++
    //             }
    //         }
    //         console.log(`jumlah ${i} = ${count}`)
    //     }
    //     counted = true;
    // }

    let pivot = arr[rand];

    const left = [];
    const right = [];

    arr.splice(arr.indexOf(pivot), 1);
    arr = [pivot].concat(arr);
    for (let i = 1; i < arr.length; i++) {
        if (pivot > arr[i]) {
        left.push(arr[i]);
        } else {
        right.push(arr[i]);
        }
    }
    return quickSort(left).concat(pivot, quickSort(right));
}

const arraySample = [-2,3,5,-2,5,7,4,2,-2,-8,4,1];
console.log(arraySample);
console.log(quickSort(arraySample));