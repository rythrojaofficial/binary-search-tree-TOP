import { recursiveCreateBST } from "./binary-search-tree.js";
import { Tree, prettyPrint } from "./bst2.js";
// let arr = [0,1,2,3,4,5,6];
let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let myTree = new Tree(arr);
// console.log(myTree)
prettyPrint(myTree.root)
myTree.insert(2)
prettyPrint(myTree.root)
// recursiveCreateBST(arr);
