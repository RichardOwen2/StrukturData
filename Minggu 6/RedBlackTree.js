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

    setColor(color) {
        this.isRed = color;
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
            node.setParent(null);
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
            node.setRed();
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

    // fixTree(node) {
    //     while(node.getParent() && node.getParent().checkIsRed()) {
    //         let uncle = node.getParent().getParent()
    //         if (uncle.getLeft()) {
    //             uncle = uncle.getLeft();
    //         } else {
    //             uncle = uncle.getRight();
    //         }
    //         let grandParent = node.getParent().getParent();

    //         if (uncle && uncle.checkIsRed()) {
    //             node.getParent().setBlack();
    //             uncle.setBlack();
    //             grandParent.setRed();
    //             node = grandParent;
    //         } else {
    //             if (node == node.getParent().getRight() && node.getParent() == grandParent.getLeft()) {
    //                 this.rotateLeft(node.getParent());
    //                 node = node.getLeft();
    //             } else if (node = node.getParent().getLeft() && node.getParent() == grandParent.getLeft()) {
    //                 this.rotateRight(node.getParent());
    //                 node = node.getRight();
    //             }
    //             grandParent = node.getParent().getParent();
    //             node.getParent().setBlack();
    //             grandParent.setRed();
    //             if (node == node.getParent().getLeft() && node.getParent() == grandParent.getLeft()) {
    //                 this.rotateRight(grandParent);
    //             } else {
    //                 this.rotateLeft(grandParent);
    //             }
    //         }
    //     }
    // }

    rotateRight(node) {
        const current = node.getLeft();

        if (isNilNode(current.getRight())) {
            node.setLeft(createLeafNode(node));
        } else {
            node.setLeft(current.getLeft());
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

        if (isNilNode(node.getParent())) {
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

    remove(key) {
        const node = this.findNode(key);
        if (node == null) {
            return;
        }
        let pointer;
        let current = node;
        let currentOriginalColor = current.checkIsRed();

        if (isNilNode(node.getLeft())) {
            pointer = node.getRight();
            this.transplant(node, node.getRight());
        } else if (isNilNode(node.getRight())) {
            pointer = node.getLeft();
            this.transplant(node, node.getLeft());
        } else {
            current = this.min(node.getRight());
            currentOriginalColor = current.checkIsRed();
            pointer = current.getRight();
            if (current.getParent() === node) {
                pointer.setParent(current);
            } else {
                this.transplant(current, current.getRight());
                current.setRight(node.getRight());
                current.getRight().setParent(current);
            }
            this.transplant(node, current);
            current.setLeft(node.getLeft());
            current.getLeft().setParent(current);
            current.setColor(node.checkIsRed());
        }
        if (!currentOriginalColor) {
            this.removeFix(pointer);
        }
    }

    min(node) {
        if (!node) {
            return {};
        }
        while (!isNilNode(node.getLeft())) {
            node = node.getLeft();
        }
        return node;
    }

    transplant(node1, node2) {
        if (node1.getParent() == null) {
            this.root = node2;
        } else if (node1 === node1.getParent().getLeft()) {
            node1.getParent().setLeft(node2);
        } else {
            node1.getParent().setRight(node2);
        }
        node2.setParent(node1.getParent());
    }

    removeFix(node) {
        while (node !== this.root && !node.checkIsRed()) {
            if (node === node.getParent().getLeft()) {
                let current = node.getParent().getRight();
                if (current.checkIsRed()) {
                    current.setBlack();
                    node.getParent().setRed();
                    this.rotateLeft(node.getParent());
                    current = node.getParent().getRight();
                }
                if (!current.getLeft().checkIsRed() && !current.getRight().checkIsRed()) {
                    current.setRed();
                    node = node.getParent();
                    continue;
                } else if (!current.getRight().checkIsRed()) {
                    current.getLeft().setBlack();
                    current.setRed();
                    current = node.getParent().getRight();
                }
                if (current.getRight().checkIsRed()) {
                    current.setColor(node.getParent().checkIsRed());
                    node.getParent().setBlack();
                    current.getRight().setBlack();
                    this.rotateLeft(node.getParent());
                    node = this.root;
                }
            } else {
                let current = node.getParent().getLeft();
                if (current.checkIsRed()) {
                    current.setBlack();
                    node.getParent().setRed();
                    this.rotateRight(node.getParent());
                    current = node.getParent().getLeft();
                }
                if (!current.getRight().checkIsRed() && !current.getLeft().checkIsRed()) {
                    current.setRed();
                    node = node.getParent();
                } else if (!current.getLeft().checkIsRed()) {
                    current.getRight().setBlack();
                    current.setRed();
                    this.rotateLeft(current);
                    current = node.getParent().getLeft();
                }
                if (current.getLeft().checkIsRed()) {
                    current.isRed = node.getParent().isRed;
                    node.getParent().setBlack();
                    current.getLeft().setBlack();
                    this.rotateRight(node.getParent());
                    node = this.root;
                }
            }
        }
        node.setBlack();
    }

    findNode(key) {
        let node = this.root;
        while (node != null) {
            if (key < node.getKey()) {
                node = node.getLeft();
            } else if (key > node.getKey()) {
                node = node.getRight();
            } else if (key === node.getKey()) {
                return node;
            } else {
                return null;
            }
        }
        return null;
    }

    // getHeight(root) {
    //     if (!root) {
    //         return 0
    //     }
    //     return Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1
    // }

    // getColumn(h) {
    //     if (h == 1) {
    //         return 1
    //     }
    //     return this.getColumn(h - 1) + this.getColumn(h - 1) + 1
    // }

    // printTree(array, node, coloumn, row, height) {
    //     if (!node || isNilNode(node)) {
    //         return
    //     }

    //     const color = node.checkIsRed() ? "(R)" : "(B)";

    //     if (isNilNode(node)) {
    //         array[row][coloumn] = "N" + color;
    //     } else {
    //         array[row][coloumn] = node.getKey() + color;
    //     }

    //     this.printTree(array, node.getLeft(), coloumn - Math.pow(2, height - 2), row + 1, height - 1)
    //     this.printTree(array, node.getRight(), coloumn + Math.pow(2, height - 2), row + 1, height - 1)
    // }

    // printArrow(array) {
    //     let arrow = [];
    //     for (let item of array) {
    //         let data = [];
    //         for (let i = 0; i < item.length; i++) {
    //             if (item[i] != null) {
    //                 data.push("/")
    //                 data.push("\\")

    //             } else {
    //                 data.push(null);
    //             }
    //         }
    //         arrow.push(data);
    //     }

    //     return arrow;
    // }

    // TreePrinter() {
    //     let data = ""
    //     let height = this.getHeight(this.root)
    //     let column = this.getColumn(height)
    //     let array = Array.from({ length: height }, _ => Array.from({ length: column }, _ => null))

    //     this.printTree(array, this.root, Math.floor(column / 2, 1), 0, height)

    //     const key = array;
    //     const arrow = this.printArrow(array);
    //     let treeData = [];

    //     for (let i = 0; i < key.length; i++) {
    //         treeData.push(key[i]);
    //         treeData.push(arrow[i]);
    //     }

    //     console.log("--------------------------------------------------------");
    //     for (let i of treeData) {
    //         for (let j of i) {
    //             if (j == null) {
    //                 data += " "
    //             } else {
    //                 data += `${j} `
    //             }
    //         }
    //         console.log(data);
    //         data = "";
    //     }
    //     console.log("--------------------------------------------------------");
    // }

    printTree() {
        this.printTreeHelper("",this.root,true);
        console.log("--------------------------------------------------------------------------------------")
    }

    printTreeHelper(prefix, node, isLeft) {
        if (node) {
            this.printTreeHelper(prefix + (isLeft ? "│   " : "    "), node.getRight(), false);
            console.log(prefix + (isLeft ? "└── " : "┌── ") + (!isNilNode(node) ? node.getKey() : "N") + (node.checkIsRed() ? "(R)" : "(B)"));
            this.printTreeHelper(prefix + (isLeft ? "    " : "│   "), node.getLeft(), true);
        }
    }
}

const data = new Tree();
data.insert(-10);data.printTree();
data.insert(5);data.printTree();
data.insert(-8);data.printTree();
data.insert(4);data.printTree();
data.insert(-7);data.printTree();
data.insert(3);data.printTree();
data.insert(20);data.printTree();
data.insert(2);data.printTree();
// data.insert(23);data.printTree();
// data.insert(60);data.printTree();
// data.insert(20);data.printTree();
// data.insert(-1);data.printTree();
// data.insert(1);data.printTree();
// data.insert(18);data.printTree();
// data.insert(0);data.printTree();
// data.insert(11);data.printTree();


// console.log(data.isExist(650));

//console.log(data);
