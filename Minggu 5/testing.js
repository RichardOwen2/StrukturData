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

    height(root){
        if (!root){
            return 0
        }
        return Math.max(this.height(root.left), this.height(root.right))+1
    }

    getcol(h){
        if (h == 1){
            return 1
        }
        return this.getcol(h-1) + this.getcol(h-1) + 1
    }

    printTree(M, root, col, row, height, leftRow, rightRow){
        if (!root){
            return
        }
        // const substract (i) =>  
        M[row][col] = root.getValue()
        this.printTree(M, root.getLeft(), col-Math.pow(2, height-2), row+1, height-1, )
        this.printTree(M, root.getRight(), col+Math.pow(2, height-2), row+1, height-1, )
    }


    TreePrinter(){
        let data = ""
        let h = this.height(this.root)
        let col = this.getcol(h)
        let M =  Array.from({length:h},_ => Array.from({length:col},_=> null))
        
        this.printTree(M, this.root, Math.floor(col/2, 1), 0, h, )
        console.log(M)
        M.map(i => {
            i.map(j => {
                if (j == null){
                    data += "-|"
                }else{
                    data += `${j} `
                }
            })
            console.log(data);
            data = '';
        })
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
console.log(data.TreePrinter());

//console.log(data.isExist(650));

//console.log(data);
