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

    swap(index1, index2) {
        if (typeof (index1) != 'number' || typeof (index2) != 'number') {
            throw new Error("Index must be a number");
        } else if ((index1 > this.length || index1 < 0) || (index2 > this.length || index2 < 0)) {
            throw new Error("Index Out Of Bound");
        }
        
        if (index1 == index2){
            return;
        }

        if (index1 > index2) {
            [index1,index2] = [index2,index1]
        }

        let current1 = this.first;
        let current2 = this.first;

        for (let i = 0; i < index1-1; i++){
            current1 = current1.getNext();
        }
        let current1Next = current1.getNext();

        for (let i = 0; i < index2-1; i++){
            current2 = current2.getNext();
        }

        let current2Next = current2.getNext();
        (current1 != null) ? current1.setNext(current2Next) : this.first = current2Next;
        (current2 != null) ? current2.setNext(current1Next) : this.first = current1Next;

        let temp = current1Next.getNext();
        current1Next.setNext(current2Next.getNext());
        current2Next.setNext(temp);
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

    showValue() {
        let current = this.first;
        let fullValue = '';
        for (let i = 0; i < this.length; i++) {
            fullValue += ' ' + current.getValue();
            current = current.getNext();
        }
        console.log(fullValue);
    }

    insertionSort() {
        let sorted = null;
        let current = this.first;
    
        while (current != null) {
            let next = current.getNext();

            let compareNode = current;
            if (sorted == null || sorted.getValue() >= compareNode.getValue()) {
                compareNode.setNext(sorted);
                sorted = compareNode;
                console.log("----")
                console.log("c",compareNode.getValue())
                console.log("s",sorted.getValue())
            } else {
                let temp = sorted;
                console.log("----")
                console.log("t",temp.getNext().getValue())
                console.log("c",compareNode.getValue())
                while (temp.getNext() != null && temp.getNext().getValue() < compareNode.getValue()) {
                    temp = temp.getNext();
                    console.log(temp.getValue())
                }
                console.log("----")
                compareNode.setNext(temp.getNext());
                temp.setNext(compareNode);
            }

            current = next;
        }
        this.first = sorted;
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
    const stringSample = "8,1,-2,2,4,3,-4,0,-3,-5,5";

    const stringSorted = main(stringSample);
    stringSorted.showValue();

    //stringSorted.showNode();
} catch (e) {
    console.error(e);
}


