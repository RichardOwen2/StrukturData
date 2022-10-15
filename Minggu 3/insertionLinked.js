class Node {
    constructor(value) {
        this.value = value;
    }

    setNext(next) {
        this.next = next;
    }

    getNext() {
        return this.next;
    }

    getValue() {
        return this.value;
    }
}

class LinkedList {
    constructor() {
        this.first = null;
        this.length = 0;
    }

    push(value) {
        const node = new Node(value);
        if (this.first == null) {
            this.first = node;
        } else {
            let current = this.first;
            while (current.getNext()) {
                current = current.getNext();
            }
            current.setNext(node);
        }
        this.length++;
    }

    showNode() {
        let current = this.first;
        for (let i = 0; i < this.length; i++) {
            console.log(
                `Index = ${i}, 
            \nValue = ${current.getValue()}, 
            \nNext = ${(current.getNext()) ? current.getNext().getValue() : undefined}`
            );

            current = current.getNext();
        }
    }

    showValue(node) {
        let current = node;
        let fullValue = '';
        while (current.getNext()) {
            fullValue += ' ' + current.getValue();
            current = current.getNext();
        }
        return fullValue;
    }

    insertionSort() {
        let sorted = null;
        let current = this.first;
        console.log("Before Sorting = " + this.showValue(this.first));
    
        while (current != null) {
            let next = current.getNext();

            let compareNode = current;
            console.log("Compared Node = " + compareNode.getValue());
            if (sorted == null || sorted.getValue() >= compareNode.getValue()) {
                compareNode.setNext(sorted);
                sorted = compareNode;
                console.log("After Sorting = " + this.showValue(next));
            } else {
                let temp = sorted;
                while (temp.getNext() != null && temp.getNext().getValue() < compareNode.getValue()) {
                    temp = temp.getNext();
                }
                compareNode.setNext(temp.getNext());
                temp.setNext(compareNode);
                console.log("After Sorting = " + this.showValue(temp));
            }

            current = next;
        }
        this.first = sorted;
        console.log("Result = " + this.showValue(this.first));
    }
}

function main(sample) {
    sample = sample.split(",");
    let sorted = new LinkedList();

    for (data of sample) {
        sorted.push(parseInt(data));
    }

    sorted.insertionSort();

    // return sorted.showValue();
    return sorted;
}


try {
    const stringSample = "10,8,1,-2,2,4,3,-4,0,-3,-5,5";

    const stringSorted = main(stringSample);
    stringSorted.showValue();

    //stringSorted.showNode();
} catch (e) {
    console.error(e);
}


