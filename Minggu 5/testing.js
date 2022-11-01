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

    isExist(value) {
        let node = this.root;
        console.log(node)
        if (!node) {
            return false;
        }

        if (node.getValue() == value) {
            return true;
        }

        const test1 = this.isExist(value, node.getLeft());

        if (test1) {
            return true;
        }

        const test2 = this.isExist(value, node.getRight());

        return test2;
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

console.log(data.isExist(2,data.root));

//console.log(data);
