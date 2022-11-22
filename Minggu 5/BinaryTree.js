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

    setValue(value) {
        this.value = value;
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
            this.insertHelper(this.root, node);
        }
    }

    insertHelper(node, newNode) {
        if (newNode.getValue() < node.getValue()) {
            if (!node.getLeft()) {
                node.setLeft(newNode);
                newNode.setParent(node);
            } else {
                this.insertHelper(node.getLeft(), newNode);
            }
        } else {
            if (!node.getRight()) {
                node.setRight(newNode);
                newNode.setParent(node);
            } else {
                this.insertHelper(node.getRight(), newNode);
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

    delete(value) {
        this.deleteHelper(this.root, value);
    }

    deleteHelper(node, value) {
        if (node == null)
            return node;
        if (value < node.getValue())
            node.setLeft(this.deleteHelper(node.getLeft(), value));
        else if (value > node.getValue())
            node.setRight(this.deleteHelper(node.getRight(), value));
        else {
            if (node.getLeft() == null)
                return node.getRight();
            else if (node.getRight() == null)
                return node.getLeft();

            node.setValue(this.minValue(node.getRight()));

            node.setRight(this.deleteHelper(node.getRight(), node.getValue()));
        }
        return node;
    }

    minValue(node) {
        let minv = node.value;
        while (node.left != null) {
            minv = node.left.value;
            node = node.left;
        }
        return minv;
    }

    change(value, newValue) {
        const node = new Node(newValue);

        if (this.root == null) {
            this.root = node;
        } else {
            this.changeHelper(this.root, value, node)
        }
    }

    changeHelper(node, value, newValue) {
        if (node == null)
            return node;

        if (newValue) {
            if (newValue.getValue() < node.getValue()) {
                if (!node.getLeft()) {
                    node.setLeft(newValue);
                    newValue.setParent(node);
                } else {
                    this.changeHelper(node.getLeft(), value, newValue);
                }
            } else if (newValue.getValue() > node.getValue()) {
                if (!node.getRight()) {
                    node.setRight(newValue);
                    newValue.setParent(node);
                } else {
                    this.changeHelper(node.getRight(), value, newValue);
                }
            }
        }
        if (value < node.getValue())
            node.setLeft(this.changeHelper(node.getLeft(), value, null));
        else if (value > node.getValue())
            node.setRight(this.changeHelper(node.getRight(), value, null));
        else {
            if (node.getLeft() == null)
                return node.getRight();
            else if (node.getRight() == null)
                return node.getLeft();

            node.setValue(this.minValue(node.getRight()));

            node.setRight(this.changeHelper(node.getRight(), node.getValue(), null));
        }
        return node;
    }

    inOrder() {
        let arr = [];
        this.inOrderHelper(this.root, arr);
        console.log(arr);
    }

    inOrderHelper(node, arr) {
        if (node) {
            this.inOrderHelper(node.getLeft(), arr);
            arr.push(node.getValue());
            this.inOrderHelper(node.getRight(), arr);
            return arr
        }
    }

    preOrder() {
        return this.preOrderHelper(this.root);
    }

    preOrderHelper(node) {
        if (node) {
            console.log(node.getValue());
            this.preOrderHelper(node.getLeft());
            this.preOrderHelper(node.getRight());
        }
    }

    postOrder() {
        return this.postOrderHelper(this.root);
    }

    postOrderHelper(node) {
        if (node) {
            this.postOrderHelper(node.getLeft());
            this.postOrderHelper(node.getRight());
            console.log(node.getValue());
        }
    }

    printTree() {
        this.printTreeHelper("", this.root, true);
        console.log("--------------------------------------------------------------------------------------")
    }

    printTreeHelper(prefix, node, isLeft) {
        if (node) {
            this.printTreeHelper(prefix + (isLeft ? "│   " : "    "), node.getRight(), false);
            console.log(prefix + (isLeft ? "└── " : "┌── ") + (node.getValue()));
            this.printTreeHelper(prefix + (isLeft ? "    " : "│   "), node.getLeft(), true);
        }
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
// data.delete(5);
data.change(6, 30);
//data.inOrder();
//data.preOrder();
//data.postOrder();
data.printTree();

//console.log(data.isExist(650));

//console.log(data);
