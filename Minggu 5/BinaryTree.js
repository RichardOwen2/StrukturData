class Node {
    constructor(value) {
        this.value = value;
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
}

class Tree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const node = new Node(value);

        if (this.root == null) {
            this.root = node;
        } else {
            this.insertNode(this.root, node);
        }
    }

    insertNode(node, newNode) {
        if (newNode.getValue() < node.getValue()) {
            if (!node.getLeft()) {
                node.setLeft(newNode);
                newNode.setParent(node);
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (!node.getRight()) {
                node.setRight(newNode);
                newNode.setParent(node);
            } else {
                this.insertNode(node.right,newNode);
            }
        }   
    }

    isExist(value, node = this.root) {
        if (node.getValue() == value) {
            return true;
        }

        if (node.getLeft()) {
            const left = this.isExist(value, node.getLeft());
            if (left) {
                return true;
            }
        } 
        
        if (node.getRight()) {
            const right = this.isExist(value, node.getRight());
            if (right) {
                return true;
            }
        }

        return false;
    }

    showNode(node = this.root) {
        if (node.getLeft()) {
            this.showNode(node.getLeft());
        } 
        
        if (node.getRight()) {
            this.showNode(node.getRight());
        }
        console.log(node.getValue());
    }
}

const data = new Tree();
data.insert(5);
data.insert(8);
data.insert(3);
data.insert(6);
data.insert(9);
data.insert(7);
data.insert(4);

console.log(data.isExist(650));

//console.log(data);
