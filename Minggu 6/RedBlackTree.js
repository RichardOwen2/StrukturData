class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.isRed = true;
        this.parent = null;
        this.left = null;
        this.right = null;
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

class Tree {
    constructor() {
        this.root = null;
    }

    insert(key, value) {
        console.log("d")
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
            node.setParent(pointer);
            if (node.getKey() < pointer.getKey()) {
                pointer.setLeft(node);
            } else {
                pointer.setRight(node);
            }
            this.fixTree(node);
        }
    }

    fixTree(node) {
        console.log("d")
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
                    // Double rotation needed
                    node = node.getParent();
                    this.rotateLeft(node);
                }

                node.getParent().setBlack();
                node.getParent().getParent().setRed();
                // if the "else if" code hasn't executed, this
                // is a case where we only need a single rotation
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
        console.log("d")
        const current = node.getLeft();

        if (current.getRight()) {
            node.setLeft(current.getRight());
        }

        if (current.getRight()) {
            current.getRight().setParent(node);
        }
        current.setParent(node);

        if (!node.getParent()) {
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
        console.log("d")
        const current = node.getRight();

        if (current.getLeft()) {
            node.setRight(current.getLeft());
        }

        if (current.getLeft()) {
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
}

const data = new Tree();
data.insert(1);
data.insert(5);
data.insert(14);
data.insert(4);
data.insert(2);
data.insert(8);
data.insert(6);
data.insert(10);

// console.log(data.isExist(650));

console.log(data);
