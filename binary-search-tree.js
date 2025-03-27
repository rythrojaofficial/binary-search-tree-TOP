

    
class treeNode{
    constructor(root){
        this.root = root;
        this.leftSubtree = null;
        this.rightSubtree = null;
    }
    setLeft(tree){
        this.leftSubtree = tree
    }
    setRight(tree){
        this.rightSubtree = tree
    }
} 
class BST{
    constructor(root){
        
    }
}
export function recursiveCreateBST(array){
    // 1. Initialize start to be 0, end to be length of array -1
    let start = 0;
    let end = Math.round(array.length-1);
    // mid = (start+end)/2
    // create treeNode A with mid as root
    if(start >= end){
        return null
    }
    let mid = (start+end)/2;
    let root = new treeNode(mid);
    let leftArray = array.slice(start, mid);
    let rightArray = array.slice(mid)
    console.log({
        'leftarray': leftArray,
        'rightarray':rightArray
    })
    root.setLeft(leftArray);
    root.setRight(rightArray);
    console.log(root)
    recursiveCreateBST(leftArray);
    // recursiveCreateBST(rightArray);
    



    // recursively do the following:
        // calculate mid of left subarray and make it mid of left subtree A
        // calculate mid of right subarray and make it mid of right subtree A


}
    // constructor(array){
    //     this.arry = array;
    //     this.start = 0;
    //     this.end = Math.round(array.length-1);
    //     this.mid = (this.start+this.end)/2;
    // }

//     recursiveCreateBST()
// }