class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.isRed = true;
    }

    setParent(parent) {
        this.parent = parent;
    }
    
    setLeft(left) {
        this.left = left;
    }

    setRight(right) {
        this.right = right;
    }

    setRed() {
        this.isRed = true;
    }

    setBlack() {
        this.isRed = false;
    }

    getKey() {
        return this.key;
    }

    getValue() {
        return this.value;
    }

    getParent() {
        return this.parent;
    }

    getLeft() {
        return this.left;
    }

    getRight() {
        return this.right;
    }

    isRed() {
        return this.isRed;
    }
}

class Tree {
    constructor() {
        this.root = null;
    }

    insert(key, value) {
        let current = this.root;
        let pointer = null;
        const node = new Node(key, value);
        if (this.root == null) {
            this.root = node;
            node.setBlack();
        } else {
            while (current) {
                pointer = current;
                if (node.getKey() < current.getKey()) {
                    current = current.getLeft();
                } else {
                    current = current.getRight();
                }
            }
            node.setParent(y);
            if (node.getKey() < pointer.getKey()) {
                pointer.setLeft(node);
            } else {
                pointer.setRight(node);
            }
                this.fixTree(node);
            }
    }

    add(key, value) {
        const node = new Node(key, value);

        if (this.root == null) {
            this.root = node;
        } else {
            this.addHelper(this.root, node);
        }
    }

    addHelper(node, newNode) {
        if (newNode.getKey() < node.getKey()) {
            if (!node.getLeft()) {
                node.setLeft(newNode);
                newNode.setParent(node);
            } else {
                this.addHelper(node.left, newNode);
            }
        } else {
            if (!node.getRight()) {
                node.setRight(newNode);
                newNode.setParent(node);
            } else {
                this.addHelper(node.right,newNode);
            }
        }   
    }

    get(key, node = this.root) {
        if (node.getKey() == key) {
            return node.getValue();
        }

        if (node.getLeft()) {
            const left = this.get(key, node.getLeft());
            if (left) {
                return node.getValue();
            }
        } 
        
        if (node.getRight()) {
            const right = this.get(key, node.getRight());
            if (right) {
                return node.getValue();
            }
        }

        return null;
    }
}

// const data = new Tree();
// data.insert(5);
// data.insert(8);
// data.insert(3);
// data.insert(6);
// data.insert(9);
// data.insert(7);
// data.insert(4);

// console.log(data.isExist(650));

//console.log(data);
