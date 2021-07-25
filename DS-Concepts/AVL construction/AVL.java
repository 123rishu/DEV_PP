import java.util.*;

public class AVL{
    public static class Node{
        int data;
        Node left;
        Node right;
        int ht = 0;
        int bal = 0;

        Node(){

        }

        Node(int data){
            this.data = data;
        }
    }

    public static void display(Node node) {
        if(node == null) {
            return;
        }
        
        String str = " <- " + node.data +" -> ";
        String left = (node.left != null ) ? ("" + node.left.data) : ".";
        String right = (node.right != null ) ? ("" + node.right.data) : ".";
        
        str = left + str + right;
        System.out.println(str);
        
        display(node.left);
        display(node.right);
    }

    public static Node add(Node node, int data){
        //base case
        if(node == null){
            return new Node(data);
        }

        //travelling
        if(node.data < data){
            node.right = add(node.right, data);
        }
        else if(node.data > data){
            node.left = add(node.left, data);
        }
        else{
            //Do nothing
        }
        updateHtBal(node);
        //if bal is safe or not
        node = checkAndWork(node);
        return node;
    }

    public static Node remove(Node node, int data){
        //base case when data node doesn't exists in tree
        if(node == null){
            return node;
        }
        //travelling
        if(node.data < data){
            node.right = remove(node.right, data);
        }
        else if(node.data > data){
            node.left = remove(node.left, data);
        }//when node.data == data
        else{
            //both child exists
            if(node.left != null && node.right != null){
                int lmax = max(node.left);
                node.data = lmax;
                node.left = remove(node.left, lmax);
                return node;
            }
            //left child exists only
            else if(node.left != null){
                return node.left;
            }
            //right child exists only
            else if(node.right != null){
                return node.right;
            }
            //no child exists
            else{
                return null;
            }
        }
        updateHtBal(node);
        //if bal is safe or not
        node = checkAndWork(node);
        return node;
    }

    public static int max(Node node){
        if(node.right != null){
            int ans = max(node.right);
            return ans;
        }
        else{
            return node.data;
        }
    }

    public static void updateHtBal(Node node) {
        int lh = (node.left == null) ? -1 : node.left.ht;
        int rh = (node.right == null) ? -1 : node.right.ht;

        int ht = Math.max(lh,rh) + 1;
        int bal = lh - rh;

        node.ht = ht;
        node.bal = bal;
    }

    public static Node checkAndWork(Node node){
        if(node.bal == 2){
            //LL
            if(node.left.bal == 1){
                return solveLL(node);
            }
            //LR
            else if(node.left.bal == -1){
                node.left = solveRR(node.left);
                return solveLL(node);
            }
        }
        else if(node.bal == -2){
            //RR
            if(node.right.bal == -1){
                return solveRR(node);
            }
            //RL
            else if(node.right.bal == 1){
                node.right = solveLL(node.right);
                return solveRR(node);
            }
        }
        return node;
    }

    public static Node solveRR(Node node) {
        return leftRotation(node);
    }

    public static Node solveLL(Node node) {
        return rightRotation(node);
    }

    public static Node rightRotation(Node A){
        Node B = A.left;

        Node B_right = B.right;
        B.right = A;
        A.left = B_right;

        updateHtBal(A);
        updateHtBal(B);

        return B;
    }

    public static Node leftRotation(Node A){
        Node B = A.right;

        Node B_left = B.left;
        B.left = A;
        A.right = B_left;

        updateHtBal(A);
        updateHtBal(B);

        return B;
    }

    public static void main(String[]args){
        System.out.println("Hello World !!!");
        int[] arr = {12,25,30,37,40,50,60,62,70,75,87};

        Node root = null;

        for(int ele : arr) {
            root = add(root,ele);
        }

        display(root);
        System.out.println("-----------------------------");
        // add(root, 32);
        // remove(root, 25);
        // remove(root, 60);
        // remove(root, 70);

        // display(root);
    }
}