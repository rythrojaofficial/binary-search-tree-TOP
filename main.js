import { recursiveCreateBST } from "./binary-search-tree.js";
import { Tree, prettyPrint } from "./bst2.js";
// let arr = [0,1,2,3,4,5,6];
let arr = [1, 2, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let myTree = new Tree(arr);
// console.log(myTree)
prettyPrint(myTree.root)
// myTree.insert(2)
const testDelete = (()=>{

    // initial tree
    const testActive = false;
    if  (testActive === true){
        // ====single leaf cases====
        const delSingleLeafs = false;
        if (delSingleLeafs === true){
            console.log({
               'deleting single leafs': '9, 5, 2'
            })
            myTree.delete(9)
            myTree.delete(5)
            myTree.delete(2)
        }
        // ====single branch cases====
        const delSingleBranches = false;
        if (delSingleBranches === true){
            console.log({
                'deleting single branches': '8, 4'
            })
            myTree.delete(8);
            myTree.delete(4);
        }
        // ====double branch cases====
        const delDoubleBranches = true;
        if (delDoubleBranches === true){
            console.log({
                'deleting double branches':
                // '23, 3'
                '7, 324'
            })
            // myTree.delete(23);
            // myTree.delete(3);
            myTree.delete(7)
            myTree.delete(324)
        }
        // final print
        prettyPrint(myTree.root)

    }
    
})();

