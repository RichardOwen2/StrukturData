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
                this.insertHelper(node.right,newNode);
            }
        }   
    }

    deleteValue(value)
    {
        this.deleteRec(this.root, value);
    }

    deleteRec(root,value)
    {
            if (root == null)
                return root;
    
            if (value < root.value)
                root.left = this.deleteRec(root.left, value);
            else if (value > root.value)
                root.right = this.deleteRec(root.right, value);
            else {
                if (root.left == null)
                    return root.right;
                else if (root.right == null)
                    return root.left;
    
                root.value = this.minValue(root.right);
    
                root.right = this.deleteRec(root.right, root.value);
            }
    
            return root;
    }
  
    minValue(root)
    {
        let minv = root.value;
            while (root.left != null)
            {
                minv = root.left.value;
                root = root.left;
            }
            return minv;
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

    inOrder(node = this.root) {
        if (node.getLeft()) {
            this.showNode(node.getLeft());
        } 
        
        if (node.getRight()) {
            this.showNode(node.getRight());
        }
        console.log(node.getValue());
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

    printTree(prefix, Node = this._root, isLeft = true) {
        if (Node !== null) {
             this.printTree(prefix + (isLeft ? "???   " : "    "), Node.getRight(), false);
             console.log(prefix + (isLeft ? "????????? " : "????????? ") + Node.getValue());
             this.printTree(prefix + (isLeft ? "    " : "???   "), Node.getLeft(), true);
         }
     }
}

const data = new Tree();
data.insert(5);
data.insert(8);
data.insert(3);
data.insert(10);
data.insert(15);
data.insert(6);
data.insert(9);
data.insert(7);
data.insert(4);
data.deleteValue(4);
printTree(data, data, isLeft = true) 
//console.log(data.isExist(650));

//console.log(data);
