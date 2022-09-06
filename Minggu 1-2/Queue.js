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

class Queue {
    constructor() {
        this.first = null;
        this.length = 0;
    }

    hasPop() {
        return this.first == null;
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

    pop(index = 0) {
        let current = this.first;
        if (typeof (index) != 'number') {
            throw new Error("Index must be a number");
        } else if (this.hasPop() || index > this.length || index < 0) {
            throw new Error("Index is more than data length");
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
    const data = new Queue();
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