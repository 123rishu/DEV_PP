public class main{

    static int[] parent;

    public static int find(int x){
        if(parent[x] == x){
            return x;
        }
        int temp = find(parent[x]);
        return temp;
    }

    public static void union(int x, int y){
        //find leaders of x and y, and then perform union of their leaders
        int lx = find(x);
        int ly = find(y);

        //x will point to y
        if(lx != ly){
            //union ---> 
            parent[x] = y;
        }
    }

    public static void main(String[] args){
        //create a 2d relation array
        int[][] relations = {{1,3}, {3,2}, {5,9}, {6,3}, {10,5}, {7,5}, {8,2}};

        //create a parent array static and then initialize it
        parent = new int[11];

        //now initialize it
        for(int i=1;i<11;i++){
            parent[i] = i;
        }

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
    }
}