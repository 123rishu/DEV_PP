import java.util.*;

public class main{

    static int[] parent;
    static int[] rank;

    public static int find(int x){
        if(parent[x] == x){
            return x;
        }
        int temp = find(parent[x]);
        //path compression
        parent[x] = temp;
        return temp;
    }

    public static void union(int x, int y){
        //find leaders of x and y, and then perform union of their leaders
        int lx = find(x);
        int ly = find(y);

        //x will point to y
        if(lx != ly){
            //union on the basis of rank
            if(rank[lx] < rank[ly]){
                //greater rank wala parent banega, different ranks ke case me
                parent[lx] = ly;
            }
            else if(rank[lx] > rank[ly]){
                parent[ly] = lx;
            }
            else{
                //when ranks of the elements are equal, koi bhi parent ban sakta hai
                parent[lx] = ly;
                rank[ly]++;
            }
        }
    }

    public static void main(String[] args){
        //create a 2d relation array
        int[][] relations = {{1,3}, {3,2}, {5,9}, {6,3}, {10,5}, {7,5}, {8,2}, {5,2}};

        //create a parent array static and then initialize it
        parent = new int[11];

        //now initialize it
        for(int i=1;i<11;i++){
            parent[i] = i;
        }
        rank = new int[parent.length];

        //now takes values from each relation, and then perform their union one by one
        for(int i=0;i<relations.length;i++){
            int x = relations[i][0];
            int y = relations[i][1];

            union(x, y);
        }

        int groups = 0;
        for(int i=1;i<parent.length;i++){
            if(parent[i] == i){
                groups++;
            }
        }
        System.out.println(groups);

        //now, hashmap ki help se saare group ko display karo, along with their leader name as key values
        HashMap<Integer, ArrayList<Integer>> map = new HashMap<>();

        //first apply find using path compression on all elements of parent array
        for(int i=1;i<parent.length;i++){
            find(i);
        }

        for(int i=1;i<parent.length;i++){
            int grp = parent[i];
            int element = i;
            if(map.containsKey(grp) == true){
                //already hai grp leader toh, list fetch karo usme element add maro then list update maro
                ArrayList<Integer> list = map.get(grp);
                list.add(element);
                map.put(grp, list);
            }
            else{
                //agar grp leader nahi hai, toh list create karo, element dalo aur list push maro hashmap ke andar
                ArrayList<Integer> list = new ArrayList<>();
                list.add(element);
                map.put(grp, list);
            }
        }

        System.out.println(map);
    }
}