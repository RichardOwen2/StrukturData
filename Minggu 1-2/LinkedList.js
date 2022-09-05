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

    insert(value, index) {
        const node = new Node(value);
        let current = this.first;
        for (let i = 0; i < index - 1; i++) {
            current = current.getNext();
        }
        node.setNext(current.getNext());
        current.setNext(node);
        this.length++;
    }

    remove(index) {
        let current = this.first;
        if (typeof (index) != 'number') {
            throw new Error("Index must be a number");
        } else if (index > this.length || index < 0) {
            throw new Error("IndexOutOfBound");
        } else if (index == 0) {
            this.first = this.first.getNext();
        } else {
            for (let i = 0; i < index - 1; i++) {
                current = current.getNext();
            }
            (index < this.length - 1) ? current.setNext(current.getNext().getNext()): current.setNext(null);
        }
        this.length--;
    }

    swap(index1, index2) {
        if (index1 > this.length || index2 > this.length) {
            throw new Error("IndexOutOfBound");
        } else {
            let current1 = this.first;
            for (let i = 0; i < index1 - 1; i++) {
                current1 = current1.getNext();
            }
        }
    }

    get(index) {
        let current = this.first;
        if (index > this.length) {
            throw new Error("IndexOutOfBound");
        } else {
            for (let i = 0; i < index; i++) {
                current = current.getNext();
            }
            console.log(current);
        }
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
            fullValue += current.getValue();
            console.log(fullValue);
            current = current.getNext();
        }
    }
}

try {
    const data = new LinkedList();
    data.push(0);
    data.push(1);
    data.push(2);
    data.push(3);
    data.push(4);
    data.push(5);
    data.push(6);
    data.push(7);
    data.push(8);

    // data.pop();
    // data.pop(2);
    // data.showNode();
    // data.showValue();

    console.log(data);
} catch (e) {
    console.error(e);
}