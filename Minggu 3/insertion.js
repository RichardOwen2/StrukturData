const arraySample = "0,-1,1,-2,2,-3,3,-4,4,-5";

function processData(input) {
    let arraySort;
    
    for (let i = 0; i < arraySort.length; i++) {
        arraySort[i] = parseInt(arraySort[i]);
    } 

    for (let i = 1; i < arraySort.length; i++) {
        let temp = arraySort[i];
        let j = i-1; 
        while ((j > -1) && (temp < arraySort[j])) {
            arraySort[j+1] = arraySort[j];
            j--;
        }
        arraySort[j+1] = temp;
    }
    return arraySort.join();
}

const hasil = processData(arraySample);

console.log(hasil);