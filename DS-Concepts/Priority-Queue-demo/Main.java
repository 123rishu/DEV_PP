import java.util.*;

public class Main{

    public static class Car implements Comparable<Car>{
        int speed;
        String model;
        //float modelNo;

        Car(){

        }
        Car(int speed, String model){
            this.speed = speed;
            this.model = model;
            //this.modelNo = modelNo;
        }
        //+ve value -> this>other
        //-ve value -> this<other
        //0  value -> this==
        //for integer value
        public int compareTo(Car o){
            return this.speed - o.speed;
        }
    
        //for float values
        // public int compareTo(Car o){
        //     float gap = this.speed - o.speed;
        //     if(gap<0){
        //         return -1;
        //     }
        //     else if(gap>0){
        //         return +1;
        //     }
        //     else{
        //         return 0;
        //     }
        // }
    }

    public static void main(String[]args){
        //PriorityQueue<Integer> pq = new PriorityQueue<>();
        // PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());

        // pq.add(10);
        // pq.add(15);
        // pq.add(5);
        // pq.add(25);
        // pq.add(1);
        // pq.add(20);

        // while(pq.size()>0){
        //     int top = pq.peek();
        //     pq.remove();
        //     System.out.println(top+" ");
        // }

        PriorityQueue<Car> pq = new PriorityQueue<>();

        pq.add(new Car(10, "abc"));
        pq.add(new Car(20, "xyz"));
        pq.add(new Car(5, "pqr"));

        while(pq.size()>0){
            Car top = pq.peek();
            pq.remove();
            System.out.println(top.speed+" "+top.model);
        }


    }
}