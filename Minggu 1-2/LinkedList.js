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
        if (typeof (index) != 'number') {
            throw new Error("Index must be a number");
        } else if (index == 0 && this.length == 0) {
            this.first = node;
        } else if (index > this.length || index < 0) {
            throw new Error("Index is more than data length"); 
        } else {
            for (let i = 0; i < index - 1; i++) {
                current = current.getNext();
            }
            node.setNext(current.getNext());
            current.setNext(node);
        }
        this.length++;
    }

    remove(index) {
        let current = this.first;
        if (typeof (index) != 'number') {
            throw new Error("Index must be a number");
        } else if (index > this.length || index < 0) {
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

    removeByValue(value) {
        let current = this.first;

        if (current == null) {
            return;
        } else if (current.getValue() === value) {
            this.first = this.first.getNext();
            this.length--;
        } else {
            while (current.getNext()) {
                if (current.getNext().getValue() === value) {
                    current.getNext().getNext() ? current.setNext(current.getNext().getNext()) : current.setNext(null);
                    this.length--;
                    return;
                } else {
                    current = current.getNext();
                }
            }
        }
    }

    removeDuplicate() {
        let current = this.first;
        
        if (this.first == null) {
            return;
        } 

        let value = [current.getValue()];

        while (current.getNext()) {
            if (value.includes(current.getNext().getValue())) {
                current.getNext().getNext() ? current.setNext(current.getNext().getNext()) : current.setNext(null);
                this.length--;
            } else {
                value.push(current.getNext().getValue());
                current = current.getNext();
            }
        }
    }

    swapTailfirst() {
        let current = this.first;
        if (this.length < 2) {
            return; 
        } else if (this.length == 2) {
            current.getNext().setNext(this.first);
            this.first = current.getNext();
            this.first.getNext().setNext(null);
            return;
        }

        while (current.getNext()) {
            current = current.getNext();
        }

        current.setNext(this.first.getNext());

        let temp = current;
        for (let i = 0; i < this.length - 2; i++) {
            temp = temp.getNext();
        }

        temp.setNext(this.first);
        temp.getNext().setNext(null);
        this.first = current;
    }

    get(index) {
        let current = this.first;
        if (typeof (index) != 'number') {
            throw new Error("Index must be a number");
        } else if (index > this.length || index < 0) {
            throw new Error("Index Out Of Bound");
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
        } else if (!this.first || index1 == index2) {
            return;
        }

        let prevNode1 = null;  
        let prevNode2 = null;  
        let node1 = this.first;
        let node2 = this.first;

        for (let i = 0 ; i < index1; i++) {
            prevNode1 = node1;
            node1 = node1.getNext();
        }

        for (let i = 0 ; i < index2; i++) {
            prevNode2 = node2;
            node2 = node2.getNext();
        }

        if (prevNode1) {
            prevNode1.setNext(node2);
        } else {
            this.first = node2;  
        }

        if (prevNode2) {
            prevNode2.setNext(node1);  
        } else {
            this.first  = node1; 
        } 
        
        let temp = node1.getNext();   
        node1.setNext(node2.getNext());   
        node2.setNext(temp);
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
        // for (let i = 0; i < this.length; i++) {
        //     fullValue += current.getValue();
        //     current = current.getNext();
        // }
        while (current.getNext()) {
            fullValue += current.getValue();
            current = current.getNext();
        }
        console.log(fullValue);
    }
}

try {
    const data = new LinkedList();
    data.add(1);
    data.add(2);
    data.add(3);
    data.add(4);
    data.add(4);
    data.add(4);
    data.add(4);
    data.add(4);
    data.add(4);
    data.add(4);
    data.add(4);
    data.add(4);
    data.add(5);
    data.add(6);
    data.add(7);
    data.add(8);
    data.add(9);

    // data.showValue();
    // data.swapTailfirst();
    // data.removeByValue('g');
    data.removeDuplicate();

    // data.insert(5,3);
    // data.remove(-1);
    // console.log(data.get(3));
    // data.swap(0,1);
    // data.showNode();
    data.showValue();

    //console.log(data);
} catch (e) {
    console.error(e);
}