class InsertionSort{
    constructor(input) {
        this.data = input;
    }

    insertionSort(arr) {
        for (let i = 1; i < arr.length; i++) {
            console.log("Before Sorting = " + arr.join());
            let temp = arr[i];
            let j = i-1; 

            while ((j > -1) && (temp < arr[j])) {
                arr[j+1] = arr[j];
                j--;
            }
            
            arr[j+1] = temp;
            
            this.showProcess(temp, arr);
        }
        return arr;
    }

    processData() {    
        let arr = this.data.split(",");
        
        for (let i = 0; i < arr.length; i++) {
            arr[i] = parseInt(arr[i]);
        }
        
        this.data = this.insertionSort(arr).join();
    }

    showProcess(temp, arr) {
        console.log("temp = " + temp)
        console.log("After Sorting = " + arr.join() + "\n");
    }

    do() {
        console.log("Samples = " + this.data + "\n");

        this.processData();

        console.log("Result = " + this.data)
    }
}

const sample = "-5,5,-4,4,-3,3,-2,2,-1,1,0";
const insertionSort =  new InsertionSort(sample);

insertionSort.do();