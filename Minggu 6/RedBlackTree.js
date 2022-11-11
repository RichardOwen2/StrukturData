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

    checkIsRed() {
        return this.isRed;
    }
}

// Helper

function createNode(key, value) {
    let node = new Node(key, value);
    node.setLeft(createLeafNode(node));
    node.setRight(createLeafNode(node));

    return node;
}

function createLeafNode(parent) {
    let node = new Node(null, null);
    node.setBlack();
    node.setParent(parent);

    return node;
}

function isNilNode(node) {
    return node == null || !(node.getKey() || node.getValue() || node.checkIsRed() || node.getLeft() || node.getRight());
}

class Tree {
    constructor() {
        this.root = null;
    }

    insert(key, value) {
        let current = this.root;
        let pointer = null;
        const node = createNode(key, value);
        if (this.root == null) {
            this.root = node;
            node.setBlack();
        } else {
            while (!isNilNode(current)) {
                pointer = current;
                if (node.getKey() < current.getKey()) {
                    current = current.getLeft();
                } else {
                    current = current.getRight();
                }
            }
            node.setParent(pointer);
            if (node.getKey() < pointer.getKey()) {
                pointer.setLeft(node);
            } else {
                pointer.setRight(node);
            }
            node.setLeft(createLeafNode(node));
            node.setRight(createLeafNode(node));
            this.fixTree(node);
        }
    }

    fixTree(node) {
        while (node.getParent() && node.getParent().checkIsRed()) {
            let uncle = null;
            if (node.getParent() === node.getParent().getParent().getLeft()) {
                uncle = node.getParent().getParent().getRight();

                if (uncle && uncle.checkIsRed()) {
                    node.getParent().setBlack();
                    uncle.setBlack();
                    node.getParent().getParent().setRed();
                    node = node.getParent().getParent();
                    continue;
                }

                if (node === node.getParent().getRight()) {
                    node = node.getParent();
                    this.rotateLeft(node);
                }
                node.getParent().setBlack();
                node.getParent().getParent().setRed();

                this.rotateRight(node.getParent().getParent());
            } else {
                uncle = node.getParent().getParent().getLeft();
                if (uncle && uncle.checkIsRed()) {
                    node.getParent().setBlack();
                    uncle.setBlack();
                    node.getParent().getParent().setRed();
                    node = node.getParent().getParent();
                    continue;
                }

                if (node === node.getParent().getLeft()) {
                    // Double rotation needed
                    node = node.getParent();
                    this.rotateRight(node);
                }
                node.getParent().setBlack();
                node.getParent().getParent().setRed();
                // if the "else if" code hasn't executed, this
                // is a case where we only need a single rotation
                this.rotateLeft(node.getParent().getParent());
            }
        }
        this.root.setBlack();
    }

    rotateRight(node) {
        const current = node.getLeft();

        if (isNilNode(current.getRight())) {
            node.setLeft(createLeafNode(node));
        } else {
            node.setLeft(current.left());
        }

        if (isNilNode(current.getRight())) {
            current.getRight().setParent(node);
        }
        current.setParent(node);

        if (isNilNode(node.getParent())) {
            this.root = current;
        } else {
            if (node === node.getParent().getRight()) {
                node.getParent().setRight(current);
            } else {
                node.getParent().setLeft(current);
            }
        }
        current.setRight(node);
        node.setParent(current);
    }

    rotateLeft(node) {
        const current = node.getRight();

        if (isNilNode(current.getLeft())) {
            node.setRight(createLeafNode(node));
        } else {
            node.setRight(current.getLeft());
        }

        if (!isNilNode(current.getLeft())) {
            current.getLeft().setParent(node);
        }

        current.setParent(node.getParent());

        if (!node.getParent()) {
            this.root = current;
        } else {
            if (node === node.getParent().getLeft()) {
                node.getParent().setLeft(current);
            } else {
                node.getParent().setRight(current);
            }
        }
        current.setLeft(node);
        node.setParent(current);
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

    getHeight(root){
        if (!root){
            return 0
        }
        return Math.max(this.getHeight(root.left), this.getHeight(root.right))+1
    }

    getColumn(h){
        if (h == 1){
            return 1
        }
        return this.getColumn(h-1) + this.getColumn(h-1) + 1
    }

    printTree(array, node, coloumn, row, height){
        if (!node || isNilNode(node)){
            return
        }

        const color = node.checkIsRed() ? "(R)" : "(B)";

        if(isNilNode(node)) {
            array[row][coloumn] = "N" + color; 
        } else {
            array[row][coloumn] = node.getKey() + color; 
        }

        this.printTree(array, node.getLeft(), coloumn-Math.pow(2, height-2), row+1, height-1)
        this.printTree(array, node.getRight(), coloumn+Math.pow(2, height-2), row+1, height-1)
    }

    TreePrinter(){
        let data = ""
        let height = this.getHeight(this.root)
        let column = this.getColumn(height)
        let array =  Array.from({length:height},_ => Array.from({length:column},_=> null))
        
        this.printTree(array, this.root, Math.floor(column/2, 1), 0, height)

        console.log("--------------------------------------------------------");
        for (let i of array) {
            for (let j of i) {
                if (j == null){
                    data += "    "
                }else{
                    data += `${j} `
                }
            }
            console.log(data);
            console.log("")
            data = "";
        }
        console.log("--------------------------------------------------------");

    }
}

const data = new Tree();
data.insert(1);
data.TreePrinter();
data.insert(5);
data.TreePrinter();
data.insert(14);
data.TreePrinter();
data.insert(35);
data.TreePrinter();
data.insert(2);
data.TreePrinter();
data.insert(8);
data.TreePrinter();
data.insert(6);
data.TreePrinter();
data.insert(10);
data.insert(23);
data.insert(24);
data.insert(27);
data.insert(90);
data.TreePrinter();

// console.log(data.isExist(650));

//console.log(data);
