import java.io.*;
import java.util.*;

public class Main {
  private static class Node {
    int data;
    ArrayList<Node> children = new ArrayList<>();
  }

  public static void display(Node node) {
    String str = node.data + " -> ";
    for (Node child : node.children) {
      str += child.data + ", ";
    }
    str += ".";
    System.out.println(str);

    for (Node child : node.children) {
      display(child);
    }
  }

  public static Node construct(int[] arr) {
    Node root = null;

    Stack<Node> st = new Stack<>();
    for (int i = 0; i < arr.length; i++) {
      if (arr[i] == -1) {
        st.pop();
      } else {
        Node t = new Node();
        t.data = arr[i];

        if (st.size() > 0) {
          st.peek().children.add(t);
        } else {
          root = t;
        }

        st.push(t);
      }
    }

    return root;
  }

  public static ArrayList<Integer> nodeToRootPath(Node node, int data) {
    if (node.data == data) {
      ArrayList<Integer> path = new ArrayList<>();
      path.add(node.data);
      return path;
    }

    for (Node child : node.children) {
      ArrayList<Integer> ptc = nodeToRootPath(child, data);
      if (ptc.size() > 0) {
        ptc.add(node.data);
        return ptc;
      }
    }

    return new ArrayList<>();
  }

  public static int lca(Node node, int d1, int d2) {
    // write your code here
    ArrayList<Integer> p1 = nodeToRootPath(node, d1);
    ArrayList<Integer> p2 = nodeToRootPath(node, d2);
    
    int i=p1.size() - 1;
    int j=p2.size() - 1;
    
    while(i>=0 && j>=0 && p1.get(i) == p2.get(j)){
        i--;
        j--;
    }
    
    return (i+1)+(j+1);
  }

  static int size;
  static int max;
  static int min;
  static int h;

  public static void multiSolver(Node node, int lev){
      size++;
      max = Math.max(max,node.data);
      min = Math.min(min, node.data);
      h = Math.max(h,lev);

      for(int i=0;i<node.children.size();i++){
        Node child = node.children.get(i);
        multiSolver(child,lev+1);
      }
  }



  public static void main(String[] args) throws Exception {
   

	int [] arr = {10,20,50,-1,60,-1,-1,30,70,-1,80,110,-1,120,-1,-1,90,-1,-1,40,100,-1,-1,-1};
	Node root = construct(arr);

	size = 0;
	max = Integer.MIN_VALUE;
	min = Integer.MAX_VALUE;
	h = 0;
	multiSolver(root, 0);

	System.out.println("Size = "+size);
	System.out.println("Max = "+max);
	System.out.println("Min = "+min);
	System.out.println("height = "+h);


  }

}