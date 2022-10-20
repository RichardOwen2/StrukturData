class QuickSort{
    constructor(input) {
        this.data = input;
    }

    quickSort(arr) {
        if (arr.length < 2) {
            return arr;
        } else {
            console.log("Before Sorting = " + arr);
        }
        
        let indexRand = Math.floor(1 + Math.random() * arr.length - 1);
    
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

        this.showProcess(pivot, indexRand, left, right);

        return this.quickSort(left).concat(pivot, this.quickSort(right));
    }
    
    processData() {    
        let arr = this.data.split(",");
        
        for (let i = 0; i < arr.length; i++) {
            arr[i] = parseInt(arr[i]);
        }
        
        this.data = this.quickSort(arr).join();
    }

    showProcess(pivot, indexRand, left, right) {
        console.log("Pivot = " + pivot);
        console.log("Index Pivot = " + indexRand);
        console.log("After Sorting = " + left.concat(pivot, right) + "\n");
    }

    do() {
        console.log("Samples = " + this.data + "\n");

        this.processData();

        console.log("Result = " + this.data)
    }
}


// let sample = "-5,5,-4,4,-3,3,-2,2,-1,1,0";
const sample = "-10,5,-8,4,-7,3,20,2,23,60,20,-1,1,18,0,11";
const quicksort = new QuickSort(sample);

quicksort.do();