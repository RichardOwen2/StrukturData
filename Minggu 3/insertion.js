const sample = "-10,5,-8,4,-7,3,20,2,23,60,20,-1";

function processData(input) {
    let arraySort = input.split(",");
    
    for (let i = 0; i < arraySort.length; i++) {
        arraySort[i] = parseInt(arraySort[i]);
    } 

    for (let i = 1; i < arraySort.length; i++) {
        console.log("Before Sorting = " + arraySort.join());
        let temp = arraySort[i];
        let j = i-1; 
        while ((j > -1) && (temp < arraySort[j])) {
            
            arraySort[j+1] = arraySort[j];
            j--;
        }
        arraySort[j+1] = temp;
        console.log("temp = " + temp)
        console.log("After Sorting = " + arraySort.join() + "\n");
    }
    return arraySort.join();
}

const hasil = processData(sample);

console.log("Final = " + hasil);