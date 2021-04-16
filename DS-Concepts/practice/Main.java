import java.util.*;

public class Main {
    
    public static class Node{
        int data;
        ArrayList<Node>children = new ArrayList<>();
    }

    public static void display(Node node){

        String str = node.data + " -> ";
        String elements = "";
        for(int i=0;i<node.children.size();i++){
            Node child = node.children.get(i);
            elements += (child.data + ",");
        }
        String finStr = str + elements + ".";
        System.out.println(finStr);

        for(int i=0;i<node.children.size();i++){
            Node child = node.children.get(i);
            display(child);
        }

    
    }

    public static Node construct(int[] arr){
        Node root = null;

        Stack<Node> st = new Stack<>();
        for(int i=0;i<arr.length;i++){
            if(arr[i] == -1){
                st.pop();
            }
            else{
                Node t = new Node();
                t.data = arr[i];
                if(st.size()>0){
                    Node topElementCurr = st.peek();
                    topElementCurr.children.add(t);
                }
                else{
                    root = t;
                }
                st.push(t);
            }
        }
        return root;
    }


    public static void main(String[] args){
        int [] arr = {10,20,50,-1,60,-1,-1,30,70,-1,80,110,-1,120,-1,-1,90,-1,-1,40,100,-1,-1,-1};    
        Node root = construct(arr);

        display(root);
    }
}
