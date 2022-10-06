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

    add(value) {
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

    quickSort() {
        let current = this.first;

        this.first = this.partition(current);
    }

    partition(input) {
        if (!input || !input.getNext()) {
            return input;
        }
        
        let current = input.getNext();
        let right, left, pivot;

        pivot = input;

        while (current.getNext()) {
            if (pivot.getValue() > current.getValue()) {
                if (!left) {
                    left = current;
                } else {
                    left.setNext(current);
                }
            } else {
                if (!right) {
                    right = current;
                } else {
                    right.setNext(current);
                }
            }
            current = current.getNext();
        }

        if (!this.partition(left)) {
            return pivot.setNext(this.partition(right));
        } else if (!this.partition(right)) {
            return this.partition(left).setNext(pivot);
        } else {
            return this.partition(left).setNext(pivot.setNext(this.partition(right)));
        }
    }

    showValue() {
        let current = this.first;
        let fullValue = '';
        while(current.getNext()) {
            fullValue += current.getValue();
            current = current.getNext();
        }
        console.log(fullValue);
    }
}

const sample = new LinkedList();
sample.add(1);
sample.add(-2);
sample.add(3);
sample.add(-4);
sample.add(5);
sample.add(-6);
sample.add(7);
sample.add(-8);
sample.add(9);
sample.add(-10);
sample.quickSort();
sample.showValue();


