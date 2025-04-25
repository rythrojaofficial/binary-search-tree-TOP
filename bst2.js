// Build a Node class/factory. It should have an attribute for the data it stores as well as its left and right children.
class Node{
    constructor(data, parent = null){
        this.data = data;
        this.left = null;
        this.right = null;
        this.parent = parent;
    }

    setLeftAndRight(leftNode, rightNode){
        this.left = leftNode;
        this.right = rightNode;
    }
    clearChildren(){
        this.left = null;
        this.right = null;
    }
}

// Build a Tree class/factory which accepts an array when initialized. The Tree class should have a root attribute, which uses the return value of buildTree which you’ll write next.
export class Tree{
    constructor(array = []){
        this.sortedArray = sortArray(array) // sort Array
        this.root = recursiveBuildTree(this.sortedArray);
    }
    insert(value, root = this.root){
        switch (true){
            case value < root.data
                && root.left === null: 
                { 
                    let newNode = new Node(value);
                    root.left = newNode;
                    break;
                }
            case value > root.data
                && root.right === null:
                { 
                    let newNode = new Node(value);
                    root.right = newNode;
                    break;
                }
            case value < root.data:
                this.insert(value, root.left)
                break;
            case value > root.data:
                this.insert(value, root.right)
                break;
            default:
                console.log('error: duplicate insertion')
                break;
        }
    }
    find(value, root = this.root){
        switch (true){
            case value === root.data:
                return 
            case value < root.data
                && root.left !== null:
                {this.find(value, root.left); break;}
            case value > root.data
                && root.right !== null:
                {this.find(value, root.right); break;}

        }
    }
    findFurthestLeftOf(root = this.root){
        if (root.left === null){
            return root;
          
        }
        if (root.left !== null){

            return this.findFurthestLeftOf(root.left)
        }
    }
    doubleBranchDelete(root = this.root){
        if (root.right !== null){
            const nextBiggest = this.findFurthestLeftOf(root.right)
            switch (root){
                case root.parent.left:
                    root.parent.left = nextBiggest;
                    break;
                case root.parent.right:
                    root.parent.right = nextBiggest;
                    break;
                default:
                    console.log('T_T error in branch delete')
                    break;

                
            }
            root.data = nextBiggest.data
            nextBiggest.data = null
            if(nextBiggest.parent !== root){
                nextBiggest.parent.left = null;
            }else if(nextBiggest.parent === root){
                // means that immediate right is furthest left
                root.right = nextBiggest.right
                root.left = nextBiggest
            }
        }
        
    }
    delete(value, root = this.root){
        switch(true){
            // leaf cases only 
            case value === root.data
                && root.left === null
                && root.right === null:
                {root.parent.clearChildren(); break;}
            case value < root.data
                && root.left !== null:
                {this.delete(value, root.left); break;}
            case value > root.data
                && root.right !== null:
                {this.delete(value, root.right); break;}
            // single branch
            case value === root.data
                && root.right === null:
                {
                    root.data = root.left.data; 
                    root.left = null;
                    break;
                }
            case value === root.data
                && root.left === null:
                {
                    root.data = root.right.data;
                    root.right = null; 
                    break;
                }
            case value === root.data
                && root.left !== null
                && root.right !== null:
                {   
                    const nextBiggest = this.findFurthestLeftOf(root.right)
                    root.data = nextBiggest.data
                    nextBiggest.data = null
                    if(nextBiggest.parent !== root){
                        nextBiggest.parent.left = nextBiggest.right;
                    }else if(nextBiggest.parent === root){
                        // means that immediate right is furthest left
                        root.right = nextBiggest.right
                    }
                    break;
                }
            default:
                console.log('not found in tree. .. yet')
                break
            

        }
    }
}
function sortArray(array){
    const uniqueAndSorted = [...new Set(array)] // spread operator splits and Set rejoins uniquely
        .sort((a, b) => a-b); // .sort compares a-b, if it's negative, b>a
    return uniqueAndSorted
}


// Write a buildTree(array) function that takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.
function recursiveBuildTree(arr, parent = null){
    let startIndex = 0;
    let endIndex = arr.length-1;
    // find center
    if (startIndex > endIndex) return null; // build finished
    let midIndex = Math.floor((startIndex+endIndex)/2) // nearest whole number to the middle index
    // console.log({
    //     'startIndex':startIndex,
    //     'midIndex':midIndex,
    //     'endIndex':endIndex
    // })
    let root = new Node(arr[midIndex], parent);
    // create new arrays
    let leftArray = arr.slice(startIndex, midIndex);
    let rightArray = arr.slice(midIndex+1);
    // console.log({
    //     'leftArray':leftArray,
    //     'root':arr[midIndex],
    //     'rightArray':rightArray
    // })
    
    root.setLeftAndRight(
        recursiveBuildTree(leftArray, root), 
        recursiveBuildTree(rightArray, root)
    )
    // console.log({
    //     'root':root,
    //     'rootleft':root.left,
    //     'rootright':root.right
    // })
    return root
}



// Tip: If you would like to visualize your binary search tree, here is a prettyPrint() function that will console.log your tree in a structured format. This function will expect to receive the root of your tree as the value for the node parameter.
export const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


//     Write insert(value) and deleteItem(value) functions that insert/delete the given value. You’ll have to deal with several cases for delete, such as when a node has children or not. If you need additional resources, check out these two articles on inserting and deleting, or this video on BST inserting/removing with several visual examples.

//     You may be tempted to implement these methods using the original input array used to build the tree, but it’s important for the efficiency of these operations that you don’t do this. If we refer back to the Big O Cheatsheet, we’ll see that binary search trees can insert/delete in O(log n) time, which is a significant performance boost over arrays for the same operations. To get this added efficiency, your implementation of these methods should traverse the tree and manipulate the nodes and their connections.

//     Write a find(value) function that returns the node with the given value.

//     Write a levelOrder(callback) function that accepts a callback function as its parameter. levelOrder should traverse the tree in breadth-first level order and call the callback on each node as it traverses, passing the whole node as an argument, similarly to how Array.prototype.forEach might work for arrays. levelOrder may be implemented using either iteration or recursion (try implementing both!). If no callback function is provided, throw an Error reporting that a callback is required. Tip: You will want to use an array acting as a queue to keep track of all the child nodes that you have yet to traverse and to add new ones to the list (video on level order traversal).

//     Write inOrder(callback), preOrder(callback), and postOrder(callback) functions that also accept a callback as a parameter. Each of these functions should traverse the tree in their respective depth-first order and pass each node to the provided callback. The functions should throw an Error if no callback is given as an argument, like with levelOrder. The video Binary Tree Traversal: Preorder, Inorder, Postorder explains the topic clearly.

//     Write a height(value) function that returns the height of the node containing the given value. Height is defined as the number of edges in the longest path from that node to a leaf node. If the value is not found in the tree, the function should return null.

//     Write a depth(value) function that returns the depth of the node containing the given value. Depth is defined as the number of edges in the path from that node to the root node. If the value is not found in the tree, the function should return null.

//     Write an isBalanced function that checks if the tree is balanced. A binary tree is considered balanced if, for every node in the tree, the height difference between its left and right subtrees is no more than 1, and both the left and right subtrees are also balanced.

// Pitfall with checking balance

// A common mistake is only checking the height difference between the root’s left and right children. That is not enough — you must check the balance condition for every node.

//     Write a rebalance function that rebalances an unbalanced tree. Tip: You’ll want to use a traversal method to provide a new array to the buildTree function.

// Tie it all together

// Write a driver script that does the following:

//     Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it if you wish.
//     Confirm that the tree is balanced by calling isBalanced.
//     Print out all elements in level, pre, post, and in order.
//     Unbalance the tree by adding several numbers > 100.
//     Confirm that the tree is unbalanced by calling isBalanced.
//     Balance the tree by calling rebalance.
//     Confirm that the tree is balanced by calling isBalanced.
//     Print out all elements in level, pre, post, and in order.