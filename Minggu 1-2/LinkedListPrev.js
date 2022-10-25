class Node {
    constructor(value) {
        this.value = value;
    }

    setNext(next) {
        this.next = next;
    }
    
    setPrev(prev) {
        this.prev = prev;
    }

    getNext() {
        return this.next;
    }

    getPrev() {
        return this.prev;
    }

    getValue() {
        return this.value;
    }
}

class LinkedList {
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }

    add(value) {
        const node = new Node(value);
        if (this.first == null) {
            this.first = node;
            this.last = node;
        } else {
            node.setPrev(this.last);
            this.last.setNext(node);
            this.last = node;
        }
        this.length++;
    }

    insert(value, index) {
        const node = new Node(value);
        if (typeof (index) != 'number') {
            throw new Error("Index must be a number");
        } else if (index > this.length || index < 0) {
            throw new Error("Index is more than data length"); 
        } else if (index == 0 && this.length == 0) {
            this.first = node;
            this.last = node;
        } else if (index == 0) {
            this.first.setPrev(node);
            node.setNext(this.first);
            this.first = node;
        } else {
            let current = this.get(index);
            let currentPrev = current.getPrev();
            node.setPrev(currentPrev);
            node.setNext(current);
            currentPrev.setNext(node);
            current.setPrev(node);
        }
        this.length++;
    }

    remove(index) {
        if (typeof (index) != 'number') {
            throw new Error("Index must be a number");
        } else if (index > this.length || index < 0) {
            throw new Error("Index is more than data length");
        } else if (index == 0) {
            this.first = this.first.getNext();
            this.first.setPrev(null);
        } else {
            let current = this.get(index);
            let currentPrev = current.getPrev();
            let currentNext = current.getNext();

            current.getPrev().setNext(current.getNext());
            currentNext.setPrev(currentPrev);
        }
        this.length--;
    }

    get(index) {
        let current = this.first;
        if (typeof (index) != 'number') {
            throw new Error("Index must be a number");
        } else if (index > this.length || index < 0) {
            throw new Error("Index is more than data length");
        } else {
            for (let i = 0; i < index; i++) {
                current = current.getNext();
            }
            return current;
        }
    }

    swap(index1, index2) {
        if (typeof (index1) != 'number' || typeof (index2) != 'number') {
            throw new Error("Index must be a number");
        } else if (index1 > this.length || index2 > this.length) {
            throw new Error("Index is more than data length");
        } else {
            const current1 = this.get(index1);
            const current2 = this.get(index2);

            if (current1 === this.first) {
                this.first = current2;
            } else if (current2 === this.first) {
                this.first = current1;
            }
            if (current1 === this.last) {
                this.last = current2;
            } else if (current2 === this.last) {
                this.last = current1;
            }

            const current1Next = current1.getNext();
            current1.setNext(current2.getNext());
            current2.setNext(current1Next);

            if (current1.getNext()) {
                current1.getNext().setPrev(current1);
            }
            if (current2.getNext()) {
                current2.getNext().setPrev(current2);
            }

            const current1Prev = current1.getPrev();
            current1.setPrev(current2.getPrev());
            current2.setPrev(current1Prev);

            if (current1.getPrev()) {
                current1.getPrev().setNext(current1);
            }
            if (current2.getNext()) {
                current2.getPrev().setNext(current2);
            }
        }
    }

    showNode() {
        let current = this.first;
        for (let i = 0; i < this.length; i++) {
            console.log(
                `Index = ${i}, 
            \nPrev = ${(current.getPrev()) ? current.getPrev().getValue() : undefined}
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
    data.add(0);
    data.add(1);
    data.add(2);
    data.add(3);
    data.add(4);
    data.add(5);

    data.insert(2,4);
    // data.remove(4);
    // console.log(data.get(3));
    // data.swap(1,2);
    // data.showNode();
    data.showValue();

    console.log(data);
} catch (e) {
    console.error(e);
}