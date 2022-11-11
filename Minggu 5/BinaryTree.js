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
            this.insertHelper(this.root, node);
        }
    }

    insertHelper(node, newNode) {
        if (newNode.getValue() < node.getValue()) {
            if (!node.getLeft()) {
                node.setLeft(newNode);
                newNode.setParent(node);
            } else {
                this.insertHelper(node.left, newNode);
            }
        } else {
            if (!node.getRight()) {
                node.setRight(newNode);
                newNode.setParent(node);
            } else {
                this.insertHelper(node.right, newNode);
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
        this.printTreeHelper("",this.root,true);
        console.log("--------------------------------------------------------------------------------------")
    }

    printTreeHelper(prefix, node, isLeft) {
        if (node) {
            this.printTreeHelper(prefix + (isLeft ? "│   " : "    "), node.getRight(), false);
            console.log(prefix + (isLeft ? "└── " : "┌── ") + (node.getValue()));
            this.printTreeHelper(prefix + (isLeft ? "    " : "│   "), node.getLeft(), true);
        }
    }

    // showDepth() {
    //     return this.showDepthHelper(this.root);
    // }

    // showDepthHelper(node) {
    //     if (node == null)
    //         return 0;
    //     else {
    //         const lDepth = this.showDepth(node.getLeft());
    //         const rDepth = this.showDepth(node.getRight());

    //         if (lDepth > rDepth)
    //             return (lDepth + 1);
    //         else
    //             return (rDepth + 1);
    //     }
    // }

    // showNode() {
    //     return this.showNodeHelper(this.root, "");
    // }

    // showNodeHelper(node, indent) {
    //     if (node) {
    //         console.log(indent + node.getValue());
    //         this.showNodeHelper(node.getLeft(), indent+" ");
    //         this.showNodeHelper(node.getRight(), indent+" ");
    //     }
    // }
}

const data = new Tree();
data.insert(5);
data.insert(8);
data.insert(3);
data.insert(6);
data.insert(9);
data.insert(7);
data.insert(4);

//data.inOrder();
//data.preOrder();
//data.postOrder();
data.printTree();

//console.log(data.isExist(650));

//console.log(data);
